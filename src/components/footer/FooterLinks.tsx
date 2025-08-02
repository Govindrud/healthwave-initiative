
import React from 'react';
import { Link } from 'react-router-dom';

const FooterLinks = () => {
  return (
    <>
      {/* Quick Links */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
        <ul className="space-y-2 text-meant-200">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
          <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
          <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Services</h3>
        <ul className="space-y-2 text-meant-200">
          <li><Link to="/surender" className="hover:text-white transition-colors">Surender</Link></li>
          <li><Link to="/de-addiction" className="hover:text-white transition-colors">De-addiction</Link></li>
          <li><Link to="/spirituality" className="hover:text-white transition-colors">Spiritual Resources</Link></li>
          <li><Link to="/doctors" className="hover:text-white transition-colors">Doctor Consultations</Link></li>
          <li><Link to="/student-psychologists" className="hover:text-white transition-colors">Student Psychologists</Link></li>
        </ul>
      </div>

      {/* Corporate */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Corporate</h3>
        <ul className="space-y-2 text-meant-200">
          <li><Link to="/corporate-plans" className="hover:text-white transition-colors">Corporate Plans</Link></li>
          <li><Link to="/corporate-certification" className="hover:text-white transition-colors">Corporate Certification</Link></li>
          <li><Link to="/webinars" className="hover:text-white transition-colors">Webinars</Link></li>
          <li><Link to="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
        </ul>
      </div>
    </>
  );
};

export default FooterLinks;
