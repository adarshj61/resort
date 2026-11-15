import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Sparkles, Bed, Flower2, Utensils, Calendar } from 'lucide-react';
import Hero from '../components/Hero';
import SectionHeading from '../components/SectionHeading';
import EditorialAbout from '../components/EditorialAbout';
import RoomsSection from '../components/RoomsSection';
import RoomCard from '../components/RoomCard';
import ServicesShowcase from '../components/ServicesShowcase';
import TestimonialMarquee from '../components/TestimonialMarquee';
import FAQ from '../components/FAQ';
import BookingCTA from '../components/BookingCTA';
import { ROOMS_DATA } from '../data/rooms';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>The Meadows Resort & Spa | Luxury Nature Resort in Aurangabad</title>
        <meta
          name="description"
          content="Experience 13 acres of tranquil gardens, luxury cottages, authentic spa therapies, and warm hospitality at The Meadows Resort & Spa in Aurangabad, Maharashtra."
        />
        <link rel="canonical" href="https://themeadowsresort.com/" />
      </Helmet>

      {/* SECTION 1: HERO SECTION */}
      <Hero />

      {/* SECTION 2: ABOUT THE MEADOWS — Vivanta Inspired Editorial Layout with Integrated Gallery */}
      <EditorialAbout />

      {/* SECTION 3: ROOMS & SUITES — Two Columns Moving Photos on Hover & Left Bottom CTAs */}
      <RoomsSection />

      {/* SECTION 4: SERVICES & EXPERIENCES — Compact Verified Facilities Showcase */}
      <ServicesShowcase />

      {/* SECTION 5: EXPLORE THE MEADOWS — Three Core Pillars (No Pricing Guide) */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5] border-t border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            eyebrow="Curated Living"
            title="Explore The Meadows"
            subtitle="Three signature pillars defining our guest journey amidst the tranquility of Aurangabad."
            className="mb-10 sm:mb-12"
          />

          {/* Three Major Experience Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* 1. ROOMS & SUITES */}
            <div className="group bg-white border border-[#E7E0D0] overflow-hidden shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src="/images/resort/photo_29.jpg"
                    alt="Cottages in greenery"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#23392E] text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Pillar 01
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#517B65] mb-1.5">
                    <Bed className="w-4 h-4" />
                    <span>Private Living</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#23392E] mb-2.5">
                    Rooms & Suites
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans">
                    Comfortable cottage accommodation and peaceful surroundings nestled among 13 acres of flowering flora.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                <Link
                  to="/rooms"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#517B65] group-hover:text-[#23392E] transition-colors"
                >
                  <span>Explore Cottages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2. SPA & WELLNESS */}
            <div className="group bg-white border border-[#E7E0D0] overflow-hidden shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6419c2bc4830051c9f80849d/ef94d373-8590-4680-a921-435635cb88cc/DSC03537.jpg"
                    alt="Spa therapy and wellness"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#23392E] text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Pillar 02
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#517B65] mb-1.5">
                    <Flower2 className="w-4 h-4" />
                    <span>Holistic Health</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#23392E] mb-2.5">
                    Spa & Wellness
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans">
                    Relaxation, rejuvenation, and wellness experiences inspired by timeless Ayurvedic rituals and botanical oils.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                <Link
                  to="/spa"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#517B65] group-hover:text-[#23392E] transition-colors"
                >
                  <span>Discover Spa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 3. DINING & RECREATION */}
            <div className="group bg-white border border-[#E7E0D0] overflow-hidden shadow-sm hover:shadow-elevated transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF8F5]">
                  <img
                    src="/images/resort/photo_00.jpg"
                    alt="Lawn dining and recreation"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#23392E] text-[10px] font-semibold tracking-[0.2em] uppercase">
                      Pillar 03
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#517B65] mb-1.5">
                    <Utensils className="w-4 h-4" />
                    <span>Culinary & Leisure</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#23392E] mb-2.5">
                    Dining & Recreation
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans">
                    Explore Marmalade restaurant, open lawn dinner soirées, swimming pool, indoor games, and birdwatching trails.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#517B65] group-hover:text-[#23392E] transition-colors"
                >
                  <span>Explore Experiences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: SPA & WELLNESS — Corrected Real Spa Environment Imagery (No Bottles) */}
      <section className="py-16 sm:py-24 bg-[#E7E0D0] relative overflow-hidden">
        {/* Subtle leaf watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-15 pointer-events-none" aria-hidden="true">
          <svg width="600" height="600" viewBox="0 0 100 100" fill="none">
            <path d="M50 0C30 30 10 50 10 75C10 90 25 100 50 100C75 100 90 90 90 75C90 50 70 30 50 0Z" fill="#517B65" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Story & Description */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#517B65]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#517B65]">
                  Wellness & Restoration
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-[#23392E] tracking-tight leading-[1.12]">
                Rediscover Your <br />
                <span className="italic font-light text-[#517B65]">Inner Balance</span>
              </h2>

              <p className="text-base sm:text-lg text-[#23392E]/85 leading-relaxed font-sans font-light">
                Step away from everyday life and embrace moments of relaxation, rejuvenation, and wellness at The Meadows.
              </p>

              <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans">
                Set within our quiet garden enclave, our Spa Pavilion draws inspiration from ancient healing wisdom. Natural herbal poultices, soothing herbal steam, and tranquil relaxation zones invite you to release stress and revitalize your senses after a day traversing the rock-cut wonders of Ellora.
              </p>

              {/* Verified treatments points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Ayurvedic Abhyanga Therapy',
                  'Aromatherapy Deep Relax Sessions',
                  'Herbal Steam & Sauna Baths',
                  'Botanical Foot Reflexology'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#23392E]">
                    <Sparkles className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/spa"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#517B65] text-white hover:bg-[#385848] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm"
                >
                  <span>EXPLORE SPA MOMENTS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Spa Photography Collage — Authentic Spa Environments */}
            <div className="lg:col-span-6 relative">
              <div className="border border-[#c5baa1] overflow-hidden group shadow-soft bg-white">
                <img
                  src="/images/resort/photo_31.jpg"
                  alt="Spa treatment and relaxation therapy room"
                  className="w-full aspect-[4/3] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Inset Second Image: Authentic Serene Spa Soaking Bath */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-1/2 border-4 border-[#E7E0D0] overflow-hidden shadow-elevated bg-white">
                <img
                  src="/images/resort/photo_20.jpg"
                  alt="Peaceful spa relaxation bathtub and wellness therapy space"
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: GUEST TESTIMONIALS — Infinite Marquee */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <SectionHeading
            eyebrow="Guest Impressions"
            title="Memories That Stay With You"
            subtitle="Read reflections from leisure vacationers, families, and heritage explorers who have experienced our peaceful green estate."
            className="mb-8"
          />
        </div>

        <TestimonialMarquee />
      </section>

      {/* SECTION 8: FAQ — Accordion Interface */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Everything You Need to Know"
            subtitle="Clear, verified answers regarding our accommodations, location, swimming pool, dining venues, and booking guidelines."
            className="mb-10 sm:mb-12"
          />

          <FAQ />

        </div>
      </section>

      {/* SECTION 9: FINAL CALL TO ACTION */}
      <BookingCTA />
    </>
  );
}
