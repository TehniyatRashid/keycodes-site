/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Search, 
  HelpCircle, 
  Compass, 
  Zap, 
  Percent, 
  User, 
  LogOut, 
  Globe2,
  CalendarDays,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Modals
import DemoModal from "./components/DemoModal";
import GetStartedModal from "./components/GetStartedModal";
import ReviewsModal from "./components/ReviewsModal";
import ContactModal from "./components/ContactModal";
import PricingModal from "./components/PricingModal";
import PortalCommandCenter from "./components/PortalCommandCenter";
import WorkspaceEstimator from "./components/WorkspaceEstimator";
import ProcessTimelineSection from "./components/ProcessTimelineSection";
import OperationsSection from "./components/OperationsSection";
import StrategySection from "./components/StrategySection";
import WhyPickUsSection from "./components/WhyPickUsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import KeycodesLogo from "./components/KeycodesLogo";
import BlogPage from "./components/BlogPage";
import BlogAdmin from "./components/BlogAdmin";
import NewsletterSection from "./components/NewsletterSection";
import { fetchBlogs, BlogPost } from "./utils/blogService";

// Brand Logo SVG components for scrolling bar
const DuneLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" className="opacity-30" />
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="M12 22a10 10 0 0 1-10-10" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Dune</span>
  </div>
);

const AsteriskLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 4v16" />
      <path d="M6.34 6.34l11.32 11.32" />
      <path d="M20 12H4" />
      <path d="M17.66 6.34L6.34 17.66" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Asterisk</span>
  </div>
);

const OasisLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="10" ry="6" className="opacity-30" strokeDasharray="3 2" />
      <ellipse cx="12" cy="12" rx="6" ry="3.5" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-extrabold tracking-normal text-white/80">Oasis</span>
  </div>
);

const EooksLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
      <path d="M4 6h12M4 11h9M4 16h12M4 6v10" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80 underline decoration-1 underline-offset-[4px] decoration-white/20">Eooks</span>
  </div>
);

const OpalLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="12" r="5" className="opacity-30" />
      <circle cx="15" cy="12" r="5" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Opal</span>
  </div>
);

const VectraLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-9 9 9-9 9-9-9z" className="opacity-30" />
      <path d="M9 12h6" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Vectra</span>
  </div>
);

const PrismLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 22h20L12 2z" className="opacity-30" />
      <path d="M12 2v20" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Prism</span>
  </div>
);

const LumenLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" className="opacity-30" />
      <path d="M12 8v8M8 12h8" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Lumen</span>
  </div>
);

const SolasLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1" className="opacity-30" />
      <circle cx="12" cy="12" r="4" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Solas</span>
  </div>
);

const DropellaLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto aspect-square text-white/80" viewBox="0 0 24 24" fill="none">
      <defs>
        <mask id="dropella-mask">
          <rect width="24" height="24" fill="white" />
          <line x1="3" y1="21" x2="21" y2="3" stroke="black" strokeWidth="2.8" />
        </mask>
      </defs>
      <path d="M6 4h6a8 8 0 0 1 8 8v0a8 8 0 0 1-8 8H6V4z" fill="currentColor" mask="url(#dropella-mask)" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Dropella</span>
  </div>
);

const CopyboardLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto aspect-square text-white/80" viewBox="0 0 24 24" fill="none">
      {/* The letter C */}
      <path d="M17 6.5A6.5 6.5 0 1 0 17 17.5" stroke="currentColor" strokeWidth="3.6" strokeLinecap="butt" fill="none" />
      {/* Sparkle star perfectly centered in the C opening */}
      <path d="M10.5 10c0 1 .8 2 2 2c-1.2 0-2 .8-2 2c0-1.2-.8-2-2-2c1.2 0 2-.8 2-2z" fill="currentColor" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Copyboard</span>
  </div>
);

const RebumpLogo = () => (
  <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0">
    <svg className="h-5 w-auto text-white/80" viewBox="0 0 100 42" fill="currentColor">
      {/* Left R ribbon contour */}
      <path d="M0,0 L50,0 C63,0 65,10 65,15 C65,22 55,25 48,25 L71,42 L53,42 L36,30 C32,27 28,25 25,25 L0,25 L0,42 L3,42 C3,42 25,27 25,27 L26,8 C26,8 45,21 48,21 C52,21 53,16 53,15 C53,8 45,6 38,6 L26,6 L0,0 Z" fillRule="evenodd" />
      {/* Right B ribbon contour */}
      <path d="M62,0 L90,0 C98,0 100,6 100,10 C100,15 94,18 90,19 C96,20 100,24 100,29 C100,36 94,42 84,42 L59,42 C59,42 79,27 79,27 L80,8 C80,8 90,15 92,15 C94,15 94,12 94,10 C94,6 88,6 84,6 L62,0 Z" fillRule="evenodd" />
    </svg>
    <span className="font-manrope text-xs sm:text-sm font-semibold tracking-normal text-white/80">Rebump</span>
  </div>
);

const BrandLogosList = [
  { name: "Dune", Component: DuneLogo },
  { name: "Dropella", Component: DropellaLogo },
  { name: "Asterisk", Component: AsteriskLogo },
  { name: "Copyboard", Component: CopyboardLogo },
  { name: "Oasis", Component: OasisLogo },
  { name: "Rebump", Component: RebumpLogo },
  { name: "Eooks", Component: EooksLogo },
  { name: "Opal", Component: OpalLogo },
  { name: "Vectra", Component: VectraLogo },
  { name: "Prism", Component: PrismLogo },
  { name: "Lumen", Component: LumenLogo },
  { name: "Solas", Component: SolasLogo },
  { name: "Dune", Component: DuneLogo },
  { name: "Dropella", Component: DropellaLogo },
  { name: "Asterisk", Component: AsteriskLogo },
  { name: "Copyboard", Component: CopyboardLogo },
  { name: "Oasis", Component: OasisLogo },
  { name: "Rebump", Component: RebumpLogo },
  { name: "Eooks", Component: EooksLogo },
  { name: "Opal", Component: OpalLogo },
  { name: "Vectra", Component: VectraLogo },
  { name: "Prism", Component: PrismLogo },
  { name: "Lumen", Component: LumenLogo },
  { name: "Solas", Component: SolasLogo }
];

export default function App() {
  // Navigation / Modal States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tryNowTrigger, setTryNowTrigger] = useState(0);

  // View state: 'home' | 'blog' | 'admin'
  type AppView = "home" | "blog" | "admin";

  // --- Hash-based routing helpers ---
  const parseHash = (): { view: AppView; slug: string | null } => {
    const hash = window.location.hash; // e.g. "#/blog" or "#/blog/my-post"
    if (hash.startsWith("#/blog")) {
      const parts = hash.split("/");
      const slug = parts[2] ? decodeURIComponent(parts[2]) : null;
      return { view: "blog", slug };
    }
    if (hash.startsWith("#/admin")) return { view: "admin", slug: null };
    return { view: "home", slug: null };
  };

  const { view: initView, slug: initSlug } = parseHash();
  const [currentView, setCurrentView] = useState<AppView>(initView);
  const [activePostSlug, setActivePostSlug] = useState<string | null>(initSlug);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Load blogs once for Newsletter widget on Homepage
  useEffect(() => {
    fetchBlogs().then(setBlogs);
  }, []);

  // Keep URL hash in sync whenever view/slug changes
  useEffect(() => {
    if (currentView === "blog") {
      const newHash = activePostSlug ? `#/blog/${encodeURIComponent(activePostSlug)}` : "#/blog";
      if (window.location.hash !== newHash) window.location.hash = newHash;
    } else if (currentView === "admin") {
      if (window.location.hash !== "#/admin") window.location.hash = "#/admin";
    } else {
      if (window.location.hash !== "" && window.location.hash !== "#/") {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
  }, [currentView, activePostSlug]);

  // Handle browser back/forward button
  useEffect(() => {
    const onHashChange = () => {
      const { view, slug } = parseHash();
      setCurrentView(view);
      setActivePostSlug(slug);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleChangeView = (view: AppView) => {
    setCurrentView(view);
    if (view !== "blog") setActivePostSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPost = (slug: string) => {
    setActivePostSlug(slug);
    setCurrentView("blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTryNow = () => {
    setTryNowTrigger(prev => prev + 1);
    triggerNotification("Opening your step-by-step automation process.");
  };

  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [authModal, setAuthModalState] = useState<{ isOpen: boolean; mode: "signup" | "signin" }>({
    isOpen: false,
    mode: "signup"
  });

  const setAuthModal = (value: React.SetStateAction<{ isOpen: boolean; mode: "signup" | "signin" }>) => {
    const val = typeof value === "function" ? value(authModal) : value;
    if (val.isOpen && val.mode === "signin") {
      window.location.href = "https://portal.keycodes.dev/auth";
      return;
    }
    setAuthModalState(val);
  };
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Authenticated State (simulating a full integrated app)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  // Cycling words for hero section
  const words = ["Automation", "Development", "Full Stack", "N8N", "SaaS"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Notifications or toast indicator for user actions
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleAuthSuccess = (email: string, name: string) => {
    setUser({ email, name });
    triggerNotification(`Successfully signed in as ${name}! Welcome to Datacore v3.2.`);
  };

  const handleLogout = () => {
    setUser(null);
    triggerNotification("Logged out of Datacore Cloud Control Path.");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0c0919] text-white flex flex-col justify-start selection:bg-brand-purple selection:text-white">
      {/* 
        ========================================================================
        HTML5 Fixed Video Background (Cover, Autoplay, Loop, Mute, Inline, No Overlay)
        ========================================================================
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* 
        ========================================================================
        Ambient Blur & Dark Vignette (Smooths out video pixelation & guarantees perfect text contrast)
        ========================================================================
      */}
      <div 
        className={`fixed inset-0 w-full h-full z-0 pointer-events-none transition-all duration-700 ease-out ${
          isScrolled 
            ? "backdrop-blur-md bg-[#0c0919]/85" 
            : "backdrop-blur-none bg-[#0c0919]/35"
        }`} 
      />

      {/* 
        ========================================================================
        Navbar Component (Top Overlay)
        ========================================================================
      */}
      <div className="fixed top-4 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-8">
        <header 
          id="keycodes-navbar" 
          className="max-w-5xl mx-auto rounded-full border border-white/[0.08] bg-[#0c0919]/60 shadow-[0_16px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300"
        >
          {/* Left Side: Logo Only */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div 
              className="flex items-center cursor-pointer hover:opacity-95 transition-opacity" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              title="Keycodes Home"
            >
              <KeycodesLogo className="text-[#a484ff]" size={40} />
            </div>
          </div>


          {/* Center: Navigation Links (Desktop Only) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 relative py-1.5 px-4">
            <button 
              onClick={() => { handleChangeView("home"); triggerNotification("Viewing main Home showcase."); }}
              className={`font-manrope font-medium text-[13px] transition-all cursor-pointer animate-fade-in ${currentView === "home" ? "text-white" : "text-white/80 hover:text-white"}`}
            >
              Home
            </button>

            <button 
              onClick={() => {
                if (currentView !== "home") { handleChangeView("home"); setTimeout(() => { const el = document.getElementById("portal-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200); }
                else { const el = document.getElementById("portal-section"); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); triggerNotification("Accessing portal controls..."); } }
              }}
              className="font-manrope font-medium text-[13px] text-white/80 hover:text-white transition-all cursor-pointer animate-fade-in"
            >
              Portal
            </button>

            <button 
              onClick={() => {
                if (currentView !== "home") { handleChangeView("home"); setTimeout(() => { const el = document.getElementById("process-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200); }
                else { const el = document.getElementById("process-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }
              }}
              className="font-manrope font-medium text-[13px] text-white/80 hover:text-white transition-all cursor-pointer animate-fade-in"
            >
              Process
            </button>

            <button 
              onClick={() => {
                if (currentView !== "home") { handleChangeView("home"); setTimeout(() => { const el = document.getElementById("testimonials-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200); }
                else { const el = document.getElementById("testimonials-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }
              }}
              className="font-manrope font-medium text-[13px] text-white/80 hover:text-white transition-all cursor-pointer animate-fade-in"
            >
              Reviews
            </button>

            <button 
              onClick={() => {
                if (currentView !== "home") { handleChangeView("home"); setTimeout(() => { const el = document.getElementById("faq-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200); }
                else { const el = document.getElementById("faq-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }
              }}
              className="font-manrope font-medium text-[13px] text-white/80 hover:text-white transition-all cursor-pointer animate-fade-in"
            >
              FAQs
            </button>

            <button 
              onClick={() => handleChangeView("blog")}
              className={`font-manrope font-medium text-[13px] transition-all cursor-pointer animate-fade-in ${currentView === "blog" ? "text-[#bc9eff]" : "text-white/80 hover:text-[#bc9eff]"}`}
            >
              Blog
            </button>
          </nav>


          {/* Right Side: Action Buttons (Desktop Only) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full transition-all">
                <span className="flex items-center gap-1.5 text-xs font-manrope text-white/90">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  {user.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="text-white/40 hover:text-white transition-colors cursor-pointer"
                  title="Sign out of Keycodes Account"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <a
                href="https://portal.keycodes.dev/auth"
                className="text-white/80 hover:text-white hover:bg-white/[0.04] border border-transparent hover:border-white/10 px-4 py-1.5 rounded-full font-manrope font-semibold text-[13px] transition-all cursor-pointer mr-1"
              >
                Start a Free Trial
              </a>
            )}

            <button
              onClick={handleTryNow}
              className="backdrop-blur-md bg-[#7c3aed]/20 hover:bg-[#7c3aed]/35 border border-[#a484ff]/35 hover:border-[#a484ff]/60 text-white rounded-full font-manrope font-extrabold text-[12px] px-5 py-2 shadow-[0_0_15px_rgba(164,132,255,0.25)] hover:shadow-[0_0_22px_rgba(164,132,255,0.35)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 cursor-pointer whitespace-nowrap uppercase tracking-wider"
            >
              Try Now
            </button>
          </div>

          {/* Mobile Hamburger (White Menu Icon) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleTryNow}
              className="backdrop-blur-md bg-[#7c3aed]/20 hover:bg-[#7c3aed]/35 border border-[#a484ff]/35 hover:border-[#a484ff]/60 text-white rounded-full font-manrope font-extrabold text-[10px] px-4 py-2 shadow-[0_0_12px_rgba(164,132,255,0.25)] active:scale-[0.97] transition-all duration-200 cursor-pointer whitespace-nowrap uppercase tracking-wider"
            >
              Try Now
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:opacity-80 transition-opacity p-1.5 rounded-lg cursor-pointer"
              aria-label="Open Mobile Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>
      </div>

      {/* 
        ========================================================================
        Mobile Fullscreen Overlay Menu
        ========================================================================
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#090714] text-white p-6 flex flex-col justify-between"
          >
            {/* Header part with X trigger */}
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center">
                <KeycodesLogo className="text-[#a484ff]" size={36} />
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:opacity-80 p-2 cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>


            {/* Middle part: Big elegant links */}
            <nav className="flex flex-col gap-6 my-auto text-left">
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleChangeView("home"); }}
                className="font-manrope text-2xl font-medium tracking-tight text-white/90 hover:text-brand-purple text-left transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleChangeView("home");
                  setTimeout(() => { const el = document.getElementById("portal-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200);
                }}
                className="font-manrope text-xl font-medium tracking-tight text-white/70 hover:text-white text-left transition-colors"
              >
                Workspace Portal
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleChangeView("home");
                  setTimeout(() => { const el = document.getElementById("process-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200);
                }}
                className="font-manrope text-xl font-medium tracking-tight text-white/70 hover:text-white text-left transition-colors"
              >
                Our Process
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleChangeView("home");
                  setTimeout(() => { const el = document.getElementById("testimonials-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200);
                }}
                className="font-manrope text-xl font-medium tracking-tight text-white/70 hover:text-white text-left transition-colors"
              >
                Reviews & Love
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleChangeView("home");
                  setTimeout(() => { const el = document.getElementById("faq-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 200);
                }}
                className="font-manrope text-xl font-medium tracking-tight text-white/70 hover:text-white text-left transition-colors"
              >
                FAQs
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleChangeView("blog"); }}
                className="font-manrope text-xl font-semibold tracking-tight text-[#bc9eff] hover:text-white text-left transition-colors"
              >
                Insights Blog
              </button>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleTryNow(); }}
                className="font-manrope text-xl font-semibold tracking-tight text-[#a484ff] text-left transition-colors flex items-center gap-1.5"
              >
                Try Now &rarr;
              </button>
            </nav>


            {/* Bottom part: Auth details */}
            <div className="space-y-4">
              {user ? (
                <div className="flex flex-col items-stretch gap-3">
                  <div className="text-center font-manrope text-sm text-white/70 py-2 border-b border-white/5">
                    Logged in as <span className="font-semibold text-white">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 font-manrope text-sm font-semibold transition-all cursor-pointer"
                  >
                    Logout Status
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setAuthModal({ isOpen: true, mode: "signin" });
                    }}
                    className="bg-white text-[#171717] rounded-xl py-3.5 font-manrope font-semibold text-sm hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setAuthModal({ isOpen: true, mode: "signup" });
                    }}
                    className="backdrop-blur-md bg-[#7c3aed]/20 border border-[#a484ff]/40 hover:bg-[#7c3aed]/35 text-[#fafafa] rounded-xl py-3.5 font-manrope font-semibold text-sm active:scale-95 transition-all cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              )}

              <p className="text-center font-manrope text-[9px] text-white/35 tracking-widest mt-4 uppercase">
                Keycodes Platform v3.2
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================
          BLOG VIEW
          ======================================================================== */}
      {currentView === "blog" && (
        <BlogPage
          activePostSlug={activePostSlug}
          setActivePostSlug={setActivePostSlug}
          triggerNotification={triggerNotification}
        />
      )}

      {/* ========================================================================
          ADMIN / BLOG COMPOSER VIEW
          ======================================================================== */}
      {currentView === "admin" && (
        <BlogAdmin
          blogs={blogs}
          triggerNotification={triggerNotification}
          onGoBack={() => handleChangeView("blog")}
        />
      )}

      {/* ========================================================================
          HOME VIEW (shown only when currentView === 'home')
          ======================================================================== */}
      {currentView === "home" && (
      <>
      {/* 
        ========================================================================
        Hero Content (Centered Overlay Pane)
        ========================================================================
      */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center select-none pt-24 pb-8 sm:pt-28 sm:pb-10 md:pt-32 md:pb-12 lg:pt-36 lg:pb-14 my-auto w-full overflow-hidden">
        
        {/* Animated Slide-in Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full max-w-6xl px-4 sm:px-6 md:px-8"
        >

          {/* Premium Pill Badge */}
          <div 
            id="hero-badge"
            className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-white/80 text-[11px] sm:text-xs font-manrope font-medium tracking-tight flex items-center gap-2 mb-2 sm:mb-4 hover:border-white/15 transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#7c3aed] shrink-0 animate-pulse" />
            <span className="uppercase tracking-wider font-semibold text-[10px] sm:text-[11px] text-[#bc9eff]">Unlimited Development For The Price Of One Engineer</span>
          </div>

          {/* Headline - Responsive Large Type */}
          <h1 
            id="hero-headline"
            className="mt-2 md:mt-4 font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[68px] text-white tracking-tight leading-[1.08] font-light max-w-5xl animate-fade-in transition-all duration-[450ms]"
          >
            <span className="block sm:inline-block sm:whitespace-nowrap">
              Your{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="inline-block text-[#a484ff] font-normal"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>{" "}
              Team <span className="font-serif italic px-1 md:px-2 select-text opacity-95">On Demand</span>
            </span>
            <span className="block text-base sm:text-lg md:text-xl lg:text-2xl font-manrope text-[#bc9eff] tracking-widest mt-3.5 font-bold uppercase font-sans">Get Unlimited Development Tickets</span>
          </h1>

          {/* Subtext */}
          <p 
            id="hero-subtext"
            className="mt-6 font-manrope font-normal text-sm sm:text-base md:text-lg text-white/70 leading-relaxed max-w-[662px]"
          >
            Stop waiting weeks for results, get a dedicated team that automates your business tasks, one flat monthly price, unlimited requests.
          </p>

          {/* Call To Action Buttons (Row) */}
          <div id="cta-button-row" className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
            {user ? (
              <button
                onClick={() => {
                  const sec = document.getElementById("portal-section");
                  if (sec) {
                    sec.scrollIntoView({ behavior: "smooth", block: "center" });
                    triggerNotification(`Welcome back, ${user.name}! Heading to Workspace Portal.`);
                  }
                }}
                className="w-full sm:w-auto backdrop-blur-md bg-[#7c3aed]/25 hover:bg-[#7c3aed]/40 border border-[#a484ff]/40 hover:border-[#a484ff]/70 text-[#fafafa] font-manrope font-semibold px-8 py-3.5 rounded-[12px] shadow-[0_0_25px_rgba(164,132,255,0.25)] hover:shadow-[0_0_35px_rgba(164,132,255,0.4)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer animate-fade-in text-xs uppercase font-bold tracking-wider"
              >
                Go to Workspace Portal &rarr;
              </button>
            ) : (
              <button
                onClick={handleTryNow}
                className="w-full sm:w-auto backdrop-blur-md bg-[#7c3aed]/25 hover:bg-[#7c3aed]/40 border border-[#a484ff]/40 hover:border-[#a484ff]/70 text-[#fafafa] font-manrope px-8 py-3.5 rounded-[12px] shadow-[0_0_25px_rgba(164,132,255,0.25)] hover:shadow-[0_0_35px_rgba(164,132,255,0.4)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-widest"
              >
                Try Now &rarr;
              </button>
            )}
          </div>
        </motion.div>

        {/* Infinite Moving Logo Bar (Drawn Edge-to-Edge with Full Screen Width) */}
        <div id="moving-logo-bar" className="mt-10 md:mt-12 w-full overflow-hidden relative">
          
          {/* Elegant transparent fades at the left and right extremities of the screen */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 bg-gradient-to-r from-[#0c0919] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 bg-gradient-to-l from-[#0c0919] to-transparent z-10 pointer-events-none" />
          
          {/* Running conveyor layout belt */}
          <div className="flex w-full overflow-hidden select-none">
            <div className="flex gap-16 sm:gap-24 md:gap-32 whitespace-nowrap animate-marquee py-4 transform-gpu will-change-transform">
              {BrandLogosList.map((logo, index) => {
                const LogoComponent = logo.Component;
                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-center hover:scale-[1.03] transition-transform duration-300 cursor-help"
                    onClick={() => triggerNotification(`Accessing secure partner workspace: ${logo.name}`)}
                  >
                    <LogoComponent />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* 
        ========================================================================
        Unified Background Plate Container (One consistent background, no break points)
        ========================================================================
      */}
      <div className="relative w-full z-10">
        {/* 
          ========================================================================
          Interactive High-fidelity Portal Command Center Module
          ========================================================================
        */}
        <div id="portal-section" className="scroll-mt-20">
          <PortalCommandCenter 
            userName={user?.name || "Member"} 
            userEmail={user?.email || ""} 
            triggerNotification={triggerNotification} 
            onTryNow={handleTryNow}
          />
        </div>

        {/* 
          ========================================================================
          Premium Interactive Timeline Process Section (How We Deploy)
          ========================================================================
        */}
        <div id="process-section" className="scroll-mt-20">
          <ProcessTimelineSection 
            onOpenPricingModal={() => setIsPricingOpen(true)} 
            tryNowTrigger={tryNowTrigger}
          />
        </div>

        {/* 
          ========================================================================
          Premium Brand-Themed Strategy & Content Section (Before & After state motion)
          ========================================================================
        */}
        <StrategySection />

        {/* 
          ========================================================================
          Premium Brand-Themed Operations Rethink Section (As requested by user)
          ========================================================================
        */}
        <OperationsSection />

        {/* 
          ========================================================================
          Premium Instant Workspace Estimator (Aesthetic & Polish SaaS Conversion)
          ========================================================================
        */}
        <div id="estimator-section" className="scroll-mt-20">
          <WorkspaceEstimator
            userName={user?.name || "Member"}
            userEmail={user?.email || ""}
            triggerNotification={triggerNotification}
            tryNowTrigger={tryNowTrigger}
          />
        </div>

        {/* 
          ========================================================================
          Premium "Why Pick Us?" Speed Comparison Section (As requested by user)
          ========================================================================
        */}
        <WhyPickUsSection />

        {/* 
          ========================================================================
          Interactive Testimonials Wall of Love Section
          ========================================================================
        */}
        <div id="testimonials-section" className="scroll-mt-20">
          <TestimonialsSection />
        </div>

        {/* 
          ========================================================================
          Cleared For Launch: Accordion FAQ Section
          ========================================================================
        */}
        <div id="faq-section" className="scroll-mt-20">
          <FAQSection />
        </div>

        {/* 
          ========================================================================
          Premium Brand-Themed Contact Form Section
          ========================================================================
        */}
          <ContactSection triggerNotification={triggerNotification} />

        {/* 
          ========================================================================
          Newsletter Section with Popular/Latest Blog Quick Links
          ========================================================================
        */}
        <NewsletterSection
          blogs={blogs}
          onSelectPost={handleSelectPost}
          triggerNotification={triggerNotification}
        />

        {/* 
          ========================================================================
          Premium Custom Brand Footer (Seamless glass-morphism Integration)
          ========================================================================
        */}
        <Footer 
          user={user} 
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })} 
          onLogout={handleLogout} 
          triggerNotification={triggerNotification}
          onChangeView={handleChangeView}
        />
      </div>
      </> // end home view wrapper
      )} {/* end currentView === 'home' */}


      {/* 
        ========================================================================
        Interactive Form and Utility Modals (Aesthetic & Polish overlays)
        ========================================================================
      */}
      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />

      <GetStartedModal 
        isOpen={authModal.isOpen} 
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: "signup" })} 
        onSuccess={handleAuthSuccess}
      />

      <ReviewsModal 
        isOpen={isReviewsOpen} 
        onClose={() => setIsReviewsOpen(false)} 
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      <PricingModal 
        isOpen={isPricingOpen} 
        onClose={() => setIsPricingOpen(false)} 
        onSuccess={() => triggerNotification("Your 7-day free trial has been successfully initiated! Welcome aboard.")}
        onOpenSignUp={(mode) => {
          setIsPricingOpen(false);
          setAuthModal({ isOpen: true, mode: mode || "signin" });
        }}
      />

      {/* Cryptographic Toast Alerts removed for clean focused panel */}

    </div>
  );
}
