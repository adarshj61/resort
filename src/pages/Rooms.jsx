import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Info, Sparkles, Filter, Calendar, Compass } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import RoomCard from '../components/RoomCard';
import BookingCTA from '../components/BookingCTA';
import PageHero from '../components/PageHero';
import { useBooking } from '../context/BookingContext';
import { ROOMS_DATA } from '../data/rooms';
import { RESORT_INFO } from '../data/resortInfo';

export default function Rooms() {
  const { openEnquiry } = useBooking();
  const [filter, setFilter] = useState('All');

  const filteredRooms = filter === 'All'
    ? ROOMS_DATA
    : ROOMS_DATA.filter(r => {
        if (filter === 'Couples') return r.occupancy.includes('2 Adults') || r.id.includes('bathtub');
        if (filter === 'Family') return r.occupancy.includes('Child') || r.id.includes('superior');
        if (filter === 'Solo / Work') return r.occupancy.includes('1 Adult');
        return true;
      });

  return (
    <>
      <Helmet>
        <title>Rooms & Cottage Suites | The Meadows Resort Aurangabad</title>
        <meta
          name="description"
          content="Explore independent cottage accommodations nestled in 13 acres of landscaped nature at The Meadows Resort & Spa Aurangabad. Deluxe Double, Superior Suites, and Bathtub Cottages."
        />
        <link rel="canonical" href="https://themeadowsresort.com/rooms" />
      </Helmet>

      {/* Hero Section Matching Home Page */}
      <PageHero
        image="/images/resort/photo_24.jpg"
        imageAlt="Cottage suites at The Meadows Resort"
        eyebrow="ACCOMMODATIONS"
        title={
          <>
            Cottages & Suites <br />
            <span className="italic font-light text-[#E7E0D0]">Amidst the Greenery</span>
          </>
        }
        description="Independent cottage retreats designed with natural stone, warm teak, and private garden sit-outs for complete tranquility."
        secondaryButton={{
          label: "VIEW ALL COTTAGES",
          icon: Compass,
          onClick: () => {
            const el = document.getElementById('rooms-list');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        primaryButton={{
          label: "CHECK AVAILABILITY",
          icon: Calendar,
          onClick: () => openEnquiry({ source: 'Rooms Hero: Check Availability' })
        }}
        scrollTargetId="rooms-list"
      />

      {/* Indicative Tariff Banner */}
      <section id="rooms-list" className="bg-[#E7E0D0]/60 border-b border-[#E7E0D0] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs text-[#23392E]/80">
            <Info className="w-4 h-4 text-[#517B65] flex-shrink-0" />
            <p>
              <strong>Indicative Tariff:</strong> {RESORT_INFO.indicativeRates.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Listing */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#E7E0D0]">
            <div>
              <h2 className="font-serif text-3xl font-medium text-[#23392E]">
                Available Cottage Categories
              </h2>
              <p className="text-xs sm:text-sm text-[#23392E]/70 font-sans mt-1">
                Showing {filteredRooms.length} verified cottage options
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#517B65] hidden sm:block" />
              {['All', 'Couples', 'Family', 'Solo / Work'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                    filter === tab
                      ? 'bg-[#517B65] text-white'
                      : 'bg-white border border-[#E7E0D0] text-[#23392E]/70 hover:bg-[#E7E0D0]/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} variant="detailed" />
            ))}
          </div>

        </div>
      </section>

      {/* Booking CTA */}
      <BookingCTA />
    </>
  );
}

