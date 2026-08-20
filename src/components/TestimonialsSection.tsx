import React from "react";
import { Heart, Play, Star } from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  videoCover: string;
}

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: "louis",
      author: "Louis Barraza",
      role: "Agency Owner",
      quote: "Working with this team changed how we run our infrastructure. We got a full workflow setup running in a week without dealing with typical development delays.",
      videoCover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=375&q=80"
    },
    {
      id: "robin",
      author: "Robin Hussain",
      role: "Product Manager Norric",
      quote: "Anubhav brings unmatched vision. He thinks like a founder, ensuring every decision adds value. His creativity and ability to turn ideas into actionable plans made the entire journey seamless.",
      videoCover: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&h=375&q=80"
    },
    {
      id: "ryan",
      author: "Ryan Ho",
      role: "Digital Media Agency Owner",
      quote: "Working with Anubhav and Prajwal was one of the best decisions we've ever made. They felt more like co-founders fully invested in every part of the journey, from development to marketing.",
      videoCover: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=375&q=80"
    }
  ];

  // Written slider reviews mapping horizontally
  const tickerReviews = [
    {
      id: "brand-scott",
      initials: "BS",
      bgClass: "bg-red-500/10 text-red-400",
      author: "Brandon Scott",
      subInfo: "US - 1 review",
      date: "Dec 17, 2025",
      highlight: "GHL finally started operating.",
      body: "I have employed several freelancers who failed to repair my GHL systems but this team solved this issue immediately. Funnels, tags and automations are performing well.",
      tags: ["December 6, 2025", "Unprompted review"]
    },
    {
      id: "peter-kyle",
      initials: "PK",
      bgClass: "bg-pink-500/10 text-pink-400",
      author: "Peter Kyle",
      subInfo: "US - 1 review",
      date: "Dec 18, 2025",
      highlight: "Fast no code development",
      body: "They provided a complete SaaS prototype within a shorter time than anticipated. Communicates were easy and the processes were consistent and predictable.",
      tags: ["December 3, 2025", "Unprompted review"]
    },
    {
      id: "levi-meyer",
      initials: "LM",
      bgClass: "bg-emerald-500/10 text-emerald-400",
      author: "Levi Meyer",
      subInfo: "US - 1 review",
      date: "4 days ago",
      highlight: "Turned loose ideas into a real product",
      body: "I shared rough notes and expectations, nothing polished. They translated that into a working setup without overcomplicating things. Fast execution and very thoughtful decisions throughout.",
      tags: ["December 18, 2025", "Unprompted review"]
    },
    {
      id: "chinyere-ad",
      initials: "CA",
      bgClass: "bg-amber-500/10 text-amber-400",
      author: "Chinyere Adeyemi",
      subInfo: "US - 1 review",
      date: "Dec 19, 2025",
      highlight: "Good integration skills.",
      body: "They linked APIs and platforms that I believed were incompatibly matched. All of this is working harmoniously and has been operating.",
      tags: ["December 3, 2026", "Unprompted review"]
    },
    {
      id: "wyatt-hale",
      initials: "WH",
      bgClass: "bg-purple-500/10 text-purple-400",
      author: "Wyatt Hale",
      subInfo: "US - 1 review",
      date: "Dec 24, 2025",
      highlight: "Systems finally working",
      body: "What used to feel messy is now organized under a single reliable system. They understand the logic perfectly and built hooks that hold up in real use. Extremely helpful team!",
      tags: ["December 24, 2025", "Unprompted review"]
    }
  ];

  return (
    <section 
      id="testimonials"
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 lg:px-[120px] bg-transparent z-10"
    >
      {/* Brand Glowing Aura Backgrounds - Consistent with all other sections */}
      <div className="absolute right-1/4 top-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#7b39fc]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-10 bottom-1/3 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12 sm:space-y-16">

        {/* ========================================================== */}
        {/* Section Header (Consistent layout structure)              */}
        {/* ========================================================== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-white/[0.06]">
          <div className="text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-[#a484ff]/30 text-[#d5c9ff] backdrop-blur-md shadow-[0_0_15px_rgba(164,132,255,0.15)] hover:border-[#a484ff]/50 hover:shadow-[0_0_25px_rgba(164,132,255,0.25)] transition-all duration-300 select-none">
              <Heart className="h-3.5 w-3.5 fill-red-400/80 text-red-400" />
              <span className="text-xs font-semibold tracking-wider text-[#d5c9ff] font-manrope uppercase">
                CUSTOMERS
              </span>
            </div>

            <h2 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.05]">
              250+ Testimonials
            </h2>

            {/* Trustpilot TrustScore Badge */}
            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#00b67a]/30 rounded-2xl p-2.5 sm:p-3 w-fit transition-all duration-300 select-none">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#00b67a] rounded-sm flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 fill-white text-white" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-manrope font-extrabold text-xs tracking-tight text-white leading-none">Trustpilot</span>
                  <span className="text-[8.5px] text-white/40 leading-none mt-0.5 font-semibold font-manrope uppercase tracking-wider">Excellent</span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-3.5 h-3.5 bg-[#00b67a] rounded-[1.5px] flex items-center justify-center"
                  >
                    <svg className="h-2 w-2 fill-white text-white" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <span className="text-[11px] font-bold text-[#00b67a] font-manrope">4.9/5 Rating</span>
            </div>
          </div>

          <p className="font-manrope text-sm sm:text-base text-white/60 max-w-sm md:text-right font-light leading-relaxed">
            Every client of ours came to us with an idea. Now they’ve launched real products and they’re talking about it.
          </p>
        </div>

        {/* ========================================================== */}
        {/* Optimized Symmetrical 3-Column Video Placeholders Layout     */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="group flex flex-col justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-brand-purple/40 shadow-xl transition-all duration-300 relative select-none w-full max-w-sm mx-auto"
            >
              {/* Consistently Sized Placeholder Video Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950/80">
                <img 
                  src={testimonial.videoCover} 
                  alt={testimonial.author} 
                  className="w-full h-full object-cover opacity-65 group-hover:opacity-80 group-hover:scale-[1.02] transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Compact elegant play overlay - strictly non-functional, click events do not open overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg group-hover:bg-brand-purple group-hover:text-white group-hover:scale-105 transition-all duration-300">
                    <Play className="h-4.5 w-4.5 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Subtle visual gradient vignette helper */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Minimal Text Descriptors: No clutter, no status lines, no metadata */}
              <div className="text-center pt-4">
                <h3 className="font-manrope text-sm font-bold text-white tracking-wide">
                  {testimonial.author}
                </h3>
                <p className="font-manrope text-[11px] text-white/40 font-normal mt-0.5">
                  {testimonial.role}
                </p>
                <p className="font-manrope text-[12px] leading-relaxed text-white/70 font-normal mt-3 italic line-clamp-3">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================== */}
        {/* Horizontal Edge-to-Edge Ticker Right to Left (Logo style)   */}
        {/* ========================================================== */}
        <div className="pt-8 overflow-hidden relative w-screen left-1/2 -translate-x-1/2 px-0 select-none">
          {/* Ambient Fade Overlays on viewport edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#0c0919] to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#0c0919] to-transparent pointer-events-none z-10" />

          <div className="relative w-full overflow-hidden py-2">
            {/* Horizontal flow scroller running Right to Left symmetrically looping multiple times */}
            <div className="flex gap-6 animate-infinite-scroll w-max">
              {[...tickerReviews, ...tickerReviews, ...tickerReviews, ...tickerReviews].map((review, idx) => (
                <div 
                  key={`${review.id}-${idx}`}
                  className="w-[290px] sm:w-[320px] p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-purple/30 shadow-xl shrink-0 flex flex-col justify-between text-left space-y-3 transition-all duration-300"
                >
                  {/* Reviews details */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${review.bgClass} flex items-center justify-center font-bold text-[11px] font-manrope`}>
                        {review.initials}
                      </div>

                      <div className="text-left">
                        <h4 className="text-[11px] font-bold text-white font-manrope leading-tight">
                          {review.author}
                        </h4>
                        <p className="text-[9px] text-white/40 font-normal leading-tight mt-0.5">
                          {review.subInfo}
                        </p>
                      </div>
                    </div>

                    <span className="text-[9px] text-white/30 font-mono">
                      {review.date}
                    </span>
                  </div>

                  {/* Trustpilot-Style Solid Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-4.5 h-4.5 bg-[#00b67a] rounded-[3px] flex items-center justify-center shadow-sm"
                      >
                        <Star className="h-2 w-2 fill-white text-white" />
                      </div>
                    ))}
                  </div>

                  {/* Review Text block */}
                  <div className="space-y-1 flex-1">
                    <h5 className="font-manrope text-[12px] font-bold text-white leading-snug">
                      {review.highlight}
                    </h5>
                    <p className="font-manrope text-[11px] leading-relaxed text-white/60">
                      {review.body}
                    </p>
                  </div>

                  {/* Tiny clean tags footer */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                    {review.tags?.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[8px] font-medium text-white/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
