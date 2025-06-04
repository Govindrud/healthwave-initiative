
import React from 'react';
import CrisisActionButtons from './footer/CrisisActionButtons';
import CompanyInfo from './footer/CompanyInfo';
import FooterLinks from './footer/FooterLinks';
import ContactInfo from './footer/ContactInfo';
import FooterBottom from './footer/FooterBottom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-meant-800 to-meant-900 text-white relative">
      {/* Crisis Action Bar */}
      <CrisisActionButtons />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info with Logo */}
          <CompanyInfo />

          {/* Footer Links */}
          <FooterLinks />
        </div>

        {/* Contact Info */}
        <ContactInfo />

        {/* Footer Bottom */}
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
