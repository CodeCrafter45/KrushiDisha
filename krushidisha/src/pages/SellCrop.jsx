import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { translations } from "../utils/translations";
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Loader2,
} from "lucide-react";

export default function SellCrop() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    crop: "Onion",
    quantity: "",
    grade: "A",
    location: "Kolhapur",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleGenerate = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/recommendation", {
        state: form,
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5]">

      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-600 text-white p-6 rounded-b-3xl shadow-lg">

        {/* Language Button */}
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
          className="flex items-center gap-2 mb-4 text-green-100 hover:text-white"
        >
          <ArrowLeft size={18} />
          {t.back}
        </button>

        <h1 className="text-3xl font-bold">{t.sellYourCrop}</h1>

        <p className="text-green-100 mt-1">
          {t.sellSubtitle}
        </p>
      </div>

      {/* Form */}
      <div className="p-5 space-y-4">

        <InputCard label={t.crop}>
          <select
            value={form.crop}
            onChange={(e) => handleChange("crop", e.target.value)}
            className="w-full outline-none bg-transparent"
          >
            <option>Onion</option>
            <option>Soyabean</option>
            <option>Tomato</option>
            <option>Wheat</option>
            <option>Sugarcane</option>
            <option>Bajra</option>
            <option>Jowar</option>
            <option>Maize</option>
            <option>Paddy</option>
            <option>Ragi</option>
            <option>Groundnut</option>
            <option>Mustard</option>
            <option>Sesamum</option>
            <option>Sunflower</option>
            <option>Safflower</option>
            <option>Castor Seed</option>
            <option>Bengal Gram</option>
            <option>Black Gram</option>
            <option>Green Gram (Moong)</option>
            <option>Lentil (Masur)</option>
            <option>Tur (Red Gram)</option>
            <option>White Gram</option>
            <option>Cowpea</option>
            <option>Field Pea</option>
            <option>Barley</option>
            <option>Broken Rice</option>
            <option>Cotton</option>
            <option>Potato</option>
            <option>Brinjal</option>
            <option>Green Chilli</option>
            <option>Pomegranate</option>
            <option>Banana</option>
            <option>Grapes</option>
            <option>Turmeric</option>
            <option>Coriander</option>
          </select>
        </InputCard>

        <InputCard label={t.quantity}>
          <input
            type="number"
            placeholder={t.enterQuantity}
            value={form.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </InputCard>

        <InputCard label={t.qualityGrade}>
          <select
            value={form.grade}
            onChange={(e) => handleChange("grade", e.target.value)}
            className="w-full outline-none bg-transparent"
          >
            <option value="A">{t.gradeA}</option>
            <option value="B">{t.gradeB}</option>
            <option value="C">{t.gradeC}</option>
          </select>
        </InputCard>

        <InputCard label={t.location}>
          <div className="flex items-center gap-2">
            <MapPin className="text-green-700" size={18} />

            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>
        </InputCard>

        {/* AI Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-4">

          <div className="flex items-center gap-2 text-blue-700 font-semibold">
            <Sparkles size={18} />
            {t.aiPreview}
          </div>

          <p className="text-sm mt-3 text-gray-700">
            <span className="font-semibold">{form.crop}</span> •{" "}
            <span className="font-semibold">
              {form.quantity || "0"} qtl
            </span>{" "}
            • {t.grade} {form.grade} • {form.location}
          </p>

          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="bg-white px-3 py-1 rounded-full text-xs font-medium">
              {t.liveMarket}
            </span>

            <span className="bg-white px-3 py-1 rounded-full text-xs font-medium">
              {t.verifiedBuyers}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-semibold transition disabled:opacity-90"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              {t.analyzing}
            </div>
          ) : (
            t.generateAI
          )}
        </button>
      </div>

      {/* Loading Popup */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-8 w-[340px] shadow-2xl text-center">

            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Loader2
                className="animate-spin text-green-700"
                size={34}
              />
            </div>

            <h2 className="text-xl font-bold mt-5">
              KrushiDisha AI
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              {t.findingBuyer}
            </p>

            <div className="mt-6 space-y-3 text-left text-sm">

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                {t.fetchingPrices}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                {t.comparingBuyers}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                {t.calculatingProfit}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function InputCard({ label, children }) {
  return (
    <div className="bg-white rounded-2xl border p-4 shadow-sm">
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      {children}
    </div>
  );
}