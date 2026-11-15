import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Handle scroll detection for transition to solid background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Exact 5 navigation links as requested
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Special Offers', path: '/offers' },
    { name: 'Spa Moments', path: '/spa' },
    { name: 'Contact', path: '/contact' }
  ];

  // Pages featuring full-screen hero sections matching the homepage
  const heroRoutes = ['/', '/about', '/offers', '/spa', '/contact', '/rooms'];
  const hasHero = heroRoutes.includes(location.pathname);

  // When transparent over hero at the top of the page vs when scrolled
  const isTransparent = hasHero && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isTransparent
            ? 'bg-gradient-to-b from-black/65 via-black/30 to-transparent text-white py-5 md:py-6'
            : 'bg-[#FAF8F5]/95 backdrop-blur-md text-[#23392E] py-4 shadow-sm border-b border-[#E7E0D0]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo on Left */}
            <div className="flex-shrink-0">
              <Logo
                variant="horizontal"
                theme={isTransparent ? 'light' : 'dark'}
                className="transition-colors duration-300"
              />
            </div>

            {/* Desktop Navigation Links — Clean, Balanced, Elegantly Spaced */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-2 text-xs xl:text-[13px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 group ${
                      isActive
                        ? isTransparent
                          ? 'text-white font-semibold'
                          : 'text-[#517B65] font-semibold'
                        : isTransparent
                        ? 'text-white/85 hover:text-white'
                        : 'text-[#23392E]/80 hover:text-[#517B65]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {/* Underline hover effect */}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300 transform origin-left ${
                          isActive
                            ? isTransparent
                              ? 'bg-white scale-x-100'
                              : 'bg-[#517B65] scale-x-100'
                            : isTransparent
                            ? 'bg-white scale-x-0 group-hover:scale-x-100'
                            : 'bg-[#517B65] scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md focus:outline-none transition-colors ${
                  isTransparent ? 'text-white hover:bg-white/10' : 'text-[#23392E] hover:bg-[#E7E0D0]/40'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-[#FAF8F5] shadow-2xl transition-transform duration-500 ease-out transform md:hidden flex flex-col justify-between p-6 overflow-y-auto border-l border-[#E7E0D0] ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E0D0]">
            <Logo variant="horizontal" theme="dark" className="h-10 w-auto" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 ml-auto rounded-full text-[#23392E] hover:bg-[#E7E0D0]/50 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links — Exactly 5 links */}
          <nav className="py-6 space-y-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-medium tracking-[0.16em] uppercase transition-colors rounded-sm ${
                    isActive
                      ? 'bg-[#517B65] text-white font-semibold'
                      : 'text-[#23392E] hover:bg-[#E7E0D0]/40 hover:text-[#517B65]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Drawer Footer Info */}
        <div className="pt-6 border-t border-[#E7E0D0] text-center text-xs text-[#23392E]/70 space-y-1">
          <p className="font-serif italic text-sm text-[#517B65]">Aurangabad, Maharashtra</p>
          <p className="text-[11px] font-sans">A 13-Acre Botanical Sanctuary</p>
        </div>
      </div>
    </>
  );
}
