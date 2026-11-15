import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'dark',
  className = ''
}) {
  const isLight = theme === 'light';
  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl mb-12 md:mb-16 ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-3.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className={`w-6 h-[1px] ${isLight ? 'bg-[#E7E0D0]/60' : 'bg-[#517B65]'}`} />
          <span
            className={`text-xs md:text-sm font-semibold tracking-[0.28em] uppercase ${
              isLight ? 'text-[#E7E0D0]' : 'text-[#517B65]'
            }`}
          >
            {eyebrow}
          </span>
          <span className={`w-6 h-[1px] ${isLight ? 'bg-[#E7E0D0]/60' : 'bg-[#517B65]'}`} />
        </div>
      )}

      {title && (
        <h2
          className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.18] mb-4 ${
            isLight ? 'text-white' : 'text-[#23392E]'
          }`}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed font-sans ${
            isLight ? 'text-[#E7E0D0]/80' : 'text-[#23392E]/75'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

