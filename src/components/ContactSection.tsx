import React, { useState } from "react";
import { Send, Mail, MapPin, Calendar, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GOOGLE_SCRIPT_URL } from "../utils/config";

interface ContactSectionProps {
  triggerNotification?: (msg: string) => void;
}

export default function ContactSection({ triggerNotification }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", contactNo: "", msg: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.contactNo || !formData.msg) return;

    setStatus("submitting");
    
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify({
          type: "contact",
          name: formData.name,
          email: formData.email,
          contactNo: formData.contactNo,
          msg: formData.msg
        })
      });

      setStatus("success");
      if (triggerNotification) {
        triggerNotification(`Message from ${formData.name} successfully queued.`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("idle");
      if (triggerNotification) {
        triggerNotification("Transmission failed. Please try again.");
      }
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", contactNo: "", msg: "" });
    setStatus("idle");
  };

  return (
    <section 
      id="contact-section"
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 px-6 sm:px-8 md:px-12 lg:px-[120px] z-10 bg-transparent scroll-mt-22"
    >
      {/* Decorative Brand Gradient Glows */}
      <div className="absolute left-10 top-1/4 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[110px] pointer-events-none select-none" />
      <div className="absolute right-1/4 bottom-1/4 w-[400px] h-[400px] bg-[#7b39fc]/5 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <h2 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.15]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2dbff] to-[#a484ff]">
              Secure Transmission Channel
            </span>
          </h2>
          <p className="text-sm sm:text-base text-white/55 font-manrope font-normal max-w-2xl mx-auto leading-relaxed">
            Ready to scale your engineering bandwidth? Reach out via our encrypted dispatch pipeline and align with a principal specialist today.
          </p>
        </div>

        {/* Contact Form Card Grid */}
        <div className="rounded-3xl bg-[#16122c]/10 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md p-6 sm:p-10 md:p-12 transition-all duration-300 hover:border-white/15">
          <div className="grid md:grid-cols-5 gap-8 sm:gap-12 items-start">
            
            {/* Left Side: Brand Details */}
            <div className="md:col-span-2 space-y-6 text-left">
              <div>

                <h3 className="mt-1 font-instrument text-2.5xl sm:text-3xl font-normal tracking-normal text-white leading-snug">
                  Contact Us
                </h3>
              </div>

              <div className="space-y-4 font-manrope text-xs sm:text-sm text-white/60">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#a484ff] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Direct Line</p>
                    <a 
                      href="mailto:info@keycodes.dev" 
                      className="font-light text-white/50 hover:text-[#a484ff] transition-colors select-all"
                    >
                      info@keycodes.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#a484ff] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Start a Free Trial</p>
                    <a 
                      href="https://portal.keycodes.dev/auth" 
                      className="font-light text-white/50 hover:text-[#a484ff] transition-colors underline decoration-white/10 hover:decoration-[#a484ff]/30 underline-offset-4"
                    >
                      Portal Login &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#a484ff] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Headquarters</p>
                    <p className="font-light text-white/50">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.05]">
                <p className="font-manrope text-[11px] text-white/40 leading-relaxed font-light">
                  Dispatch operations run 24/7. Telemetry messages are routed through secure, latency-optimized edge clusters.
                </p>
              </div>
            </div>

            {/* Right Side: Form / Success state */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1.5">Your Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/20 outline-none focus:border-[#a484ff]/50 focus:bg-[#251f3d] transition-all font-light font-manrope"
                        />
                      </div>

                      <div>
                        <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1.5">Email Address</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/20 outline-none focus:border-[#a484ff]/50 focus:bg-[#251f3d] transition-all font-light font-manrope"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1.5">Contact Number</label>
                      <input
                        required
                        type="tel"
                        value={formData.contactNo}
                        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/20 outline-none focus:border-[#a484ff]/50 focus:bg-[#251f3d] transition-all font-light font-manrope"
                      />
                    </div>

                    <div>
                      <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1.5">Your Message</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.msg}
                        onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                        placeholder="How can we assist your business operations?"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/20 outline-none focus:border-[#a484ff]/50 focus:bg-[#251f3d] transition-all font-light font-manrope resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c3aed] hover:bg-[#8d54ff] py-3 font-manrope text-xs sm:text-sm font-semibold text-white transition-all duration-300 shadow-md shadow-[#7c3aed]/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Transmit Secure Message
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center justify-center py-8 min-h-[300px]"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7c3aed]/15 text-[#bc9eff] mb-4 border border-[#a484ff]/20">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h4 className="font-instrument text-2xl sm:text-3xl font-normal tracking-normal text-white mb-2 leading-snug">
                      Transmission Successful
                    </h4>
                    <p className="font-manrope text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>! Your request has been queued. Our concierge team will reach out to you at <span className="text-white font-medium">{formData.contactNo}</span> or via email.
                    </p>

                    <button
                      onClick={handleReset}
                      className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/15 text-white font-manrope text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
