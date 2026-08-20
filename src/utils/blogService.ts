/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  authorName: string;
  coverImage: string;
  excerpt: string;
  content: string;
  readTime: string;
  isPopular: boolean;
  isFeatured: boolean;
}

const GSHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1MzutfjQCYjIW3JZ7Iy-uzJcoU8jH-5pqOUttKa4S6gY/export?format=csv";

// Premium high-fidelity mock data shown if the sheet is empty or fails to fetch.
export const MOCK_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "How AI Automation Saves Agencies 20+ Hours Weekly",
    slug: "ai-automation-saves-agencies-hours",
    date: "July 07, 2026",
    category: "AI Security",
    authorName: "Alex Rivera",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    excerpt: "Discover how modern agency workflows are shifting to automated agents. We break down the exact tech stack that eliminates manual tasks.",
    content: [
      "# How AI Automation Saves Agencies 20+ Hours Weekly",
      "",
      "In the fast-paced landscape of modern agency operations, time is the ultimate currency. Between managing client expectations, drafting proposals, tracking campaigns, and compiling reports, creative and technical teams are often bogged down by operational clutter rather than doing what they do best: driving value.",
      "",
      "Enter **AI-driven workflow automation**.",
      "",
      "By strategically integrating autonomous agents into your process pipelines, you can reclaim dozens of hours each week. Here is a blueprint of how leading agency hubs are executing this transition.",
      "",
      "---",
      "",
      "## 1. The Bottleneck: Manual Operations",
      "Most agencies lose hours in three critical areas:",
      "- **Lead Triage & Follow-up**: Manually copying contact form details to CRMs.",
      "- **Reporting & Dashboards**: Pulling stats from Google Analytics, Meta Ads, and Stripe into manual spreadsheets.",
      "- **Content Formatting**: Generating variations of copy for different channels.",
      "",
      "---",
      "",
      "## 2. Automating with N8N and Zapier",
      "By implementing standard automation triggers, you connect your front-facing interfaces directly with active workspaces:",
      "- **Trigger**: A new contact form submission is received.",
      "- **Action 1**: The lead is automatically qualified using Gemini API.",
      "- **Action 2**: A customized proposal brief is drafted in Google Docs.",
      "- **Action 3**: A Slack notification alerts the accounts team with key details.",
      "",
      "This entire sequence runs in under 4 seconds, requiring exactly zero human intervention.",
      "",
      "---",
      "",
      "## 3. Measurable ROI",
      "Agencies adopting these automated operational paradigms report:",
      "- **80% reduction** in client onboarding time.",
      "- **22 hours saved** per employee, every single week.",
      "- **Zero lost leads** due to delayed human response times.",
      "",
      "If your agency isn't automating, you aren't just losing time—you're losing margin."
    ].join("\n"),
    readTime: "4 min read",
    isPopular: true,
    isFeatured: true
  },
  {
    id: "2",
    title: "The Shift to Flat-Rate Unlimited Development",
    slug: "shift-to-flat-rate-development",
    date: "July 04, 2026",
    category: "Best Practices",
    authorName: "Marcus Thorne",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    excerpt: "Hourly pricing models and bloated project scopes are relics of the past. Explore why modern brands are switching to unlimited subscription plans.",
    content: [
      "# The Shift to Flat-Rate Unlimited Development",
      "",
      "For decades, custom software development has been plagued by a mutual distrust. Clients fear runaway budgets and hidden fees, while agencies struggle with scope creep, unpaid revisions, and unpredictable revenue.",
      "",
      "This friction has driven the rise of a new operational model: **Unlimited Development Subscriptions**.",
      "",
      "---",
      "",
      "## Why Hourly Billing is Broken",
      "Hourly billing sets up a negative incentive structure:",
      "1. **Inefficiency is Rewarded**: The longer a developer takes, the more money they make.",
      "2. **Predictability is Lost**: Clients cannot forecast their software expenses, leading to delayed decisions.",
      "3. **Micro-management Increases**: Time-tracking tools and detailed audit logs consume valuable project hours.",
      "",
      "---",
      "",
      "## The Solution: A Flat Monthly Subscription",
      "Under a subscription-based development ticket system, operations run like a queue:",
      "- **Unlimited Requests**: Put as many tasks in your backlog as you want.",
      "- **Sequential Execution**: Developers work on one or two tickets at a time, delivering constant updates.",
      "- **Flat Pricing**: Pay the exact same amount every month, regardless of request complexity.",
      "",
      "This aligns incentives: the team works as efficiently as possible to clear the queue, and the client enjoys predictable costs and frictionless planning."
    ].join("\n"),
    readTime: "5 min read",
    isPopular: true,
    isFeatured: false
  },
  {
    id: "3",
    title: "Building Custom SaaS Portals in 2026",
    slug: "building-custom-saas-portals",
    date: "June 28, 2026",
    category: "Tutorials",
    authorName: "Elena Rostova",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    excerpt: "Learn how to build customer-facing dashboards that connect to legacy databases, automate report creation, and drive high-touch client retention.",
    content: [
      "# Building Custom SaaS Portals in 2026",
      "",
      "Providing clients with a login portal is no longer a premium feature—it is a baseline expectation. Clients want instant visibility into their project metrics, support requests, and billing cycles.",
      "",
      "Here is how to design and build custom client hubs using modern web frameworks.",
      "",
      "---",
      "",
      "## Key Features of a Command Center",
      "A successful client portal must consolidate scattered data points into a single dashboard:",
      "- **Self-Service Actions**: Requesting estimates, initiating reviews, and updating billing.",
      "- **Automated Workspaces**: Dedicated staging environments or configuration lists.",
      "- **Real-Time System Notifications**: Instant toast messages indicating task updates.",
      "",
      "---",
      "",
      "## Technical Architecture",
      "To build a performant portal, use a decoupled stack:",
      "- **Frontend**: React and Tailwind CSS for interactive components.",
      "- **Styling**: Vanilla CSS tokens to guarantee theme consistency.",
      "- **API Middleware**: Edge-functions to proxy secure third-party database connections.",
      "",
      "By giving clients direct control of their workspaces, you reduce communication overhead by up to 45% and build long-term retention."
    ].join("\n"),
    readTime: "6 min read",
    isPopular: false,
    isFeatured: false
  }
];


/**
 * A robust CSV parser that correctly handles newlines, commas, and escaped double quotes
 * within quoted fields.
 */
function parseCSV(text: string): Record<string, string>[] {
  const lines: string[] = [];
  let row: string[] = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push('');
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(row.join('\x1F')); // separate by a non-printable unit separator
      row = [''];
    } else {
      row[row.length - 1] += char;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row.join('\x1F'));
  }

  if (lines.length < 2) return [];

  const headers = lines[0].split('\x1F').map(h => h.trim().toLowerCase());
  const results: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\x1F');
    if (values.length < headers.length) continue; // skip incomplete rows
    const entry: Record<string, string> = {};
    headers.forEach((header, index) => {
      entry[header] = values[index] || '';
    });
    results.push(entry);
  }

  return results;
}


/**
 * Resolves Google Drive sharing links into direct image URLs.
 */
export function formatImageUrl(url: string): string {
  if (!url) return "";
  
  // Regex to match Google Drive sharing links
  const driveFileRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const driveOpenRegex = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
  
  let fileId = "";
  
  const fileMatch = url.match(driveFileRegex);
  if (fileMatch) {
    fileId = fileMatch[1];
  } else {
    const openMatch = url.match(driveOpenRegex);
    if (openMatch) {
      fileId = openMatch[1];
    }
  }
  
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  
  return url;
}

/**
 * Searches markdown text for inline images and converts Google Drive URLs to direct URLs.
 */
export function formatMarkdownImages(content: string): string {
  if (!content) return "";
  return content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
    return `![${alt}](${formatImageUrl(url)})`;
  });
}


/**
 * Fetches blogs from the public Google Sheet and parses them.
 * Falls back to MOCK_BLOGS if fetching fails or if the sheet contains no articles.
 */
export async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const response = await fetch(GSHEET_CSV_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch Google Sheet: " + response.statusText);
    }

    const csvText = await response.text();
    const parsed = parseCSV(csvText);

    // If Google Sheet is empty or only contains header rows
    if (parsed.length === 0) {
      console.warn("Google Sheet is empty. Using default mock blogs.");
      return MOCK_BLOGS;
    }

    // Map sheet columns to BlogPost interface
    const posts: BlogPost[] = parsed.map((entry, idx) => {
      const id = entry.id || String(idx + 1);
      const isPopular = entry.is_popular?.trim().toUpperCase() === "TRUE";
      const isFeatured = entry.is_featured?.trim().toUpperCase() === "TRUE";

      return {
        id,
        title: entry.title || "Untitled Blog Post",
        slug: entry.slug || ("post-" + id),
        date: entry.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        category: entry.category || "General",
        authorName: entry.author_name || "Anonymous",
        coverImage: formatImageUrl(entry.cover_image) || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        excerpt: entry.excerpt || "",
        content: formatMarkdownImages(entry.content || ""),
        readTime: entry.read_time || "3 min read",
        isPopular,
        isFeatured
      };
    });

    return posts;
  } catch (error) {
    console.error("Error fetching or parsing Google Sheet, falling back to mock data:", error);
    return MOCK_BLOGS;
  }
}

