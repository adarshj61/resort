import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { getChatbotResponse } from '../utils/chatbotService';
import { RESORT_INFO } from '../data/resortInfo';

export default function Chatbot() {
  const { isChatOpen, toggleChat } = useBooking();
  const navigate = useNavigate();

  // Messages start empty so the welcome typing animation can play on initial open
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const chatWindowRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const welcomeTimeoutRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const isClosingRef = useRef(false);
  const openScrollYRef = useRef(0);

  // Smooth internal scroll to bottom without triggering window/parent scroll
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isChatOpen]);

  // Smooth closing transition handler
  const handleCloseChat = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);

    setTimeout(() => {
      toggleChat(false);
      setIsClosing(false);
      isClosingRef.current = false;
    }, 220);
  }, [toggleChat]);

  // Auto-close on outside scroll (Desktop Wheel, Mobile TouchMove, and Window Scroll)
  useEffect(() => {
    if (!isChatOpen) return;

    openScrollYRef.current = window.scrollY;

    // 1. Mouse wheel and trackpad scroll detection
    const handleOutsideWheel = (e) => {
      if (!chatWindowRef.current) return;
      // If the scroll happened inside the chatbot container, preserve internal scrolling
      if (chatWindowRef.current.contains(e.target)) {
        return;
      }
      // User scrolled outside the chatbot -> close smoothly
      handleCloseChat();
    };

    // 2. Touch-based scroll gesture detection on mobile
    const handleOutsideTouchMove = (e) => {
      if (!chatWindowRef.current) return;
      // If the touch gesture happened inside the chatbot, preserve internal scrolling
      if (chatWindowRef.current.contains(e.target)) {
        return;
      }
      // User scrolled outside the chatbot -> close smoothly
      handleCloseChat();
    };

    // 3. Page scroll delta detection (e.g. scrollbar drag, page down key)
    const handleWindowScroll = () => {
      if (!chatWindowRef.current) return;
      if (Math.abs(window.scrollY - openScrollYRef.current) > 25) {
        handleCloseChat();
      }
    };

    window.addEventListener('wheel', handleOutsideWheel, { passive: true });
    window.addEventListener('touchmove', handleOutsideTouchMove, { passive: true });
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleOutsideWheel);
      window.removeEventListener('touchmove', handleOutsideTouchMove);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [isChatOpen, handleCloseChat]);

  // Initial Welcome Message with realistic ~2s typing animation
  useEffect(() => {
    if (isChatOpen && !hasInitializedRef.current && messages.length === 0) {
      hasInitializedRef.current = true;
      setIsTyping(true);

      welcomeTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: 'welcome-msg',
            sender: 'bot',
            text: "Hello, Welcome to the Meadow Resort!\n\nHow may I assist you today?",
            quickReplies: ['Rooms', 'Spa', 'Offers', 'Contact'],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 2000);
    }

    return () => {
      if (welcomeTimeoutRef.current) {
        clearTimeout(welcomeTimeoutRef.current);
      }
    };
  }, [isChatOpen, messages.length]);

  // Handle User Message with WhatsApp-style delivery ticks & Bot typing sequence
  const handleSendMessage = async (userText) => {
    const text = userText || inputValue.trim();
    if (!text || isTyping) return;

    const userMsgId = Date.now();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Step 1: Add user message with initial 'sent' state (single tick ✓)
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      text: text,
      status: 'sent', // WhatsApp single tick
      timestamp: currentTime
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Step 2: Transition to 'delivered' status (WhatsApp double tick ✓✓) after 400ms
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === userMsgId ? { ...m, status: 'delivered' } : m))
      );
    }, 400);

    // Step 3: Show realistic bot typing indicator after natural pause
    const typingTimer = setTimeout(() => {
      setIsTyping(true);
    }, 350);

    try {
      // Parallel delay ensures the typing indicator displays smoothly for at least 1200ms
      const responsePromise = getChatbotResponse(text);
      const naturalTypingDelay = new Promise(resolve => setTimeout(resolve, 1200));

      const [response] = await Promise.all([responsePromise, naturalTypingDelay]);

      // Step 4: User message status marks as 'read' (double tick turns active green/cyan)
      setMessages(prev =>
        prev.map(m => (m.id === userMsgId ? { ...m, status: 'read' } : m))
      );

      // Step 5: Replace typing indicator with actual bot message bubble
      setIsTyping(false);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        quickReplies: response.quickReplies || ['Rooms', 'Spa', 'Offers', 'Contact'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `For immediate assistance, please call our front desk directly at ${RESORT_INFO.phone.split('/')[0].trim()} or reach out via our contact page.`,
          quickReplies: ['Contact', 'Rooms'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleQuickAction = (action) => {
    if (action.toLowerCase() === 'contact') {
      handleCloseChat();
      navigate('/contact');
      return;
    }
    if (action.toLowerCase() === 'offers') {
      handleCloseChat();
      navigate('/offers');
      return;
    }
    if (action.toLowerCase() === 'spa') {
      handleCloseChat();
      navigate('/spa');
      return;
    }
    if (action.toLowerCase() === 'rooms') {
      handleSendMessage('Tell me about the cottage rooms');
      return;
    }
    handleSendMessage(action);
  };

  // Reset chat and replay the 2-second typing welcome sequence
  const handleResetChat = () => {
    if (welcomeTimeoutRef.current) {
      clearTimeout(welcomeTimeoutRef.current);
    }
    setMessages([]);
    setIsTyping(true);
    hasInitializedRef.current = true;

    welcomeTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: 'welcome-msg-' + Date.now(),
          sender: 'bot',
          text: "Hello, Welcome to the Meadow Resort!\n\nHow may I assist you today?",
          quickReplies: ['Rooms', 'Spa', 'Offers', 'Contact'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      {/* Animated 3D Floating Orb Widget matching 'Ask myra' video reference in Resort Theme */}
      {!isChatOpen && !isClosing && (
        <button
          type="button"
          onClick={() => toggleChat(true)}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/25 hover:border-[#E7E0D0] shadow-[0_10px_25px_-3px_rgba(29,51,39,0.5),0_0_18px_rgba(81,123,101,0.35)] hover:shadow-[0_14px_32px_rgba(81,123,101,0.6)] transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none animate-orb-float cursor-pointer overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #68967E 0%, #3D5F4E 48%, #1D3327 90%, #15241C 100%)'
          }}
          aria-label="Ask Me - The Meadows Resort Assistant"
        >
          {/* Subtle Outer Ping Glow */}
          <span className="absolute -inset-1 rounded-full bg-[#517B65] opacity-20 animate-ping pointer-events-none" />

          {/* 3D Specular Glass Spherical Reflection Overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/30 pointer-events-none" />

          {/* STATE 1: 'Ask Me' Text with Script Font & Sparkle (Animated cycle) */}
          <div className="animate-askme-text absolute inset-0 flex flex-col items-center justify-center select-none px-1">
            <span className="text-[11px] sm:text-xs font-sans font-medium tracking-wide text-white/95 leading-none">
              Ask
            </span>
            <div className="flex items-center justify-center -mt-0.5">
              <span className="font-serif italic font-normal text-base sm:text-lg text-white tracking-normal leading-none">
                Me
              </span>
              {/* Primary Star */}
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] ml-0.5">
                <path d="M12 2 Q12 12 2 12 Q12 12 12 22 Q12 12 22 12 Q12 12 12 2 Z" />
              </svg>
              {/* Secondary Star */}
              <svg viewBox="0 0 24 24" className="w-1.5 h-1.5 fill-[#E7E0D0] text-[#E7E0D0] drop-shadow-[0_0_3px_rgba(255,255,255,0.8)] -mt-1">
                <path d="M12 2 Q12 12 2 12 Q12 12 12 22 Q12 12 22 12 Q12 12 12 2 Z" />
              </svg>
            </div>
          </div>

          {/* STATE 2: Dual Glowing 4-Pointed Stars (Animated cycle matching video) */}
          <div className="animate-askme-sparkle absolute inset-0 flex items-center justify-center select-none pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.95)]">
              {/* Large Primary 4-pointed Star */}
              <path
                d="M 46 12 Q 46 50 8 50 Q 46 50 46 88 Q 46 50 84 50 Q 46 50 46 12 Z"
                fill="#FFFFFF"
              />
              {/* Smaller Secondary 4-pointed Star */}
              <path
                d="M 72 58 Q 72 72 58 72 Q 72 72 72 86 Q 72 72 86 72 Q 72 72 72 58 Z"
                fill="#FAF8F5"
                opacity="0.95"
              />
            </svg>
          </div>
        </button>
      )}

      {/* Compact Chat Window */}
      {(isChatOpen || isClosing) && (
        <div
          ref={chatWindowRef}
          className={`w-[88vw] sm:w-[350px] h-[480px] max-h-[82vh] bg-[#FAF8F5] shadow-2xl border border-[#E7E0D0] rounded-2xl flex flex-col overflow-hidden ${
            isClosing
              ? 'animate-chat-close pointer-events-none'
              : 'animate-in fade-in slide-in-from-bottom-4 duration-300'
          }`}
          role="dialog"
          aria-label="The Meadows Assistant"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#517B65] text-white flex items-center justify-between shadow-xs flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold tracking-wide leading-none">
                  The Meadows Assistant
                </h3>
                <span className="text-[9px] tracking-wider text-[#E7E0D0]">
                  Aurangabad Resort Guide
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1 hover:text-white rounded transition-colors cursor-pointer"
                aria-label="Restart chat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCloseChat}
                className="p-1 hover:text-white rounded transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area — with overscroll-contain to isolate internal scroll */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain p-3.5 space-y-3 bg-[#FAF8F5]"
          >
            {messages.map((msg) => (
              <React.Fragment key={msg.id}>
                {msg.sender === 'user' ? (
                  // User Message with WhatsApp Delivery Tick
                  <div className="flex flex-col items-end animate-bubble-in">
                    <div className="max-w-[85%] px-3.5 py-2.5 text-xs leading-relaxed bg-[#517B65] text-white rounded-2xl rounded-br-xs shadow-xs">
                      <p className="whitespace-pre-line">{msg.text}</p>
                      
                      {/* WhatsApp Timestamp & Delivery Status */}
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-white/70 select-none font-sans">
                        <span>{msg.timestamp}</span>

                        {/* Single Sent Tick ✓ */}
                        {msg.status === 'sent' && (
                          <svg
                            viewBox="0 0 16 15"
                            className="w-3.5 h-3.5 inline-block text-white/75 animate-tick-pop"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 8.2l3.2 3.2 6.8-7.4" />
                          </svg>
                        )}

                        {/* Double Delivered / Read Tick ✓✓ */}
                        {(msg.status === 'delivered' || msg.status === 'read') && (
                          <svg
                            viewBox="0 0 19 15"
                            className={`w-4 h-3.5 inline-block animate-tick-pop ${
                              msg.status === 'read' ? 'text-[#87dfa5]' : 'text-white/75'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1.5 8.2l3.2 3.2 6.8-7.4" />
                            <path d="M6 8.2l3.2 3.2 6.8-7.4" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Bot Message with Avatar & Natural Bubble
                  <div className="flex items-end gap-2 animate-bubble-in">
                    <div className="w-6 h-6 rounded-full bg-[#517B65] text-white flex items-center justify-center flex-shrink-0 mb-0.5 shadow-2xs">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col max-w-[85%]">
                      <div className="bg-white text-[#23392E] border border-[#E7E0D0] px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-xs text-xs leading-relaxed">
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-[#23392E]/45 mt-1 px-1 font-sans">
                        {msg.timestamp}
                      </span>

                      {/* Quick Actions Pills */}
                      {msg.quickReplies && msg.quickReplies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {msg.quickReplies.map((reply, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleQuickAction(reply)}
                              className="text-[10px] px-2.5 py-1 bg-white border border-[#517B65]/40 text-[#517B65] hover:bg-[#517B65] hover:text-white transition-colors duration-200 rounded-full font-medium shadow-2xs cursor-pointer"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Realistic WhatsApp / iMessage 3-Dot Typing Bubble */}
            {isTyping && (
              <div className="flex items-end gap-2 animate-bubble-in">
                <div className="w-6 h-6 rounded-full bg-[#517B65] text-white flex items-center justify-center flex-shrink-0 mb-0.5 shadow-2xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-[#E7E0D0] px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-xs flex items-center gap-1.5 h-9">
                  <span className="w-2 h-2 rounded-full bg-[#517B65] animate-typing-dot-1" />
                  <span className="w-2 h-2 rounded-full bg-[#517B65] animate-typing-dot-2" />
                  <span className="w-2 h-2 rounded-full bg-[#517B65] animate-typing-dot-3" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-[#E7E0D0] flex items-center gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isTyping ? "The Meadows Assistant is typing..." : "Ask about rooms, pool, location..."}
              disabled={isTyping}
              className="flex-1 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E7E0D0] text-[#23392E] placeholder:text-[#23392E]/40 focus:outline-none focus:border-[#517B65] rounded-lg disabled:opacity-60 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 bg-[#517B65] text-white disabled:opacity-40 hover:bg-[#385848] transition-colors rounded-lg cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
