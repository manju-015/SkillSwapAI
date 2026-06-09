import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../api/api";

function ConnectionManagementPage() {
  const [connections, setConnections] = useState([]);
  const [search, setSearch] = useState("");

  const fetchConnections = async () => {
    try {
      const { data } = await api.get("/admin/connections");

      console.log("CONNECTIONS DATA:", data);

      setConnections(data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to load connections",
      );
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const totalConnections = connections.length;

  const acceptedConnections = connections.filter(
    (connection) => connection.status === "accepted",
  ).length;

  const pendingConnections = connections.filter(
    (connection) => connection.status === "pending",
  ).length;

  const rejectedConnections = connections.filter(
    (connection) => connection.status === "rejected",
  ).length;

  const filteredConnections = connections.filter(
    (connection) =>
      connection.sender?.name.toLowerCase().includes(search.toLowerCase()) ||
      connection.receiver?.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Connection Management</h1>

        <p className="text-gray-500 mt-2">
          Monitor user connections across the platform.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Connections</h3>

          <p className="text-3xl font-bold text-slate-800">
            {totalConnections}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-slate-800">
            {pendingConnections}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Confirmed</h3>
          <p className="text-3xl font-bold text-slate-800">
            {acceptedConnections}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Rejected</h3>
          <p className="text-3xl font-bold text-slate-800">
            {rejectedConnections}
          </p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search sender or receiver..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-80 text-white bg-slate-800 placeholder:text-slate-400"
        />
      </div>

      <p className="text-sm text-slate-500 mb-3">
        Showing {filteredConnections.length} of {connections.length} connections
      </p>

      <div className="bg-white rounded-xl shadow p-5">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-slate-600 font-semibold">
                Mentor
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Learner
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Skill
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Date
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredConnections.map((connection) => (
              <tr key={connection._id} className="border-b">
                <td className="py-4 text-slate-800">
                  {connection.sender?.name}
                </td>

                <td className="py-4 text-slate-800">
                  {connection.receiver?.name}
                </td>

                <td className="py-4 text-slate-800">{connection.skill}</td>

                <td className="py-4 text-slate-800">
                  {new Date(connection.date).toLocaleDateString()}
                </td>

                <td className="py-4">
                  {connection.status === "pending" && (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  )}

                  {connection.status === "confirmed" && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      Confirmed
                    </span>
                  )}

                  {connection.status === "rejected" && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                      Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConnectionManagementPage;
