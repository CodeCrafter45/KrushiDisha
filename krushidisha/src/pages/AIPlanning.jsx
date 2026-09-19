
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { translations } from "../utils/translations";
import {
  ArrowLeft,
  Leaf,
  TrendingUp,
  CloudRain,
  Target,
} from "lucide-react";

export default function AIPlanning() {
  const navigate = useNavigate();

  // Language
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [district, setDistrict] = useState("Kolhapur");
  const [season, setSeason] = useState("Kharif");

  const crops = [
    {
      name: "Soybean",
      season: "Kharif",
      avgPrice: 4200,
      demand: 90,
      cost: 2000,
      yield: 50,
      rainfall: { Kolhapur: 85, Pune: 83, Satara: 80, Sangli: 84 },
    },
    {
      name: "Onion",
      season: "Kharif",
      avgPrice: 2450,
      demand: 95,
      cost: 1400,
      yield: 70,
      rainfall: { Kolhapur: 82, Pune: 76, Satara: 79, Sangli: 81 },
    },
    {
      name: "Tomato",
      season: "Kharif",
      avgPrice: 1800,
      demand: 82,
      cost: 1100,
      yield: 80,
      rainfall: { Kolhapur: 78, Pune: 72, Satara: 75, Sangli: 77 },
    },
    {
      name: "Wheat",
      season: "Rabi",
      avgPrice: 3569,
      demand: 88,
      cost: 1800,
      yield: 55,
      rainfall: { Kolhapur: 35, Pune: 32, Satara: 38, Sangli: 34 },
    },
  ];

  const ranked = useMemo(() => {
    return crops
      .filter((c) => c.season === season)
      .map((c) => ({
        ...c,
        rain: c.rainfall[district],
        score:
          c.avgPrice * 0.5 +
          c.demand * 20 +
          c.rainfall[district] * 10,
      }))
      .sort((a, b) => b.score - a.score);
  }, [district, season]);

  const best = ranked[0];
  const expectedProfit = (best.avgPrice - best.cost) * best.yield;

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
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <h1 className="text-3xl font-bold">
          {t.aiPlanning}
        </h1>

        <p className="text-green-100">
          {t.bestCropNextSeason}
        </p>
      </div>

      <div className="p-5 space-y-5">

        {/* Planning Inputs */}
        <div className="bg-white rounded-2xl p-4 border shadow-sm">
          <h3 className="font-semibold mb-4">
            {t.planningDetails}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500 mb-2">
                {t.district}
              </p>

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border rounded-xl p-3 outline-none"
              >
                <option>Kolhapur</option>
                <option>Pune</option>
                <option>Satara</option>
                <option>Sangli</option>
              </select>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">
                {t.season}
              </p>

              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full border rounded-xl p-3 outline-none"
              >
                <option>Kharif</option>
                <option>Rabi</option>
              </select>
            </div>

          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-white rounded-2xl p-5 border-2 border-green-300 shadow-sm">

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            {t.aiSelected}
          </span>

          <div className="flex justify-between items-center mt-3">

            <div>
              <h2 className="text-3xl font-bold">
                {best.name}
              </h2>

              <p className="text-gray-500">
                {district} • {season}
              </p>
            </div>

            <Leaf size={44} className="text-green-700" />

          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">

            <Stat
              icon={<TrendingUp size={18} />}
              label={t.avgPrice}
              value={`₹${best.avgPrice}`}
            />

            <Stat
              icon={<Target size={18} />}
              label={t.demand}
              value={`${best.demand}%`}
            />

            <Stat
              icon={<CloudRain size={18} />}
              label={t.rainfall}
              value={`${best.rain}%`}
            />

            <Stat
              icon={<TrendingUp size={18} />}
              label={t.expectedProfit}
              value={`₹${expectedProfit.toLocaleString()}`}
            />

          </div>

          {/* Explanation */}
          <div className="mt-5 bg-green-50 rounded-xl p-4">

            <p className="font-semibold text-green-700 mb-2">
              {t.whyCrop}
            </p>

            <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
              <li>{t.weightedScore}</li>
              <li>
                {t.historicalPrice}: ₹{best.avgPrice}/quintal
              </li>
              <li>
                {t.buyerDemand}: {best.demand}%
              </li>
              <li>
                {t.rainfallSuitability} {district}: {best.rain}%
              </li>
            </ul>

            <div className="mt-3 pt-3 border-t border-green-200 text-xs text-gray-600">

              <p className="font-semibold">
                {t.aiScoringFormula}
              </p>

              <p>
                Score = Price × 0.5 + Demand × 20 + Rainfall × 10
              </p>

              <p className="mt-2 font-semibold">
                {t.profitFormula}
              </p>

              <p>
                (₹{best.avgPrice} − ₹{best.cost}) × {best.yield} qtl ={" "}
                <span className="font-bold text-green-700">
                  ₹{expectedProfit.toLocaleString()}
                </span>
              </p>

            </div>
          </div>

        </div>

        {/* Other Options */}
        <div className="bg-white rounded-2xl p-4 border">

          <h3 className="font-semibold mb-3">
            {t.otherCropOptions}
          </h3>

          {ranked.slice(1).map((crop) => (
            <div
              key={crop.name}
              className="flex justify-between items-center py-3 border-b last:border-0"
            >
              <div>
                <p className="font-medium">{crop.name}</p>

                <p className="text-sm text-gray-500">
                  {t.demand} {crop.demand}% • {t.rainfall} {crop.rain}%
                </p>
              </div>

              <p className="font-bold text-green-700">
                ₹{crop.avgPrice}
              </p>

            </div>
          ))}

        </div>

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