import React from "react";
import { Link, Outlet } from "react-router-dom"; // Use Outlet for nested routing
import Logout from "./Logout";

const Navbar = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div className="bg-gradient-to-r from-pink-500 to-violet-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex space-x-6">
          <Link to="/home/home" className="text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
            Home
          </Link>
          <Link to="/templates" className="text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
            Templates
          </Link>
          <Link to="/home/addclient" className="text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
            Add Client
          </Link>
        </div>
        <Logout />
      </div>

      {/* Main Layout with Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="bg-gradient-to-b from-blue-500 to-blue-900 w-64 p-4 flex-shrink-0">
          <ul className="space-y-4">
            <li>
              <Link to="/home/dehome" className="block text-white px-4 py-2 rounded-md hover:bg-blue-300 transition-colors">
                Design Engineering
              </Link>
            </li>
            <li>
              <Link to="/home/pmchome" className="block text-white px-4 py-2 rounded-md hover:bg-blue-300 transition-colors">
                PMC
              </Link>
            </li>
            <li>
              <Link to="/home/pbhome" className="block text-white px-4 py-2 rounded-md hover:bg-blue-300 transition-colors">
                Pre Bid
              </Link>
            </li>
            <li>
              <Link to="/home/omhome" className="block text-white px-4 py-2 rounded-md hover:bg-blue-300 transition-colors">
                Operational Management
              </Link>
            </li>
            <li>
              <Link to="/home/kmhome" className="block text-white px-4 py-2 rounded-md hover:bg-blue-300 transition-colors">
                Knowledge Management
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 bg-gradient-to-r from-blue-200 to-blue-300 p-4 overflow-auto">
          {/* Render nested routes here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;