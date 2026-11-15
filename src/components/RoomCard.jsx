import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function RoomCard({ room }) {
  const navigate = useNavigate();

  const handleEnquire = () => {
    // Navigate directly to contact page as requested
    navigate('/contact');
  };

  return (
    <article className="group bg-white rounded-none border border-[#E7E0D0] overflow-hidden shadow-sm hover:shadow-elevated transition-all duration-500 flex flex-col h-full">
      {/* Image Container with Elegant Hover Zoom */}
      <div className="relative aspect-[16/11] overflow-hidden bg-[#FAF8F5]">
        <img
          src={room.featuredImage}
          alt={room.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#FAF8F5]/95 backdrop-blur-md text-[#23392E] text-[10px] font-semibold tracking-[0.2em] uppercase shadow-xs">
            {room.category}
          </span>
        </div>
      </div>

      {/* Content Area — Clean, Minimal, Luxury Presentation */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Room Name */}
          <h3 className="font-serif text-2xl font-semibold text-[#23392E] group-hover:text-[#517B65] transition-colors mb-2.5">
            {room.name}
          </h3>

          {/* Short Elegant Description */}
          <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans line-clamp-3">
            {room.shortDescription}
          </p>
        </div>

        {/* Action Button: Enquire Now — Navigates to /contact */}
        <div className="pt-4 border-t border-[#E7E0D0]/70">
          <button
            onClick={handleEnquire}
            className="w-full py-3 bg-[#517B65] hover:bg-[#385848] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:shadow-md"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}
