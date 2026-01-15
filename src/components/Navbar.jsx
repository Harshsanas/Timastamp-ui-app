import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Bell, Search, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isTracker = pathname === "/tracker";

  const pageTitleMap = {
    "/": "Timesheet Manager",
    "/tracker": "Time Tracker",
  };

  const heading = pageTitleMap[pathname] || "Timesheet Manager";

  const handleNavigate = () => {
    navigate("/");
  };

  const MenuItems = () => (
    <>
      <Button variant="ghost" className="text-gray-600">
        Dashboard
      </Button>
      <Button
        variant="ghost"
        onClick={handleNavigate}
        className="text-sky-600 cursor-pointer"
      >
        Timesheets
      </Button>
      <Button variant="ghost" className="text-gray-600">
        Team
      </Button>
      <Button variant="ghost" className="text-gray-600">
        Reports
      </Button>
    </>
  );

  return (
    <nav className="bg-white border-b">
      <div className="mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-semibold">{heading}</h1>
            </div>

            {!isTracker && (
              <div className="hidden md:flex gap-1">
                <MenuItems />
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            {!isTracker && (
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9 w-64 bg-gray-50 border-gray-200"
                  placeholder="Search..."
                />
              </div>
            )}
            {isTracker && (
              <div className="hidden md:flex gap-1">
                <MenuItems />
              </div>
            )}

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
