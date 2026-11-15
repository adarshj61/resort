import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PhoneCall, ArrowRight, Sparkles } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { RESORT_INFO } from '../data/resortInfo';

export default function BookingCTA() {
  const { openEnquiry } = useBooking();

  return (
    <section className="relative py-20 lg:py-28 bg-[#E7E0D0] overflow-hidden border-t border-[#c5baa1]/40">
      {/* Decorative Botanical SVG Flourishes */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-15 pointer-events-none" aria-hidden="true">
        <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#517B65" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M100 20C70 60 50 100 50 140C50 168 72 180 100 180C128 180 150 168 150 140C150 100 130 60 100 20Z" fill="#517B65" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-[1px] bg-[#517B65]" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#517B65]">
            Plan Your Retreat
          </span>
          <span className="w-8 h-[1px] bg-[#517B65]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#23392E] tracking-tight leading-[1.15] mb-6">
          Your Escape Into Nature Awaits
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-[#23392E]/80 leading-relaxed font-sans mb-10">
          Make time for relaxation, meaningful experiences, and memorable moments at The Meadows Resort & Spa.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openEnquiry({ source: 'Final CTA: Book Your Stay' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#517B65] text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase shadow-lg hover:bg-[#385848] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Stay</span>
          </button>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FAF8F5] text-[#23392E] border border-[#517B65]/40 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-[#517B65] transition-all duration-300 shadow-sm"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Direct Call Subline */}
        <div className="mt-8 pt-6 border-t border-[#23392E]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#23392E]/70 font-sans">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-[#517B65]" />
            <span>Direct Reservations: <strong>{RESORT_INFO.phone.split('/')[0].trim()}</strong></span>
          </div>
          <span>•</span>
          <span>Chhatrapati Sambhajinagar, Maharashtra</span>
        </div>
      </div>
    </section>
  );
}

