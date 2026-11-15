import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServiceCard({ service, index = 0 }) {
  const isEven = index % 2 === 1;

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-14 py-8 md:py-12 ${
      isEven ? 'lg:flex-row-reverse' : ''
    }`}>
      {/* Image Block */}
      <div className="w-full lg:w-1/2 overflow-hidden border border-[#E7E0D0] group relative bg-[#FAF8F5]">
        <div className="aspect-[16/11] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1 bg-[#23392E]/85 backdrop-blur-md text-[#E7E0D0] text-[10px] font-semibold tracking-[0.2em] uppercase">
            {service.category}
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className="w-full lg:w-1/2 space-y-4 lg:space-y-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#517B65] block mb-2">
            0{index + 1} — Curated Experience
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#23392E] leading-tight">
            {service.title}
          </h3>
        </div>

        <p className="text-sm sm:text-base text-[#23392E]/75 leading-relaxed font-sans">
          {service.description}
        </p>

        {service.highlights && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {service.highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#23392E]/85">
                <CheckCircle2 className="w-4 h-4 text-[#517B65] flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link
            to={service.link || '/about'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF8F5] border border-[#517B65] text-[#517B65] hover:bg-[#517B65] hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

