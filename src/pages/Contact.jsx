import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, AlertCircle, Calendar } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import PageHero from '../components/PageHero';
import { RESORT_INFO } from '../data/resortInfo';
import { ROOMS_DATA } from '../data/rooms';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    roomPreference: 'Deluxe Double Room',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'A valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = 'A valid contact phone number is required';
    }
    if (!formData.checkIn) errs.checkIn = 'Check-in date is required';
    if (!formData.checkOut) errs.checkOut = 'Check-out date is required';
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
    }, 750);
  };

  return (
    <>
      <Helmet>
        <title>Contact & Reservations | The Meadows Resort & Spa Aurangabad</title>
        <meta
          name="description"
          content="Contact The Meadows Resort & Spa in Aurangabad (Chhatrapati Sambhajinagar), Maharashtra. Direct reservation desk, contact form, location address, and Google Maps."
        />
        <link rel="canonical" href="https://themeadowsresort.com/contact" />
      </Helmet>

      {/* Hero Section Matching Home Page */}
      <PageHero
        image="/images/resort/photo_22.jpg"
        imageAlt="The Meadows Resort & Spa Landscaped Approach"
        eyebrow="GET IN TOUCH"
        title={
          <>
            We Look Forward to <br />
            <span className="italic font-light text-[#E7E0D0]">Welcoming You</span>
          </>
        }
        description="Reach our reservations desk directly for room availability, banquet celebrations, or personalized heritage itineraries."
        secondaryButton={{
          label: "SEND INQUIRY",
          icon: MessageSquare,
          onClick: () => {
            const el = document.getElementById('contact-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        primaryButton={{
          label: "CALL FRONT DESK",
          icon: Phone,
          onClick: () => {
            window.location.href = `tel:${RESORT_INFO.phone}`;
          }
        }}
        scrollTargetId="contact-section"
      />

      {/* Contact Grid Section */}
      <section id="contact-section" className="py-20 lg:py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Direct Info & Location (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#517B65] block mb-2">
                  Direct Communication
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#23392E]">
                  Resort Concierge & Front Office
                </h2>
                <p className="text-xs sm:text-sm text-[#23392E]/75 leading-relaxed font-sans mt-3">
                  Our front desk team is on site 24 hours a day to assist with room enquiries, local airport transfers, and excursions to Ellora Caves.
                </p>
              </div>

              {/* Verified Contact Details Cards */}
              <div className="space-y-4">
                <div className="p-5 bg-white border border-[#E7E0D0] flex items-start gap-4 shadow-2xs">
                  <MapPin className="w-5 h-5 text-[#517B65] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#23392E]">Resort Address</h4>
                    <p className="text-xs sm:text-sm text-[#23392E]/80 leading-relaxed font-sans mt-1">
                      {RESORT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E7E0D0] flex items-start gap-4 shadow-2xs">
                  <Phone className="w-5 h-5 text-[#517B65] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#23392E]">Direct Phone</h4>
                    <p className="text-xs sm:text-sm text-[#23392E]/80 leading-relaxed font-sans mt-1">
                      <a href={`tel:${RESORT_INFO.phone.split('/')[0].trim()}`} className="hover:text-[#517B65] transition-colors">
                        {RESORT_INFO.phone}
                      </a>
                    </p>
                    <span className="text-[11px] text-[#517B65] font-medium block mt-0.5">Lines open 24/7 for reservations</span>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E7E0D0] flex items-start gap-4 shadow-2xs">
                  <Mail className="w-5 h-5 text-[#517B65] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#23392E]">Electronic Mail</h4>
                    <p className="text-xs sm:text-sm text-[#23392E]/80 leading-relaxed font-sans mt-1">
                      <a href={`mailto:${RESORT_INFO.email}`} className="hover:text-[#517B65] transition-colors block">
                        {RESORT_INFO.email}
                      </a>
                      <a href={`mailto:${RESORT_INFO.inquiryEmail}`} className="hover:text-[#517B65] transition-colors block">
                        {RESORT_INFO.inquiryEmail}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#E7E0D0] flex items-start gap-4 shadow-2xs">
                  <Clock className="w-5 h-5 text-[#517B65] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#23392E]">Hospitality Timings</h4>
                    <p className="text-xs sm:text-sm text-[#23392E]/80 font-sans mt-1">
                      Check-in: <strong>{RESORT_INFO.checkInTime}</strong> | Check-out: <strong>{RESORT_INFO.checkOutTime}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Indicative Tariff Note */}
              <div className="p-4 bg-[#E7E0D0]/60 border border-[#E7E0D0] text-xs text-[#23392E]/80 font-sans">
                <strong>Planning note:</strong> Indicative room rates average <strong>₹3,500 – ₹5,500 per night</strong>. Actual confirmed tariff depends on dates, occupancy, and room category.
              </div>
            </div>

            {/* Right Column: Direct Booking & Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#E7E0D0] p-8 sm:p-10 shadow-soft">
                
                <div className="border-b border-[#E7E0D0] pb-6 mb-6">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#517B65] font-semibold block mb-1">
                    Direct Inquiry Form
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#23392E]">
                    Send a Reservation Request
                  </h3>
                  <p className="text-xs text-[#23392E]/70 font-sans mt-1">
                    Fill out the form below and our guest relations executive will confirm availability within 4 hours.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#517B65]/10 text-[#517B65] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl font-medium text-[#23392E]">
                      Enquiry Successfully Sent
                    </h4>
                    <p className="text-xs sm:text-sm text-[#23392E]/80 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.fullName}</strong>. We have received your request for <strong>{formData.roomPreference}</strong> from <strong>{formData.checkIn}</strong> to <strong>{formData.checkOut}</strong>.
                    </p>
                    <p className="text-xs text-[#517B65] font-medium">
                      A copy has been forwarded to our front desk manager.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            checkIn: '',
                            checkOut: '',
                            guests: '2 Guests',
                            roomPreference: 'Deluxe Double Room',
                            message: ''
                          });
                        }}
                        className="px-6 py-2.5 bg-[#FAF8F5] border border-[#517B65] text-[#517B65] text-xs font-semibold tracking-wider uppercase hover:bg-[#517B65] hover:text-white transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                            errors.fullName ? 'border-red-500' : 'border-[#E7E0D0]'
                          } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                        />
                        {errors.fullName && <span className="text-red-500 text-[10px] mt-1 block">{errors.fullName}</span>}
                      </div>

                      <div>
                        <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                            errors.phone ? 'border-red-500' : 'border-[#E7E0D0]'
                          } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                        />
                        {errors.phone && <span className="text-red-500 text-[10px] mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                          errors.email ? 'border-red-500' : 'border-[#E7E0D0]'
                        } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                      />
                      {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                          Check-In Date *
                        </label>
                        <input
                          type="date"
                          value={formData.checkIn}
                          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                          className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                            errors.checkIn ? 'border-red-500' : 'border-[#E7E0D0]'
                          } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                        />
                        {errors.checkIn && <span className="text-red-500 text-[10px] mt-1 block">{errors.checkIn}</span>}
                      </div>

                      <div>
                        <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                          Check-Out Date *
                        </label>
                        <input
                          type="date"
                          value={formData.checkOut}
                          onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                          className={`w-full px-4 py-3 bg-[#FAF8F5] border ${
                            errors.checkOut ? 'border-red-500' : 'border-[#E7E0D0]'
                          } focus:outline-none focus:border-[#517B65] text-[#23392E]`}
                        />
                        {errors.checkOut && <span className="text-red-500 text-[10px] mt-1 block">{errors.checkOut}</span>}
                      </div>
                    </div>

                    {/* Guests & Room Preference */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                          Number of Guests
                        </label>
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E0D0] focus:outline-none focus:border-[#517B65] text-[#23392E]"
                        >
                          <option value="1 Adult">1 Adult</option>
                          <option value="2 Adults">2 Adults</option>
                          <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                          <option value="2 Adults + 2 Children">2 Adults + 2 Children</option>
                          <option value="3+ Adults (Family)">3+ Adults (Family)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                          Room Preference
                        </label>
                        <select
                          value={formData.roomPreference}
                          onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E0D0] focus:outline-none focus:border-[#517B65] text-[#23392E]"
                        >
                          {ROOMS_DATA.map((r) => (
                            <option key={r.id} value={r.name}>{r.name} ({r.indicativePrice})</option>
                          ))}
                          <option value="Banquet / Event Lawn Booking">Banquet / Event Lawn Booking</option>
                          <option value="Spa Wellness Package">Spa Wellness Package</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[#23392E] font-medium mb-1.5 uppercase tracking-wider text-[11px]">
                        Message / Special Requirements
                      </label>
                      <textarea
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please share any dietary preferences, airport pickup requests, or special occasion notes..."
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E7E0D0] focus:outline-none focus:border-[#517B65] text-[#23392E]"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#517B65] hover:bg-[#385848] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting Reservation...' : 'Submit Booking Request'}
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Google Maps Location Embed Section */}
      <section className="py-12 bg-white border-t border-[#E7E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#517B65] block">
              Interactive Map
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#23392E]">
              Our Location in Mitmita, Aurangabad
            </h3>
          </div>

          <div className="w-full h-[420px] border border-[#E7E0D0] overflow-hidden shadow-2xs">
            <iframe
              title="The Meadows Resort & Spa Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.4939226500854!2d75.2673898!3d19.9035889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb983c215321ab%3A0xe9f015b6d7734bb!2sThe%20Meadows%20Resort%20and%20Spa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

