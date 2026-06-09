import { Flag, AlertTriangle, Shield } from "lucide-react";

function ReportsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reports Management</h1>

        <p className="text-gray-500 mt-2">
          Monitor platform issues and moderation reports.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl shadow p-5">
          <Flag size={28} />
          <h3 className="mt-3 font-semibold">Total Reports</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <AlertTriangle size={28} />
          <h3 className="mt-3 font-semibold">Pending Review</h3>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <Shield size={28} />
          <h3 className="mt-3 font-semibold">Resolved</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
