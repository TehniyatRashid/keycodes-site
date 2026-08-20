import React, { useState, useEffect, useRef } from "react";
import { 
  DollarSign, 
  Users, 
  Video, 
  Hourglass, 
  Layers, 
  Check
} from "lucide-react";
import { motion, useInView } from "motion/react";

// Hook to detect user preferences for reduced motion
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return reduced;
}

// Fixed coordinates of cards for premium absolute percentage-based routing
const leftCardConfigs = [
  { 
    id: 1, 
    label: "Hire 5 engineers — $15k/mo", 
    icon: Users, 
    top: "3%", 
    right: "66%", 
    angle: 1.2, 
    portX: 34, 
    portY: 12, 
    iconColor: "text-[#b3a7eb]" 
  },
  { 
    id: 2, 
    label: "Manage freelancers", 
    icon: Layers, 
    top: "23%", 
    right: "52%", 
    angle: -1.0, 
    portX: 48, 
    portY: 30, 
    iconColor: "text-[#b3a7eb]" 
  },
  { 
    id: 3, 
    label: "$5,000 per project", 
    icon: DollarSign, 
    top: "43%", 
    right: "70%", 
    angle: 0.8, 
    portX: 30, 
    portY: 48, 
    iconColor: "text-[#b3a7eb]" 
  },
  { 
    id: 4, 
    label: "Endless meetings", 
    icon: Video, 
    top: "63%", 
    right: "48%", 
    angle: -1.5, 
    portX: 52, 
    portY: 66, 
    iconColor: "text-[#b3a7eb]" 
  },
  { 
    id: 5, 
    label: "3-week wait", 
    icon: Hourglass, 
    top: "83%", 
    right: "62%", 
    angle: 1.0, 
    portX: 38, 
    portY: 84, 
    iconColor: "text-[#b3a7eb]" 
  }
];

export default function OperationsSection() {
  const customCapabilities = [
    { id: 1, text: "No per-project fees", icon: DollarSign, color: "text-[#a484ff]" },
    { id: 2, text: "No hiring overhead", icon: Users, color: "text-[#a484ff]" },
    { id: 3, text: "No technical meetings", icon: Video, color: "text-[#a484ff]" },
    { id: 4, text: "No waiting weeks", icon: Hourglass, color: "text-[#a484ff]" }
  ];

  const prefersReduced = useReducedMotion();
  const graphicContainerRef = useRef(null);
  
  // Triggers viewport entry anim once with a comfortable margin
  const isInView = useInView(graphicContainerRef, { once: true, margin: "-80px" });

  // State to track when the initial "reveal & draw" sequence completes
  const [isIntroduced, setIsIntroduced] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsIntroduced(true);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Keyframes generator for staggered left-side muted cards
  const getCardKeyframes = (delaySeconds: number) => {
    if (prefersReduced) {
      return {
        animate: { opacity: 0.85, scale: 0.88, x: -2, filter: "grayscale(0%) blur(0px)" },
        transition: { duration: 0 }
      };
    }

    const totalDuration = 1.6;
    const fadeInStart = delaySeconds;
    const fadeInEnd = delaySeconds + 0.2;
    const dimStart = 0.85;
    const dimEnd = 1.25;

    const times = [
      0,
      fadeInStart / totalDuration,
      fadeInEnd / totalDuration,
      dimStart / totalDuration,
      dimEnd / totalDuration,
      1
    ];

    return {
      animate: {
        opacity: [0, 0, 1, 1, 0.85, 0.85],
        scale: [0.65, 0.65, 0.95, 0.95, 0.88, 0.88],
        x: [-12, -12, 0, 0, -2, -2],
        filter: [
          "grayscale(0%) blur(0px)",
          "grayscale(0%) blur(0px)",
          "grayscale(0%) blur(0px)",
          "grayscale(0%) blur(0px)",
          "grayscale(0%) blur(0px)",
          "grayscale(0%) blur(0px)"
        ]
      },
      transition: {
        times,
        duration: totalDuration,
        ease: "easeInOut",
        repeat: 0
      }
    };
  };

  // Keyframes generator for drawing custom convergence streams
  const getPathKeyframes = () => {
    if (prefersReduced) {
      return {
        animate: { pathLength: 1, opacity: 0.22 },
        transition: { duration: 0 }
      };
    }

    const totalDuration = 1.6;
    const drawStart = 0.45;
    const drawEnd = 0.95;
    const dimEnd = 1.25;

    const times = [
      0,
      drawStart / totalDuration,
      drawEnd / totalDuration,
      dimEnd / totalDuration,
      1
    ];

    return {
      animate: {
        pathLength: [0, 0, 1, 1, 1],
        opacity: [0, 0, 0.75, 0.22, 0.22]
      },
      transition: {
        times,
        duration: totalDuration,
        ease: "easeInOut",
        repeat: 0
      }
    };
  };

  // Keyframes generator for Right Hero Purple Card scaling and soft glow bloom
  const getRightCardKeyframes = () => {
    if (prefersReduced) {
      return {
        animate: { 
          opacity: 1, 
          scale: 1.0, 
          boxShadow: "0 0 35px rgba(164, 132, 255, 0.35)" 
        },
        transition: { duration: 0 }
      };
    }

    return {
      animate: {
        opacity: 1,
        scale: 1.0,
        boxShadow: "0 0 35px rgba(164, 132, 255, 0.35)"
      },
      transition: {
        opacity: { delay: 1.0, duration: 0.6, ease: "easeOut" },
        scale: { delay: 1.0, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
        boxShadow: { delay: 1.0, duration: 0.6, ease: "easeOut" }
      }
    };
  };

  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-10 md:py-12 px-4 sm:px-8 md:px-12 lg:px-[120px] z-10 bg-transparent">
      
      {/* Premium Brand Radial Glow Background */}
      <div className="absolute right-0 top-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#7b39fc]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-10 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ========================================================== */}
        {/* LEFT COLUMN: Premium Copywriting & Feature Capsules       */}
        {/* ========================================================== */}
        <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-[#a484ff]/30 text-[#d5c9ff] backdrop-blur-md shadow-[0_0_15px_rgba(164,132,255,0.15)] hover:border-[#a484ff]/50 hover:shadow-[0_0_25px_rgba(164,132,255,0.25)] transition-all duration-300 select-none">
              <Layers className="h-3.5 w-3.5 text-[#a484ff]" />
              <span className="text-xs font-semibold tracking-wider text-[#d5c9ff] font-manrope uppercase">
                The operational first platform
              </span>
            </div>
            
            <h2 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.15] max-w-xl">
              Rethink Your Operations.<br />
              <span className="text-white/95">Engineering, Simplified.</span>
            </h2>
          </div>

          <p className="font-manrope text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
            Hiring is slow. Agencies are expensive. You're stuck. Most businesses know they need modern automation. 
            But the path to getting there — hiring engineers, managing freelancers, paying five 
            figures per project — makes it feel out of reach. We killed that model. One team. 
            One subscription. Unlimited builds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-lg">
            {customCapabilities.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div 
                  key={cap.id}
                  className="flex items-center gap-3.5 py-3.5 px-5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-[#7b39fc]/30 transition-all duration-300 rounded-full cursor-help shadow-sm group"
                  title="Verified Platform Experience Guarantee"
                >
                  <div className="p-1 rounded-full bg-[#7b39fc]/10 text-[#a484ff] group-hover:scale-110 transition-transform">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="font-manrope text-xs sm:text-sm text-white/95 font-medium tracking-wide">
                    {cap.text}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================== */}
        {/* RIGHT COLUMN: "5 problems become 1 solution" graphic      */}
        {/* ========================================================== */}
        <div 
          ref={graphicContainerRef}
          className="lg:col-span-5 relative w-full h-[400px] sm:h-[450px] overflow-visible select-none flex items-center justify-center p-4"
        >
          {/* LEFT SIDE: Loose, slightly messy cluster of 5 small muted cards */}
          {/* LEFT SIDE: Loose, slightly messy cluster of 5 small muted cards */}
          {leftCardConfigs.map((card, idx) => {
            return (
              <motion.div
                key={card.id}
                style={{
                  top: card.top,
                  right: card.right,
                  rotate: card.angle,
                  transformOrigin: "center center",
                }}
                initial={{ opacity: 0, scale: 0.65, x: -15 }}
                animate={
                  isInView 
                    ? { opacity: 0.85, scale: 0.88, x: -2 }
                    : { opacity: 0, scale: 0.65, x: -15 }
                }
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.08 }}
                className="absolute bg-[#1e1838]/95 border-2 border-[#a484ff]/70 shadow-[0_4px_20px_rgba(164,132,255,0.25)] rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-center max-w-[175px] sm:max-w-[215px] z-20 backdrop-blur-md text-center transition-all duration-300 hover:border-[#a484ff] hover:shadow-[0_4px_24px_rgba(164,132,255,0.45)] hover:scale-105"
              >
                <span className="font-manrope text-[10.5px] sm:text-[12.5px] text-white tracking-wide font-semibold leading-tight select-none">
                  {card.label}
                </span>
              </motion.div>
            );
          })}

          {/* MIDDLE: Thin connecting streams which draw & converge from left to right */}
          <svg 
            viewBox="0 0 100 100" 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          >
            <defs>
              <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7e72b8" stopOpacity="0.1" />
                <stop offset="45%" stopColor="#9a8fcf" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#cbbef0" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {leftCardConfigs.map((card, idx) => {
              return (
                <motion.path
                  key={card.id}
                  d={`M ${card.portX} ${card.portY} C ${(card.portX + 62) / 2} ${card.portY}, ${(card.portX + 62) / 2} 50, 62 50`}
                  fill="none"
                  stroke="url(#stream-gradient)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.08 }}
                />
              );
            })}
          </svg>

          {/* RIGHT SIDE: One large, bright purple Hero Card scaling up with soft violet bloom */}
          <div className="absolute top-[50%] -translate-y-[50%] left-[62%] z-30">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                isInView 
                  ? {
                      opacity: 1,
                      scale: 1,
                      boxShadow: "0 0 35px rgba(164, 132, 255, 0.35)"
                    }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] border border-[#a484ff]/45 rounded-2xl p-4 sm:p-5 w-[145px] sm:w-[175px] shadow-2xl flex flex-col justify-between text-left h-[110px] sm:h-[130px] relative overflow-hidden"
            >
                  {/* Subtle top glare gloss highlight */}
                  <div className="absolute top-0 inset-x-0 h-[30%] bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />

                  {/* Complete checkmark icon backplate */}
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shadow-md relative z-10 transform -translate-y-1">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
                  </div>
                  
                  {/* Headline & details */}
                  <div className="relative z-10 space-y-1">
                    <h4 className="font-instrument text-lg sm:text-2xl font-light text-white tracking-tight leading-none">
                      Keycodes
                    </h4>
                    <p className="font-manrope text-[9px] sm:text-[10px] text-white/80 font-bold uppercase tracking-widest leading-none">
                      One team · One subscription
                    </p>
                  </div>
                </motion.div>
          </div>

        </div>

      </div>

    </section>
  );
}
