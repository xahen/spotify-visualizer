"use client";

import { useState } from "react";
import { FaBars, FaX, FaHouse, FaChartLine, FaClock } from "react-icons/fa6";

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`h-screen bg-gray-900 flex flex-col transition-all duration-250 ${
        expanded ? "w-64" : "w-16"
      } `}
    >
      <div className="top-0 h-16 w-16 flex hover:bg-white/20">
        <div className="m-auto">
          {!expanded && <FaBars size={35} onClick={() => setExpanded(true)} />}
          {expanded && <FaX size={35} onClick={() => setExpanded(false)} />}
        </div>
      </div>
      <div className="h-full w-16 flex flex-col">
        <div className="h-16 w-64 flex hover:bg-white/20">
          <div className="h-16 w-16 flex">
            <FaHouse className="m-auto" size={35} />
          </div>
          {expanded && (
            <div className="flex h-16 w-fit">
              <p className="ml-2 m-auto text-2xl">Home</p>
            </div>
          )}
        </div>
        <div className="h-16 w-64 flex hover:bg-white/20">
          <div className="h-16 w-16 flex">
            <FaChartLine className="m-auto" size={35} />
          </div>
          {expanded && (
            <div className="flex h-16 w-fit">
              <p className="ml-2 m-auto text-2xl">Statistics</p>
            </div>
          )}
        </div>
        <div className="h-16 w-64 flex hover:bg-white/20">
          <div className="h-16 w-16 flex">
            <FaClock className="m-auto" size={35} />
          </div>
          {expanded && (
            <div className="flex h-16 w-fit">
              <p className="ml-2 m-auto text-2xl">Historic</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
