import { RESORT_INFO } from '../data/resortInfo';
import { ROOMS_DATA } from '../data/rooms';

/**
 * Chatbot Service Layer
 * Designed to provide verified answers about The Meadows Resort & Spa Aurangabad,
 * with clean interfaces ready for backend Gemini or OpenAI integration.
 */
export async function getChatbotResponse(userMessage) {
  // Simulate natural delay for conversational feel
  await new Promise(resolve => setTimeout(resolve, 450));

  const query = userMessage.toLowerCase().trim();

  // Keyword matchers against verified property knowledge base
  if (query.includes('room') || query.includes('cottage') || query.includes('suite') || query.includes('stay') || query.includes('sleep')) {
    return {
      text: `We offer peaceful cottage-style accommodations set amidst 13 acres of lush flora:\n\n• Deluxe Double Room (from ~₹4,200)\n• Superior Double Room (from ~₹5,100)\n• Deluxe Bathtub Room (from ~₹5,500)\n• Deluxe Single Room (from ~₹3,600)\n\n*All rates are indicative starting ranges subject to season, dates, and taxes.* Each cottage features a private garden sit-out, split AC, and luxury bath amenities.`,
      quickReplies: ['Book a Room', 'Deluxe Bathtub Room', 'View Amenities', 'Contact Desk']
    };
  }

  if (query.includes('rate') || query.includes('price') || query.includes('cost') || query.includes('how much') || query.includes('tariff')) {
    return {
      text: `Our indicative accommodation planning range is **${RESORT_INFO.indicativeRates.roomRange}**.\n\n*Note: ${RESORT_INFO.indicativeRates.disclaimer}*\n\nFor spa therapies: ${RESORT_INFO.indicativeRates.spaNotice}`,
      quickReplies: ['Check Availability', 'Contact Reservations', 'Explore Rooms']
    };
  }

  if (query.includes('spa') || query.includes('massage') || query.includes('wellness') || query.includes('therapy') || query.includes('ayurved')) {
    return {
      text: `The Meadows Spa Pavilion offers holistic Ayurvedic massages (such as Abhyanga), aromatherapy treatments, and herbal steam baths in a serene nature setting.\n\nTreatment menus and customized wellness sessions are arranged on request. Please contact our front desk or submit an enquiry to receive the current wellness brochure.`,
      quickReplies: ['Explore Spa Page', 'Spa Enquiry', 'Pool Timings']
    };
  }

  if (query.includes('location') || query.includes('where') || query.includes('address') || query.includes('direction') || query.includes('map') || query.includes('ellora') || query.includes('distance')) {
    return {
      text: `The Meadows Resort & Spa is situated on **Gut No. 136, Village Mitmita, Mumbai-Nashik-Aurangabad Highway**, Aurangabad (Chhatrapati Sambhajinagar), Maharashtra 431002.\n\nKey Heritage Distances:\n• Ellora Caves (UNESCO Site): 18 km (~25 mins)\n• Daulatabad Fort: 8 km (~12 mins)\n• Bibi Ka Maqbara: 7.5 km (~15 mins)\n• Aurangabad Airport (IXU): 16 km (~30 mins)`,
      quickReplies: ['View on Map', 'Contact Information', 'Book Your Stay']
    };
  }

  if (query.includes('pool') || query.includes('swim')) {
    return {
      text: `Yes, we feature a large outdoor freshwater swimming pool surrounded by tropical palm trees and relaxing sun loungers, alongside an attached shallow pool for children. It is open daily from 7:00 AM to 7:00 PM for all registered guests.`,
      quickReplies: ['Explore Amenities', 'Explore Rooms', 'Family Getaways']
    };
  }

  if (query.includes('food') || query.includes('dine') || query.includes('dining') || query.includes('restaurant') || query.includes('marmalade') || query.includes('breakfast')) {
    return {
      text: `Our signature multi-cuisine dining restaurant, **Marmalade**, serves authentic Maharashtrian dishes, Mughlai delicacies, North Indian specialties, and Continental favorites. You can also experience romantic candlelit dinners under the starlit canopy on our sprawling 13-acre lawns.`,
      quickReplies: ['Special Offers', 'Contact Desk', 'Book Your Stay']
    };
  }

  if (query.includes('offer') || query.includes('package') || query.includes('deal') || query.includes('discount')) {
    return {
      text: `We offer curated enquiry packages including the **Ellora Heritage Discovery Package**, **13-Acre Family Green Haven**, and **Romantic Couples' Sanctuary**.\n\nPlease note: Package rates are verified directly upon enquiry according to seasonal dates and guest party size.`,
      quickReplies: ['View Special Offers', 'Enquire for Package', 'Contact Us']
    };
  }

  if (query.includes('book') || query.includes('reserve') || query.includes('enquiry') || query.includes('inquiry') || query.includes('check-in') || query.includes('check-out')) {
    return {
      text: `Standard Check-in is at **${RESORT_INFO.checkInTime}** and Check-out is at **${RESORT_INFO.checkOutTime}**.\n\nTo reserve a cottage or enquire about group packages:\n• Call: ${RESORT_INFO.phone}\n• Email: ${RESORT_INFO.email}\n• Or fill out the instant reservation form on our Contact & Enquiry page!`,
      quickReplies: ['Open Booking Form', 'Call Reception', 'Explore Rooms']
    };
  }

  if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('number')) {
    return {
      text: `You can reach our concierge and reservations desk directly:\n\n📞 Phone: ${RESORT_INFO.phone}\n✉️ Email: ${RESORT_INFO.email}\n📍 Address: ${RESORT_INFO.address}`,
      quickReplies: ['Open Contact Form', 'Explore Rooms', 'Special Offers']
    };
  }

  // Fallback default response
  return {
    text: `Thank you for reaching out to The Meadows Resort & Spa. How may I best assist your upcoming visit?\n\nYou can ask about our cottage rooms, indicative rates, spa wellness treatments, swimming pool, proximity to Ellora Caves, or send a direct reservation enquiry.`,
    quickReplies: ['Explore Rooms', 'Spa & Wellness', 'Special Offers', 'Booking Enquiry', 'Contact Information']
  };
}

