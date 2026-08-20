/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, ArrowRight, Sparkles, Star, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { BlogPost } from "../utils/blogService";
import { GOOGLE_SCRIPT_URL } from "../utils/config";

interface NewsletterSectionProps {
  blogs: BlogPost[];
  onSelectPost: (slug: string) => void;
  triggerNotification?: (msg: string) => void;
}

export default function NewsletterSection({ blogs, onSelectPost, triggerNotification }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      if (triggerNotification) triggerNotification("Please enter a valid email address.");
      return;
    }
    
    setSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify({
          type: "newsletter",
          email: email
        })
      });
      
      setSubscribed(true);
      if (triggerNotification) {
        triggerNotification(`Subscribed successfully with ${email}!`);
      }
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      if (triggerNotification) {
        triggerNotification("Subscription failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Get popular and latest blogs
  const popularBlogs = blogs.filter(b => b.isPopular).slice(0, 3);
  const latestBlogs = [...blogs].reverse().slice(0, 3); // Reverse to get newest first if they are appended to the sheet

  return (
    <section className="w-full py-16 px-4 relative overflow-hidden bg-gradient-to-b from-[#0c0919]/40 to-[#070510]">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto border border-white/[0.05] rounded-3xl bg-[#0c0919]/50 backdrop-blur-xl p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Subscription Form */}
          <div className="lg:col-span-7 space-y-6">

            
            <h2 className="font-instrument text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              Get weekly automation briefs and <span className="font-serif italic text-brand-purple">insider insights</span>
            </h2>
            
            <p className="font-manrope text-white/60 text-sm sm:text-base max-w-lg leading-relaxed">
              No spam. Just high-fidelity blueprints, new automation scripts, and case studies detailing how agencies scale their operations.
            </p>

            {subscribed ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-sm font-semibold flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-brand-purple animate-ping" />
                Thanks for subscribing! Check your inbox for our latest onboarding kit.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="relative flex-grow">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    required
                    disabled={submitting}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-brand-purple/50 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 backdrop-blur-md shadow-inner disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brand-purple hover:bg-brand-purple/90 border border-[#a484ff]/35 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_0_15px_rgba(164,132,255,0.2)] hover:shadow-[0_0_22px_rgba(164,132,255,0.3)] shrink-0 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Block: Latest & Popular Blog Links */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-8 lg:pt-0 lg:pl-10 space-y-8">
            {/* Popular Links */}
            {popularBlogs.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-manrope text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-brand-purple fill-brand-purple" />
                  Popular Articles
                </h3>
                <ul className="space-y-3.5">
                  {popularBlogs.map((blog) => (
                    <li key={blog.id}>
                      <button
                        onClick={() => onSelectPost(blog.slug)}
                        className="group text-left text-sm font-semibold text-white/80 hover:text-[#bc9eff] transition-colors duration-200 block max-w-full truncate cursor-pointer"
                      >
                        <span className="block truncate font-manrope">{blog.title}</span>
                        <span className="text-[10px] text-white/45 font-medium mt-0.5 block flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {blog.date} • {blog.readTime}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Latest Links */}
            {latestBlogs.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-manrope text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#bc9eff]" />
                  Latest Reads
                </h3>
                <ul className="space-y-3.5">
                  {latestBlogs.map((blog) => (
                    <li key={blog.id}>
                      <button
                        onClick={() => onSelectPost(blog.slug)}
                        className="group text-left text-sm font-semibold text-white/80 hover:text-[#bc9eff] transition-colors duration-200 block max-w-full truncate cursor-pointer"
                      >
                        <span className="block truncate font-manrope">{blog.title}</span>
                        <span className="text-[10px] text-white/45 font-medium mt-0.5 block flex items-center gap-1">
                          {blog.category} • {blog.readTime}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
