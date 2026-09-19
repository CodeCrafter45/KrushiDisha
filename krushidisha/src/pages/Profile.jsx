
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  LandPlot,
  Wallet,
  Phone,
  User,
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const farmer = {
    name: "Mahesh Kumbhar",
    id: "KR1023",
    village: "Shirol",
    district: "Kolhapur",
    mobile: "+91 98765 43210",
    land: "3.5 Acres",
    soil: "Black Cotton Soil",
    bank: "State Bank of India",
    aadhaar: "Verified",
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-600 text-white p-6 rounded-b-3xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">Farmer Profile</h1>
        <p className="text-green-100">Government Verified Identity</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <User size={40} className="text-green-700" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">{farmer.name}</h2>
              <p className="text-gray-500">Farmer ID: {farmer.id}</p>

              <div className="flex items-center gap-2 mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit">
                <ShieldCheck size={16} />
                <span className="text-sm font-medium">
                  Aadhaar Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl p-5 border shadow-sm space-y-4">
          <Info
            icon={<MapPin size={18} />}
            label="District"
            value={farmer.district}
          />
          <Info
            icon={<MapPin size={18} />}
            label="Village"
            value={farmer.village}
          />
          <Info
            icon={<LandPlot size={18} />}
            label="Land Holding"
            value={farmer.land}
          />
          <Info
            icon={<LandPlot size={18} />}
            label="Soil Type"
            value={farmer.soil}
          />
          <Info
            icon={<Phone size={18} />}
            label="Mobile"
            value={farmer.mobile}
          />
          <Info
            icon={<Wallet size={18} />}
            label="Bank Linked"
            value={farmer.bank}
          />
        </div>

        {/* Government Status */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-green-700 font-semibold">
            <ShieldCheck size={18} />
            Government Verification Status
          </div>

          <ul className="mt-3 text-sm text-gray-700 space-y-1">
            <li>✓ Aadhaar authenticated</li>
            <li>✓ Bank account linked</li>
            <li>✓ Farmer ID generated</li>
            <li>✓ Eligible for digital payments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-green-700">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}