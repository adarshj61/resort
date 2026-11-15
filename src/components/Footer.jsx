import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Compass } from 'lucide-react';
import Logo from './Logo';
import { RESORT_INFO } from '../data/resortInfo';
import { useBooking } from '../context/BookingContext';

export default function Footer() {
  const { openEnquiry } = useBooking();

  return (
    <footer className="relative bg-[#1d3126] text-white pt-20 pb-12 overflow-hidden border-t-4 border-[#517B65]">
      {/* Oversized Brand Typography Watermark - Treat Resorts Inspired */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span className="font-serif font-black text-[13vw] leading-none tracking-[0.25em] text-[#E7E0D0]/[0.045] uppercase whitespace-nowrap block">
          THE MEADOWS
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand & Overview (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="horizontal" theme="light" imgClassName="h-10 sm:h-11 max-w-[195px]" />
            <p className="text-[#E7E0D0]/80 text-sm leading-relaxed font-sans pr-4">
              A serene 13-acre sanctuary where nature, heritage, and luxurious hospitality harmonize. Located in Aurangabad (Chhatrapati Sambhajinagar), close to the historic Ellora Caves and Daulatabad Fort.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openEnquiry({ source: 'Footer CTA' })}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#517B65] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#E7E0D0] hover:text-[#1d3126] transition-all duration-300 shadow-sm"
              >
                <span>Plan Your Visit</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base tracking-[0.16em] uppercase text-[#E7E0D0] border-b border-[#517B65]/40 pb-2">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <Link to="/" className="text-white/75 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white/75 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/rooms" className="text-white/75 hover:text-white transition-colors">Rooms & Suites</Link>
              </li>
              <li>
                <Link to="/offers" className="text-white/75 hover:text-white transition-colors">Special Offers</Link>
              </li>
              <li>
                <Link to="/spa" className="text-white/75 hover:text-white transition-colors">Spa Moments</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/75 hover:text-white transition-colors">Contact & Enquire</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Experiences & Highlights (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base tracking-[0.16em] uppercase text-[#E7E0D0] border-b border-[#517B65]/40 pb-2">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider text-white/75">
              <li>
                <Link to="/rooms/deluxe-bathtub-room" className="hover:text-white transition-colors">Deluxe Bathtub Cottages</Link>
              </li>
              <li>
                <Link to="/spa" className="hover:text-white transition-colors">Ayurvedic Spa & Wellness</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Freshwater Swimming Pool</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Marmalade Lawn Dining</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">13-Acre Botanical Walks</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Destination Weddings & Events</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Heritage (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base tracking-[0.16em] uppercase text-[#E7E0D0] border-b border-[#517B65]/40 pb-2">
              Reach Us
            </h4>
            <ul className="space-y-3 text-xs text-[#E7E0D0]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#517B65] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Gut No. 136, Village Mitmita, Mumbai-Nashik Highway, Chhatrapati Sambhajinagar, Maharashtra 431002
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                <a href={`tel:${RESORT_INFO.phone.split('/')[0].trim()}`} className="hover:text-white transition-colors">
                  {RESORT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                <a href={`mailto:${RESORT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESORT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                <span>Check-in: 14:00 | Check-out: 12:00</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center space-x-3 text-white/70">
              <a
                href={RESORT_INFO.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#517B65] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESORT_INFO.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#517B65] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESORT_INFO.socialLinks.tripadvisor}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#517B65] hover:text-white flex items-center justify-center transition-colors"
                aria-label="TripAdvisor"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Area */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div className="text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} The Meadows Resort & Spa. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-[11px] tracking-wider">
            {/* ThinkBuild Attribution */}
            <span className="text-[#E7E0D0]/80 flex items-center gap-1 font-sans normal-case tracking-normal">
              <span>Designed and Maintained by</span>
              <a
                href="https://www.thinkbuild.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E7E0D0] hover:text-white font-semibold underline underline-offset-2 transition-colors"
              >
                ThinkBuild
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

