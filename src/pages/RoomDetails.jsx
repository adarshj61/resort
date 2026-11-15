import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Maximize2,
  Users,
  Bed,
  Eye,
  CheckCircle2,
  Sparkles,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Info,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { ROOMS_DATA } from '../data/rooms';
import { RESORT_INFO } from '../data/resortInfo';
import { useBooking } from '../context/BookingContext';
import BookingCTA from '../components/BookingCTA';
import Lightbox from '../components/Lightbox';

export default function RoomDetails() {
  const { slug } = useParams();
  const { openEnquiry } = useBooking();

  const room = ROOMS_DATA.find((r) => r.slug === slug);

  if (!room) {
    return <Navigate to="/rooms" replace />;
  }

  // Gallery & Lightbox
  const galleryItems = room.gallery.map((img, i) => ({
    id: i,
    image: img,
    title: `${room.name} - View ${i + 1}`,
    category: room.category
  }));

  const [activeImage, setActiveImage] = useState(room.featuredImage);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightboxAtIndex = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const otherRooms = ROOMS_DATA.filter((r) => r.id !== room.id).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{room.name} | The Meadows Resort & Spa Aurangabad</title>
        <meta name="description" content={room.shortDescription} />
        <link rel="canonical" href={`https://themeadowsresort.com/rooms/${room.slug}`} />
      </Helmet>

      {/* Top Breadcrumb Header */}
      <section className="pt-32 pb-8 bg-[#FAF8F5] border-b border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Link
                to="/rooms"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#517B65] hover:text-[#23392E] transition-colors mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Rooms & Suites</span>
              </Link>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#23392E]">
                {room.name}
              </h1>
              <p className="text-xs tracking-[0.2em] uppercase text-[#517B65] font-semibold mt-1">
                {room.category}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] tracking-wider uppercase text-[#23392E]/60 block">Indicative Rate</span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#517B65]">
                {room.indicativePrice}
              </span>
              <span className="text-xs text-[#23392E]/70 font-sans block">/ night*</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Room Presentation */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Gallery Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            {/* Main Active Image */}
            <div
              className="lg:col-span-8 aspect-[16/10] overflow-hidden border border-[#E7E0D0] cursor-pointer relative group bg-[#FAF8F5]"
              onClick={() => openLightboxAtIndex(0)}
            >
              <img
                src={activeImage}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold tracking-widest uppercase">
                Click to Enlarge Gallery
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4">
              {room.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-1 aspect-[16/10] overflow-hidden border cursor-pointer transition-all ${
                    activeImage === img ? 'border-2 border-[#517B65] shadow-md' : 'border-[#E7E0D0] opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Room Specs & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Description & Amenities (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Specs Quick Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#FAF8F5] border border-[#E7E0D0]">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider uppercase text-[#23392E]/60 block">Room Size</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#23392E]">
                    <Maximize2 className="w-4 h-4 text-[#517B65]" />
                    <span>{room.size}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider uppercase text-[#23392E]/60 block">Occupancy</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#23392E]">
                    <Users className="w-4 h-4 text-[#517B65]" />
                    <span>{room.occupancy}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider uppercase text-[#23392E]/60 block">Bedding</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#23392E]">
                    <Bed className="w-4 h-4 text-[#517B65]" />
                    <span>{room.bedType}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-wider uppercase text-[#23392E]/60 block">Garden Outlook</span>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#23392E]">
                    <Eye className="w-4 h-4 text-[#517B65]" />
                    <span>{room.view}</span>
                  </div>
                </div>
              </div>

              {/* Story & Description */}
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#23392E] mb-3">
                  About this Sanctuary
                </h3>
                <p className="text-sm sm:text-base text-[#23392E]/80 leading-relaxed font-sans font-light">
                  {room.fullDescription}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#23392E] mb-4">
                  Cottage Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#23392E]">
                      <Sparkles className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Amenities */}
              <div>
                <h3 className="font-serif text-2xl font-medium text-[#23392E] mb-4">
                  Room Features & Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#23392E]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Reservation Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="sticky top-28 bg-[#FAF8F5] border border-[#E7E0D0] p-6 sm:p-8 space-y-6 shadow-soft">
                <div className="border-b border-[#E7E0D0] pb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#517B65] font-semibold block mb-1">
                    Direct Enquiry
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#23392E]">
                      {room.indicativePrice}
                    </span>
                    <span className="text-xs text-[#23392E]/70 font-sans">starting range*</span>
                  </div>
                  <p className="text-[11px] text-[#23392E]/70 italic mt-1 font-sans">
                    {RESORT_INFO.indicativeRates.disclaimer}
                  </p>
                </div>

                <div className="space-y-3 text-xs text-[#23392E]/80">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D0]/50">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#517B65]" />
                      <span>Check-In</span>
                    </span>
                    <span className="font-semibold">{RESORT_INFO.checkInTime}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-[#E7E0D0]/50">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#517B65]" />
                      <span>Check-Out</span>
                    </span>
                    <span className="font-semibold">{RESORT_INFO.checkOutTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#517B65]" />
                      <span>Property Access</span>
                    </span>
                    <span className="font-semibold">Pool, Grounds & Wi-Fi</span>
                  </div>
                </div>

                <button
                  onClick={() => openEnquiry({ roomType: room.name, source: `Room Details: ${room.name}` })}
                  className="w-full py-4 bg-[#517B65] hover:bg-[#385848] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-md"
                >
                  Reserve This Cottage
                </button>

                <div className="text-center text-[10px] text-[#23392E]/60 space-y-1">
                  <p>Have special requests or large family queries?</p>
                  <p className="font-medium text-[#517B65]">Call {RESORT_INFO.phone.split('/')[0].trim()}</p>
                </div>
              </div>

            </div>

          </div>

          {/* Related Rooms Recommendations */}
          <div className="mt-20 pt-12 border-t border-[#E7E0D0]">
            <h3 className="font-serif text-2xl font-medium text-[#23392E] mb-6">
              Other Accommodations You May Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherRooms.map((r) => (
                <div key={r.id} className="border border-[#E7E0D0] bg-[#FAF8F5] p-5 flex flex-col sm:flex-row gap-5 items-center">
                  <img src={r.featuredImage} alt={r.name} className="w-full sm:w-40 aspect-[4/3] object-cover" />
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#517B65] font-semibold">{r.category}</span>
                    <h4 className="font-serif text-xl font-semibold text-[#23392E]">{r.name}</h4>
                    <p className="text-xs text-[#23392E]/70 line-clamp-2">{r.shortDescription}</p>
                    <Link to={`/rooms/${r.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#517B65] hover:text-[#23392E]">
                      <span>View Cottage</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Booking CTA */}
      <BookingCTA />

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={galleryItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1))}
        onNext={() => setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1))}
      />
    </>
  );
}

