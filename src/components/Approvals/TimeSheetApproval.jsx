import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Download,
  CheckCheck,
  Clock,
  TrendingUp,
  ClipboardPlus,
  ChevronDown,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATIC_FALLBACK = {
  role: "Team Member",
  avatar: "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff",
  period: "Current Period",
  projects: ["General Tasks"],
  totalHours: "0.00",
  status: "Pending",
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex flex-col justify-between min-h-[120px]">
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className={`text-sm font-medium ${color}`}>{label}</span>
      </div>
    </div>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
  </div>
);

export default function TimeSheetApproval() {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    totalPending: 0,
    hoursToReview: 0,
    teamUtilization: 92,
  });
  const hasFetched = useRef(false);
  
  const handleNavigate = () => {
    navigate("/tracker");
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchTimesheets = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const apiData = await response.json();

        const transformedData = apiData.map((user, index) => {
          const statusOptions = ["pending", "approved", "rejected"];
          const projectOptions = [
            ["Project Alpha", "Internal Ops"],
            ["Website Redesign"],
            ["Q4 Campaign", "Team Offsite"],
            ["Infra Migration"],
            ["Mobile App"],
            ["Data Pipeline"],
          ];

          return {
            id: user.id || index + 1,
            name: user.name || `User ${index + 1}`,
            role: user.company?.bs || STATIC_FALLBACK.role,
            avatar:
              user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name || "User"
              )}&background=random`,
            period:
              user.period ||
              (index % 2 === 0
                ? "Oct 1 - Oct 7, 2023"
                : "Sep 24 - Sep 30, 2023"),
            projects:
              user.projects || projectOptions[index % projectOptions.length],
            totalHours: user.totalHours || (35 + Math.random() * 15).toFixed(2),
            status: user.status || statusOptions[index % 3],
            email: user.email || "",
          };
        });

        setTimesheets(transformedData);
        const pending = transformedData.filter(
          (t) => t.status === "pending"
        ).length;
        const hours = transformedData.reduce(
          (sum, t) => sum + parseFloat(t.totalHours),
          0
        );
        setStats({
          totalPending: pending,
          hoursToReview: Math.round(hours),
          teamUtilization: 92,
        });
      } catch (error) {
        console.error("Error fetching timesheets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, []);

  const filteredTimesheets = timesheets.filter((ts) => {
    const matchesSearch = ts.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ts.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTimesheets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTimesheets = filteredTimesheets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(paginatedTimesheets.map((ts) => ts.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProjectColor = (index) => {
    const colors = [
      "bg-sky-100 text-sky-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-cyan-100 text-cyan-700",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading timesheets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
      <main className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Timesheet Approvals
            </h1>
            <p className="text-gray-600 mt-1">
              Review and manage your team's weekly time submissions.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>

            <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg flex items-center gap-2">
              <CheckCheck className="h-4 w-4" />
              Approve All Selected
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={ClipboardPlus}
            label="TOTAL PENDING"
            value={stats.totalPending}
            color="text-orange-600"
          />
          <StatCard
            icon={Clock}
            label="HOURS TO REVIEW"
            value={`${stats.hoursToReview} hrs`}
            color="text-sky-600"
          />
          <StatCard
            icon={TrendingUp}
            label="TEAM UTILIZATION"
            value={`${stats.teamUtilization}%`}
            color="text-green-600"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search employee..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">All Departments</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="inline-flex rounded-lg bg-gray-100 p-1">
              {[
                { key: "all", label: "All" },
                { key: "pending", label: "Pending" },
                { key: "approved", label: "Approved" },
                { key: "rejected", label: "Rejected" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${
                    statusFilter === key
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {label}
                  {statusFilter === key && (
                    <span className="ml-1 text-gray-500">
                      (
                      {key === "all"
                        ? timesheets.length
                        : timesheets.filter((u) => u.status === key).length}
                      )
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedItems.length === paginatedTimesheets.length &&
                        paginatedTimesheets.length > 0
                      }
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Hours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTimesheets.length > 0 ? (
                  paginatedTimesheets.map((timesheet) => (
                    <tr key={timesheet.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(timesheet.id)}
                          onChange={() => handleSelectItem(timesheet.id)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={timesheet.avatar}
                            alt={timesheet.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div
                              className="font-medium text-gray-900 cursor-pointer"
                              onClick={handleNavigate}
                            >
                              {timesheet.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {timesheet.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {timesheet.period}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {timesheet.projects.map((project, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded text-xs font-medium ${getProjectColor(
                                idx
                              )}`}
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {timesheet.totalHours}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusColor(
                            timesheet.status
                          )}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {timesheet.status.charAt(0).toUpperCase() +
                            timesheet.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sky-600 hover:text-sky-800 text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No timesheets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredTimesheets.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredTimesheets.length)}{" "}
                of {filteredTimesheets.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      currentPage === idx + 1
                        ? "bg-sky-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
