import { useState } from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  // Updated navigation items removing Electric Fields
  const navItems = [
    { name: "Introduction", path: "/#introduction" },
    { name: "Objectives", path: "/#objectives" },
    { name: "Electric Charge", path: "/#concepts" },
    { name: "Coulomb's Law", path: "/#applications" },
    { name: "Tools", path: "/#tools" },
    { name: "References", path: "/#references" },
    { name: "About", path: "/#about" }
  ];

  return (
    <header className="bg-gradient-to-r from-card to-card/90 text-white sticky top-0 z-50 shadow-lg border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <Link href="/" className="font-header font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ElectricCharges
          </Link>
        </div>
        
        {/* Redesigned navigation */}
        <nav className="hidden md:flex">
          <div className="flex bg-muted/40 backdrop-blur-sm p-1 rounded-full border border-border/40">
            {navItems.map((item, index) => (
              <a 
                key={item.name}
                href={item.path} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive(item.path) 
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md" 
                    : "text-white hover:bg-muted"
                } ${index > 0 ? "ml-1" : ""}`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
        
        <button 
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
      
      {/* Improved mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-card/95 backdrop-blur-sm border-t border-primary/20`}>
        <div className="px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.path} 
              className={`block px-4 py-2 rounded-lg hover:bg-muted transition-colors ${
                isActive(item.path) 
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-white font-medium" 
                  : "text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
