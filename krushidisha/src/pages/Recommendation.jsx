import { useEffect, useState } from "react";
import Papa from "papaparse";
import { useNavigate, useLocation } from "react-router-dom";
import { translations } from "../utils/translations";
import {
  ArrowLeft,
  Truck,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";

const normalize = (value) =>
  String(value ?? "")
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const toNumber = (value) => {
  const cleaned = String(value ?? "")
    .replace(/[₹,\s]/g, "")
    .trim();

  if (!cleaned || cleaned === "-") return 0;

  const number = Number(cleaned);
  return Number.isFinite(number) ? number : 0;
};

const getField = (row, names) => {
  const wanted = names.map(normalize);
  const key = Object.keys(row).find((item) =>
    wanted.includes(normalize(item))
  );
  return key ? row[key] : "";
};

const parseCSV = (text) =>
  Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) =>
      header.replace(/^\uFEFF/, "").trim(),
  }).data;

export default function Recommendation() {
  const navigate = useNavigate();
  const { state: farmer } = useLocation();

  // Language
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const crop = farmer?.crop || "";
  const qty = Math.max(0, toNumber(farmer?.quantity));

  const [marketPrice, setMarketPrice] = useState(0);
  const [bestBuyer, setBestBuyer] = useState(null);
  const [otherBuyers, setOtherBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadRecommendations = async () => {
      setLoading(true);
      setError("");
      setBestBuyer(null);
      setOtherBuyers([]);

      try {
        const [marketResponse, buyersResponse] = await Promise.all([
          fetch("/data/Market_Wise_Price.csv"),
          fetch("/data/buyers.csv"),
        ]);

        const [marketCSV, buyersCSV] = await Promise.all([
          marketResponse.text(),
          buyersResponse.text(),
        ]);

        const marketCSVWithHeader = marketCSV
          .split(/\r?\n/)
          .slice(2)
          .join("\n");

        const marketRows = parseCSV(marketCSVWithHeader);
        const buyerRows = parseCSV(buyersCSV);

        const cropName = normalize(crop);

        const marketRow = marketRows.find(
          (row) => normalize(row.Commodity) === cropName
        );

        const priceColumn = Object.keys(marketRow).find(
          (key) =>
            normalize(key) === normalize("Price on 11 Sep, 2026")
        );

        const price = toNumber(marketRow[priceColumn]);

        const rankedBuyers = buyerRows
          .filter((buyer) => {
            const buyerCrop = getField(buyer, [
              "crop",
              "commodity",
              "item",
            ]);
            return normalize(buyerCrop) === cropName;
          })
          .map((buyer) => {
            const transport = toNumber(getField(buyer, ["transport"]));
            const demand = toNumber(getField(buyer, ["demand"]));
            const quality = toNumber(getField(buyer, ["quality"]));
            const distance = toNumber(getField(buyer, ["distance"]));

            const totalSale = price * qty;
            const netProfit = totalSale - transport * qty;

            return {
              buyer: getField(buyer, ["buyer"]),
              location: getField(buyer, ["location"]),
              transport,
              demand,
              quality,
              distance,
              score:
                demand * 0.4 +
                quality * 0.4 -
                transport * 0.2,
              netProfit,
            };
          })
          .sort((a, b) => b.score - a.score);

        if (!cancelled) {
          setMarketPrice(price);
          setBestBuyer(rankedBuyers[0]);
          setOtherBuyers(rankedBuyers.slice(1));
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (crop) loadRecommendations();

    return () => {
      cancelled = true;
    };
  }, [crop, qty]);

  const money = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-700 border-t-transparent mx-auto" />
          <p className="mt-4 text-gray-600">
            {t.loadingRecommendation}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-green-700 text-white px-5 py-2 rounded-xl"
          >
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F5]">

      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-600 text-white p-6 rounded-b-3xl">

        <div className="flex justify-end mb-3">
          <button
            onClick={() =>
              setLanguage(language === "en" ? "mr" : "en")
            }
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
          >
            🌐 {language === "en" ? "मराठी" : "English"}
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <h1 className="text-3xl font-bold">
          {t.aiRecommendation}
        </h1>

        <p className="text-green-100">
          {t.bestBuyerSubtitle}
        </p>
      </div>

      <div className="p-5 space-y-4">

        {/* Farmer */}
        <div className="bg-white rounded-2xl p-4 border">
          <p className="text-gray-500 text-sm">{t.farmerInput}</p>

          <h2 className="font-bold text-xl mt-1">
            {crop} • {qty} qtl
          </h2>

          <p className="text-sm text-gray-600">
            {t.grade} {farmer?.grade} • {farmer?.location}
          </p>
        </div>

        {/* Best Buyer */}
        <div className="bg-white rounded-2xl p-5 border-2 border-green-300 shadow-sm">

          <div className="flex justify-between items-center">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              {t.aiSelected}
            </span>

            <div className="text-right">
              <p className="text-2xl font-bold text-green-700">
                {money(marketPrice)}
              </p>
              <p className="text-xs text-gray-500">
                {t.perQuintal}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-3">
            {bestBuyer.buyer}
          </h3>

          <p className="text-sm text-gray-500">
            {bestBuyer.location}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Stat
              icon={<Truck size={18} />}
              label={t.transportPerQtl}
              value={money(bestBuyer.transport)}
            />

            <Stat
              icon={<MapPin size={18} />}
              label={t.distance}
              value={`${bestBuyer.distance} km`}
            />

            <Stat
              icon={<Star size={18} />}
              label={t.quality}
              value={`${bestBuyer.quality}%`}
            />

            <Stat
              icon={<CheckCircle size={18} />}
              label={t.netProfit}
              value={money(bestBuyer.netProfit)}
            />
          </div>

          <div className="mt-4 bg-green-50 rounded-xl p-3">
            <p className="font-semibold text-green-700">
              {t.whyBuyer}
            </p>

            <ul className="text-sm text-gray-700 mt-2 list-disc ml-5 space-y-1">
              <li>{t.weightedScore}</li>
              <li>{t.lowestTransport}</li>
              <li>{t.highDemand} ({bestBuyer.demand}%)</li>
              <li>
                {t.qualityCompatibility} ({bestBuyer.quality}%)
              </li>
            </ul>
          </div>
        </div>

        {/* Other Buyers */}
        <h3 className="font-bold text-lg">{t.otherBuyers}</h3>

        {otherBuyers.map((buyer, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 border flex justify-between items-center"
          >
            <div>
              <h4 className="font-semibold">{buyer.buyer}</h4>
              <p className="text-sm text-gray-500">
                {buyer.location} • {buyer.distance} km
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">{money(marketPrice)}</p>
              <p className="text-sm text-green-600">
                {money(buyer.netProfit)}
              </p>
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            navigate("/payment", {
              state: {
                farmer,
                buyer: bestBuyer,
                marketPrice,
              },
            })
          }
          className="w-full bg-green-700 text-white py-4 rounded-2xl font-semibold"
        >
          {t.acceptOffer}
        </button>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="text-green-700">{icon}</div>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}