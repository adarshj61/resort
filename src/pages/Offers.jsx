import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Sparkles, CheckCircle2, Info, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BookingCTA from '../components/BookingCTA';
import PageHero from '../components/PageHero';
import { OFFERS_DATA } from '../data/offers';
import { useBooking } from '../context/BookingContext';

export default function Offers() {
  const { openEnquiry } = useBooking();

  return (
    <>
      <Helmet>
        <title>Special Offers & Packages | The Meadows Resort & Spa</title>
        <meta
          name="description"
          content="Explore bespoke stay packages, heritage excursions to Ellora Caves, family retreats, and romantic getaways at The Meadows Resort & Spa in Aurangabad."
        />
        <link rel="canonical" href="https://themeadowsresort.com/offers" />
      </Helmet>

      {/* Hero Section Matching Home Page */}
      <PageHero
        image="/images/resort/photo_31.jpg"
        imageAlt="The Meadows Resort Celebration Grounds and Cottages"
        eyebrow="CURATED ESCAPES"
        title={
          <>
            Bespoke Offers & <br />
            <span className="italic font-light text-[#E7E0D0]">Seasonal Retreats</span>
          </>
        }
        description="Thoughtfully tailored packages combining peaceful cottage stays, authentic dining, and heritage exploration."
        secondaryButton={{
          label: "EXPLORE PACKAGES",
          icon: Sparkles,
          onClick: () => {
            const el = document.getElementById('offers-list');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        primaryButton={{
          label: "ENQUIRE NOW",
          icon: Calendar,
          onClick: () => openEnquiry({ source: 'Offers Hero: Enquire Now' })
        }}
        scrollTargetId="offers-list"
      />

      {/* Transparent Disclaimer Banner */}
      <section id="offers-list" className="bg-[#E7E0D0]/60 border-b border-[#E7E0D0] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs text-[#23392E]/80">
            <Info className="w-4 h-4 text-[#517B65] flex-shrink-0" />
            <p>
              <strong>Notice:</strong> The packages below represent curated enquiry categories. Confirmed package inclusions, seasonal dates, and customized tariffs are finalized directly by our reservations team based on current property availability.
            </p>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Curated Getaways"
            title="Explore Package Categories"
            subtitle="Whether embarking on an Ellora Caves pilgrimage, celebrating an anniversary, or organizing a family gathering, discover our tailored retreat ideas."
          />

          <div className="space-y-12">
            {OFFERS_DATA.map((offer, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={offer.id}
                  className={`bg-white border border-[#E7E0D0] overflow-hidden flex flex-col lg:flex-row shadow-sm hover:shadow-elevated transition-all duration-300 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2 relative bg-[#FAF8F5] min-h-[280px] lg:min-h-[380px]">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center absolute inset-0"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-[#23392E]/90 text-[#E7E0D0] text-[10px] font-semibold tracking-widest uppercase">
                        {offer.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#517B65] block mb-2">
                        {offer.tagline}
                      </span>
                      <h3 className="font-serif text-3xl font-medium text-[#23392E] mb-4">
                        {offer.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans mb-6">
                        {offer.description}
                      </p>

                      {/* Package Inclusions */}
                      <div className="space-y-2 pt-2 border-t border-[#E7E0D0]/60">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#23392E]/60 block mb-2">
                          Package Highlights:
                        </span>
                        {offer.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#23392E]/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#517B65] flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E7E0D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <span className="text-[11px] text-[#23392E]/60 italic font-sans">
                        {offer.disclaimer}
                      </span>

                      <button
                        onClick={() => openEnquiry({ packageName: offer.title, source: `Special Offer: ${offer.title}` })}
                        className="w-full sm:w-auto px-6 py-3 bg-[#517B65] text-white hover:bg-[#385848] text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-sm"
                      >
                        Enquire for Rates
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <BookingCTA />
    </>
  );
}

