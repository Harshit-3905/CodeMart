import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4">
              <div className="flex-shrink-0 flex items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Admin Dashboard
                </h2>
              </div>
              <Link
                to="/dashboard/products"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Products
              </Link>
              <Link
                to="/dashboard/categories"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Categories
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
