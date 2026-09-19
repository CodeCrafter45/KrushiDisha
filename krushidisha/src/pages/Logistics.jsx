import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  MapPin,
  Clock,
  CheckCircle,
  Phone,
} from "lucide-react";

export default function Logistics() {
  const navigate = useNavigate();
  const { state: farmer } = useLocation();

  const logistics = {
    company: "GreenRoute Logistics",
    driver: "Amit Patil",
    phone: "+91 98765 43210",
    vehicle: "MH12 AB 4589",
    pickup: farmer?.location || "Kolhapur",
    destination: "Pune Agro Pvt. Ltd.",
    distance: "42 km",
    cost: 20,
    eta: "Today • 4:00 PM",
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white p-6 rounded-b-3xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">Logistics</h1>
        <p className="text-orange-100">
          Smart transport allocation
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Transport Partner */}
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                VERIFIED PARTNER
              </span>

              <h2 className="text-2xl font-bold mt-3">
                {logistics.company}
              </h2>

              <p className="text-gray-500">
                Driver: {logistics.driver}
              </p>
            </div>

            <Truck size={44} className="text-orange-500" />
          </div>
        </div>

        {/* Route Details */}
        <div className="bg-white rounded-2xl p-5 border">
          <h3 className="font-semibold mb-4">Transport Route</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-green-600 mt-1" size={18} />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-semibold">{logistics.pickup}</p>
              </div>
            </div>

            <div className="ml-2 border-l-2 border-dashed border-gray-300 h-6"></div>

            <div className="flex items-start gap-3">
              <MapPin className="text-red-500 mt-1" size={18} />
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-semibold">{logistics.destination}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Distance" value={logistics.distance} />
          <Stat label="Transport Cost" value={`₹${logistics.cost}/qtl`} />
          <Stat label="Vehicle" value="MH12 AB4589" />
          <Stat label="ETA" value="4:00 PM" />
        </div>

        {/* Live Status */}
        <div className="bg-white rounded-2xl p-5 border">
          <h3 className="font-semibold mb-4">Live Tracking</h3>

          <Status
            active
            icon={<CheckCircle size={18} />}
            title="Vehicle Assigned"
            sub="Transport partner confirmed"
          />

          <Status
            active
            icon={<Truck size={18} />}
            title="Pickup Scheduled"
            sub="Vehicle arriving at 4:00 PM"
          />

          <Status
            icon={<Clock size={18} />}
            title="Delivery to Buyer"
            sub="Estimated 2 hours after pickup"
          />
        </div>

        {/* Driver */}
        <div className="bg-white rounded-2xl p-5 border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Driver</p>
              <h3 className="font-bold text-lg">
                {logistics.driver}
              </h3>
              <p className="text-gray-500">{logistics.phone}</p>
            </div>

            <button className="bg-green-600 text-white p-3 rounded-full">
              <Phone size={20} />
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate("/payment", { state: farmer })}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-semibold"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 border">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold mt-1">{value}</p>
    </div>
  );
}

function Status({ active, icon, title, sub }) {
  return (
    <div className="flex gap-3 mb-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          active
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
    </div>
  );
}