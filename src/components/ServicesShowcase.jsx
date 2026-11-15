import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Wifi,
  Snowflake,
  Bed,
  Bell,
  Waves,
  Flame,
  Utensils,
  Gamepad2,
  Car
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesShowcase() {
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);

  // 10 Verified Luxury Amenities with Authentic Resort Photography
  const amenities = [
    {
      id: "wifi",
      num: "01",
      title: "Free High-Speed Wi-Fi",
      subtitle: "Seamless fiber optic coverage across all cottages, verandas & garden lawns.",
      icon: Wifi,
      image: "/images/resort/photo_30.jpg",
      imageAlt: "High-speed Wi-Fi connectivity in cottage suite"
    },
    {
      id: "ac",
      num: "02",
      title: "Climate AC Rooms",
      subtitle: "Whisper-quiet split air conditioning with personalized in-room temperature control.",
      icon: Snowflake,
      image: "/images/resort/photo_29.jpg",
      imageAlt: "Air conditioned deluxe cottage room"
    },
    {
      id: "clean-rooms",
      num: "03",
      title: "Clean Cottage Suites",
      subtitle: "Handcrafted teak interiors, pristine luxury linen & daily sanitization standards.",
      icon: Bed,
      image: "/images/resort/photo_18.jpg",
      imageAlt: "Impeccably clean luxury cottage bed and furnishings"
    },
    {
      id: "toiletries",
      num: "04",
      title: "Essential Toiletries",
      subtitle: "Organic botanical bath amenities, herbal soaps & plush combed cotton towels.",
      icon: Sparkles,
      image: "/images/resort/photo_20.jpg",
      imageAlt: "Organic resort bath toiletries and soaking bathtub"
    },
    {
      id: "staff",
      num: "05",
      title: "Helpful Concierge",
      subtitle: "Dedicated 24/7 front desk team, luggage assistance & Ellora tour planning.",
      icon: Bell,
      image: "/images/resort/photo_21.jpg",
      imageAlt: "Warm hospitality and concierge front desk"
    },
    {
      id: "pool",
      num: "06",
      title: "Freeform Swimming Pool",
      subtitle: "Natural stone freshwater pool with children's splash bay & poolside sun loungers.",
      icon: Waves,
      image: "/images/resort/photo_22.jpg",
      imageAlt: "Freshwater freeform swimming pool amidst palms"
    },
    {
      id: "spa",
      num: "07",
      title: "Steam & Sauna Spa",
      subtitle: "Ancient Ayurvedic rejuvenation, eucalyptus steam baths & therapeutic massages.",
      icon: Flame,
      image: "/images/resort/photo_31.jpg",
      imageAlt: "Herbal steam and sauna wellness pavilion"
    },
    {
      id: "dining",
      num: "08",
      title: "Marmalade Restaurant",
      subtitle: "Gourmet Halal dining, alfresco garden seating & authentic regional Maharashtrian dishes.",
      icon: Utensils,
      image: "/images/resort/photo_00.jpg",
      imageAlt: "Fine dining restaurant with garden terrace"
    },
    {
      id: "games",
      num: "09",
      title: "Indoor Games Lounge",
      subtitle: "Championship carrom, chess, board games & family recreation pavilion.",
      icon: Gamepad2,
      image: "/images/resort/photo_32.jpg",
      imageAlt: "Indoor recreation lounge and board games"
    },
    {
      id: "parking",
      num: "10",
      title: "Free Secure Parking",
      subtitle: "24/7 guarded tree-lined parking grounds with complimentary valet service.",
      icon: Car,
      image: "/images/resort/photo_17.jpg",
      imageAlt: "Tree-lined secure resort parking grounds with valet service"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      if (!track || !trigger) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + (window.innerWidth < 640 ? 50 : 120);
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.15}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(10, self.progress * 100)}%`;
            }
            const slideIdx = Math.min(
              amenities.length,
              Math.max(1, Math.round(self.progress * (amenities.length - 1)) + 1)
            );
            setActiveSlide(slideIdx);
          }
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} id="amenities" className="relative bg-[#FAF8F5]">
      {/* 
        Single Screen Pinned Container (100vh):
        Centered layout with zero unnecessary gaps, larger cinematic cards, and no bottom line
      */}
      <div
        ref={sectionRef}
        className="h-screen w-full flex flex-col justify-center py-3 sm:py-5 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-[#E7E0D0] gap-3 sm:gap-4 lg:gap-5"
      >
        {/* COMPACT HEADER: Minimal gaps, full visibility in one window */}
        <div className="max-w-7xl w-full mx-auto flex-shrink-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-3 mb-2">
            <div>
              <div className="inline-flex items-center gap-2 mb-0.5">
                <span className="w-5 h-[1px] bg-[#517B65]" />
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#517B65]">
                  SIGNATURE RESORT LIVING
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-medium text-[#23392E] tracking-tight leading-tight">
                <span className="font-bold text-[#517B65]">THE MEADOWS</span> — Curated Resort Standards
              </h2>

              <p className="text-xs sm:text-[13px] text-[#23392E]/70 max-w-xl mt-0.5 font-sans leading-relaxed">
                Scroll mouse to glide horizontally through verified resort comforts across our 13-acre estate.
              </p>
            </div>

            {/* Slide Index Counter & Visual Scroll Progress */}
            <div className="flex items-center gap-3 self-start md:self-end">
              <span className="font-serif italic text-base sm:text-lg font-bold text-[#517B65]">
                {String(activeSlide).padStart(2, '0')}
              </span>
              <div className="w-24 sm:w-32 h-1 bg-[#E7E0D0] rounded-full overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-[#517B65] transition-all duration-150 rounded-full"
                  style={{ width: '10%' }}
                />
              </div>
              <span className="text-xs text-[#23392E]/50 font-sans">
                {String(amenities.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Compact Trust Badges Row */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#23392E]/75">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white border border-[#E7E0D0] rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#517B65]" />
              <span>13-Acre Botanical Sanctuary</span>
            </div>
            <span className="hidden sm:inline text-[#E7E0D0]">•</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white border border-[#E7E0D0] rounded-full shadow-2xs">
              <Award className="w-3.5 h-3.5 text-[#517B65]" />
              <span>Verified Luxury Resort Amenities</span>
            </div>
            <span className="hidden sm:inline text-[#E7E0D0]">•</span>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white border border-[#E7E0D0] rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#517B65]" />
              <span>Gateway to Ellora & Ajanta Caves</span>
            </div>
          </div>
        </div>

        {/* MIDDLE: Larger, More Expansive Cards Track */}
        <div className="w-full flex items-center overflow-hidden flex-shrink-0">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 lg:gap-6 pl-4 sm:pl-8 lg:pl-12 w-max items-center"
          >
            {amenities.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="group w-[280px] sm:w-[320px] lg:w-[360px] h-[360px] sm:h-[400px] lg:h-[430px] p-3 sm:p-3.5 bg-white border border-[#E7E0D0] hover:border-[#517B65] rounded-3xl shadow-2xs hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between flex-shrink-0"
                >
                  {/* Large High-Resolution Resort Photography (takes ~70% of card) */}
                  <div className="relative w-full h-[240px] sm:h-[275px] lg:h-[300px] rounded-2xl overflow-hidden bg-[#FAF8F5] shadow-2xs">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 pointer-events-none"
                    />
                    {/* Subtle Gradient Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-50 group-hover:opacity-25 transition-opacity" />

                    {/* Top-Left Index Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 bg-black/45 backdrop-blur-md text-white text-[10px] font-sans font-medium tracking-widest rounded-full">
                        {item.num}
                      </span>
                    </div>

                    {/* Bottom-Right Category Icon Badge */}
                    <div className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md text-[#517B65] flex items-center justify-center shadow-xs group-hover:bg-[#517B65] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Typography & Details */}
                  <div className="w-full pt-2.5 pb-0.5 px-1 flex flex-col justify-center">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#23392E] group-hover:text-[#517B65] transition-colors leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#23392E]/70 font-sans leading-relaxed line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Bottom line completely removed as requested */}
      </div>
    </section>
  );
}