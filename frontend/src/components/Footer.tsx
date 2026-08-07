import { Link } from 'react-router-dom';
import { Stethoscope, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-xl">
                <Stethoscope className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Dr. <span className="text-primary">Jonathan</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Providing premium, compassionate, and cutting-edge medical care to help you live a healthier, happier life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Departments</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Neurology</li>
              <li>Cardiology</li>
              <li>Orthopedics</li>
              <li>Pediatrics</li>
              <li>General Medicine</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary w-5 h-5 shrink-0 mt-1" />
                <span>123 Medical Center Drive, Suite 500, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary w-5 h-5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary w-5 h-5 shrink-0" />
                <span>contact@drjonathan.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Dr. Jonathan Medical Practice. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
