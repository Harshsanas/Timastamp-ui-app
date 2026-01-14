import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bell,
  Search,
  User,
  Download,
  CheckCheck,
  Clock,
  TrendingUp,
  ClipboardPlus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ChevronDown,
  Plus,
  Trash2,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS = ["pending", "approved", "rejected", "na"];

const PAGE_SIZE = 10;

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <Icon className={`h-5 w-5 ${color}`} />
      <span className={`text-sm font-medium ${color}`}>{label}</span>
    </div>

    <div className="text-3xl font-bold text-gray-900">{value}</div>
  </div>
);

export default function TimeSheetApproval() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((u, i) => ({
          ...u,
          status: STATUS[Math.floor(Math.random() * STATUS.length)],
          period: i % 2 === 0 ? "Oct 1 - Oct 7, 2023" : "Sep 24 - Sep 30, 2023",
          project: [
            "Project Alpha",
            "Website Redesign",
            "Q4 Campaign",
            "Infra Migration",
          ][i % 4],
          hours: (35 + Math.random() * 15).toFixed(2),
          role: [
            "Software Engineer",
            "Product Designer",
            "Frontend Dev",
            "Marketing Lead",
            "DevOps Engineer",
          ][i % 5],
        }));
        setUsers(enriched);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || u.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [users, search, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  const StatusBadge = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case "approved":
          return "bg-green-100 text-green-800";
        case "rejected":
          return "bg-red-100 text-red-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
      >
        {status.toUpperCase()}
      </span>
    );
  };

  const statusCounts = {
    all: users.length,
    pending: users.filter((u) => u.status === "pending").length,
    approved: users.filter((u) => u.status === "approved").length,
    rejected: users.filter((u) => u.status === "rejected").length,
  };


  return (
    <div className="p-6 space-y-4 bg-gray-50">
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
          <Button
            variant="outline"
            className="cursor-pointer border border-gray-300"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>

          <Button className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white">
            <CheckCheck className="h-4 w-4" />
            Approve All Selected
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={ClipboardPlus}
          label="TOTAL PENDING"
          value="12"
          color="text-orange-600"
        />
        <StatCard
          icon={Clock}
          label="HOURS TO REVIEW"
          value="480 hrs"
          color="text-sky-600"
        />
        <StatCard
          icon={TrendingUp}
          label="TEAM UTILIZATION"
          value="92%"
          color="text-green-600"
        />
      </div>

      <div className="bg-white rounded-lg p-2 shadow-sm">
        <div className="p-4 flex items-center gap-4">
          <div className="relative w-full max-w-sm flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search employee..."
                className="pl-9 border-gray-200"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 px-3 border-gray-200"
                >
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">All Department</span>

                  <ChevronDown className="h-4 w-4 cursor-pointer text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="z-50 min-w-[180px] bg-white border shadow-md rounded-md p-1"
              >
                <DropdownMenuItem
                  className="cursor-pointer bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-600"
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-600"
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-600"
                  onClick={() => setStatusFilter("approved")}
                >
                  Approved
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-600"
                  onClick={() => setStatusFilter("rejected")}
                >
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="ml-auto">
            <div className="inline-flex rounded-lg bg-gray-100 p-1 border-gray-200">
              {[
                { key: "all", label: "All" },
                { key: "pending", label: "Pending" },
                { key: "approved", label: "Approved" },
                { key: "rejected", label: "Rejected" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => {
                    setStatusFilter(key);
                    setPage(1);
                  }}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all
          ${
            statusFilter === key
              ? "bg-white text-gray-900 shadow-sm cursor-pointer"
              : "text-gray-600 hover:text-gray-900 cursor-pointer"
          }`}
                >
                  {label}
                  {statusFilter === key && (
                    <span className="ml-1 text-gray-500">
                      (
                      {key === "all"
                        ? users.length
                        : users.filter((u) => u.status === key).length}
                      )
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {index + 1 + (page - 1) * PAGE_SIZE}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        History
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Total Users: {filteredUsers.length}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
