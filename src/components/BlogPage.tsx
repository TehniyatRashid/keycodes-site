/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Search, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  ChevronRight, 
  BookOpen, 
  MessageSquare,
  Sparkles,
  Link2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BlogPost, fetchBlogs } from "../utils/blogService";
import NewsletterSection from "./NewsletterSection";

interface BlogPageProps {
  activePostSlug: string | null;
  setActivePostSlug: (slug: string | null) => void;
  triggerNotification: (msg: string) => void;
}

// Simple custom Markdown-to-HTML parser to support headings, bold text, lists, and code blocks beautifully
function MarkdownRenderer({ content }: { content: string }) {
  const parseMarkdown = (text: string) => {
    // Escape HTML tags to prevent XSS
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headings
    html = html.replace(/^# (.*?)$/gm, '<h1 class="font-instrument text-3xl sm:text-4xl md:text-5xl font-light text-white mt-10 mb-4 tracking-tight leading-tight">$1</h1>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="font-manrope text-xl sm:text-2xl font-bold text-white/90 mt-8 mb-3 tracking-tight">$1</h2>');
    html = html.replace(/^### (.*?)$/gm, '<h3 class="font-manrope text-lg sm:text-xl font-semibold text-white/80 mt-6 mb-2">$1</h3>');

    // Horizontal Rule
    html = html.replace(/^---$/gm, '<hr class="border-white/[0.08] my-8" />');

    // Images: ![alt](url)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-xl border border-white/[0.08] my-8 max-w-full h-auto mx-auto shadow-lg block" />');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    
    // Italics
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>');

    // Inline Code
    html = html.replace(/`(.*?)`/g, '<code class="bg-white/[0.06] border border-white/[0.08] text-brand-purple px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');

    // Bullet Lists (multi-line)
    html = html.replace(/^\- (.*?)$/gm, '<li class="ml-6 list-disc text-white/70 mb-2 leading-relaxed">$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul class="my-4">$1</ul>');

    // Paragraphs (surround unformatted blocks with <p>)
    const blocks = html.split(/\n\n+/);
    const parsedBlocks = blocks.map(block => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // If block starts with HTML tag, leave it
      if (trimmed.startsWith("<h1") || 
          trimmed.startsWith("<h2") || 
          trimmed.startsWith("<h3") || 
          trimmed.startsWith("<hr") || 
          trimmed.startsWith("<ul") || 
          trimmed.startsWith("<ol") || 
          trimmed.startsWith("<pre") ||
          trimmed.startsWith("<img") ||
          trimmed.startsWith("<blockquote")) {
        return trimmed;
      }
      return `<p class="font-manrope text-white/70 text-sm sm:text-base leading-relaxed mb-5">${trimmed}</p>`;
    });

    return parsedBlocks.join("\n");
  };

  // Parse fenced code blocks first, replacing them with placeholders so they don't get paragraph tags
  const codeBlocks: string[] = [];
  let index = 0;
  let parsedContent = content.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const placeholder = `__CODE_BLOCK_${index}__`;
    codeBlocks.push(
      `<pre class="bg-[#090613]/80 border border-white/[0.08] rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-brand-purple/95 overflow-x-auto my-6 shadow-inner relative max-w-full">` +
        `<div class="absolute right-4 top-2 text-[10px] text-white/20 select-none uppercase tracking-widest font-sans">${lang || "code"}</div>` +
        `<code class="block whitespace-pre">${code.trim()}</code>` +
      `</pre>`
    );
    index++;
    return placeholder;
  });

  // Parse general markdown
  parsedContent = parseMarkdown(parsedContent);

  // Restore code block placeholders
  codeBlocks.forEach((htmlBlock, i) => {
    parsedContent = parsedContent.replace(`__CODE_BLOCK_${i}__`, htmlBlock);
  });

  return (
    <div 
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    />
  );
}

export default function BlogPage({ activePostSlug, setActivePostSlug, triggerNotification }: BlogPageProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchBlogs();
      setBlogs(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Sync scroll position when active post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePostSlug]);

  const categories = ["All", "AI Security", "Development", "Best Practices", "Case Studies", "Tutorials"];

  // Filters
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured Blog post
  const featuredPost = blogs.find(b => b.isFeatured) || blogs[0];
  // Normal grid posts (excluding featured post in layout unless searching/filtering)
  const gridPosts = selectedCategory !== "All" || searchQuery
    ? filteredBlogs
    : filteredBlogs.filter(b => b.id !== featuredPost?.id);

  // Find active blog post
  const activePost = blogs.find(b => b.slug === activePostSlug);

  const handleShare = (post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: url
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(url);
      triggerNotification("Link copied to clipboard!");
    }
  };

  // Get Related Posts
  const relatedPosts = activePost
    ? blogs.filter(b => b.id !== activePost.id && b.category === activePost.category).slice(0, 2)
    : [];

  return (
    <div className="w-full flex-grow relative z-10 select-text pb-20">
      <AnimatePresence mode="wait">
        {!activePost ? (
          /* ==========================================
             BLOG INDEX VIEW
             ========================================== */
          <motion.div
            key="blog-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-32"
          >
            {/* Header Title */}
            <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">

              <h1 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none font-light">
                Knowledge Hub & <span className="font-serif italic text-brand-purple">Tech Blueprints</span>
              </h1>
              <p className="font-manrope text-white/70 text-sm sm:text-base leading-relaxed">
                Stay updated with the latest in business process automation, design workflows, SaaS development methodologies, and full stack systems logic.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12">
              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar select-none">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-manrope text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      selectedCategory === category
                        ? "bg-[#7c3aed]/20 border border-brand-purple/60 text-white"
                        : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-white/60 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search Field */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] hover:border-white/15 focus:border-brand-purple/50 rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-white/30 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {loading ? (
              /* Loading Spinner */
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/50 font-manrope text-sm">
                <div className="w-8 h-8 rounded-full border-2 border-brand-purple/20 border-t-brand-purple animate-spin" />
                Synchronizing data pipelines...
              </div>
            ) : (
              <>
                {/* 1. Featured Post Hero Layout (Show only when no filters applied) */}
                {selectedCategory === "All" && !searchQuery && featuredPost && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group border border-white/[0.06] hover:border-[#a484ff]/30 rounded-3xl bg-[#0c0919]/40 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(124,58,237,0.1)] mb-16 cursor-pointer"
                    onClick={() => setActivePostSlug(featuredPost.slug)}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      <div className="lg:col-span-7 h-64 sm:h-96 relative overflow-hidden">
                        <img
                          src={featuredPost.coverImage}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0c0919] via-[#0c0919]/50 to-transparent pointer-events-none" />
                        
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7c3aed]/85 border border-[#a484ff]/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </div>
                      </div>
                      <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center space-y-6">
                        <span className="text-xs font-bold font-manrope text-brand-purple uppercase tracking-wider">
                          {featuredPost.category}
                        </span>
                        <h2 className="font-instrument text-2xl sm:text-3xl lg:text-4xl text-white font-light group-hover:text-[#bc9eff] transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="font-manrope text-white/70 text-sm leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-white/50 font-manrope pt-4 border-t border-white/5">
                          <span className="flex items-center gap-1.5 font-semibold text-white/75">
                            <User className="w-3.5 h-3.5 text-brand-purple" />
                            {featuredPost.authorName}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. Grid list of blogs */}
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-20 text-white/50 font-manrope">
                    <p className="text-base">No articles found matching your criteria.</p>
                    <button 
                      onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                      className="text-brand-purple hover:underline text-xs mt-2 font-bold cursor-pointer"
                    >
                      Clear search filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {gridPosts.map((blog, idx) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="group border border-white/[0.06] hover:border-[#a484ff]/30 rounded-2xl bg-[#0c0919]/40 backdrop-blur-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(124,58,237,0.08)] flex flex-col justify-between h-full transition-all duration-300 cursor-pointer"
                        onClick={() => setActivePostSlug(blog.slug)}
                      >
                        <div>
                          {/* Image Box */}
                          <div className="h-48 overflow-hidden relative">
                            <img
                              src={blog.coverImage}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0919] to-transparent opacity-80" />
                            
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0c0919]/80 border border-white/[0.08] backdrop-blur-md text-[#bc9eff] text-[10px] font-bold uppercase tracking-wider">
                              {blog.category}
                            </div>
                          </div>
                          {/* Card Content */}
                          <div className="p-5 space-y-4">
                            <div className="flex items-center gap-2 text-[10px] text-white/40 font-semibold uppercase tracking-wider">
                              <Calendar className="w-3 h-3 text-brand-purple" />
                              {blog.date}
                            </div>
                            <h3 className="font-manrope text-base font-bold text-white group-hover:text-[#bc9eff] transition-colors leading-snug line-clamp-2">
                              {blog.title}
                            </h3>
                            <p className="font-manrope text-white/60 text-xs leading-relaxed line-clamp-3">
                              {blog.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Footer Details */}
                        <div className="px-5 py-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-white/50 font-manrope">
                          <span className="flex items-center gap-1 font-semibold text-white/70">
                            {blog.authorName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.readTime}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Newsletter Box at the bottom */}
                <div className="mt-20">
                  <NewsletterSection blogs={blogs} onSelectPost={setActivePostSlug} triggerNotification={triggerNotification} />
                </div>
              </>
            )}
          </motion.div>
        ) : (
          /* ==========================================
             BLOG DETAIL VIEW
             ========================================== */
          <motion.div
            key="blog-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-32"
          >
            {/* Back Button */}
            <button
              onClick={() => setActivePostSlug(null)}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 text-xs font-semibold uppercase tracking-wider mb-8 cursor-pointer border border-white/[0.08] hover:border-white/20 bg-white/[0.02] px-4 py-2 rounded-full backdrop-blur-md select-none"
            >
              <ArrowLeft className="w-4 h-4 text-brand-purple" />
              Back to Insights
            </button>

            {/* Post Header */}
            <div className="space-y-6 mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-purple uppercase tracking-widest bg-brand-purple/10 border border-brand-purple/20 px-3 py-1 rounded-md">
                {activePost.category}
              </div>
              <h1 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light leading-tight tracking-tight">
                {activePost.title}
              </h1>
              <p className="font-manrope text-white/70 text-base sm:text-lg leading-relaxed font-light">
                {activePost.excerpt}
              </p>

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-xs text-white/60 font-manrope py-5 border-y border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-purple/20 border border-brand-purple/35 flex items-center justify-center font-bold text-brand-purple text-xs">
                    {activePost.authorName.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-semibold">Author</span>
                    <span className="font-semibold text-white/80">{activePost.authorName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-purple" />
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-semibold">Published</span>
                    <span className="font-semibold text-white/80">{activePost.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-purple" />
                  <div>
                    <span className="block text-[10px] text-white/40 uppercase tracking-widest font-semibold">Read Time</span>
                    <span className="font-semibold text-white/80">{activePost.readTime}</span>
                  </div>
                </div>

                {/* Share Option */}
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => handleShare(activePost)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all text-white/70 hover:text-white cursor-pointer select-none"
                    title="Share this article"
                  >
                    <Share2 className="w-3.5 h-3.5 text-brand-purple" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Main Cover Image */}
            <div className="w-full h-64 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden mb-12 border border-white/[0.08] shadow-2xl relative select-none">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0919]/80 to-transparent pointer-events-none" />
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none mb-16">
              <MarkdownRenderer content={activePost.content} />
            </div>

            {/* Horizontal Line Break */}
            <div className="border-t border-white/[0.08] my-12" />

            {/* Related Posts Grid */}
            {relatedPosts.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-instrument text-2xl sm:text-3xl text-white font-light tracking-tight">
                  Related <span className="font-serif italic text-brand-purple">Insights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {relatedPosts.map(post => (
                    <div
                      key={post.id}
                      onClick={() => setActivePostSlug(post.slug)}
                      className="group border border-white/[0.06] hover:border-[#a484ff]/30 rounded-2xl bg-[#0c0919]/40 backdrop-blur-xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-[0_15px_40px_rgba(124,58,237,0.06)]"
                    >
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-brand-purple uppercase tracking-wider block">
                          {post.category}
                        </span>
                        <h4 className="font-manrope text-sm font-bold text-white group-hover:text-[#bc9eff] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="font-manrope text-white/60 text-xs leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-white/40 font-semibold pt-4 mt-4 border-t border-white/[0.04]">
                        <Clock className="w-3 h-3 text-brand-purple" />
                        {post.readTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
