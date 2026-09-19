import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { translations } from "../utils/translations";
import {
  ArrowRight,
  TrendingUp,
  Brain,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  // Language State
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F4F7F5]">

      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-600 text-white p-6 rounded-b-3xl shadow-lg">

        {/* Language Switch */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() =>
              setLanguage(language === "en" ? "mr" : "en")
            }
            className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30"
          >
            🌐 {language === "en" ? "मराठी" : "English"}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/maharashtra-logo.png"
            alt="Government of Maharashtra"
            className="w-12 h-12 object-contain"
          />

          <div>
            <p className="text-xs opacity-80">{t.gov}</p>
            <h1 className="text-3xl font-bold">{t.krushi}</h1>
            <p className="text-green-100 text-sm">{t.platform}</p>
          </div>
        </div>

        {/* Farmer */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">{t.farmerName}</h2>
            <p className="text-sm text-green-100">
              {t.kolhapur} • {t.farmerId}
            </p>
          </div>

          <div
            onClick={() => navigate("/profile")}
            className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold cursor-pointer hover:bg-white/30"
          >
            M
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-5">

        {/* Best Market */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border">
          <div className="flex justify-between items-start">

            <div>
              <p className="text-gray-500 text-sm">{t.todayMarket}</p>
              <h3 className="font-bold text-lg">{t.onionGrade}</h3>
              <p className="text-sm text-gray-500">{t.puneBuyer}</p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-green-700">₹2450</p>
              <p className="text-xs text-gray-500">{t.perQtl}</p>
            </div>

          </div>

          <div className="mt-4 flex justify-between text-sm">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {t.transport} ₹20
            </span>

            <span className="flex items-center gap-1 text-green-700 font-medium">
              <TrendingUp size={16} />
              +12% {t.profit}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">

          <Card
            color="bg-blue-600"
            icon={<TrendingUp size={26} />}
            title={t.sellCrop}
            subtitle={t.compareBuyers}
            onClick={() => navigate("/sell")}
          />

          <Card
            color="bg-purple-600"
            icon={<Brain size={26} />}
            title={t.aiPlanning}
            subtitle={t.bestCrop}
            onClick={() => navigate("/planning")}
          />

        </div>

        {/* Market Overview */}
        <div className="bg-white rounded-2xl p-4 border shadow-sm">
          <h3 className="font-semibold mb-3">{t.marketOverview}</h3>

          <div className="space-y-3">
            <Row crop={t.onion} price="₹2450" />
            <Row crop={t.soybean} price="₹4200" />
            <Row crop={t.tomato} price="₹1800" />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/sell")}
          className="w-full bg-green-700 hover:bg-green-800 transition text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
        >
          {t.startSelling}
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Card({ color, icon, title, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${color} text-white rounded-2xl p-4 cursor-pointer hover:scale-105 transition duration-200`}
    >
      {icon}
      <h3 className="font-bold mt-3">{title}</h3>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
  );
}

function Row({ crop, price }) {
  return (
    <div className="flex justify-between">
      <span>{crop}</span>
      <span className="font-semibold text-green-700">{price}</span>
    </div>
  );
}