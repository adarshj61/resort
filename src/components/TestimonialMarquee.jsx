import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';

export default function TestimonialMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for continuous seamless loop
  const marqueeItems = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft gradient masks on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div
        className="flex gap-6 w-max"
        style={{
          animation: 'marquee 45s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
      >
        {marqueeItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="w-[320px] sm:w-[420px] bg-white border border-[#E7E0D0] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-soft transition-all duration-300 select-none"
          >
            <div>
              {/* Header: Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#517B65]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#517B65]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#E7E0D0]" />
              </div>

              {/* Quote text */}
              <p className="font-serif italic text-base sm:text-lg text-[#23392E] leading-relaxed mb-6">
                "{item.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-[#E7E0D0]/50 flex items-center justify-between">
              <div>
                <h4 className="font-sans text-xs font-bold tracking-wider uppercase text-[#23392E]">
                  {item.author}
                </h4>
                <p className="text-[11px] text-[#517B65] font-medium">
                  {item.city}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] tracking-wider uppercase text-[#23392E]/60 block">
                  {item.stayType}
                </span>
                <span className="text-[9px] text-[#517B65]/70 block">
                  {item.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

