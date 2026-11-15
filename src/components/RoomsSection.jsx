import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function RoomsSection() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Column 1 Photos
  const column1Photos = [
    {
      id: "deluxe-double",
      title: "Deluxe Double Cottage",
      aspect: "aspect-[4/3]",
      image: "/images/resort/photo_29.jpg",
      caption: "Deluxe Double Cottage • Garden Sit-Out",
      slug: "deluxe-double-room"
    },
    {
      id: "courtyard-patio",
      title: "Private Courtyard Veranda",
      aspect: "aspect-[1/1]",
      image: "/images/resort/photo_24.jpg",
      caption: "Cottage Patio • 13-Acre Greenery",
      slug: "deluxe-double-room"
    },
    {
      id: "deluxe-single",
      title: "Deluxe Single Garden Cottage",
      aspect: "aspect-[4/3]",
      image: "/images/resort/photo_34.jpg",
      caption: "Deluxe Single Cottage • Nature View",
      slug: "deluxe-single-room"
    },
    {
      id: "poolside-cottage",
      title: "Freeform Poolside Cottage",
      aspect: "aspect-[1/1]",
      image: "/images/resort/photo_22.jpg",
      caption: "Poolside Cottage • Palm Canopies",
      slug: "superior-double-room"
    }
  ];

  // Column 2 Photos (staggered and taller cards matching Vivanta)
  const column2Photos = [
    {
      id: "superior-double",
      title: "Superior Double Suite",
      aspect: "aspect-[3/4]",
      image: "/images/resort/photo_30.jpg",
      caption: "Superior Double Suite • Lotus Vista",
      slug: "superior-double-room"
    },
    {
      id: "deluxe-bathtub",
      title: "Deluxe Bathtub Sanctuary",
      aspect: "aspect-[4/3]",
      image: "/images/resort/photo_20.jpg",
      caption: "Deluxe Bathtub Cottage • Private Soak",
      slug: "deluxe-bathtub-room"
    },
    {
      id: "lotus-suite",
      title: "Lotus Pond Garden Suite",
      aspect: "aspect-[3/4]",
      image: "/images/resort/photo_28.jpg",
      caption: "Lotus Pond Suite • Teak Furnishings",
      slug: "superior-double-room"
    },
    {
      id: "nature-retreat",
      title: "Executive Nature Cottage",
      aspect: "aspect-[4/3]",
      image: "/images/resort/photo_23.jpg",
      caption: "Executive Nature Cottage • Veranda",
      slug: "deluxe-single-room"
    }
  ];

  // Duplicate items for continuous seamless loop
  const col1Items = [...column1Photos, ...column1Photos];
  const col2Items = [...column2Photos, ...column2Photos];

  return (
    <section id="rooms" className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-[#E7E0D0]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Narrative + Dual Buttons in Bottom Space */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#517B65]" />
                <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#517B65]">
                  ACCOMMODATIONS
                </span>
              </div>

              {/* Vivanta-inspired Grand Typography Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#23392E] tracking-tight leading-[1.12] mb-4">
                Designed For Those <br />
                <span className="italic font-light text-[#517B65]">Who Seek Serenity</span>
              </h2>

              {/* Editorial Description */}
              <p className="text-xs sm:text-sm md:text-base text-[#23392E]/80 leading-relaxed font-sans mb-6">
                At The Meadows, relaxation is woven into every detail. Thoughtfully crafted cottage accommodations nestled amidst 13 acres of verdant greenery offer private sit-outs, warm teak furnishings, and calm garden views. Whether you are unwinding after exploring the rock-cut marvels of Ellora Caves or retreating for a romantic weekend escape, our cottages invite you to breathe fresh air and embrace tranquil hospitality.
              </p>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2 border-t border-[#E7E0D0]">
                {[
                  "Independent cottage entries with private garden patios",
                  "Surrounded by centenary trees and indigenous birdsong",
                  "Whisper-quiet climate control & handcrafted teak finishes"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#23392E]/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#517B65] flex-shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EMPTY SPACE ON LEFT BOTTOM: Special Offers & Contact Us Buttons */}
            <div className="pt-6 sm:pt-8 border-t border-[#E7E0D0]/80">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  to="/offers"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#517B65] text-white hover:bg-[#385848] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm text-center"
                >
                  <span>EXPLORE SPECIAL OFFERS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-[#517B65] text-[#517B65] hover:bg-[#517B65] hover:text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-sm text-center"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-[11px] text-[#23392E]/60 italic mt-3 font-sans">
                Direct reservations support available 24/7 for all cottage bookings.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Two Vertical Columns of Photos Moving Vertically on Mouse Hover */}
          <div
            className="lg:col-span-7 relative h-[560px] sm:h-[620px] lg:h-[660px] overflow-hidden rounded-none border border-[#E7E0D0] bg-[#FAF8F5] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {/* Soft gradient masks top and bottom for seamless depth */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

            <div className="grid grid-cols-2 gap-4 sm:gap-5 px-3 sm:px-4 h-full">
              
              {/* COLUMN 1 — Glides vertically downwards when hovered */}
              <div
                className="flex flex-col gap-4 sm:gap-5 will-change-transform animate-vertical-down"
                style={{
                  animationDuration: '24s',
                  animationPlayState: isHovered ? 'running' : 'paused'
                }}
              >
                {col1Items.map((photo, index) => (
                  <div
                    key={`${photo.id}-${index}`}
                    onClick={() => navigate('/contact')}
                    className="group relative overflow-hidden bg-white border border-[#E7E0D0] shadow-sm hover:shadow-elevated transition-all duration-300 select-none flex-shrink-0"
                  >
                    <div className={`${photo.aspect} overflow-hidden relative`}>
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      
                      {/* Underlined Caption like in Vivanta reference */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <span className="font-serif text-xs sm:text-sm font-medium text-white block drop-shadow-sm pb-1 border-b border-white/60 group-hover:border-white transition-colors">
                          {photo.caption}
                        </span>
                        <span className="text-[9px] tracking-wider uppercase text-[#E7E0D0] opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center gap-1 font-sans">
                          <span>Click to Enquire</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* COLUMN 2 — Glides vertically upwards when hovered in opposite direction */}
              <div
                className="flex flex-col gap-4 sm:gap-5 will-change-transform animate-vertical-up"
                style={{
                  animationDuration: '24s',
                  animationPlayState: isHovered ? 'running' : 'paused'
                }}
              >
                {col2Items.map((photo, index) => (
                  <div
                    key={`${photo.id}-${index}`}
                    onClick={() => navigate('/contact')}
                    className="group relative overflow-hidden bg-white border border-[#E7E0D0] shadow-sm hover:shadow-elevated transition-all duration-300 select-none flex-shrink-0"
                  >
                    <div className={`${photo.aspect} overflow-hidden relative`}>
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      
                      {/* Underlined Caption like in Vivanta reference */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <span className="font-serif text-xs sm:text-sm font-medium text-white block drop-shadow-sm pb-1 border-b border-white/60 group-hover:border-white transition-colors">
                          {photo.caption}
                        </span>
                        <span className="text-[9px] tracking-wider uppercase text-[#E7E0D0] opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center gap-1 font-sans">
                          <span>Click to Enquire</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Subtle Interactive Status Indicator */}
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] text-white/90 tracking-wider uppercase font-medium flex items-center gap-1.5 shadow-sm border border-white/10">
                <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-emerald-400 animate-pulse' : 'bg-white/60'}`} />
                <span>{isHovered ? 'Moving Vertically' : 'Hover To Move'}</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
