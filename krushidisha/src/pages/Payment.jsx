import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Wallet,
  Truck,
  Download,
} from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const farmer = state?.farmer || {
    crop: "Onion",
    quantity: 50,
    grade: "A",
    location: "Kolhapur",
  };

  const buyer = state?.buyer || {
    buyer: "Pune Agro Pvt. Ltd.",
    transport: 20,
  };

  const marketPrice = state?.marketPrice || 2450;

  const total =
    (marketPrice - buyer.transport) * Number(farmer.quantity);

  const transactionId =
    "KD" + Date.now().toString().slice(-8);

  const handleDownload = () => {
    const receipt = document.getElementById("receipt");

    const printWindow = window.open("", "_blank", "width=900,height=900");

    printWindow.document.write(`
      <html>
        <head>
          <title>KrushiDisha Receipt</title>
          <style>
            body{
              font-family: Arial, sans-serif;
              padding:30px;
              color:#222;
              line-height:1.6;
            }
            h2,h3{margin:0}
            .center{text-align:center}
            .row{
              display:flex;
              justify-content:space-between;
              margin:8px 0;
            }
            .divider{
              border-top:1px solid #ddd;
              margin:18px 0;
            }
            .total{
              font-size:28px;
              font-weight:bold;
              color:#15803d;
            }
            .success{
              color:#15803d;
              font-weight:bold;
            }
          </style>
        </head>
        <body>
          ${receipt.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5]">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 to-green-600 text-white p-6 rounded-b-3xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold">Payment Tracking</h1>
        <p className="text-green-100">
          Transparent digital transaction record
        </p>
      </div>

      <div className="p-5 space-y-5">

        {/* Transaction Card */}
        <div className="bg-white rounded-2xl p-5 border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Buyer</p>
              <h2 className="text-2xl font-bold">{buyer.buyer}</h2>
              <p className="text-green-600 text-sm">Verified Buyer</p>
            </div>

            <CheckCircle size={34} className="text-green-600" />
          </div>

          <div className="border-t my-4"></div>

          <Row label="Crop" value={farmer.crop} />
          <Row label="Quantity" value={`${farmer.quantity} qtl`} />
          <Row label="Grade" value={`Grade ${farmer.grade}`} />
          <Row label="Market Price" value={`₹${marketPrice}/qtl`} />
          <Row label="Transport" value={`₹${buyer.transport}/qtl`} />

          <div className="border-t mt-4 pt-4 flex justify-between items-center">
            <span className="font-semibold text-lg">Total Amount</span>
            <span className="text-3xl font-bold text-green-700">
              ₹{total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-2xl p-5 border">
          <h3 className="font-semibold text-lg mb-4">
            Transaction Status
          </h3>

          <Status
            active
            icon={<CheckCircle size={18} />}
            title="Offer Accepted"
            sub="Today • 10:30 AM"
          />

          <Status
            active
            icon={<Truck size={18} />}
            title="Pickup Scheduled"
            sub="Vehicle arriving at 4:00 PM"
          />

          <Status
            active
            icon={<Wallet size={18} />}
            title="Payment Processing"
            sub="UPI / Bank Transfer"
          />

          <Status
            icon={<CheckCircle size={18} />}
            title="Payment Completed"
            sub="Expected within 24 hours"
          />
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Download Receipt
        </button>

        {/* Hidden Receipt */}
        <div id="receipt" className="bg-white rounded-2xl p-6 border shadow-sm">
          <div className="text-center border-b pb-4">
            
            <h2 className="text-xl font-bold text-green-700">
              Government of Maharashtra
            </h2>

            <p className="text-sm text-gray-500">
              KrushiDisha AI Market Linkage Platform
            </p>

            <div className="mt-3 text-green-700 font-semibold">
              ✓ PAYMENT SUCCESSFUL
            </div>
          </div>

          <div className="mt-5">
            <h3 className="font-semibold mb-3">Farmer Details</h3>

            <Row label="Farmer Name: " value="Mahesh Kumbhar" />
            <Row label="Farmer ID: " value="KR1023" />
            <Row label="District: " value={farmer.location} />
          </div>

          <div className="border-t my-5"></div>

          <div>
            <h3 className="font-semibold mb-3">Buyer Details</h3>

            <Row label="Buyer: " value={buyer.buyer} />
            <Row label="Crop: " value={farmer.crop} />
            <Row label="Grade: " value={`Grade ${farmer.grade}`} />
            <Row label="Quantity: " value={`${farmer.quantity} Quintals`} />
          </div>

          <div className="border-t my-5"></div>

          <div>
            <h3 className="font-semibold mb-3">Payment Summary</h3>

            <Row label="Market Price: " value={`₹${marketPrice} / qtl`} />
            <Row label="Transport Cost: " value={`₹${buyer.transport} / qtl`} />

            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <span className="font-bold text-lg">Total Amount</span>
              <span className="text-3xl font-bold text-green-700">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="border-t my-5"></div>

          <div>
            <h3 className="font-semibold mb-3">
              Transaction Information
            </h3>

            <Row label="Transaction ID: " value={transactionId} />
            <Row label="Payment Method: " value="UPI / Bank Transfer" />
            <Row
              label="Date"
              value={new Date().toLocaleDateString("en-IN")}
            />
            <Row label="Status: " value="Completed" />
          </div>

          <div className="mt-6 text-center text-xs text-gray-500 border-t pt-4">
            This is a digitally generated receipt by KrushiDisha.
            <br />
            No physical signature is required.
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
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