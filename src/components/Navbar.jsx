import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Bell, Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold">Timesheet Manager</h1>
            </div>
            <div className="hidden md:flex gap-1">
              <Button variant="ghost" className="text-gray-600">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-blue-600 font-medium">
                Timesheets
              </Button>
              <Button variant="ghost" className="text-gray-600">
                Team
              </Button>
              <Button variant="ghost" className="text-gray-600">
                Reports
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                className="pl-9 w-64 bg-gray-50 border-gray-200"
                placeholder="Search..."
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-200"
            >
              <Bell className="h-5 w-5 text-gray-600 fill" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-orange-100"
            >
              <User className="h-5 w-5 text-orange-600" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;