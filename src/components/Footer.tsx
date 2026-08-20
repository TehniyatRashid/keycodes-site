import React from "react";
import { Linkedin, Instagram } from "lucide-react";
import KeycodesLogo from "./KeycodesLogo";

interface FooterProps {
  user: { email: string; name: string } | null;
  onOpenAuth: (mode: "signin" | "signup") => void;
  onLogout: () => void;
  triggerNotification: (msg: string) => void;
  onChangeView: (view: "home" | "blog" | "admin") => void;
}

export default function Footer({ user, onOpenAuth, onLogout, triggerNotification, onChangeView }: FooterProps) {
  return (
    <footer className="relative z-10 bg-transparent overflow-hidden mt-0">
      {/* Bottom Soft Purple Gradient Glow overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#7b39fc]/5 blur-[100px] rounded-full pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="space-y-1.5 text-center sm:text-left">
            <div 
              className="flex items-center justify-center sm:justify-start cursor-pointer hover:opacity-95 transition-opacity" 
              onClick={() => {
                onChangeView("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              title="Keycodes Home"
            >
              <KeycodesLogo className="text-[#a484ff]" size={44} />
            </div>
            <p className="text-[11px] text-white/45 font-manrope">
              Streamlined Workspace Blueprints & Secure Cryptographic Frameworks for Modern Businesses.
            </p>
          </div>

          {/* Core Info / Meta Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[10px] font-manrope text-white/35">
            <button 
              className="hover:text-white transition-colors" 
              onClick={() => triggerNotification("Security policies are verified compliant with highest encryption standards.")}
            >
              Secure Encryption Policy
            </button>
            <span className="hidden sm:inline text-white/10">&bull;</span>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-1.5 text-white/35 hover:text-[#0077B5] transition-colors duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-1.5 text-white/35 hover:text-[#E1306C] transition-colors duration-200"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright alignment line */}
        <div className="border-t border-white/[0.04] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[9px] font-manrope text-white/20 uppercase tracking-widest">
            © 2026 KEYCODES INTERNATIONAL. ALL RIGHTS RESERVED.
          </p>
          
          {/* LinkedIn and Instagram Social Icons */}
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/30 hover:text-[#0077B5] transition-colors"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/30 hover:text-[#E1306C] transition-colors"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
