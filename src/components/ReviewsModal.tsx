import React from "react";
import { X, Star, Sparkles, MapPin, Smile } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REVIEWS = [
  {
    author: "Alexander Mercer",
    role: "Elite Voyager",
    hotel: "Amalfi Serenade Resort",
    rating: 5,
    date: "May 2026",
    content: "The instant booking with Datacore was absolutely flawless. I was checked into my cliffside suite overlooking the Tyrrhenian Sea within minutes of landing. Highly recommend!",
    location: "Amalfi Coast, Italy"
  },
  {
    author: "Emi Shionoji",
    role: "Aesthetic Traveler",
    hotel: "Kyoto Bamboo Shrines & Spa",
    rating: 5,
    date: "April 2026",
    content: "Finding genuine, handpicked cultural stays can be a struggle, but Datacore filtered exactly the heritage luxury spa we needed. Phenomenal customer support at 2 AM Kyoto time.",
    location: "Kyoto, Japan"
  },
  {
    author: "Marcus Vance",
    role: "Tech Advisor",
    hotel: "The Obsidian Skyline Hotel",
    rating: 5,
    date: "June 2026",
    content: "A masterpiece of UX and instant checkout. No hidden resort fees or dynamic surge surprises. Best booking system I've used in a decade.",
    location: "New York, USA"
  }
];

export default function ReviewsModal({ isOpen, onClose }: ReviewsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="reviews-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            id="reviews-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#090714]/85 backdrop-blur-md"
          />

          <motion.div
            id="reviews-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#161226]/95 p-6 shadow-2xl md:p-8"
          >
            {/* Top glow */}
            <div id="reviews-modal-glow" className="absolute -top-[50px] -left-[50px] h-36 w-36 rounded-full bg-brand-purple/20 blur-3xl pointer-events-none" />

            <button
              id="reviews-modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
                  <Star className="h-3 w-3 fill-brand-purple" />
                </span>
                <span className="font-manrope text-[10px] font-semibold uppercase tracking-wider text-brand-purple-light text-[#a484ff]">Verified Guest Ledger</span>
              </div>
              <h3 id="reviews-modal-title" className="mt-2 font-instrument text-3xl font-normal tracking-normal text-white leading-snug">
                What the Community Says
              </h3>
              <p className="mt-1 font-manrope text-sm text-white/50">
                Transparent reviews from discerning travelers globally.
              </p>
            </div>

            <div className="mt-6 space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {REVIEWS.map((review, i) => (
                <div key={i} className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-manrope text-sm font-semibold text-white">{review.author}</h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                        <span>{review.role}</span>
                        <span className="h-1 w-1 rounded-full bg-white/20"></span>
                        <span className="text-brand-purple">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="font-manrope text-xs text-white/80 leading-relaxed font-light">
                    "{review.content}"
                  </p>

                  <div className="flex justify-between items-center text-[10px] font-manrope text-white/40 pt-1 border-t border-white/[0.04]">
                    <span className="text-white/60 font-semibold">{review.hotel}</span>
                    <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5 text-brand-purple" /> {review.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
