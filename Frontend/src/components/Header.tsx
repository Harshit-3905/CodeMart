import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4 min-h-[10vh]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CodeMart
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isLoggedIn ? (
              <li>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="bg-red-500 hover:bg-red-600"
                >
                  Logout
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signin">
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Sign In
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <Button className="bg-green-500 hover:bg-green-600">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
