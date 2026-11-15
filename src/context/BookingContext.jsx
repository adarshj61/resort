import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryDetails, setEnquiryDetails] = useState({
    roomType: '',
    packageName: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    source: 'General'
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const openEnquiry = (options = {}) => {
    setEnquiryDetails(prev => ({
      ...prev,
      ...options
    }));
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiry = () => {
    setIsEnquiryModalOpen(false);
  };

  const showToast = (message, duration = 4000) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, duration);
  };

  const toggleChat = (forceState) => {
    setIsChatOpen(prev => (typeof forceState === 'boolean' ? forceState : !prev));
  };

  return (
    <BookingContext.Provider
      value={{
        isEnquiryModalOpen,
        enquiryDetails,
        openEnquiry,
        closeEnquiry,
        isChatOpen,
        toggleChat,
        toastMessage,
        showToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

