import React, { useState, useEffect } from "react";
import { X, Check, Sparkles, TrendingUp, Cpu, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onOpenSignUp?: (mode: "signup" | "signin") => void;
}

export default function PricingModal({ isOpen, onClose, onSuccess, onOpenSignUp }: PricingModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"primary" | "premium">("primary");
  const [showValueBreakdown, setShowValueBreakdown] = useState(false);
  const [isSlashed, setIsSlashed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger the price slash animation after 1.5 seconds
      const timer = setTimeout(() => {
        setIsSlashed(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsSlashed(false);
    }
  }, [isOpen]);

  const handleStartTrial = () => {
    onClose();
    if (onOpenSignUp) {
      // Connect the Seven-Day Trial button directly to the sign-in/sign-up page
      onOpenSignUp("signin");
    } else if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="Pricing-Modal-Container" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
          {/* Backdrop Blur */}
          <motion.div
            id="Pricing-Modal-Backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#090315]/95 backdrop-blur-md"
          />

          {/* Modal Content - Elegant, Compact & Strictly Non-Scrollable */}
          <motion.div
            id="Pricing-Modal-Card"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            className="relative w-full max-w-2xl rounded-2xl border border-[#a484ff]/30 bg-[#12072e] shadow-[0_0_80px_rgba(164,132,255,0.25)] p-4 sm:p-5 md:p-6 z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 p-1 rounded-lg text-[#bc9eff]/60 hover:text-white hover:bg-[#a484ff]/10 transition-all cursor-pointer z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Offer Header Section */}
            <div className="text-center space-y-2.5 mb-5 pr-5">
              <h2 className="text-2xl sm:text-3xl font-normal font-instrument tracking-tight text-white">
                Simple, Flat-Rate Pricing
              </h2>
              {/* Premium Free Branding Trial Messaging */}
              <div className="py-2 px-4 bg-[#7c3aed]/20 border border-[#a484ff]/25 rounded-lg max-w-xl mx-auto">
                <p className="text-[12px] sm:text-[13px] text-[#bc9eff]/95 font-semibold font-manrope leading-relaxed">
                  Get 1x Guaranteed DFY Automation Workflow In Your 7-Day Trial, Or We Pay You $200.
                </p>
              </div>
            </div>

            {/* Single Centered Plan Card */}
            <div className="max-w-md mx-auto mb-4">
              
              {/* PLAN 1: Primary Engineering Package (With Trial) */}
              <div 
                className="relative rounded-xl p-5 flex flex-col justify-between border-[#a484ff] bg-[#1a0c3b] shadow-[0_0_20px_rgba(164,132,255,0.25)] ring-1.5 ring-[#a484ff]/55 text-left"
              >
                {/* Free Trial Box Badge - Made larger, bolder, and highly readable */}
                <div className="absolute -top-3.5 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-manrope shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                  Free Trial Box
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold tracking-tight text-white font-manrope">Primary Engineering Package</h3>
                    
                    {/* Visual Price Slashed Display with animated red cross and FREE fade-in next to it */}
                    <div className="flex items-center gap-3.5 mt-1.5 flex-wrap h-10">
                      <div className="relative inline-block px-1 select-none">
                        <span className="text-xl sm:text-2xl font-bold font-instrument tracking-tight text-[#bc9eff]/40 transition-colors duration-500">
                          $1,250
                        </span>
                        {/* Smooth animated red cross/strikethrough */}
                        <motion.div 
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isSlashed ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none origin-left"
                        >
                          <div className="w-[125%] h-[2.5px] bg-rose-600 rounded -rotate-12 absolute shadow-lg" />
                          <div className="w-[125%] h-[2.5px] bg-rose-600 rounded rotate-12 absolute shadow-lg" />
                        </motion.div>
                      </div>
                      
                      <AnimatePresence>
                        {isSlashed && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.6, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col"
                          >
                            <span className="text-2xl sm:text-3xl font-extrabold font-instrument tracking-tight text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)] animate-pulse">
                              FREE
                            </span>
                            <span className="text-[8px] text-emerald-400/80 font-bold uppercase tracking-wider font-manrope">Next 7 Days</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="h-[1px] bg-[#a484ff]/20" />

                  {/* Features List - strictly capitalized */}
                  <ul className="space-y-2 text-xs text-white/85 font-manrope">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Unlimited Tasks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Dedicated Development Team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>1x Dedicated AI Engineer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>1x Software Project Manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>24/7 Support</span>
                    </li>
                  </ul>
                </div>

                {/* Interactive Value Breakdown Element (Triggerable via hover or click) */}
                <div className="mt-4 pt-3 border-t border-[#a484ff]/20">
                  <div
                    onMouseEnter={() => { if (!showValueBreakdown) setShowValueBreakdown(true); }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent selecting the card on clicking value toggle
                      setShowValueBreakdown(!showValueBreakdown);
                    }}
                    className="w-full flex items-center justify-between group cursor-pointer text-left py-1.5 px-2.5 rounded-md bg-[#25154d]/40 hover:bg-[#25154d]/80 border border-[#a484ff]/20 transition-all"
                  >
                    <span className="text-[9px] text-white/85 font-semibold font-manrope uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#a484ff]" /> Value Breakdown
                    </span>
                    <span className="text-[9px] font-bold text-[#bc9eff] font-manrope">
                      {showValueBreakdown ? "Close Panel ▲" : "View Worth ▼"}
                    </span>
                  </div>

                  {/* Minimalist, Brand-aligned Value Breakdown (deep violet, crisp lines) */}
                  <AnimatePresence>
                    {showValueBreakdown && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#1b0a3c] border border-[#a484ff]/30 rounded-lg p-2.5 space-y-2 mt-2 text-left overflow-hidden"
                      >
                        {/* 1. Engineering Capacity */}
                        <div className="space-y-0.5">
                          <div className="flex justify-between text-[10px] font-manrope">
                            <span className="text-[#bc9eff]/90 font-medium">Engineering Capacity</span>
                            <span className="text-white font-extrabold">$3,500 / Month</span>
                          </div>
                          {/* Crisp, minimalist line */}
                          <div className="h-[1px] w-full bg-gradient-to-r from-[#a484ff]/40 to-transparent" />
                        </div>

                        {/* 2. Management Team */}
                        <div className="space-y-0.5">
                          <div className="flex justify-between text-[10px] font-manrope">
                            <span className="text-[#bc9eff]/90 font-medium">Management Team</span>
                            <span className="text-white font-extrabold">$2,000 / Month</span>
                          </div>
                          {/* Crisp, minimalist line */}
                          <div className="h-[1px] w-full bg-gradient-to-r from-[#a484ff]/40 to-transparent" />
                        </div>

                        {/* Direct Comparative Value Panel */}
                        <div className="pt-2 border-t border-[#a484ff]/20 text-[10px] font-manrope space-y-1">
                          <div className="flex justify-between text-[#bc9eff]/90">
                            <span>Total Value:</span>
                            <span className="font-extrabold text-white">$5,500 / Month</span>
                          </div>
                          <div className="flex justify-between text-[#bc9eff]/90">
                            <span>Keycodes Package Price:</span>
                            <span className="font-extrabold text-[#bc9eff]">$1,250 / Month</span>
                          </div>
                          <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-[#a484ff]/15">
                            <span>Your Saved Margin:</span>
                            <span className="font-extrabold">+$4,250 / Month</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* CTA Action Section */}
            <div className="space-y-3.5 text-center">
              <button
                onClick={handleStartTrial}
                className="w-full py-3 px-5 bg-gradient-to-r from-[#7c3aed] to-[#a484ff] hover:from-[#6d28d9] hover:to-[#8b5cf6] text-white font-bold rounded-xl text-xs sm:text-sm font-manrope tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-[#7c3aed]/30"
              >
                Start Your 7-Day Free Trial
              </button>
              
              <p className="text-[10px] text-[#bc9eff]/60 font-manrope max-w-md mx-auto leading-relaxed">
                No Credit Card Required Upfront To Sign Up. Cancel Anytime Within Your 7-Day Trial With A Single Click. Workflows Delivered During Trial Are Yours To Keep.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
