import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Phone, Mail, Clock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { RESORT_INFO } from '../data/resortInfo';
import { ROOMS_DATA } from '../data/rooms';

export default function EnquiryModal() {
  const { isEnquiryModalOpen, closeEnquiry, enquiryDetails } = useBooking();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    roomPreference: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync prefilled data from context
  useEffect(() => {
    if (isEnquiryModalOpen) {
      setFormData(prev => ({
        ...prev,
        roomPreference: enquiryDetails.roomType || enquiryDetails.packageName || 'Deluxe Double Room'
      }));
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isEnquiryModalOpen, enquiryDetails]);

  if (!isEnquiryModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = 'Please provide a valid phone number';
    }
    if (!formData.checkIn) errs.checkIn = 'Please select check-in date';
    if (!formData.checkOut) errs.checkOut = 'Please select check-out date';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate real reservation processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] bg-[#FAF8F5] border border-[#E7E0D0] shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#517B65] text-white flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#E7E0D0] uppercase font-semibold">
              The Meadows Resort & Spa
            </span>
            <h3 className="font-serif text-2xl font-medium tracking-wide">
              {isSubmitted ? 'Enquiry Received' : 'Reserve Your Sanctuary'}
            </h3>
          </div>
          <button
            onClick={closeEnquiry}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#517B65]/10 text-[#517B65] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-3xl font-medium text-[#23392E]">
                Thank You, {formData.name}
              </h4>
              <p className="text-sm text-[#23392E]/80 leading-relaxed max-w-md mx-auto font-sans">
                Your reservation enquiry for <strong>{formData.roomPreference}</strong> from <strong>{formData.checkIn}</strong> to <strong>{formData.checkOut}</strong> has been logged with our reservations desk.
              </p>
              <div className="p-4 bg-white border border-[#E7E0D0] text-xs text-[#23392E]/80 text-left space-y-2 rounded-sm">
                <p className="font-semibold text-[#517B65]">Next Steps:</p>
                <p>• Our front desk manager will confirm current availability and seasonal package tariffs within 4 hours.</p>
                <p>• For immediate assistance, feel free to call us directly at <strong>{RESORT_INFO.phone.split('/')[0].trim()}</strong>.</p>
              </div>
              <button
                onClick={closeEnquiry}
                className="px-8 py-3 bg-[#517B65] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#385848] transition-all shadow-sm"
              >
                Close & Continue Exploring
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="bg-[#E7E0D0]/40 p-3.5 border border-[#E7E0D0] text-[11px] text-[#23392E]/85 rounded-sm">
                <strong>Planning note:</strong> Indicative room rates average ₹3,500 – ₹5,500/night. Actual confirmed tariffs depend on dates, occupancy, and room category.
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditi Sharma"
                    className={`w-full px-3 py-2.5 bg-white border ${
                      errors.name ? 'border-red-500' : 'border-[#E7E0D0]'
                    } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                  />
                  {errors.name && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-3 py-2.5 bg-white border ${
                      errors.phone ? 'border-red-500' : 'border-[#E7E0D0]'
                    } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                  />
                  {errors.phone && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.phone}</span>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. aditi@example.com"
                  className={`w-full px-3 py-2.5 bg-white border ${
                    errors.email ? 'border-red-500' : 'border-[#E7E0D0]'
                  } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                />
                {errors.email && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.email}</span>}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                    Check-In Date *
                  </label>
                  <input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className={`w-full px-3 py-2.5 bg-white border ${
                      errors.checkIn ? 'border-red-500' : 'border-[#E7E0D0]'
                    } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                  />
                  {errors.checkIn && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.checkIn}</span>}
                </div>

                <div>
                  <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                    Check-Out Date *
                  </label>
                  <input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className={`w-full px-3 py-2.5 bg-white border ${
                      errors.checkOut ? 'border-red-500' : 'border-[#E7E0D0]'
                    } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                  />
                  {errors.checkOut && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.checkOut}</span>}
                </div>
              </div>

              {/* Room Preference & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                    Accommodation Preference
                  </label>
                  <select
                    value={formData.roomPreference}
                    onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#E7E0D0] focus:outline-none focus:border-[#517B65] text-[#23392E]"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.name}>{r.name} ({r.indicativePrice})</option>
                    ))}
                    <option value="Ellora Heritage Discovery Package">Ellora Heritage Discovery Package</option>
                    <option value="Romantic Couples Sanctuary">Romantic Couples' Sanctuary</option>
                    <option value="13-Acre Family Green Haven">13-Acre Family Green Haven</option>
                    <option value="Spa Wellness Retreat">Spa Wellness Retreat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border border-[#E7E0D0] focus:outline-none focus:border-[#517B65] text-[#23392E]"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                    <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
                    <option value="3+ Adults (Group / Family)">3+ Adults (Group / Family)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#23392E] font-medium mb-1 tracking-wider uppercase text-[10px]">
                  Special Requests / Questions (Optional)
                </label>
                <textarea
                  rows="3"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Airport pickup, anniversary setup, quiet corner cottage..."
                  className="w-full px-3 py-2.5 bg-white border border-[#E7E0D0] focus:outline-none focus:border-[#517B65] text-[#23392E]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#517B65] hover:bg-[#385848] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Booking Request'}
                </button>
              </div>

              <div className="text-center text-[10px] text-[#23392E]/60 pt-1">
                Direct booking support: {RESORT_INFO.phone.split('/')[0].trim()} • {RESORT_INFO.email}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

