import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | The Meadows Resort & Spa</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-[75vh] flex items-center justify-center bg-[#FAF8F5] px-4 py-32 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#517B65]/10 text-[#517B65] flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#517B65] block">
            Error 404
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#23392E]">
            Sanctuary Not Found
          </h1>

          <p className="text-sm text-[#23392E]/75 leading-relaxed font-sans">
            The page or experience you are looking for may have moved or is no longer available. Allow us to guide you back to our garden grounds.
          </p>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#517B65] text-white hover:bg-[#385848] text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

