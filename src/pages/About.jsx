import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Trees, Flower2, CheckCircle2, ArrowRight, Sun, Award, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BookingCTA from '../components/BookingCTA';
import PageHero from '../components/PageHero';
import { useBooking } from '../context/BookingContext';
import { RESORT_INFO } from '../data/resortInfo';
import { SERVICES_DATA } from '../data/services';

export default function About() {
  const { openEnquiry } = useBooking();

  return (
    <>
      <Helmet>
        <title>About Us | The Meadows Resort & Spa Aurangabad</title>
        <meta
          name="description"
          content="Learn about The Meadows Resort & Spa in Aurangabad (Chhatrapati Sambhajinagar). 13 acres of landscaped nature, garden cottages, eco-conscious hospitality, and proximity to Ellora Caves."
        />
        <link rel="canonical" href="https://themeadowsresort.com/about" />
      </Helmet>

      {/* Hero Section Matching Home Page */}
      <PageHero
        image="/src/assets/bg.jpg"
        imageAlt="The Meadows Resort & Spa Landscaped Grounds and Architecture"
        eyebrow="OUR HERITAGE & VISION"
        title={
          <>
            A Living Sanctuary in <br />
            <span className="italic font-light text-[#E7E0D0]">Chhatrapati Sambhajinagar</span>
          </>
        }
        description="Where 13 acres of verdant botanical gardens provide an idyllic haven between historic wonders and serene relaxation."
        secondaryButton={{
          label: "EXPLORE OUR STORY",
          icon: Compass,
          onClick: () => {
            const el = document.getElementById('about-story');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        primaryButton={{
          label: "BOOK YOUR STAY",
          icon: Calendar,
          onClick: () => openEnquiry({ source: 'About Hero: Book Your Stay' })
        }}
        scrollTargetId="about-story"
      />

      {/* The Story Section */}
      <section id="about-story" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#517B65] block">
                The Meadows Story
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#23392E] leading-[1.2]">
                Rooted in Nature, <br />
                <span className="italic font-light text-[#517B65]">Dedicated to Peace</span>
              </h2>

              <p className="text-sm sm:text-base text-[#23392E]/80 leading-relaxed font-sans">
                Conceived as an antidote to urban fatigue, The Meadows Resort & Spa was masterfully developed across 13 acres of fertile terrain in Mitmita, on the outskirts of Aurangabad. Rather than erecting a towering concrete hotel, our founders chose to weave independent cottage accommodations organically amidst dense groves of neem, gulmohar, and banyan trees.
              </p>

              <p className="text-sm sm:text-base text-[#23392E]/80 leading-relaxed font-sans">
                Today, the resort stands as a cherished destination for travelers seeking peaceful retreat while visiting Maharashtra’s cultural crown jewels: the UNESCO World Heritage Ellora Caves and the medieval Daulatabad Fort. With brick paths winding past lotus ponds and flowering bougainvillea, every corner of the property breathes life and calm.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E7E0D0]">
                <div className="flex items-start gap-3">
                  <Trees className="w-5 h-5 text-[#517B65] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#23392E]">13+ Acres of Flora</h4>
                    <p className="text-xs text-[#23392E]/70 font-sans mt-0.5">Home to dozens of bird species and hundreds of flourishing trees.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#517B65] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#23392E]">Heritage Gateway</h4>
                    <p className="text-xs text-[#23392E]/70 font-sans mt-0.5">Strategically situated just 25 minutes from the Ellora rock temples.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collage on Right */}
            <div className="lg:col-span-5 relative">
              <div className="border border-[#E7E0D0] overflow-hidden shadow-soft">
                <img
                  src="/images/resort/photo_24.jpg"
                  alt="Cottage exterior nestled in nature"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#E7E0D0] p-6 border-4 border-[#FAF8F5] shadow-lg max-w-[220px]">
                <p className="font-serif text-2xl font-bold text-[#23392E]">Authentic</p>
                <p className="text-xs uppercase tracking-wider text-[#517B65] font-semibold mt-1">Cottage Retreats</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Property Highlights Section */}
      <section className="py-20 lg:py-28 bg-white border-t border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Resort Amenities"
            title="Every Detail Crafted for You"
            subtitle="From freshwater morning swims to starlit evening dinners, discover the verified amenities that define The Meadows."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, idx) => (
              <div key={service.id} className="border border-[#E7E0D0] bg-[#FAF8F5] p-6 flex flex-col justify-between group hover:shadow-soft transition-all">
                <div>
                  <div className="aspect-[16/10] overflow-hidden mb-5 border border-[#E7E0D0]/60">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#517B65]">
                    {service.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#23392E] mt-1 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>

                {service.highlights && service.highlights.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#E7E0D0]/50">
                    <ul className="space-y-1 text-xs text-[#23392E]/80">
                      {service.highlights.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#517B65]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location and Proximity to World Heritage Attractions */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#517B65] block">
                Destination Guide
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#23392E] leading-tight">
                Gateway to Maharashtra’s <br />
                <span className="italic font-light text-[#517B65]">Crown Heritage</span>
              </h2>
              <p className="text-sm sm:text-base text-[#23392E]/80 leading-relaxed font-sans">
                Positioned on the Mumbai-Nashik-Aurangabad Highway (NH 52), The Meadows allows guests to avoid city traffic jams and set out directly towards the magnificent rock-cut monuments of the region.
              </p>

              {/* Distance Checklist */}
              <div className="space-y-3 pt-2">
                {RESORT_INFO.heritageProximity.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-[#E7E0D0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-[#23392E]">{item.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#517B65] bg-[#FAF8F5] px-2.5 py-1 border border-[#E7E0D0]">
                      {item.distance}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#517B65] hover:text-[#23392E] transition-colors"
                >
                  <span>View Google Maps & Directions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Map / Scenic Photo */}
            <div className="lg:col-span-6 border border-[#E7E0D0] overflow-hidden shadow-soft">
              <img
                src="/images/resort/photo_19.jpg"
                alt="The Meadows Resort grounds in Aurangabad"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6 bg-white border-t border-[#E7E0D0]">
                <h4 className="font-serif text-xl font-semibold text-[#23392E]">
                  Address & Coordinates
                </h4>
                <p className="text-xs text-[#23392E]/70 mt-1 font-sans">
                  {RESORT_INFO.address}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <BookingCTA />
    </>
  );
}

