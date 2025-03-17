
import { Heart, Mail, MapPin, Phone, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-meant-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-meant-300 to-meant-500">
              MeantToHelp
            </h3>
            <p className="text-meant-200 mb-4">
              Connecting mental health challenges with innovative solutions through collaboration and community.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-meant-800 flex items-center justify-center hover:bg-meant-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-meant-800 flex items-center justify-center hover:bg-meant-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-meant-800 flex items-center justify-center hover:bg-meant-700 transition-colors"
                aria-label="Github"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About", "Solutions", "Contribute", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-meant-300 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-meant-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-meant-300">
                  1234 Innovation Way<br />
                  San Francisco, CA 94103
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-meant-400 mr-2 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-meant-300 hover:text-white transition-colors">
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-meant-400 mr-2 flex-shrink-0" />
                <a href="mailto:info@meanttohelp.com" className="text-meant-300 hover:text-white transition-colors">
                  info@meanttohelp.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-meant-300 mb-3">
              Subscribe to our newsletter for the latest mental health resources and updates.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Your email" 
                className="bg-meant-800 border-meant-700 text-white placeholder:text-meant-400"
              />
              <Button className="bg-meant-600 hover:bg-meant-500 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-meant-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-meant-400 text-sm mb-4 md:mb-0">
              © {currentYear} MeantToHelp. All rights reserved.
            </p>
            <p className="text-meant-400 text-sm flex items-center">
              Made with <Heart size={14} className="text-meant-500 mx-1" /> for mental wellness
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
