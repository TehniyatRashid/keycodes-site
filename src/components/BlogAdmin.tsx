/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Sparkles, 
  HelpCircle, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  FileText,
  Save,
  Undo
} from "lucide-react";
import { BlogPost } from "../utils/blogService";

interface BlogAdminProps {
  blogs: BlogPost[];
  triggerNotification: (msg: string) => void;
  onGoBack: () => void;
}

export default function BlogAdmin({ blogs, triggerNotification, onGoBack }: BlogAdminProps) {
  // Post Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Automation");
  const [authorName, setAuthorName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [isPopular, setIsPopular] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  // UI state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [generatedCSV, setGeneratedCSV] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-") // remove double hyphens
      .trim();
    setSlug(generatedSlug);
  };

  // Helper to format values for CSV correctly (escaping double quotes)
  const formatCSVValue = (val: string): string => {
    if (!val) return '""';
    // Replace single double quotes with two double quotes
    const escaped = val.replace(/"/g, '""');
    // Wrap in quotes
    return `"${escaped}"`;
  };

  const handleGenerateCSV = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      triggerNotification("Please fill in the Title, Slug, and Content columns.");
      return;
    }

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    // CSV Headers order:
    // id,title,slug,date,category,author_name,cover_image,excerpt,content,read_time,is_popular,is_featured
    const rowId = String(blogs.length + 1);
    const row = [
      formatCSVValue(rowId),
      formatCSVValue(title),
      formatCSVValue(slug),
      formatCSVValue(today),
      formatCSVValue(category),
      formatCSVValue(authorName || "Anonymous"),
      formatCSVValue(coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"),
      formatCSVValue(excerpt),
      formatCSVValue(content),
      formatCSVValue(readTime),
      formatCSVValue(isPopular ? "TRUE" : "FALSE"),
      formatCSVValue(isFeatured ? "TRUE" : "FALSE")
    ].join(",");

    setGeneratedCSV(row);
    triggerNotification("Successfully generated CSV row!");
  };

  const handleCopyCSV = () => {
    if (!generatedCSV) return;
    navigator.clipboard.writeText(generatedCSV);
    setCopied(true);
    triggerNotification("CSV row copied! Ready to paste into your Google Sheet.");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClearForm = () => {
    setTitle("");
    setSlug("");
    setCategory("Automation");
    setAuthorName("");
    setCoverImage("");
    setExcerpt("");
    setContent("");
    setReadTime("5 min read");
    setIsPopular(false);
    setIsFeatured(false);
    setGeneratedCSV("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-20 select-text font-manrope text-white relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-md text-[#bc9eff] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Writer Studio
          </div>
          <h1 className="font-instrument text-4xl sm:text-5xl font-light leading-none text-white tracking-tight">
            Blog Post <span className="font-serif italic text-brand-purple">Composer</span>
          </h1>
          <p className="text-white/60 text-xs sm:text-sm mt-2">
            Compose rich blog posts visually and copy the formatted data directly to your Google Sheet rows.
          </p>
        </div>
        <button
          onClick={onGoBack}
          className="px-5 py-2.5 rounded-full border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
        >
          Exit Composer
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Post Composer Form */}
        <div className="lg:col-span-7 border border-white/[0.05] rounded-3xl bg-[#0c0919]/50 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.6)] space-y-6">
          <h2 className="text-lg font-semibold text-white/95 flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-purple" />
            Draft Article Information
          </h2>

          <form onSubmit={handleGenerateCSV} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Automating Outreach Channels"
                  className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Slug (Auto-generated)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. automating-outreach-channels"
                  className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0c0919] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl px-4 py-3 text-xs text-white outline-none transition-colors duration-300 cursor-pointer"
                >
                  <option value="Automation">Automation</option>
                  <option value="Development">Development</option>
                  <option value="SaaS">SaaS</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Author Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Reading Time</label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Cover Image URL</label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="e.g. https://images.unsplash.com/photo-..."
                className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1.5">Short Excerpt (List view summary)</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Write a brief 1-2 sentence introduction summary..."
                className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl p-4 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300 resize-y"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] text-white/40 uppercase tracking-widest font-bold">Article Content (Markdown supported)</label>
                <span className="text-[10px] text-[#bc9eff]/60 font-semibold">Write # for Headings, ** for Bold</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                placeholder={`Use markdown for formatting:\n\n# Heading 1\n\nSome introductory text. \n\n## Subheading\n\n- Bullet point 1\n- Bullet point 2\n\nUse **bold text** to highlight key terms.`}
                className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-brand-purple/50 rounded-xl p-4 text-xs text-white placeholder-white/20 outline-none transition-colors duration-300 font-mono resize-y"
                required
              />
            </div>

            <div className="flex items-center gap-6 py-2 select-none">
              <label className="flex items-center gap-2.5 text-xs text-white/70 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-brand-purple focus:ring-brand-purple cursor-pointer h-4 w-4"
                />
                Mark as Popular Article
              </label>

              <label className="flex items-center gap-2.5 text-xs text-white/70 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-white/20 bg-white/5 text-brand-purple focus:ring-brand-purple cursor-pointer h-4 w-4"
                />
                Feature at Top of Blog
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-grow bg-brand-purple hover:bg-brand-purple/90 border border-[#a484ff]/35 text-white font-semibold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-[0_0_15px_rgba(164,132,255,0.2)]"
              >
                <Save className="w-4 h-4" />
                Generate CSV Row
              </button>
              
              <button
                type="button"
                onClick={handleClearForm}
                className="px-5 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] rounded-xl text-xs font-semibold text-white/70 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                title="Reset editor fields"
              >
                <Undo className="w-4 h-4" />
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: CSV Export Box & Help Instructions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CSV Row Display Box */}
          {generatedCSV && (
            <div className="border border-brand-purple/20 rounded-3xl bg-[#0c0919]/60 backdrop-blur-xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-purple" />
                Your Formatted CSV Row
              </h3>
              
              <p className="text-[11px] text-white/50 leading-normal">
                Copy the text block below, open your Google Sheet, click in the next empty row, and paste it!
              </p>

              <div className="bg-[#05030b] border border-white/[0.08] rounded-xl p-3.5 relative">
                <textarea
                  readOnly
                  value={generatedCSV}
                  className="w-full h-32 bg-transparent text-[11px] text-[#bc9eff] font-mono outline-none resize-none overflow-y-auto"
                />
                <button
                  onClick={handleCopyCSV}
                  className="absolute right-3.5 bottom-3.5 bg-[#7c3aed]/20 hover:bg-[#7c3aed]/40 border border-brand-purple/40 hover:border-brand-purple/70 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-white transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Row"}
                </button>
              </div>
            </div>
          )}

          {/* Quick Guide */}
          <div className="border border-white/[0.05] rounded-3xl bg-[#0c0919]/50 backdrop-blur-xl p-6 sm:p-8 shadow-lg space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-purple" />
              Publisher Instructions
            </h3>
            
            <div className="space-y-4 text-xs text-white/60 leading-relaxed font-manrope">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 font-bold text-[10px] text-brand-purple">1</div>
                <p>
                  Create a new row in your <a href="https://docs.google.com/spreadsheets/d/1MzutfjQCYjIW3JZ7Iy-uzJcoU8jH-5pqOUttKa4S6gY/edit" target="_blank" rel="noopener noreferrer" className="text-[#bc9eff] hover:underline font-semibold">Google Sheet</a>.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 font-bold text-[10px] text-brand-purple">2</div>
                <p>
                  Fill out the composer form on the left with your blog information, using Markdown for formatting headers or quotes inside the content box.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 font-bold text-[10px] text-brand-purple">3</div>
                <p>
                  Click <strong>Generate CSV Row</strong>, then copy the output and paste it into the empty row in your spreadsheet.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0 font-bold text-[10px] text-brand-purple">4</div>
                <p>
                  The website will pick up the new post dynamically the next time the page is refreshed! No deployments or coding needed.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-white/45 space-y-1">
              <span className="font-bold text-white/70 block mb-1">Markdown Shortcuts:</span>
              <span>- <code># Main Title</code></span>
              <span className="block">- <code>## Section Header</code></span>
              <span className="block">- <code>**Bold Text**</code></span>
              <span className="block">- <code>- List bullet point</code></span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
