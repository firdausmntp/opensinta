import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Home,
  BarChart3,
  BookOpen,
  Calculator,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/visualisasi", label: "Visualisasi", icon: BarChart3 },
    { path: "/kalkulasi", label: "Kalkulasi", icon: Calculator },
    { path: "/tutorial", label: "Tutorial", icon: BookOpen },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <img
                  src={import.meta.env.BASE_URL + "opensinta.png"}
                  alt="OpenSinta Logo"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-200/50 shadow-md"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-xl font-bold hidden sm:block">
                <span className="text-red-800">Open</span>
                <span className="text-blue-800">SINTA</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path} className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}

                    {/* Coming Soon Badge untuk kalkulasi */}
                    {item.path === "/kalkulasi" && (
                      <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse">
                        Soon
                      </span>
                    )}
                  </motion.div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={
            isMobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>

                    {/* Coming Soon Badge untuk Mobile */}
                    {item.path === "/kalkulasi" && (
                      <span className="ml-auto bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse">
                        Soon
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Subtle border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </motion.nav>
  );
};

export default Navbar;
