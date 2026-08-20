import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Zap, RefreshCw, BarChart3, Database, Workflow, Clock, Layers, ArrowLeftRight } from "lucide-react";

export default function StrategySection() {
  const [state, setState] = useState<"before" | "after">("after");

  // Auto-cycle state every 6 seconds to show dynamic movement (can also be toggled manually)
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => (prev === "after" ? "before" : "after"));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="strategy-section" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left">
      
      {/* Strategy and Content Creation title block */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-[1px] bg-white/10 flex-grow hidden sm:block" />
        <h2 className="font-instrument text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.15] text-center px-4 bg-gradient-to-r from-white via-white/90 to-[#d5c9ff] bg-clip-text text-transparent">
          What Changes When You Automate With Us
        </h2>
        <div className="h-[1px] bg-white/10 flex-grow hidden sm:block" />
      </div>

      {/* Interactive State Toggle Pill - Framer style */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#17142a] border border-[#a484ff]/30 rounded-full p-2.5 shadow-2xl backdrop-blur-md">
          <button
            onClick={() => setState("before")}
            className={`relative px-10 py-4.5 text-xs sm:text-sm font-bold font-manrope rounded-full uppercase tracking-widest transition-all duration-300 flex items-center justify-center select-none cursor-pointer ${
              state === "before" 
                ? "text-[#d5c9ff] shadow-[0_0_25px_rgba(164,132,255,0.25)]" 
                : "text-[#7d74a1] hover:text-[#b3a7eb]"
            }`}
          >
            {state === "before" && (
              <motion.span 
                layoutId="active-toggle-indicator" 
                className="absolute inset-0 bg-[#7e72b8]/30 border border-[#b3a7eb]/50 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">Before</span>
          </button>

          <button
            onClick={() => setState("after")}
            className={`relative px-10 py-4.5 text-xs sm:text-sm font-bold font-manrope rounded-full uppercase tracking-widest transition-all duration-300 flex items-center justify-center select-none cursor-pointer ${
              state === "after" 
                ? "text-[#d5c9ff] shadow-[0_0_25px_rgba(164,132,255,0.25)]" 
                : "text-[#7d74a1] hover:text-[#b3a7eb]"
            }`}
          >
            {state === "after" && (
              <motion.span 
                layoutId="active-toggle-indicator" 
                className="absolute inset-0 bg-[#7e72b8]/30 border border-[#b3a7eb]/50 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">After</span>
          </button>
        </div>
      </div>

      {/* Twin Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Card: AI Consulting & Strategies */}
        <div className="group relative bg-[#130f24]/50 border border-white/[0.06] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md hover:border-white/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed]/5 rounded-full filter blur-[80px] pointer-events-none -mr-20 -mt-20" />
          
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-light font-instrument text-white tracking-tight leading-tight">
              Cut Costs, Not Corners.
            </h3>
            <p className="text-sm text-white/60 font-manrope font-light leading-relaxed max-w-sm">
              We connect your tools so everything runs automatically. No manual work, no wasted budget.
            </p>
          </div>

          {/* Interactive Graphic Box with Before/After Motion */}
          <div className="mt-8 bg-[#16122b]/50 border border-white/5 rounded-2xl p-6 relative min-h-[220px] flex flex-col justify-end gap-5 overflow-hidden">
            
            {/* Corner Badge Tracker */}
            <div className="absolute top-4 right-4 z-20">
              <AnimatePresence mode="wait">
                {state === "after" ? (
                  <motion.div
                    key="after-badge"
                    initial={{ opacity: 0, scale: 0.8, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 5 }}
                    className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 font-manrope font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.35)]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                    <span>After</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="before-badge"
                    initial={{ opacity: 0, scale: 0.8, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 5 }}
                    className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-manrope font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  >
                    <Clock className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                    <span>Before</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated Side-Axis bars representing alignment grids */}
            <div className="absolute left-4 top-4 bottom-4 w-4 flex gap-1 items-end pointer-events-none opacity-40">
              <div className="w-1 bg-[#7c3aed]/20 rounded-full h-full" />
              <div className="w-1 bg-[#7c3aed]/40 rounded-full h-2/3" />
              <div className="w-1 bg-[#7c3aed]/10 rounded-full h-1/2" />
            </div>

            {/* Horizontal progress/impact bars representing Growth, Efficiency, Cost */}
            <div className="pl-6 space-y-4 w-full relative z-10">
              
              {/* Row 1: Growth Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-manrope tracking-widest uppercase font-extrabold text-white/40">
                  <span>Growth Velocity</span>
                </div>
                <div className="h-6 w-full bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden relative flex items-center">
                  <motion.div 
                    initial={{ width: "10%" }}
                    animate={{ width: state === "after" ? "50%" : "15%" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="h-full bg-gradient-to-r from-[#635BFF]/35 to-[#7c3aed]/50 rounded-r-md relative"
                  />
                  <div className="absolute right-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={state}
                        initial={{ opacity: 0, scale: 0.8, x: 5 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -5 }}
                        className={`font-manrope text-[10px] font-extrabold px-2.5 py-0.5 rounded transition-all duration-300 whitespace-nowrap ${
                          state === "after"
                            ? "bg-[#2d1254] text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(164,132,255,0.35)]"
                            : "bg-[#14121a] text-zinc-400 border border-white/5"
                        }`}
                      >
                        {state === "after" ? "Growth +250%" : "Growth +10%"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Row 2: Efficiency Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-manrope tracking-widest uppercase font-extrabold text-white/40">
                  <span>Task Efficiency</span>
                </div>
                <div className="h-6 w-full bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden relative flex items-center">
                  <motion.div 
                    initial={{ width: "50%" }}
                    animate={{ width: state === "after" ? "45%" : "25%" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="h-full bg-gradient-to-r from-[#7c3aed]/35 to-violet-500/50 rounded-r-md"
                  />
                  <div className="absolute right-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={state}
                        initial={{ opacity: 0, scale: 0.8, x: 5 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -5 }}
                        className={`font-manrope text-[10px] font-extrabold px-2.5 py-0.5 rounded transition-all duration-300 whitespace-nowrap ${
                          state === "after"
                            ? "bg-[#2d1254] text-purple-200 border border-purple-400/40 shadow-[0_0_12px_rgba(164,132,255,0.35)]"
                            : "bg-[#14121a] text-zinc-400 border border-white/5"
                        }`}
                      >
                        {state === "after" ? "Efficiency +200%" : "Efficiency -50%"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Row 3: Cost-Avoidance Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-manrope tracking-widest uppercase font-extrabold text-white/40">
                  <span>Overhead Cost</span>
                </div>
                <div className="h-6 w-full bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden relative flex items-center">
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: state === "after" ? "10%" : "50%" }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="h-full bg-gradient-to-r from-red-500/35 to-rose-500/40 rounded-r-md"
                  />
                  <div className="absolute right-2">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={state}
                        initial={{ opacity: 0, scale: 0.8, x: 5 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -5 }}
                        className={`font-manrope text-[10px] font-extrabold px-2.5 py-0.5 rounded transition-all duration-300 whitespace-nowrap ${
                          state === "after"
                            ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                            : "bg-red-950/60 text-red-300 border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.35)]"
                        }`}
                      >
                        {state === "after" ? "Cost -100%" : "Cost +100%"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Card: Let AI Move Data For You */}
        <div className="group relative bg-[#130f24]/50 border border-white/[0.06] rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md hover:border-white/10 transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed]/5 rounded-full filter blur-[80px] pointer-events-none -mr-20 -mt-20" />
          
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-light font-instrument text-white tracking-tight leading-tight">
              Automated Data Bridges | Save 30+ Hours
            </h3>
            <p className="text-sm text-white/60 font-manrope font-light leading-relaxed max-w-sm">
              We eliminate repetitive manual administrative tasks so your staff can focus on revenue outcomes rather than copy-pasting.
            </p>
          </div>

          {/* Sliding Folder Stack Graphic Frame representing automations movement */}
          <div className="mt-8 bg-[#16122b]/50 border border-white/5 rounded-2xl p-6 relative min-h-[220px] flex items-center justify-center overflow-hidden">
            
            {/* Folder 1: Background Left Folder */}
            <motion.div 
              animate={{ 
                x: state === "after" ? -25 : -10,
                y: state === "after" ? 8 : -12,
                opacity: state === "after" ? 0.35 : 0.7,
                scale: state === "after" ? 0.92 : 1.05
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute w-[200px] h-[135px] border border-white/10 bg-[#120f2b]/80 rounded-2xl shadow-xl flex flex-col p-4 pointer-events-none"
            >
              {/* Folder tab */}
              <div className="absolute -top-3 left-4 w-16 h-4 bg-[#120f2b]/80 border-t border-x border-white/10 rounded-t-lg" />
              <div className="flex gap-2 mb-2 items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40" />
                <div className="w-12 h-2 bg-indigo-500/20 rounded-full" />
              </div>
              <div className="flex-1 border border-dashed border-white/5 rounded-lg flex items-center justify-center text-[10px] text-white/20 uppercase tracking-widest font-mono">
                Manual Archive
              </div>
            </motion.div>

            {/* Folder 2: Foreground Centered Interactive Folder */}
            <motion.div 
              animate={{ 
                scale: state === "after" ? 1.05 : 0.95,
                y: state === "after" ? -5 : 12,
                x: state === "after" ? 5 : -5,
                boxShadow: state === "after" ? "0 25px 50px -12px rgba(124,58,237,0.25)" : "0 10px 20px -5px rgba(0,0,0,0.4)"
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative w-[280px] h-[190px] border border-white/15 bg-[#1a163a]/90 rounded-2xl p-4 z-10 flex flex-col justify-between overflow-hidden select-none"
            >
              {/* Folder Header Tab with glow */}
              <div className="absolute -top-3.5 left-5 w-24 h-[15px] bg-[#1a163a] border-t border-x border-white/15 rounded-t-lg flex items-center justify-center">
                <span className="text-[7.5px] font-extrabold font-manrope text-[#a484ff] uppercase tracking-widest">Active Pipeline</span>
              </div>

              {/* Active integration logos inside the absolute/layout-driven container */}
              <div className="flex-grow relative mt-2">
                
                {/* Animated Connection Paths to One Database (Dynamic & Responsive SVG Overlay) */}
                <AnimatePresence>
                  {state === "after" && (
                    <motion.svg 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible"
                    >
                      <defs>
                        <linearGradient id="glowGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="glowGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>

                      {/* Glow path overlays */}
                      <path d="M 34 23 C 36 23, 37 32, 38 32" fill="none" stroke="url(#glowGradLeft)" strokeWidth="3.5" strokeLinecap="round" className="opacity-30 blur-[2px]" />
                      <path d="M 66 23 C 64 23, 63 32, 62 32" fill="none" stroke="url(#glowGradRight)" strokeWidth="3.5" strokeLinecap="round" className="opacity-30 blur-[2px]" />
                      <path d="M 34 65 C 36 65, 37 48, 38 48" fill="none" stroke="url(#glowGradLeft)" strokeWidth="3.5" strokeLinecap="round" className="opacity-30 blur-[2px]" />
                      <path d="M 66 65 C 64 65, 63 48, 62 48" fill="none" stroke="url(#glowGradRight)" strokeWidth="3.5" strokeLinecap="round" className="opacity-30 blur-[2px]" />
                      <path d="M 50 58 L 50 68" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" className="opacity-35 blur-[2px]" />

                      {/* Core line paths */}
                      <path d="M 34 23 C 36 23, 37 32, 38 32" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />
                      <path d="M 66 23 C 64 23, 63 32, 62 32" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />
                      <path d="M 34 65 C 36 65, 37 48, 38 48" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />
                      <path d="M 66 65 C 64 65, 63 48, 62 48" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />
                      <path d="M 50 58 L 50 68" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" className="opacity-85" />

                      {/* Animating Sparkles along paths */}
                      <motion.path 
                        d="M 34 23 C 36 23, 37 32, 38 32" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="1.8" 
                        strokeDasharray="4 20" 
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -48] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
                      />
                      <motion.path 
                        d="M 66 23 C 64 23, 63 32, 62 32" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="1.8" 
                        strokeDasharray="4 20" 
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -48] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
                      />
                      <motion.path 
                        d="M 34 65 C 36 65, 37 48, 38 48" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="1.8" 
                        strokeDasharray="4 20" 
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -48] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
                      />
                      <motion.path 
                        d="M 66 65 C 64 65, 63 48, 62 48" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="1.8" 
                        strokeDasharray="4 20" 
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -48] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
                      />
                      <motion.path 
                        d="M 50 58 L 50 68" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 12" 
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -24] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>

                {/* 1. Twitter/X icon */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  style={{
                    position: "absolute",
                    left: state === "after" ? "10%" : "6%",
                    top: state === "after" ? "10%" : "10%",
                    width: state === "after" ? "24%" : "26%",
                    height: state === "after" ? "26%" : "32%",
                  }}
                  className={`flex items-center justify-center rounded-xl transition-all duration-500 z-10 ${
                    state === "after"
                      ? "bg-[#120f1c]/80 border border-[#a484ff]/30 shadow-[0_0_12px_rgba(164,132,255,0.15)]"
                      : "bg-white/[0.04] border border-white/10"
                  }`}
                >
                  <svg className={`h-4 w-4 transition-colors duration-500 ${state === "after" ? "text-[#bc9eff]" : "text-white/90"}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.div>

                {/* 2. Discord icon */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  style={{
                    position: "absolute",
                    left: state === "after" ? "66%" : "37%",
                    top: state === "after" ? "10%" : "10%",
                    width: state === "after" ? "24%" : "26%",
                    height: state === "after" ? "26%" : "32%",
                  }}
                  className={`flex items-center justify-center rounded-xl transition-all duration-500 z-10 ${
                    state === "after"
                      ? "bg-[#120f1c]/80 border border-[#a484ff]/30 shadow-[0_0_12px_rgba(164,132,255,0.15)]"
                      : "bg-white/[0.04] border border-white/10"
                  }`}
                >
                  <svg className={`h-4 w-4 transition-colors duration-500 ${state === "after" ? "text-[#bc9eff]" : "text-white/90"}`} viewBox="0 0 127.14 96.36" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.48,6.83,77.19,77.19,0,0,0,49.18,0,105.15,105.15,0,0,0,18.74,8.07C-3.61,41.38-2,73.81,9.6,90.41a105.73,105.73,0,0,0,32,16.15,79,79,0,0,0,6.71-11,68.6,68.6,0,0,1-10.64-5.12c.91-.67,1.81-1.37,2.65-2.1a75.22,75.22,0,0,0,73.6,0c.84.73,1.74,1.43,2.65,2.1a68.86,68.86,0,0,1-10.64,5.12,79,79,0,0,0,6.71,11,105.73,105.73,0,0,0,32-16.15C130,73.81,127.3,41.38,107.7,8.07ZM42.45,73.12C36.14,73.12,31,67.36,31,60.27s5.14-12.85,11.45-12.85,11.52,5.76,11.45,12.85S48.76,73.12,42.45,73.12Zm42.24,0c-6.31,0-11.45-5.76-11.45-12.85s5.14-12.85,11.45-12.85,11.52,5.76,11.45,12.85S91,73.12,84.69,73.12Z" />
                  </svg>
                </motion.div>

                {/* 3. Automation trigger indicator / Sparkles icon */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  style={{
                    position: "absolute",
                    left: state === "after" ? "10%" : "68%",
                    top: state === "after" ? "52%" : "10%",
                    width: state === "after" ? "24%" : "26%",
                    height: state === "after" ? "26%" : "32%",
                  }}
                  className={`flex items-center justify-center rounded-xl transition-all duration-500 z-10 ${
                    state === "after"
                      ? "bg-[#7c3aed]/15 border border-[#a484ff]/40 shadow-[0_0_12px_rgba(164,132,255,0.2)]"
                      : "bg-[#7c3aed]/10 border border-[#7c3aed]/20"
                  }`}
                >
                  <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
                </motion.div>

                {/* 4. DB / Database Sync Icon (Transforms to Gorgeous 3D Cylinder) */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  style={{
                    position: "absolute",
                    left: state === "after" ? "37%" : "6%",
                    top: state === "after" ? "14%" : "50%",
                    width: state === "after" ? "26%" : "26%",
                    height: state === "after" ? "50%" : "32%",
                  }}
                  className="z-20 flex items-center justify-center"
                >
                  {state === "before" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.04] border border-white/10 rounded-xl transition-all duration-300">
                      <Database className="h-4 w-4 text-purple-300/80" />
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full relative flex flex-col items-center justify-center"
                    >
                      {/* Minimal Cartoonish Outline DB Icon */}
                      <svg className="w-14 h-[76px] overflow-visible" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Transparent subtle glass inner cylinder path */}
                        <path d="M10 20 C10 12, 50 12, 50 20 L50 60 C50 68, 10 68, 10 60 Z" fill="rgba(164, 132, 255, 0.04)" />

                        {/* Side walls */}
                        <path d="M10 20 L10 60" stroke="#a484ff" strokeWidth="2" strokeLinecap="round" />
                        <path d="M50 20 L50 60" stroke="#a484ff" strokeWidth="2" strokeLinecap="round" />

                        {/* Top lid ring with glowing cyan */}
                        <ellipse cx="30" cy="20" rx="20" ry="8" stroke="#22d3ee" strokeWidth="2.5" filter="url(#neon-glow)" />
                        <ellipse cx="30" cy="20" rx="12" ry="4.8" stroke="#a484ff" strokeWidth="1.5" strokeDasharray="3 3" />

                        {/* Middle cylinder ring curves */}
                        <path d="M10 40 C10 48, 50 48, 50 40" stroke="#a484ff" strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" />
                        
                        {/* Bottom cylinder ring with glowing cyan */}
                        <path d="M10 60 C10 68, 50 68, 50 60" stroke="#22d3ee" strokeWidth="2.5" filter="url(#neon-glow)" strokeLinecap="round" />

                        {/* Blinking green status indicator */}
                        <circle cx="30" cy="50" r="2" fill="#10B981" filter="url(#neon-glow)" className="animate-pulse" />
                      </svg>
                    </motion.div>
                  )}
                </motion.div>

                {/* 5. Workflow Line representation logo / Workflow (GIF) */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  style={{
                    position: "absolute",
                    left: state === "after" ? "35%" : "37%",
                    top: state === "after" ? "68%" : "50%",
                    width: state === "after" ? "30%" : "26%",
                    height: state === "after" ? "20%" : "32%",
                  }}
                  className={`flex items-center justify-center rounded-xl select-none transition-all duration-500 z-10 ${
                    state === "after"
                      ? "bg-[#7c3aed]/30 border border-[#a484ff]/40 shadow-[0_0_12px_rgba(164,132,255,0.2)]"
                      : "bg-[#7c3aed]/20 border border-[#a484ff]/30"
                  }`}
                >
                  <span className="font-extrabold text-[10px] font-manrope text-white uppercase tracking-widest leading-none">GIF</span>
                </motion.div>

                {/* 6. Sync box / Layers */}
                <motion.div 
                  layout
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                  style={{
                    position: "absolute",
                    left: state === "after" ? "66%" : "68%",
                    top: state === "after" ? "52%" : "50%",
                    width: state === "after" ? "24%" : "26%",
                    height: state === "after" ? "26%" : "32%",
                  }}
                  className={`flex items-center justify-center rounded-xl transition-all duration-500 z-10 ${
                    state === "after"
                      ? "bg-[#120f1c]/80 border border-[#a484ff]/30 shadow-[0_0_12px_rgba(164,132,255,0.15)]"
                      : "bg-white/[0.04] border border-white/10"
                  }`}
                >
                  <Layers className={`h-4 w-4 transition-colors duration-500 ${state === "after" ? "text-[#bc9eff]" : "text-indigo-300"}`} />
                </motion.div>

              </div>

              {/* Ingress activity telemetry indicator at bottom of folder */}
              <div className="pt-2 border-t border-white/5 flex justify-center items-center text-[8.5px] font-manrope text-white/50">
                <div className="flex items-center gap-1.5">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${state === "after" ? "bg-[#10B981] shadow-[0_0_10px_#10B981]" : "bg-amber-400 animate-pulse"}`} />
                  <span className="font-extrabold tracking-wider">{state === "after" ? "SYNCED" : "AWAITING SYNC"}</span>
                </div>
              </div>
            </motion.div>

            {/* Folder 3: Background Right Folder stack */}
            <motion.div 
              animate={{ 
                x: state === "after" ? 25 : 10,
                y: state === "after" ? -10 : 8,
                opacity: state === "after" ? 0.4 : 0.7,
                scale: state === "after" ? 0.95 : 1.05
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="absolute w-[184px] h-[125px] border border-white/10 bg-[#120f2b]/70 rounded-2xl shadow-xl flex flex-col p-4 pointer-events-none"
            >
              {/* Folder tab */}
              <div className="absolute -top-3 right-4 w-16 h-4 bg-[#120f2b]/70 border-t border-x border-white/10 rounded-t-lg" />
              <div className="flex gap-2 mb-2 items-center justify-end">
                <div className="w-12 h-2 bg-[#7c3aed]/20 rounded-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]/40" />
              </div>
              <div className="flex-1 border border-dashed border-white/5 rounded-lg flex items-center justify-center text-[10px] text-white/20 uppercase tracking-widest font-mono">
                Workload DB
              </div>
            </motion.div>

          </div>
        </div>

      </div>

    </section>
  );
}
