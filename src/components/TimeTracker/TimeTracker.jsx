import React, { useState } from "react";
import {
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Bell,
  Clipboard,
  DollarSign,
  Coffee,
  Trash2,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TimeTracker = () => {
  const [selectedWeek, setSelectedWeek] = useState("January 15, 2025");
  const [projects, setProjects] = useState([
    {
      name: "Website Redesign",
      task: "Frontend Dev",
      hours: {
        mon: 8.0,
        tue: 8.0,
        wed: 8.0,
        thu: 8.0,
        fri: 8.0,
        sat: null,
        sun: null,
      },
      total: 40.0,
    },
    {
      name: "Internal Ops",
      task: "Team Meeting",
      hours: {
        mon: 1.0,
        tue: null,
        wed: 1.0,
        thu: null,
        fri: null,
        sat: null,
        sun: null,
      },
      total: 2.0,
    },
  ]);

  const dailyTotals = {
    mon: 9.0,
    tue: 8.0,
    wed: 9.0,
    thu: 8.0,
    fri: 8.0,
    sat: null,
    sun: null,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span>Home</span>
          <span>/</span>
          <span>Timesheets</span>
          <span>/</span>
          <span className="text-sky-600">Weekly Entry</span>
        </div>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Weekly Timesheet
            </h1>
            <p className="text-gray-600">
              Manage your hours for the current week.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <Calendar className="w-4 h-4 text-sky-600" />
              <span className="font-medium text-gray-900">{selectedWeek}</span>
            </div>
            <Button variant="outline" size="icon">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline">Today</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">TOTAL HOURS</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-sky-600">
                      42.0
                    </span>
                    <span className="text-sm text-gray-500">
                      / 40.0 Expected
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full mt-3">
                    <div
                      className="bg-sky-600 h-1 rounded-full"
                      style={{ width: "105%" }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-sky-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">BILLABLE</p>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    35.0
                  </div>
                  <p className="text-sm text-gray-500">83% of total hours</p>
                </div>
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">NON-BILLABLE</p>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    7.0
                  </div>
                  <p className="text-sm text-gray-500">
                    Internal meetings & Admin
                  </p>
                </div>
                <Coffee className="w-6 h-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 w-[250px]">
                      PROJECT / TASK
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px]">
                      <div>Mon</div>
                      <div className="font-normal text-xs text-gray-500">
                        23
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px]">
                      <div>Tue</div>
                      <div className="font-normal text-xs text-gray-500">
                        24
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px] bg-sky-50">
                      <div>Wed</div>
                      <div className="font-normal text-xs text-gray-500">
                        25
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px]">
                      <div>Thu</div>
                      <div className="font-normal text-xs text-gray-500">
                        26
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px]">
                      <div>Fri</div>
                      <div className="font-normal text-xs text-gray-500">
                        27
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px]">
                      <div>Sat</div>
                      <div className="font-normal text-xs text-gray-500">
                        28
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px]">
                      <div>Sun</div>
                      <div className="font-normal text-xs text-gray-500">
                        29
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 w-[100px]">
                      TOTAL
                    </th>
                    <th className="w-[50px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, idx) => (
                    <React.Fragment key={idx}>
                      <tr className="">
                        <td className="py-4 px-4">
                          <Select
                            defaultValue={project.name
                              .toLowerCase()
                              .replace(" ", "-")}
                          >
                            <SelectTrigger className="w-full border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website-redesign">
                                Website Redesign
                              </SelectItem>
                              <SelectItem value="internal-ops">
                                Internal Ops
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="text"
                            value={project.hours.mon || ""}
                            className="w-full text-center border border-gray-300 rounded-md px-2 py-2 text-sm focus:border-sky-500 focus:outline-none"
                            placeholder="-"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="text"
                            value={project.hours.tue || ""}
                            className="w-full text-center border border-gray-300 rounded-md px-2 py-2 text-sm focus:border-sky-500 focus:outline-none"
                            placeholder="-"
                          />
                        </td>
                        <td className="text-center py-4 px-4 bg-sky-50">
                          <input
                            type="text"
                            value={project.hours.wed || ""}
                            className="w-full text-center border-2 border-sky-500 rounded-md px-2 py-2 text-sm bg-white focus:outline-none"
                            placeholder="-"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="text"
                            value={project.hours.thu || ""}
                            className="w-full text-center border border-gray-300 rounded-md px-2 py-2 text-sm focus:border-sky-500 focus:outline-none"
                            placeholder="-"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="text"
                            value={project.hours.fri || ""}
                            className="w-full text-center border border-gray-300 rounded-md px-2 py-2 text-sm focus:border-sky-500 focus:outline-none"
                            placeholder="-"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="text"
                            value={project.hours.sat || ""}
                            className="w-full text-center border border-gray-300 rounded-md px-2 py-2 text-sm focus:border-sky-500 focus:outline-none"
                            placeholder="-"
                          />
                        </td>
                        <td className="text-center py-4 px-4">
                          <input
                            type="text"
                            value={project.hours.sun || ""}
                            className="w-full text-center border border-gray-300 rounded-md px-2 py-2 text-sm focus:border-sky-500 focus:outline-none"
                            placeholder="-"
                          />
                        </td>
                        <td className="text-center py-4 px-4 font-semibold text-gray-900">
                          {project.total}
                        </td>
                        <td className="text-center py-4 px-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2 px-4 pb-4">
                          <Select
                            defaultValue={project.task
                              .toLowerCase()
                              .replace(" ", "-")}
                          >
                            <SelectTrigger className="w-full border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="frontend-dev">
                                Frontend Dev
                              </SelectItem>
                              <SelectItem value="team-meeting">
                                Team Meeting
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td colSpan={9}></td>
                      </tr>
                    </React.Fragment>
                  ))}

                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4">
                      <Select>
                        <SelectTrigger className="w-full border-dashed border-gray-300">
                          <SelectValue placeholder="Select Project..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-project">
                            New Project
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td
                      colSpan={8}
                      className="text-center text-sm text-gray-400 italic"
                    >
                      Start by selecting a project to add a new row
                    </td>
                    <td className="text-center py-4 px-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </Button>
                    </td>
                  </tr>

                  <tr className="bg-gray-50 font-semibold">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      DAILY TOTALS
                    </td>
                    <td className="text-center py-3 px-4 text-gray-900">
                      {dailyTotals.mon}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-900">
                      {dailyTotals.tue}
                    </td>
                    <td className="text-center py-3 px-4 bg-sky-50 text-gray-900">
                      {dailyTotals.wed}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-900">
                      {dailyTotals.thu}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-900">
                      {dailyTotals.fri}
                    </td>
                    <td className="text-center py-3 px-4 text-gray-900">-</td>
                    <td className="text-center py-3 px-4 text-gray-900">-</td>
                    <td className="text-center py-3 px-4 text-sky-600 text-lg">
                      42.0
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                className="gap-2 cursor-pointer border border-sky-500 text-sky-500 hover:text-sky-600"
              >
                <Plus className="w-4 h-4" />
                Add New Row
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">Last saved: Today at 2:30 PM</p>
          <div className="flex gap-3">
            <Button variant="outline">Save Draft</Button>
            <Button className="bg-sky-600 hover:bg-sky-700 gap-2">
              <Check className="w-4 h-4" />
              Submit for Approval
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimeTracker;
