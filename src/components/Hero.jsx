import React, { useEffect, useRef } from 'react';
import { ChevronDown, Calendar, Compass } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import gsap from 'gsap';

export default function Hero() {
  const { openEnquiry } = useBooking();
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const droneRigRef = useRef(null);
  const imageRef = useRef(null);
  const lensGlowRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const drone = droneRigRef.current;
    const img = imageRef.current;
    const glow = lensGlowRef.current;
    if (!hero || !drone || !img) return;

    // Respect user's accessibility reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(img, { scale: 1.08, opacity: 1 });
        return;
      }

      // 1. Hero text staggered entrance
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }

      // 2. Initial Ground-Level Positioning:
      // Camera begins close to ground level, tightly framed on foreground pathways & lawn,
      // tilted slightly upward towards the tree canopy
      gsap.set(drone, {
        yPercent: -6.5,     // Low altitude positioning
        xPercent: -1.2,
        rotateX: 4.8,       // Looking slightly upward from ground level
        rotateY: -1.5,
        rotateZ: 0.3
      });

      gsap.set(img, {
        scale: 1.34,        // Close-up ground-level focal length
        opacity: 1
      });

      if (glow) {
        gsap.set(glow, {
          yPercent: 18,
          xPercent: -10,
          opacity: 0.35
        });
      }

      // 3. AUTOMATIC CINEMATIC DRONE ASCENT TIMELINE (Bottom-to-Top Aerial Flight)
      // Runs automatically on page load in an infinite, seamless loop independent of mouse position:
      // - START: Low ground level, looking up at the trees
      // - MIDDLE: Climbing upward, revealing cottages, verandas & stone pathways
      // - UPPER: High aerial perspective, looking down over the full 13-acre estate
      // - LOOP: Seamlessly glides back to ground level with zero jumps or resets
      const droneFlightTl = gsap.timeline({
        repeat: -1,
        yoyo: true,         // Continuous, zero-jump reversal along the aerodynamic spline
        defaults: { ease: 'sine.inOut' }
      });

      // STAGE 1: Ground Take-Off & Lift (0s -> 11s)
      // Camera ascends: ground drops in frame, perspective pitches down, architecture revealed
      droneFlightTl
        .to(drone, {
          yPercent: 2.8,    // Simulates physical climb: camera rises above ground level
          xPercent: 1.6,    // Gentle crosswind drift
          rotateX: -1.8,    // Viewing angle pitches downward as drone gains altitude
          rotateY: 2.2,     // Yaw tracks across the garden villas
          rotateZ: -0.6,    // Aerodynamic banking roll
          duration: 11
        }, 0)
        .to(img, {
          scale: 1.18,      // Field of view widens, revealing resort architecture
          duration: 11
        }, 0)
        .to(glow, {
          yPercent: -10,    // Sunlight angle shifts higher as drone climbs above tree line
          xPercent: 18,
          opacity: 0.6,
          duration: 11
        }, 0)

        // STAGE 2: High-Altitude Climb & Full Landscape Panoramic Reveal (11s -> 24s)
        // Drone reaches high aerial vantage point, surveying the entire resort estate
        .to(drone, {
          yPercent: 7.2,    // Peak aerial altitude
          xPercent: -2.4,   // Sweeping cross-estate panoramic glide
          rotateX: -3.8,    // Downward aerial camera pitch surveying the landscape from above
          rotateY: -2.8,    // Wide panoramic sweep
          rotateZ: 0.5,     // Natural counter-bank stabilization
          duration: 13
        }, 11)
        .to(img, {
          scale: 1.08,      // Complete panoramic reveal of resort, greenery, and horizon
          duration: 13
        }, 11)
        .to(glow, {
          yPercent: -22,    // Sun breaks out across the high canopy
          xPercent: -22,
          opacity: 0.72,
          duration: 13
        }, 11);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const aboutSection = document.getElementById('about-resort');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#14231a]"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
    >
      {/* 3D DRONE CAMERA VIEWPORT CONTAINER */}
      {/* Deep bleed margins (-inset-14 sm:-inset-24) prevent any edge gaps during vertical flight & 3D tilt */}
      <div
        className="absolute -inset-14 sm:-inset-24 z-0 overflow-hidden bg-[#14231a] pointer-events-none will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* DRONE FLIGHT RIG: Ascending drone takeoff from ground to aerial perspective */}
        <div
          ref={droneRigRef}
          className="w-full h-full relative overflow-hidden will-change-transform"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        >
          {/* RESORT PHOTOGRAPHY: Bottom-anchored origin for natural ground-to-sky expansion */}
          <img
            ref={imageRef}
            src="/images/resort/photo_21.jpg"
            alt="The Meadows Resort & Spa Landscaped Gardens and Architecture"
            className="w-full h-full object-cover will-change-transform"
            style={{ transformOrigin: 'center 75%' }}
          />

          {/* Soft, light gradient overlay for maximum background image visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* Dynamic Aerial Sun / Horizon Light Glow that shifts as drone climbs */}
          <div
            ref={lensGlowRef}
            className="absolute -inset-10 bg-radial from-emerald-400/20 via-amber-200/10 to-transparent opacity-45 pointer-events-none blur-3xl will-change-transform"
          />
        </div>
      </div>

      {/* Hero Content (Floating ahead in perspective depth) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12 sm:mt-16 pointer-events-auto">
        <div ref={textRef} className="flex flex-col items-center">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-8 sm:w-12 h-[1px] bg-[#E7E0D0]/80" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.32em] text-[#E7E0D0] uppercase">
              WELCOME TO THE MEADOWS
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#E7E0D0]/80" />
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08] mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            Where Nature Meets <br />
            <span className="italic font-light text-[#E7E0D0]">Unforgettable Luxury</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/95 leading-relaxed font-sans mb-8 sm:mb-10 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Discover a peaceful escape surrounded by nature, where exceptional hospitality, rejuvenation, and memorable experiences come together.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={scrollToContent}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-transparent border-2 border-[#E7E0D0] text-white hover:bg-white hover:text-[#23392E] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-xs cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE THE RESORT</span>
            </button>

            <button
              onClick={() => openEnquiry({ source: 'Hero CTA: Book Your Stay' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-[#517B65] hover:bg-[#385848] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK YOUR STAY</span>
            </button>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll down to explore"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-sans mb-1 opacity-75 group-hover:opacity-100">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-[#E7E0D0]" />
      </button>
    </section>
  );
}
