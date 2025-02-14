// Header.jsx
import { Link } from 'react-router-dom';
import { HiUserCircle } from 'react-icons/hi';

const Header = ({ onLogout }) => {
  return (
    <header className="bg-gray-900 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Section - Project Name */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-white">
            MedScan AI {/* Replace with your project name */}
          </h1>
        </div>

        {/* Right Section - Navigation + Profile */}
        <div className="flex items-center gap-6"> {/* Reduced spacing */}
          <div className="hidden md:flex gap-4"> {/* Reduced gap */}
            <Link 
              to="/dashboard" 
              className="px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/contribute" 
              className="px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Contribute Images
            </Link>
          </div>
          
          <div className="flex items-center gap-2"> {/* Tight spacing */}
            <Link 
              to="/profile" 
              className="p-1 hover:bg-gray-800 rounded-full transition-colors duration-200"
            >
              <HiUserCircle className="w-7 h-7 text-gray-300" />
            </Link>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;