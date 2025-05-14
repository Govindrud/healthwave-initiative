
import React from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingBag, Users, Phone, MoveRight } from "lucide-react";
import { MobileDropdown } from "../MobileDropdown";

interface MainNavLinksProps {
  onClose: () => void;
}

const MainNavLinks: React.FC<MainNavLinksProps> = ({ onClose }) => {
  return (
    <nav className="p-2">
      <Link 
        to="/" 
        className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
        onClick={onClose}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>
      
      <MobileDropdown title="Services">
        <Link 
          to="/doctors" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Doctor Consultations
        </Link>
        <Link 
          to="/spirituality" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Spiritual Guidance
        </Link>
        <Link 
          to="/student-psychologists" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Student Psychologists
        </Link>
        <Link 
          to="/activities" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Wellness Activities
        </Link>
        <Link 
          to="/de-addiction" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Addiction Recovery
        </Link>
        <Link 
          to="/services" 
          className="block py-2 px-2 rounded hover:bg-gray-50 font-medium text-meant-700 mt-2" 
          onClick={onClose}
        >
          <div className="flex items-center gap-1">
            <span>View All Services</span>
            <MoveRight size={16} />
          </div>
        </Link>
      </MobileDropdown>
      
      <MobileDropdown title="Products">
        <Link 
          to="/products" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          All Products
        </Link>
        <Link 
          to="/products?category=books" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Self-Help Books
        </Link>
        <Link 
          to="/products?category=meditation" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Meditation Tools
        </Link>
        <Link 
          to="/products?category=aromatherapy" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Aromatherapy
        </Link>
        <Link 
          to="/cart" 
          className="block py-2 px-2 rounded hover:bg-gray-50 font-medium text-meant-700 mt-2" 
          onClick={onClose}
        >
          <div className="flex items-center gap-1">
            <span>View Cart</span>
            <ShoppingBag size={16} />
          </div>
        </Link>
      </MobileDropdown>
      
      <MobileDropdown title="Corporate">
        <Link 
          to="/corporate-plans" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Corporate Wellness Plans
        </Link>
        <Link 
          to="/corporate-plans#assistance" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Employee Assistance
        </Link>
        <Link 
          to="/corporate-certification" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Corporate Certifications
        </Link>
        <Link 
          to="/webinars" 
          className="block py-2 px-2 rounded hover:bg-gray-50" 
          onClick={onClose}
        >
          Workshops & Webinars
        </Link>
      </MobileDropdown>
      
      <Link 
        to="/about" 
        className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
        onClick={onClose}
      >
        <Users size={20} />
        <span>About</span>
      </Link>
      
      <Link 
        to="/contact" 
        className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-100 text-meant-700"
        onClick={onClose}
      >
        <Phone size={20} />
        <span>Contact</span>
      </Link>
    </nav>
  );
};

export default MainNavLinks;
