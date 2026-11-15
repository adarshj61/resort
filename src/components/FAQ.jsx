import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS_DATA } from '../data/faqs';

export default function FAQ() {
  // Only one item open at a time; first item open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-[#E7E0D0] border-y border-[#E7E0D0]">
      {FAQS_DATA.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-5 sm:py-6 transition-colors">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-start justify-between text-left gap-4 focus:outline-none group"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-[#517B65]">
                  0{index + 1}
                </span>
                <span className="font-serif text-lg sm:text-xl font-medium text-[#23392E] group-hover:text-[#517B65] transition-colors leading-snug">
                  {faq.question}
                </span>
              </span>
              <span
                className={`p-1.5 rounded-full transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'bg-[#517B65] text-white rotate-180' : 'bg-[#E7E0D0]/50 text-[#23392E] group-hover:bg-[#E7E0D0]'
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            {/* Answer Drawer */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
              }`}
            >
              <div className="overflow-hidden pl-7 pr-4 sm:pr-8">
                <p className="text-xs sm:text-sm text-[#23392E]/80 leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

