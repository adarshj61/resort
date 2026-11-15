import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Flower2, Droplets, HeartHandshake, ArrowRight, CheckCircle2, Info, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import BookingCTA from '../components/BookingCTA';
import Lightbox from '../components/Lightbox';
import PageHero from '../components/PageHero';
import { useBooking } from '../context/BookingContext';
import { RESORT_INFO } from '../data/resortInfo';

export default function Spa() {
  const { openEnquiry } = useBooking();

  const spaTreatments = [
    {
      title: "Ayurvedic Abhyanga Therapy",
      category: "Traditional Healing",
      description: "A synchronized rhythmic body massage using warm herb-infused sesame and botanical oils, formulated to nourish bodily tissues, improve circulation, and release accumulated muscle fatigue.",
      highlights: ["Warm herbal medicated oils", "Stimulates vital energy points (Marmas)", "Deep muscle relaxation and stress relief"],
      image: "/images/resort/photo_31.jpg"
    },
    {
      title: "Aromatherapy Deep Relaxation",
      category: "Holistic Restoration",
      description: "A calming sensory journey combining gentle Swedish massage strokes with bespoke blends of pure essential plant essences like lavender, rosemary, and eucalyptus.",
      highlights: ["Custom essential oil blends", "Relieves nervous tension & insomnia", "Restores physical and emotional vitality"],
      image: "/images/resort/photo_20.jpg"
    },
    {
      title: "Herbal Steam & Sauna Bath",
      category: "Hydrothermal Therapy",
      description: "A purifying steam session infused with fragrant eucalyptus and indigenous medicinal leaves designed to open pores, flush out toxins, and rejuvenate tired joints.",
      highlights: ["Fresh herbal steam infusion", "Deep pore cleansing and skin detox", "Perfect follow-up after body massages"],
      image: "/images/resort/photo_31.jpg"
    },
    {
      title: "Botanical Foot Reflexology",
      category: "Targeted Relief",
      description: "A focused pressure-point massage concentrating on the feet and lower calves, balancing meridian pathways throughout the body. An ideal therapy after exploring the extensive Ellora rock caves.",
      highlights: ["Soothing warm herbal foot soak", "Acupressure point activation", "Alleviates foot swelling and fatigue"],
      image: "/images/resort/photo_25.jpg"
    }
  ];

  const spaGallery = [
    {
      id: 1,
      title: "Spa Relaxation Pavilion",
      category: "Spa Interiors",
      image: "/images/resort/photo_31.jpg"
    },
    {
      id: 2,
      title: "Botanical 13-Acre Grounds & Flora",
      category: "Spa Botanicals",
      image: "/images/resort/photo_19.jpg"
    },
    {
      id: 3,
      title: "Soothing Bathtub Suite",
      category: "Private Hydrotherapy",
      image: "/images/resort/photo_20.jpg"
    }
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <Helmet>
        <title>Spa Moments & Ayurvedic Wellness | The Meadows Resort Aurangabad</title>
        <meta
          name="description"
          content="Immerse in holistic rejuvenation at The Meadows Spa Pavilion. Traditional Ayurvedic body therapies, herbal steam, aromatherapy, and calming garden relaxation."
        />
        <link rel="canonical" href="https://themeadowsresort.com/spa" />
      </Helmet>

      {/* Hero Section Matching Home Page */}
      <PageHero
        image="https://images.squarespace-cdn.com/content/v1/6419c2bc4830051c9f80849d/ef94d373-8590-4680-a921-435635cb88cc/DSC03537.jpg"
        imageAlt="The Meadows Ayurvedic Spa Pavilion"
        eyebrow="HOLISTIC RENEWAL"
        title={
          <>
            Rediscover Your <br />
            <span className="italic font-light text-[#E7E0D0]">Inner Balance</span>
          </>
        }
        description="Step away from everyday life and embrace moments of relaxation, rejuvenation, and wellness surrounded by our peaceful 13-acre estate."
        secondaryButton={{
          label: "EXPLORE THERAPIES",
          icon: Sparkles,
          onClick: () => {
            const el = document.getElementById('spa-philosophy');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        primaryButton={{
          label: "RESERVE SPA TIME",
          icon: Calendar,
          onClick: () => openEnquiry({ source: 'Spa Hero: Reserve Spa Time' })
        }}
        scrollTargetId="spa-philosophy"
      />

      {/* Philosophy of Healing */}
      <section id="spa-philosophy" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#517B65] block">
                The Meadows Wellness Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#23392E] leading-tight">
                Harmonizing Mind, <br />
                <span className="italic font-light text-[#517B65]">Body, and Senses</span>
              </h2>

              <p className="text-sm sm:text-base text-[#23392E]/80 leading-relaxed font-sans">
                True wellness flourishes when we reconnect with natural rhythms. Tucked inside our botanical grounds, The Meadows Spa Pavilion provides a calm, secluded environment where gentle bird songs replace city noise and organic oils nurture your skin.
              </p>

              <p className="text-sm sm:text-base text-[#23392E]/80 leading-relaxed font-sans">
                Whether you desire deep muscular decompression after scaling Daulatabad Fort or an afternoon of restorative quietude with herbal steam, our therapy options are curated to bring your body back into balance.
              </p>

              <div className="p-4 bg-[#E7E0D0]/50 border border-[#E7E0D0] text-xs text-[#23392E]/80 space-y-1">
                <p className="font-semibold text-[#517B65]">Appointment & Pricing Notice:</p>
                <p>{RESORT_INFO.indicativeRates.spaNotice}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openEnquiry({ packageName: 'Spa Wellness Enquiry', source: 'Spa Page: Appointment Request' })}
                  className="px-8 py-3.5 bg-[#517B65] text-white hover:bg-[#385848] text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-sm"
                >
                  Enquire for Spa Appointments
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="border border-[#E7E0D0] overflow-hidden">
                  <img
                    src="/images/resort/photo_31.jpg"
                    alt="Ayurvedic massage at The Meadows"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="border border-[#E7E0D0] overflow-hidden">
                  <img
                    src="/images/resort/photo_25.jpg"
                    alt="Serene spa wellness interior"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="border border-[#E7E0D0] overflow-hidden">
                  <img
                    src="/images/resort/photo_20.jpg"
                    alt="Bathtub sanctuary"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
                <div className="border border-[#E7E0D0] overflow-hidden">
                  <img
                    src="/images/resort/photo_22.jpg"
                    alt="Swimming pool wellness"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Spa Therapies Grid */}
      <section className="py-20 lg:py-28 bg-white border-t border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Therapy Menu"
            title="Curated Healing Therapies"
            subtitle="Explore our verified wellness sessions designed to release stress, boost vitality, and nurture inner serenity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spaTreatments.map((treatment, idx) => (
              <div key={idx} className="bg-[#FAF8F5] border border-[#E7E0D0] p-8 flex flex-col justify-between group hover:shadow-elevated transition-all">
                <div className="space-y-4">
                  <div className="aspect-[16/10] overflow-hidden border border-[#E7E0D0]/60 mb-4">
                    <img
                      src={treatment.image}
                      alt={treatment.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#517B65]">
                    {treatment.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#23392E]">
                    {treatment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans">
                    {treatment.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#E7E0D0]/60">
                    {treatment.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#23392E]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#517B65] flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E7E0D0] flex items-center justify-between">
                  <span className="text-[11px] text-[#23392E]/60 italic font-sans">
                    Custom duration on request
                  </span>
                  <button
                    onClick={() => openEnquiry({ packageName: `Spa Therapy: ${treatment.title}`, source: `Spa: ${treatment.title}` })}
                    className="px-4 py-2 bg-[#517B65] hover:bg-[#385848] text-white text-[11px] font-semibold tracking-wider uppercase transition-all shadow-sm"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <BookingCTA />

      {/* Lightbox for Spa Moments */}
      <Lightbox
        isOpen={lightboxOpen}
        images={spaGallery}
        currentIndex={currentImageIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setCurrentImageIndex(prev => (prev === 0 ? spaGallery.length - 1 : prev - 1))}
        onNext={() => setCurrentImageIndex(prev => (prev === spaGallery.length - 1 ? 0 : prev + 1))}
      />
    </>
  );
}

