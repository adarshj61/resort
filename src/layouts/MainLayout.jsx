import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import EnquiryModal from '../components/EnquiryModal';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2 } from 'lucide-react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function MainLayout() {
  const { toastMessage } = useBooking();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#23392E] font-sans">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <Chatbot />
      <EnquiryModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#23392E] text-white px-5 py-3 rounded-none shadow-2xl border border-[#517B65] flex items-center gap-3 text-xs tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#517B65]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

