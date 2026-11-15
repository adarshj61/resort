import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Official Brand Logo for The Meadows Resort & Spa
 * Uses authentic resort emblem, typography, and color palette.
 * 
 * @param {'horizontal' | 'compact'} variant - 'horizontal' (full emblem + typography) or 'compact' (emblem icon only)
 * @param {'dark' | 'light'} theme - 'dark' (for light/cream backgrounds) or 'light' (for dark backgrounds like hero/footer)
 * @param {string} className - Additional CSS classes for wrapper
 * @param {string} imgClassName - Additional CSS classes specifically for the logo image
 * @param {string} to - Link target route (default: '/')
 */
export default function Logo({
  variant = 'horizontal',
  theme = 'dark',
  className = '',
  imgClassName = '',
  to = '/'
}) {
  const isLight = theme === 'light';

  // Authentic transparent PNG assets
  const darkSrc = variant === 'compact' ? '/images/logo-icon-dark.png' : '/images/logo-dark.png';
  const lightSrc = variant === 'compact' ? '/images/logo-icon-light.png' : '/images/logo-light.png';

  // Clean, professional responsive sizing
  const defaultHeight = variant === 'compact' ? 'h-8 sm:h-9' : 'h-10 sm:h-11';
  const effectiveImgClass = imgClassName || defaultHeight;

  const LogoContent = (
    <div className={`relative inline-flex items-center group select-none ${className}`}>
      {/* Light version (luminous white & champagne gold for dark hero & footer backgrounds) */}
      <img
        src={lightSrc}
        alt="The Meadows Resort & Spa"
        className={`${effectiveImgClass} w-auto max-w-[200px] object-contain transition-all duration-300 drop-shadow-xs ${
          isLight ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
        } group-hover:scale-102`}
        loading="eager"
      />

      {/* Dark version (authentic forest green & bronze for cream/white backgrounds) */}
      <img
        src={darkSrc}
        alt="The Meadows Resort & Spa"
        className={`${effectiveImgClass} w-auto max-w-[200px] object-contain transition-all duration-300 drop-shadow-xs ${
          !isLight ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
        } group-hover:scale-102`}
        loading="eager"
      />
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#517B65] rounded-xs"
        aria-label="The Meadows Resort & Spa - Home"
      >
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
}
