import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export default function PageHero({
  image,
  imageAlt = 'The Meadows Resort & Spa',
  eyebrow,
  title,
  description,
  primaryButton,
  secondaryButton,
  scrollTargetId
}) {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle image zoom entrance exactly like Home Hero
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.12, opacity: 0.8 },
          { scale: 1.03, opacity: 1, duration: 2.2, ease: 'power2.out' }
        );
      }

      // Hero text staggered entrance
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
            delay: 0.3
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    if (scrollTargetId) {
      const target = document.getElementById(scrollTargetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100dvh] min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#14231a]"
    >
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute -inset-[3px] z-0 overflow-hidden bg-[#14231a]">
        <img
          ref={imageRef}
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover object-center scale-[1.03]"
        />
        {/* Soft, light gradient overlay for maximum background image visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/15" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12 sm:mt-16">
        <div ref={textRef} className="flex flex-col items-center">
          
          {/* Eyebrow */}
          {eyebrow && (
            <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
              <span className="w-8 sm:w-12 h-[1px] bg-[#E7E0D0]/80" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.32em] text-[#E7E0D0] uppercase">
                {eyebrow}
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#E7E0D0]/80" />
            </div>
          )}

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08] mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/95 leading-relaxed font-sans mb-8 sm:mb-10 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {description}
            </p>
          )}

          {/* Action Buttons / CTAs */}
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              {secondaryButton && (
                <button
                  type="button"
                  onClick={secondaryButton.onClick || scrollToContent}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-transparent border-2 border-[#E7E0D0] text-white hover:bg-white hover:text-[#23392E] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-xs cursor-pointer"
                >
                  {secondaryButton.icon && <secondaryButton.icon className="w-4 h-4" />}
                  <span>{secondaryButton.label}</span>
                </button>
              )}

              {primaryButton && (
                <button
                  type="button"
                  onClick={primaryButton.onClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 bg-[#517B65] hover:bg-[#385848] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {primaryButton.icon && <primaryButton.icon className="w-4 h-4" />}
                  <span>{primaryButton.label}</span>
                </button>
              )}
            </div>
          )}

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
