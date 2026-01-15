import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TimeSheetApproval from "./components/Approvals/TimeSheetApproval";
import TimeTracker from "./components/TimeTracker/TimeTracker";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TimeSheetApproval />} />
        <Route path="/tracker" element={<TimeTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;