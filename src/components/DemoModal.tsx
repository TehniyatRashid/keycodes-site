import React, { useState } from "react";
import { X, Calendar, Clock, Smile, Sparkles, CheckCircle, Send, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    teamSize: "1-10",
    useCase: "",
    date: "",
    timeSlot: "10:00 AM"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStep("success");
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      teamSize: "1-10",
      useCase: "",
      date: "",
      timeSlot: "10:00 AM"
    });
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="demo-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop wrapper with blur */}
          <motion.div
            id="demo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#090714]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            id="demo-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#161226]/95 p-6 shadow-2xl md:p-8"
          >
            {/* Top decorative glow */}
            <div id="demo-modal-glow" className="absolute -top-[50px] -left-[50px] h-32 w-32 rounded-full bg-brand-purple/20 blur-3xl pointer-events-none" />

            <button
              id="demo-modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>

            {step === "form" ? (
              <form id="demo-booking-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
                      <Sparkles className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-manrope text-xs font-semibold uppercase tracking-wider text-brand-purple">Datacore Live</span>
                  </div>
                  <h3 id="demo-modal-title" className="mt-2 font-instrument text-3xl font-normal tracking-normal text-white leading-snug">
                    Book A Free Demo
                  </h3>
                  <p className="mt-2 font-manrope text-sm text-white/50">
                    See how Datacore can accelerate your operations with instant-response coordination.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-manrope text-xs font-medium text-white/70 mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 font-manrope text-sm text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-white/10 transition-all font-light"
                    />
                  </div>

                  <div>
                    <label className="block font-manrope text-xs font-medium text-white/70 mb-1.5">Work Email *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 font-manrope text-sm text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all font-light"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-manrope text-xs font-medium text-white/70 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 font-manrope text-sm text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all font-light"
                      />
                    </div>
                    <div>
                      <label className="block font-manrope text-xs font-medium text-white/70 mb-1.5">Team Size</label>
                      <select
                        value={formData.teamSize}
                        onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                        className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-manrope text-sm text-white select-none outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all [&>option]:bg-[#161226]"
                      >
                        <option value="1-10">1-10 people</option>
                        <option value="11-50">11-50 people</option>
                        <option value="51-200">51-200 people</option>
                        <option value="200+">200+ people</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-manrope text-xs font-medium text-white/70 mb-1.5">Preferred Date</label>
                      <div className="relative">
                        <input
                          required
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-2 font-manrope text-sm text-white outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all font-light [color-scheme:dark]"
                        />
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-white/40 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-manrope text-xs font-medium text-white/70 mb-1.5">Preferred Time</label>
                      <div className="relative">
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full h-10 rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-2 font-manrope text-sm text-white outline-none focus:border-brand-purple/50 focus:bg-[#251f3d] transition-all [&>option]:bg-[#161226]"
                        >
                          <option value="09:00 AM">9:00 AM EST</option>
                          <option value="10:30 AM">10:30 AM EST</option>
                          <option value="01:00 PM">1:00 PM EST</option>
                          <option value="03:30 PM">3:30 PM EST</option>
                        </select>
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-white/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-purple py-3 font-manrope text-sm font-medium text-white hover:bg-[#8d54ff] transition-all duration-300 shadow-lg shadow-brand-purple/10 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  Confirm Booking Slot
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C3AED]/15 text-[#bc9eff] mb-6 border border-[#a484ff]/25">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-instrument text-3xl font-normal tracking-normal text-white mb-2 leading-snug">
                  Session Booked!
                </h3>
                <p className="font-manrope text-sm text-white/60 max-w-sm mb-6">
                  Thanks, <span className="font-semibold text-white">{formData.name}</span>! We have reserved your demo for{" "}
                  <span className="font-semibold text-[#8d54ff]">{formData.date || "your chosen date"}</span> at{" "}
                  <span className="font-semibold text-[#8d54ff]">{formData.timeSlot}</span>. A calendar invitation has been sent to{" "}
                  <span className="underline decoration-brand-purple/50 text-white/85">{formData.email}</span>.
                </p>

                <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-left mb-8 space-y-2.5 text-xs font-manrope text-white/70">
                  <div className="flex justify-between">
                    <span className="text-white/40">Presenter:</span>
                    <span className="font-medium text-white flex items-center gap-1">
                      <Users className="h-3 w-3 text-brand-purple" /> Datacore Core Lead Team
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Platform:</span>
                    <span>Google Meet Link attached to email</span>
                  </div>
                  {formData.company && (
                    <div className="flex justify-between">
                      <span className="text-white/40">Company:</span>
                      <span className="text-white font-medium">{formData.company}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-manrope text-sm font-medium rounded-lg transition-colors border border-white/10"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
