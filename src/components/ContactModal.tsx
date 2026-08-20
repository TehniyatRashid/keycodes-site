import React, { useState } from "react";
import { X, Send, Mail, MapPin, Calendar, HelpCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [step, setStep] = useState<"form" | "success">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.msg) return;
    setStep("success");
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", msg: "" });
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="contact-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            id="contact-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#090714]/85 backdrop-blur-md"
          />

          <motion.div
            id="contact-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#161226]/95 p-6 shadow-2xl md:p-8 grid md:grid-cols-5 gap-6"
          >
            <button
              id="contact-modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column Information */}
            <div className="md:col-span-2 space-y-6 pt-4 text-left">
              <div>
                <span className="font-manrope text-[10px] font-semibold uppercase tracking-wider text-brand-purple">Datacore Concierge</span>
                <h3 className="mt-1 font-instrument text-2xl font-normal tracking-normal text-white leading-snug">
                  Contact Us
                </h3>
              </div>

              <div className="space-y-4 font-manrope text-xs text-white/60">
                <div className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Direct Line</p>
                    <a 
                      href="mailto:info@keycodes.dev" 
                      className="font-light text-white/50 hover:text-brand-purple transition-colors select-all"
                    >
                      info@keycodes.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Book a demo with us</p>
                    <a 
                      href="https://api.leadconnectorhq.com/widget/booking/TVQ3oQOla09cAZ9OqCOv" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-light text-white/50 hover:text-brand-purple transition-colors underline decoration-white/10 hover:decoration-brand-purple/30 underline-offset-4"
                    >
                      Schedule Session &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-brand-purple shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Headquarters</p>
                    <p className="font-light">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.05]">
                <p className="font-manrope text-[10px] text-white/40 leading-relaxed font-light">
                  Our dispatchers are online 24/7. Inquiries are routed through ultra-fast CDN messaging gateways.
                </p>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="md:col-span-3">
              {step === "form" ? (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <div>
                    <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all font-light font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all font-light font-manrope"
                    />
                  </div>

                  <div>
                    <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.msg}
                      onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                      placeholder="How can we assist your stay or demo booking?"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all font-light font-manrope resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-purple py-2 font-manrope text-xs font-semibold text-white hover:bg-[#8d54ff] transition-all duration-300 shadow-md shadow-brand-purple/10 active:scale-[0.98]"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Transmit Message
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center justify-center h-full py-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7C3AED]/15 text-[#bc9eff] mb-4 border border-[#a484ff]/20 animate-fade-in">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <h4 className="font-instrument text-2xl font-normal tracking-normal text-white mb-1.5 leading-snug">
                    Transmission Sent!
                  </h4>
                  <p className="font-manrope text-xs text-white/60 max-w-[220px]">
                    Thanks, <span className="text-white font-medium">{formData.name}</span>! Our concierge dispatchers will alert you shortly.
                  </p>

                  <button
                    onClick={handleReset}
                    className="mt-6 px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white font-manrope text-xs font-medium rounded-md transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
