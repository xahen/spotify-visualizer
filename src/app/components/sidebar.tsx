"use client";

import { useState } from "react";
import { FaBars, FaX, FaHouse, FaChartLine } from "react-icons/fa6";

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`h-screen bg-gray-900 flex flex-col transition-all duration-250 ${
        expanded ? "w-64" : "w-16"
      } `}
    >
      <div className="top-0 h-16 w-16 flex">
        <div className="m-auto">
          {!expanded && <FaBars size={35} onClick={() => setExpanded(true)} />}
          {expanded && <FaX size={35} onClick={() => setExpanded(false)} />}
        </div>
      </div>
      <div className="h-full w-16 flex flex-col">
        <div className="m-auto">
          <FaHouse size={35} />
        </div>
        <div className="m-auto">
          <FaChartLine size={35} />
        </div>
      </div>
    </div>
  );
};
