import React from "react";
import { Layers } from "lucide-react";

export default function WhyPickUsSection() {
  return (
    <section 
      id="why-pick-us"
      className="relative w-full overflow-hidden py-8 sm:py-10 md:py-12 px-4 sm:px-8 md:px-12 lg:px-[120px] z-10 bg-transparent"
    >
      
      {/* Soft Ambient Brand Glow (Lavender / Violet Aura) - Matches site brand style */}
      <div className="absolute right-0 top-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#7b39fc]/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-10 w-[300px] h-[300px] bg-[#a484ff]/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Grid Mesh lines backdrop mapped to brand purple with high responsiveness */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" className="text-[#a484ff]/25">
          <defs>
            <pattern id="why-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#why-grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* ========================================================== */}
        {/* LEFT COLUMN: Headings, Badges, and Exquisite Copy          */}
        {/* ========================================================== */}
        <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
          
          <div className="space-y-4">
            {/* Why Pick Us Badge - Matching site's minimalist style */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-[#a484ff]/30 text-[#d5c9ff] backdrop-blur-md shadow-[0_0_15px_rgba(164,132,255,0.15)] hover:border-[#a484ff]/50 hover:shadow-[0_0_25px_rgba(164,132,255,0.25)] transition-all duration-300 select-none">
              <Layers className="h-3.5 w-3.5 text-[#a484ff]" />
              <span className="text-xs font-semibold tracking-wider text-[#d5c9ff] font-manrope uppercase">
                Why Pick Us?
              </span>
            </div>

            {/* Display Headings (Using Instrument Serif as shown in display screenshots) */}
            <h2 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.15] max-w-xl">
              3x Faster Than<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2dbff] to-[#a484ff]">
                Traditional Teams
              </span>
            </h2>
          </div>

          {/* Clean Description Text */}
          <p className="font-manrope text-sm sm:text-base text-white/60 font-normal leading-relaxed max-w-xl">
            We consistently ship automations & solutions within days, not weeks like your average <span className="font-semibold text-[#a484ff]">$50 / hour</span> developer overseas.
          </p>
        </div>

        {/* ========================================================== */}
        {/* RIGHT COLUMN: Highly-Responsive Comparison Bars           */}
        {/* ========================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-center items-stretch space-y-4 sm:space-y-5">
          
          {/* KEYCODE: Full width track with 55% premium purple speed comparison fill, perfectly responsive */}
          <div className="relative group w-full">
            {/* Ambient shadow glow centered below/around the bar */}
            <div className="absolute inset-1 rounded-full bg-[#a484ff]/20 blur-xl opacity-75 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
            
            {/* Dark background track matching size/padding of the other pill */}
            <div className="relative w-full h-[52px] sm:h-[64px] rounded-full bg-[#1b1238] border border-[#a484ff]/30 shadow-[0_4px_24px_rgba(164,132,255,0.15)] transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] overflow-hidden flex items-center">
              
              {/* Speed Fill (55% length) */}
              <div className="absolute top-0 left-0 bottom-0 w-[58%] sm:w-[55%] rounded-full bg-gradient-to-r from-[#b399ff] via-[#a484ff] to-[#7b39fc] shadow-[0_0_20px_rgba(164,132,255,0.45)] flex items-center justify-center">
                {/* Gloss highlight reflex overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                
                <span className="relative z-10 text-[10px] sm:text-sm md:text-base tracking-wide text-center font-bold font-manrope whitespace-nowrap text-white px-2 sm:px-4">
                  With Keycodes <span className="font-extrabold ml-1">2-3 Days</span>
                </span>
              </div>
            </div>
          </div>

          {/* OTHERS: Crisp off-white styling with dark slate text, longer width (1+ Week Slow) */}
          <div className="relative w-full h-[52px] sm:h-[64px] rounded-full bg-[#fcfbfe] hover:bg-white text-[#16122c] font-bold shadow-lg border border-white/80 transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] flex items-center justify-center">
            <span className="text-xs sm:text-sm md:text-base tracking-wide text-center font-bold font-manrope">
              With Others <span className="font-semibold text-[#5c5479] ml-1">1+ Week</span>
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
