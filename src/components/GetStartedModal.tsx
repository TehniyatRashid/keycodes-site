import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "signup" | "signin";
  onSuccess: (email: string, name: string) => void;
}

export default function GetStartedModal({ isOpen, onClose, initialMode, onSuccess }: GetStartedModalProps) {
  const [mode, setMode] = useState<"signup" | "signin">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync mode when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setShowSuccess(false);
    }
  }, [isOpen, initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) return;
    
    setShowSuccess(true);
    setTimeout(() => {
      onSuccess(email, name || email.split("@")[0]);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="auth-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            id="auth-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#090714]/85 backdrop-blur-md"
          />

          <motion.div
            id="auth-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#161226]/95 p-6 shadow-2xl md:p-8"
          >
            {/* Ambient Purple glow inside card */}
            <div id="auth-modal-glow" className="absolute -top-[100px] -right-[100px] h-48 w-48 rounded-full bg-brand-purple/15 blur-3xl pointer-events-none" />

            <button
              id="auth-modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
            >
              <X className="h-5 w-5" />
            </button>

            {!showSuccess ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
                      <Sparkles className="h-3 w-3" />
                    </span>
                    <span className="font-manrope text-[10px] font-semibold uppercase tracking-wider text-brand-purple-light text-[#a484ff]">Keycodes Platform</span>
                  </div>
                  <h3 id="auth-modal-title" className="mt-2 font-instrument text-2xl font-normal tracking-normal text-white leading-snug">
                    {mode === "signup" ? "Get Started Now" : "Welcome Back"}
                  </h3>
                  <p className="mt-1.5 font-manrope text-xs text-white/50">
                    {mode === "signup"
                      ? "Create your absolute free account and unlock premium features."
                      : "Access your cloud control console instantly."}
                  </p>
                </div>

                <form id="auth-form" onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1">Full Name</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-1.5 font-manrope text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-white/10 transition-all font-light"
                        />
                        <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/40" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block font-manrope text-[11px] font-medium text-white/70 mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@keycodes.cx"
                        className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-1.5 font-manrope text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-white/10 transition-all font-light"
                      />
                      <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/40" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-manrope text-[11px] font-medium text-white/70">Password</label>
                      {mode === "signin" && (
                        <a href="#reset" className="text-[10px] text-brand-purple hover:underline font-manrope">Forgot?</a>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-1.5 font-manrope text-xs text-white placeholder-white/20 outline-none focus:border-brand-purple/50 focus:bg-white/10 transition-all font-light"
                      />
                      <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/40" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-purple py-2 font-manrope text-xs font-semibold text-white hover:bg-[#8d54ff] transition-all duration-300 shadow-md shadow-brand-purple/10 mt-6 active:scale-[0.98]"
                  >
                    <span>{mode === "signup" ? "Create Account" : "Sign In"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      if (mode === "signup") {
                        window.location.href = "https://portal.keycodes.dev/auth";
                      } else {
                        setMode("signup");
                      }
                    }}
                    className="font-manrope text-xs text-brand-purple hover:underline"
                  >
                    {mode === "signup" ? "Already have an account? Sign in" : "New to the platform? Create account"}
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7C3AED]/15 text-[#bc9eff] mb-5 border border-[#a484ff]/25">
                  <ShieldCheck className="h-7 w-7 animate-pulse" />
                </div>
                <h3 className="font-instrument text-2xl font-normal tracking-normal text-white mb-1.5 leading-snug">
                  Preparing Your Workspace...
                </h3>
                <p className="font-manrope text-xs text-white/60 mb-1 max-w-[240px]">
                  Setting up secure access for
                </p>
                <span className="font-manrope text-xs text-[#8c52ff] bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20 block tracking-wide">
                  {email}
                </span>

                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-manrope text-white/40">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#bc9eff] animate-ping"></span>
                  INITIALIZING SECURE CONNECTION
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
