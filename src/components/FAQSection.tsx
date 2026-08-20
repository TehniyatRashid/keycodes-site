import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      id: 1,
      question: "How Does The Subscription Work?",
      answer: "Once subscribed, you gain instant access to your dedicated Slack channel and your collaborative Trello dashboard where you can request as many automation, integration, or web builds as you need. We prioritize and execute them one by one, with rapid Turnaround and production-ready deliveries every single week."
    },
    {
      id: 2,
      question: "What Exactly Counts As A 'Request'?",
      answer: "A request can be anything from 'build a premium landing page matching our design spec' to 'integrate a custom data scraper proxy route to keep our API hidden.' There are no limits on complexity. If it fits within your tech stack, we build it."
    },
    {
      id: 3,
      question: "How Fast Will I See Results?",
      answer: "Average requests are delivered in just 2-3 business days. More complex specifications (like custom machine learning architectures or custom database migrations) are broken down into logical, testable milestones and delivered incrementally every few days."
    },
    {
      id: 4,
      question: "Who Is Doing The Actual Building?",
      answer: "You work directly with principal-level full-stack engineers and elite platform architects. No juniors, no endless project managers, and no expensive agency overhead. Just direct, hyper-focused development."
    },
    {
      id: 5,
      question: "What If I Only Have A Single Project?",
      answer: "You are free to pause or cancel your subscription at any time. If you only have one or two pressing features, you can subscribe, get your projects built and approved within the month, and pause until you have more work ready."
    }
  ];

  // Independent open state tracking for each FAQ item so multiple can be expanded
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({
    1: true, // Keep the first item open by default for a friendly layout entry point
  });

  const toggleState = (id: number) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section 
      id="faq"
      className="relative w-full overflow-hidden py-8 sm:py-10 md:py-12 px-6 sm:px-8 md:px-12 lg:px-[120px] z-10 bg-transparent"
    >
      {/* Premium ambient light glow background (True to site colors) */}
      <div className="absolute left-1/4 bottom-1/4 w-[400px] h-[400px] bg-[#7b39fc]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-10 top-1/4 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================== */}
        {/* Section Header                                             */}
        {/* ========================================================== */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h2 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.15]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2dbff] to-[#a484ff]">
              Frequently Asked Questions & Answers
            </span>
          </h2>
        </div>

        {/* ========================================================== */}
        {/* Minimal Accordion List Layout                             */}
        {/* ========================================================== */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq) => {
            const isOpen = !!openStates[faq.id];
            return (
              <div 
                key={faq.id}
                className="rounded-3xl bg-[#16122c]/10 border border-white/10 hover:border-white/15 overflow-hidden transition-all duration-300 shadow-xl backdrop-blur-md"
              >
                
                {/* Accordion Trigger Header */}
                <button 
                  onClick={() => toggleState(faq.id)}
                  className="w-full flex items-center justify-between gap-5 px-6 sm:px-8 py-5 sm:py-6 text-left text-white group cursor-pointer"
                >
                  <span className="text-base sm:text-[17px] md:text-lg font-semibold font-manrope tracking-tight text-white/95 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  
                  {/* Chevron rotating animation indicator */}
                  <div className={`p-1.5 sm:p-2 rounded-full bg-white/[0.03] border border-white/10 text-[#a484ff] transition-all duration-300 ${isOpen ? "rotate-180 bg-[#7b39fc]/20 border-[#a484ff]/30 text-white" : "group-hover:bg-white/[0.08]"}`}>
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </button>

                {/* Accordion Expandable Content with smooth grid height transitions */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 border-t border-white/5" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base text-white/60 leading-relaxed font-manrope font-normal max-w-3xl">
                      {faq.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
