import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Building, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Lock, 
  BarChart3, 
  RefreshCw,
  Workflow,
  Activity,
  User,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  Laptop
} from "lucide-react";

interface WorkspaceEstimatorProps {
  userName?: string;
  userEmail?: string;
  triggerNotification: (msg: string) => void;
  tryNowTrigger?: number;
}

type DepartmentType = "Fulfillment" | "Sales" | "Marketing" | "Operations" | "Client Success" | "Administration";

export default function WorkspaceEstimator({
  userName: initialUserName = "Member",
  userEmail = "",
  triggerNotification,
  tryNowTrigger = 0
}: WorkspaceEstimatorProps) {
  // Current active step state:
  // 1 to 3: Handled by sequential subStep (1 to 7)
  // 4: Slide-based Audit Report
  const [step, setStep] = useState<number>(1);
  const [subStep, setSubStep] = useState<number>(1);
  const [slideIndex, setSlideIndex] = useState<number>(1);

  // --- Profile States ---
  const [whoName, setWhoName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyDo, setCompanyDo] = useState<string>("");

  // --- Department State ---
  const [selectedDepts, setSelectedDepts] = useState<DepartmentType[]>(["Operations"]);
  const [selectedDept, setSelectedDept] = useState<DepartmentType>("Operations");

  const selectedDeptsText = selectedDepts.length > 0 ? selectedDepts.join(" & ") : "Operations";

  // --- Contextual Answers States ---
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [delaySelections, setDelaySelections] = useState<string[]>([]);
  const [timeSelection, setTimeSelection] = useState<string>("");

  // --- Email Lead Capture States ---
  const [emailAddress, setEmailAddress] = useState<string>(userEmail);
  const [isReportUnlocked, setIsReportUnlocked] = useState<boolean>(false);
  const [isMailSubmitted, setIsMailSubmitted] = useState<boolean>(false);
  
  // --- Support States ---
  const [errorText, setErrorText] = useState<string>("");
  const [isSubmittingMail, setIsSubmittingMail] = useState<boolean>(false);

  // Clear errors when user types or selects
  useEffect(() => {
    setErrorText("");
  }, [whoName, companyName, companyDo, selectedDepts, selectedDept, textAnswer, delaySelections, timeSelection, emailAddress]);

  // Keyboard navigation controller
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isTyping = targetTag === "input" || targetTag === "textarea";

      if (step <= 3) {
        // Questionnaire steps navigation
        if (e.key === "Enter") {
          if (targetTag === "textarea") return; // Allow newlines in textareas
          e.preventDefault();
          handleNext();
        } else if (e.key === "Backspace") {
          if (isTyping) return; // Allow normal deletion
          e.preventDefault();
          handleBack();
        } else if (e.key === "ArrowRight") {
          if (isTyping) return;
          e.preventDefault();
          handleNext();
        } else if (e.key === "ArrowLeft") {
          if (isTyping) return;
          e.preventDefault();
          handleBack();
        }
      } else if (step === 4) {
        // Slide navigation
        if (e.key === "ArrowRight" || e.key === "Enter") {
          e.preventDefault();
          if (slideIndex < 3) {
            setSlideIndex((prev) => (prev + 1) as 1 | 2 | 3);
          }
        } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
          e.preventDefault();
          if (slideIndex > 1) {
            setSlideIndex((prev) => (prev - 1) as 1 | 2 | 3);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step, subStep, slideIndex, whoName, companyName, companyDo, selectedDepts, selectedDept, textAnswer, delaySelections, timeSelection]);

  // Handle try now button trigger from parent App.tsx
  useEffect(() => {
    if (tryNowTrigger > 0) {
      handleReset();
      const element = document.getElementById("workspace-estimator");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [tryNowTrigger]);

  const handleReset = () => {
    setStep(1);
    setSubStep(1);
    setSlideIndex(1);
    setWhoName("");
    setCompanyName("");
    setCompanyDo("");
    setSelectedDepts(["Operations"]);
    setSelectedDept("Operations");
    setTextAnswer("");
    setDelaySelections([]);
    setTimeSelection("");
    setEmailAddress(userEmail);
    setIsReportUnlocked(false);
    setIsMailSubmitted(false);
    setErrorText("");
    setIsSubmittingMail(false);
  };

  const handleBack = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
    }
  };

  const handleNext = () => {
    if (subStep === 1) {
      if (!whoName.trim()) {
        setErrorText("Please specify your name or professional title.");
        return;
      }
      setErrorText("");
      setSubStep(2);
    } else if (subStep === 2) {
      if (!companyName.trim()) {
        setErrorText("Please state your company name.");
        return;
      }
      setErrorText("");
      setSubStep(3);
    } else if (subStep === 3) {
      if (!companyDo.trim()) {
        setErrorText("Please describe briefly what your company does.");
        return;
      }
      setErrorText("");
      setSubStep(4);
    } else if (subStep === 4) {
      if (selectedDepts.length === 0) {
        setErrorText("Please select at least one department to focus automation on.");
        return;
      }
      // Reset contextual answers on dept change to ensure clean sequential step validation
      setTextAnswer("");
      setDelaySelections([]);
      setTimeSelection("");
      setErrorText("");
      setSubStep(5);
    } else if (subStep === 5) {
      if (!textAnswer.trim()) {
        setErrorText("Please answer this question to build context.");
        return;
      }
      setErrorText("");
      setSubStep(6);
    } else if (subStep === 6) {
      if (delaySelections.length === 0) {
        setErrorText("Please select at least one bottleneck option.");
        return;
      }
      setErrorText("");
      setSubStep(7);
    } else if (subStep === 7) {
      if (!timeSelection) {
        setErrorText("Please select your current estimate of weekly time wasted.");
        return;
      }
      setErrorText("");
      setStep(4);
      setSlideIndex(1);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddress || !emailAddress.includes("@") || emailAddress.length < 5) {
      setErrorText("Please enter a valid business email address.");
      return;
    }

    setErrorText("");
    setIsSubmittingMail(true);

    try {
      // POST all quiz answers to Cloudflare Worker, which securely forwards to GHL Contacts API
      // Calls the Vercel serverless function in /api/ghl-proxy.js
      // Same domain — no CORS issues, no external service needed
      const WORKER_URL = "/api/ghl-proxy";

      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:                  emailAddress,
          name_professional_role: whoName,
          company_name:           companyName,
          company_do:             companyDo,
          areas_To_Automate:      selectedDepts.join(", "),        // multi-select → comma-separated
          repetitive_task_query:  textAnswer,
          operational_bottleneck: delaySelections.join(", "),       // multi-select → comma-separated
          operational_hours:      timeSelection,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Worker error:", result);
      }

      setIsSubmittingMail(false);
      setIsMailSubmitted(true);
      triggerNotification(`Full automation audit and detailed specifications dispatched to ${emailAddress}`);
    } catch (err) {
      console.error("Submission failed:", err);
      setIsSubmittingMail(false);
      setErrorText("Something went wrong. Please try again.");
    }
  };

  // --- OPTIONS DEFINITION FOR SELECTOR PAGES ---
  const departmentOptions: { name: DepartmentType; label: string; desc: string }[] = [
    { name: "Fulfillment", label: "Fulfillment & Delivery", desc: "Automate tracking, dispatch sheets, carrier syncing, & delays." },
    { name: "Sales", label: "Sales & Pipeline", desc: "Instantly route hot leads, trigger auto-responders, & clean CRM." },
    { name: "Marketing", label: "Marketing & Content", desc: "Auto-repurpose creatives, capture analytics, & compile reports." },
    { name: "Operations", label: "Internal Operations", desc: "Bridge legacy silos, manage asset sheets, & schedule automatically." },
    { name: "Client Success", label: "Client Success", desc: "Streamline client handoffs, manage ticketholding, & alert reps." },
    { name: "Administration", label: "Administration", desc: "Document validation, invoice processing, and calendar syncs." }
  ];

  // --- DEPARTMENT SPECIFIC QUESTION STRUCTURES ---
  const getContextualContent = () => {
    switch (selectedDept) {
      case "Fulfillment":
        return {
          title: "Optimize Fulfillment & Logistics",
          question1: "What Manual Work Or Repetitive Tasks Take Your Team The Longest?",
          placeholder1: "E.g., Manually Coordinating Status Updates, Looking Up Coordinates, Or Repeating Entry Tasks...",
          question2: "Where Is Your Team's Biggest Fulfillment Bottleneck?",
          options2: [
            "Manual Handoffs And Status Tracking Errors",
            "Slow Back-And-Forth Communication Delays",
            "Checking And Double-Checking Manual Inputs",
            "Repetitive, Manual Status Notification Tasks"
          ],
          question3: "How Many Coordination Hours Are Lost Weekly?",
          options3: ["Fewer Than 5 Hours", "5 To 15 Hours", "15 To 30 Hours", "More Than 30 Hours"]
        };
      case "Sales":
        return {
          title: "Accelerate Sales Pipeline",
          question1: "What Manual Work Or Repetitive Tasks Take Your Team The Longest?",
          placeholder1: "E.g., Typing Repetitive Follow-Up Notes, Moving Lead Details, Or Manual Status Routing...",
          question2: "Where Is Your Team's Biggest Sales Bottleneck?",
          options2: [
            "Manually Assigning And Routing New Leads",
            "Response Lag Times Causing Cooler Lead Engagement",
            "Drafting Repetitive Custom Outreach Or Proposals",
            "Repetitive Post-Meeting Manual Admin Tasks"
          ],
          question3: "How Many Sales Hours Are Lost Weekly?",
          options3: ["Fewer Than 5 Hours", "5 To 15 Hours", "15 To 30 Hours", "More Than 30 Hours"]
        };
      case "Marketing":
        return {
          title: "Streamline Marketing Operations",
          question1: "What Manual Work Or Repetitive Tasks Take Your Team The Longest?",
          placeholder1: "E.g., Manually Copy-Pasting Layouts, Compiling Cross-Channel Performance Stats...",
          question2: "Where Is Your Team's Biggest Marketing Bottleneck?",
          options2: [
            "Formatting Repetitive Content Assets Manually",
            "Transferring Campaign Information From Place To Place",
            "Cleaning And Updating Contact Lists Or Tags",
            "Manually Consolidating Report Metrics"
          ],
          question3: "How Many Marketing Hours Are Lost Weekly?",
          options3: ["Fewer Than 5 Hours", "5 To 15 Hours", "15 To 30 Hours", "More Than 30 Hours"]
        };
      case "Operations":
        return {
          title: "Refine Core Operations",
          question1: "What Manual Work Or Repetitive Tasks Take Your Team The Longest?",
          placeholder1: "E.g., Moving Text Fields Between Interfaces, Manual Double-Entry, Or Schedule Alignments...",
          question2: "Where Is Your Team's Biggest Operational Bottleneck?",
          options2: [
            "Manually Copy-Pasting Information Between Interfaces",
            "Delays Waiting On Internal Team Handoffs",
            "Repetitive Scheduling Or Team Task Assignments",
            "Fixing Errors And Typos Caused By Manual Data Entries"
          ],
          question3: "How Many Operational Hours Are Lost Weekly?",
          options3: ["Fewer Than 5 Hours", "5 To 15 Hours", "15 To 30 Hours", "More Than 30 Hours"]
        };
      case "Client Success":
        return {
          title: "Enhance Customer Success Operations",
          question1: "What Manual Work Or Repetitive Tasks Take Your Team The Longest?",
          placeholder1: "E.g., Re-Typing Standard Onboarding Responses, Preparing Custom Tracking Lists...",
          question2: "Where Is Your Team's Biggest Client Support Bottleneck?",
          options2: [
            "Manually Organizing And Routing Support Tickets",
            "Long Delays Waiting On Internal Team Updates",
            "Repetitive, Manual Client Onboarding Setup Steps",
            "Re-Logging Ticket Details To Coordinate Teams"
          ],
          question3: "How Many Support Hours Are Lost Weekly?",
          options3: ["Fewer Than 5 Hours", "5 To 15 Hours", "15 To 30 Hours", "More Than 30 Hours"]
        };
      case "Administration":
      default:
        return {
          title: "Automate Admin & Document Processing",
          question1: "What Manual Work Or Repetitive Tasks Take Your Team The Longest?",
          placeholder1: "E.g., Tracking Down Signatures, Validating Invoices, Or Organizing Team Meetings...",
          question2: "Where Is Your Team's Biggest Administrative Bottleneck?",
          options2: [
            "Processing Physical Or Digital Documents Manually",
            "Chasing Missing Team Details Or Supervisor Approvals",
            "Coordinating Complex Meetings Across Different Calendars",
            "Updating Ledger, Accounting, Or Billing Records Manually"
          ],
          question3: "How Many Admin Hours Are Lost Weekly?",
          options3: ["Fewer Than 5 Hours", "5 To 15 Hours", "15 To 30 Hours", "More Than 30 Hours"]
        };
    }
  };

  const contextualDoc = getContextualContent();

  // --- DYNAMIC RESULTS CALCULATOR FOR THE SLIDE REPORT ---
  const calculateAuditResults = () => {
    // 1. Base hours from weekly time wasted selection
    let baseHours = 8;
    const lower = timeSelection.toLowerCase();
    if (lower.includes("under 5") || lower.includes("fewer than 5") || lower.includes("1 to 4")) {
      baseHours = 3;
    } else if (lower.includes("fewer than 8")) {
      baseHours = 5;
    } else if (lower.includes("5 to 12") || lower.includes("4 to 10")) {
      baseHours = 8;
    } else if (lower.includes("5 to 15") || lower.includes("8 to 15")) {
      baseHours = 10;
    } else if (lower.includes("10 to 20") || lower.includes("12 to 25") || lower.includes("15 to 25")) {
      baseHours = 18;
    } else if (lower.includes("15 to 30")) {
      baseHours = 22;
    } else if (lower.includes("more than 20") || lower.includes("more than 25") || lower.includes("more than 30")) {
      baseHours = 35;
    }

    // 2. Scale factor from selected departments
    const deptCount = selectedDepts.length || 1;
    
    // 3. Scale factor from specific bottlenecks selected
    const bottleneckCount = delaySelections.length || 1;
    const bottleneckMultiplier = 1 + (bottleneckCount * 0.15); // each bottleneck adds 15% to savings potential

    // 4. Text answer analysis (makes it feel highly custom!)
    let intelligenceMultiplier = 1.0;
    const combinedAnswers = `${textAnswer} ${companyDo}`.toLowerCase();
    if (combinedAnswers.includes("excel") || combinedAnswers.includes("spreadsheet") || combinedAnswers.includes("csv")) {
      intelligenceMultiplier += 0.08;
    }
    if (combinedAnswers.includes("manual") || combinedAnswers.includes("copy") || combinedAnswers.includes("paste")) {
      intelligenceMultiplier += 0.05;
    }
    if (combinedAnswers.includes("error") || combinedAnswers.includes("fail") || combinedAnswers.includes("mistake")) {
      intelligenceMultiplier += 0.07;
    }

    // Calculate annual hours saved
    const weeklyHoursWasted = baseHours * deptCount * bottleneckMultiplier * intelligenceMultiplier;
    
    // We assume we can automate about 85% of their manual wasted hours
    const efficiencyRecoveryRate = 0.85;
    const weeklyHoursSaved = Math.round(weeklyHoursWasted * efficiencyRecoveryRate * 10) / 10;
    const annualHoursSaved = Math.round(weeklyHoursSaved * 48); // 48 active weeks

    // 5. Staff cost based on company description & role
    let staffCostPerHour = 45; // default
    const roleText = whoName.toLowerCase();
    if (roleText.includes("lead") || roleText.includes("manager") || roleText.includes("head") || roleText.includes("director") || roleText.includes("vp")) {
      staffCostPerHour = 65;
    } else if (roleText.includes("engineer") || roleText.includes("dev") || roleText.includes("analyst")) {
      staffCostPerHour = 55;
    } else if (roleText.includes("owner") || roleText.includes("founder") || roleText.includes("ceo")) {
      staffCostPerHour = 85;
    }

    const potentialFinancialSavings = annualHoursSaved * staffCostPerHour;
    
    // Dynamic speed ratio (AI processing speed ratio) based on bottleneck intensity
    const speedRatio = Math.min(99, Math.max(88, 85 + (bottleneckCount * 3) + Math.round(intelligenceMultiplier * 5)));

    return {
      annualHoursSaved,
      potentialFinancialSavings: potentialFinancialSavings.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
      speedRatio,
      department: selectedDept,
      company: companyName || "Your Company",
      who: whoName || "Director"
    };
  };

  const auditData = calculateAuditResults();

  const getFlowSteps = () => {
    switch (selectedDept) {
      case "Fulfillment":
        return [
          { step: "Step 1", title: "Order Intake", desc: "Automatically capture new order sheets or tracking coordinates without manual copy-pasting." },
          { step: "Step 2", title: "Carrier Sync", desc: "Instantly update inventory logs, map shipping carriers, and sync dispatch details." },
          { step: "Step 3", title: "Client Notification", desc: "Dispatch real-time delivery notifications and tracking details to client portals." }
        ];
      case "Sales":
        return [
          { step: "Step 1", title: "Lead Ingestion", desc: "Ingest hot inbound leads instantly from multi-channel webforms or files." },
          { step: "Step 2", title: "Pipeline Routing", desc: "Directly analyze prospect data to assign and route leads to specific account executives." },
          { step: "Step 3", title: "Instant Engagement", desc: "Trigger personalized auto-responses to maximize meeting book rates." }
        ];
      case "Marketing":
        return [
          { step: "Step 1", title: "Asset Intake", desc: "Monitor collaborative folders for creative drafts or raw production files." },
          { step: "Step 2", title: "Multi-Platform Formatting", desc: "Automatically format, tag, and schedule marketing campaigns." },
          { step: "Step 3", title: "Dashboard Reporting", desc: "Compile multi-channel analytics and export summary sheets directly to stakeholders." }
        ];
      case "Operations":
        return [
          { step: "Step 1", title: "File Listening", desc: "Monitor spreadsheet changes or new database records in real-time." },
          { step: "Step 2", title: "Cross-System Sync", desc: "Process, translate, and synchronize mismatched fields across software silos." },
          { step: "Step 3", title: "Error Guarding", desc: "Run secondary double-validation checks to prevent parsing discrepancies." }
        ];
      case "Client Success":
        return [
          { step: "Step 1", title: "Support Routing", desc: "Listen for new support tickets and categorize request priority." },
          { step: "Step 2", title: "Manager Dispatch", desc: "Escalate urgent alerts directly to active customer success managers." },
          { step: "Step 3", title: "Checklist Launch", desc: "Trigger client onboarding flows and automated setup updates." }
        ];
      case "Administration":
      default:
        return [
          { step: "Step 1", title: "Document Scanning", desc: "Extract key fields from newly uploaded invoices, PDFs, or contracts." },
          { step: "Step 2", title: "Ledger Reconciliation", desc: "Map and enter payment data directly into QuickBooks or accounting platforms." },
          { step: "Step 3", title: "Schedule Alignment", desc: "Cross-reference and coordinate stakeholder calendars automatically." }
        ];
    }
  };

  return (
    <section 
      id="workspace-estimator"
      className="relative w-full overflow-hidden text-left py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-24 z-10 bg-transparent"
    >
      {/* Background visual graphics */}
      <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute left-1/3 bottom-1/3 w-[450px] h-[450px] bg-[#a484ff]/4 rounded-full blur-[140px] pointer-events-none" />

      {/* Aesthetic mesh grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" className="text-[#a484ff]/10">
          <defs>
            <pattern id="estimator-mesh-grid-updated" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#estimator-mesh-grid-updated)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* ========================================================== */}
        {/* Section Header                                             */}
        {/* ========================================================== */}
        <div className="space-y-4 mb-8 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-[#a484ff]/30 text-[#d5c9ff] backdrop-blur-md shadow-[0_0_15px_rgba(164,132,255,0.15)] select-none mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-[#a484ff]" />
            <span className="text-xs font-semibold tracking-wider text-[#d5c9ff] font-manrope uppercase">
              Operational Automation Audit
            </span>
          </div>

          <h2 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.12]">
            Stop Wasting Hours
          </h2>
          <p className="font-manrope text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed font-light">
            Take our 2-minute audit. We'll Show You Exactly Where <span className="text-[#a484ff] font-semibold">Time &amp; Money</span> Are Being Wasted In Your Business.
          </p>
        </div>

        {/* ========================================================== */}
        {/* Main Content Card Container - Unified Layout              */}
        {/* ========================================================== */}
        <div className={`w-full mx-auto rounded-3xl bg-[#0f0b24]/90 border-2 border-[#7e72b8]/30 backdrop-blur-md shadow-[0_25px_65px_rgba(126,114,184,0.15)] relative overflow-hidden transition-all duration-500 text-left ${
          step === 4 ? "max-w-5xl p-6 sm:p-8" : "max-w-xl p-6 sm:p-8"
        }`}>
          
          {/* Accent top border glow */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#b3a7eb]/40 to-transparent pointer-events-none" />

          {/* Steps dot indicator progress bar on top for sequential questions */}
          {step <= 3 && (
            <div className="flex items-center justify-between border-b border-[#7e72b8]/20 pb-4 mb-6 font-manrope">
              <span className="text-[10px] text-[#cbbef0]/65 uppercase font-bold tracking-widest">
                Question {subStep} of 7
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === subStep 
                        ? "w-6 bg-[#b3a7eb] shadow-[0_0_8px_rgba(179,167,235,0.8)]" 
                        : s < subStep 
                          ? "w-3 bg-[#7e72b8]/50" 
                          : "w-1.5 bg-white/[0.08]"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* ========================================================== */}
            {/* SEQUENTIAL QUESTIONS (SUBSTEPS 1 to 7)                     */}
            {/* ========================================================== */}
            {step <= 3 && (
              <motion.div
                key={`substep-${subStep}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Question 1: Name / Role */}
                {subStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#cbbef0] tracking-tight leading-snug">
                        What Is Your Name / Professional Role?
                      </h3>
                      <p className="font-manrope text-xs sm:text-sm text-[#7e72b8]/70 leading-relaxed font-light">
                        Let's Customize Your Operational Savings Report.
                      </p>
                    </div>
                    <div className="relative pt-2">
                      <input
                        type="text"
                        value={whoName}
                        onChange={(e) => setWhoName(e.target.value)}
                        placeholder="E.g., Sarah Jenkins, Operations Lead"
                        className="w-full bg-[#18152c]/90 hover:bg-[#1f1a3a]/90 focus:bg-[#231d42] border-2 border-[#7e72b8]/30 focus:border-[#b3a7eb] rounded-xl px-5 py-3.5 text-white placeholder-[#7e72b8]/40 text-sm outline-none transition-all font-semibold font-manrope shadow-[0_0_15px_rgba(126,114,184,0.05)]"
                      />
                    </div>
                  </div>
                )}

                {/* Question 2: Company Name */}
                {subStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#cbbef0] tracking-tight leading-snug">
                        What Is Your Company's Name?
                      </h3>
                      <p className="font-manrope text-xs sm:text-sm text-[#7e72b8]/70 leading-relaxed font-light">
                        We Will Tailor The Audit Specifically To Your Business Operations.
                      </p>
                    </div>
                    <div className="relative pt-2">
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="E.g., Summit Logistics"
                        className="w-full bg-[#18152c]/90 hover:bg-[#1f1a3a]/90 focus:bg-[#231d42] border-2 border-[#7e72b8]/30 focus:border-[#b3a7eb] rounded-xl px-5 py-3.5 text-white placeholder-[#7e72b8]/40 text-sm outline-none transition-all font-semibold font-manrope shadow-[0_0_15px_rgba(126,114,184,0.05)]"
                      />
                    </div>
                  </div>
                )}

                {/* Question 3: Company Activities */}
                {subStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#cbbef0] tracking-tight leading-snug">
                        What Does Your Company Do?
                      </h3>
                      <p className="font-manrope text-xs sm:text-sm text-[#7e72b8]/70 leading-relaxed font-light">
                        Provide A Brief Sentence Description Of Your Primary Workflow Or Industry.
                      </p>
                    </div>
                    <div className="relative pt-2">
                      <textarea
                        value={companyDo}
                        onChange={(e) => setCompanyDo(e.target.value)}
                        placeholder="E.g., Third-Party Logistics And Custom Cargo Delivery Management..."
                        rows={3}
                        className="w-full bg-[#18152c]/90 hover:bg-[#1f1a3a]/90 focus:bg-[#231d42] border-2 border-[#7e72b8]/30 focus:border-[#b3a7eb] rounded-xl px-5 py-3.5 text-white placeholder-[#7e72b8]/40 text-sm outline-none transition-all font-semibold font-manrope resize-none shadow-[0_0_15px_rgba(126,114,184,0.05)]"
                      />
                    </div>
                  </div>
                )}

                {/* Question 4: Department Selection */}
                {subStep === 4 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#cbbef0] tracking-tight leading-snug">
                        Select One Or More Core Areas To Automate
                      </h3>
                      <p className="font-manrope text-xs sm:text-sm text-[#7e72b8]/70 leading-relaxed font-light">
                        Choose The Departments In <span className="text-[#ebdfff] font-semibold">{companyName || "Your Business"}</span> Where Manual Data Work Takes The Longest.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {departmentOptions.map((opt) => {
                        const isSelected = selectedDepts.includes(opt.name);
                        return (
                          <div
                            key={opt.name}
                            onClick={() => {
                              if (isSelected) {
                                if (selectedDepts.length > 1) {
                                  const next = selectedDepts.filter((d) => d !== opt.name);
                                  setSelectedDepts(next);
                                  setSelectedDept(next[0]);
                                }
                              } else {
                                const next = [...selectedDepts, opt.name];
                                setSelectedDepts(next);
                                setSelectedDept(next[0]);
                              }
                            }}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left hover:scale-[1.015] ${
                              isSelected 
                                ? "bg-[#7e72b8]/20 border-[#b3a7eb] shadow-[0_0_15px_rgba(179,167,235,0.15)]" 
                                : "bg-[#18152c]/50 border-[#7e72b8]/20 hover:border-[#7e72b8]/40 hover:bg-[#18152c]/80"
                            }`}
                          >
                            <div className="space-y-1 font-manrope">
                              <span className={`text-xs block font-bold transition-all ${
                                isSelected ? "text-[#ebdfff]" : "text-[#cbbef0]"
                              }`}>
                                {opt.label}
                              </span>
                              <p className="text-[#7e72b8]/80 font-light text-[11px] leading-relaxed select-none">
                                {opt.desc}
                              </p>
                            </div>
                            <div className="flex items-center justify-end mt-3">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                isSelected ? "border-[#b3a7eb] bg-[#7e72b8]" : "border-[#7e72b8]/20 bg-black/10"
                              }`}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Question 5: Department Context Q1 */}
                {subStep === 5 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs font-manrope text-[#b3a7eb] uppercase font-bold tracking-wider">
                        {selectedDeptsText} Department
                      </div>
                      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#cbbef0] tracking-tight leading-snug">
                        {contextualDoc.question1}
                      </h3>
                    </div>
                    <div className="relative pt-2">
                      <textarea
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        placeholder={contextualDoc.placeholder1}
                        rows={3}
                        className="w-full bg-[#18152c]/90 hover:bg-[#1f1a3a]/90 focus:bg-[#231d42] border-2 border-[#7e72b8]/30 focus:border-[#b3a7eb] rounded-xl px-5 py-3.5 text-white placeholder-[#7e72b8]/40 text-sm outline-none transition-all font-semibold font-manrope resize-none shadow-[0_0_15px_rgba(126,114,184,0.05)]"
                      />
                    </div>
                  </div>
                )}

                {/* Question 6: Department Context Q2 */}
                {subStep === 6 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs font-manrope text-[#b3a7eb] uppercase font-bold tracking-wider">
                        {selectedDeptsText} Department
                      </div>
                      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#cbbef0] tracking-tight leading-snug">
                        {contextualDoc.question2}
                      </h3>
                      <p className="font-manrope text-xs text-[#7e72b8]/70 font-light">
                        Select All That Apply To Your Current Operations.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {contextualDoc.options2.map((opt) => {
                        const isChosen = delaySelections.includes(opt);
                        const handleToggle = () => {
                          if (isChosen) {
                            setDelaySelections(delaySelections.filter((x) => x !== opt));
                          } else {
                            setDelaySelections([...delaySelections, opt]);
                          }
                        };
                        return (
                          <div
                            key={opt}
                            onClick={handleToggle}
                            className={`p-4 rounded-xl border-2 text-xs sm:text-sm font-manrope cursor-pointer flex items-center justify-between transition-all duration-200 ${
                              isChosen 
                                ? "bg-[#7e72b8]/20 border-[#b3a7eb] shadow-[0_0_10px_rgba(179,167,235,0.1)]" 
                                : "bg-[#18152c]/30 border-[#7e72b8]/20 hover:bg-[#18152c]/70 hover:border-[#7e72b8]/40"
                            }`}
                          >
                            <span className={isChosen ? "text-white font-semibold" : "text-[#ebdfff]/70"}>
                              {opt}
                            </span>
                            <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                              isChosen ? "border-[#b3a7eb] bg-[#7e72b8]" : "border-[#7e72b8]/20 bg-black/10"
                            }`}>
                              {isChosen && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Question 7: Department Context Q3 */}
                {subStep === 7 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs font-manrope text-[#b3a7eb] uppercase font-bold tracking-wider">
                        {selectedDeptsText} Department
                      </div>
                      <h3 className="font-manrope text-xl sm:text-2xl font-bold text-[#cbbef0] tracking-tight leading-snug">
                        {contextualDoc.question3}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {contextualDoc.options3.map((opt) => {
                        const isChosen = timeSelection === opt;
                        return (
                          <div
                            key={opt}
                            onClick={() => setTimeSelection(opt)}
                            className={`p-4 rounded-xl border-2 text-center text-xs sm:text-sm font-manrope cursor-pointer transition-all duration-200 ${
                              isChosen 
                                ? "bg-[#7e72b8]/20 border-[#b3a7eb] font-semibold text-white shadow-[0_0_12px_rgba(179,167,235,0.15)]" 
                                : "bg-[#18152c]/30 border-[#7e72b8]/20 hover:bg-[#18152c]/70 hover:border-[#7e72b8]/40 text-[#ebdfff]/60"
                            }`}
                          >
                            {opt}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {errorText && (
                  <p className="text-red-400 font-manrope text-[11px] font-semibold animate-pulse leading-none pt-1">
                    ✕ {errorText}
                  </p>
                )}

                {/* Question Navigation Controls */}
                <div className="pt-4 border-t border-[#7e72b8]/20 flex items-center justify-between">
                  {subStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="px-5 py-2.5 border-2 border-[#7e72b8]/30 hover:border-[#7e72b8]/60 hover:bg-[#18152c] rounded-xl text-[#cbbef0]/70 hover:text-[#ebdfff] transition-all text-xs font-manrope font-bold tracking-wider cursor-pointer"
                    >
                      ← BACK
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={handleNext}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#7e72b8] to-[#b3a7eb] hover:shadow-[0_0_20px_rgba(179,167,235,0.3)] text-[#0f0b24] text-xs font-manrope font-bold tracking-widest transition-all uppercase cursor-pointer"
                  >
                    {subStep === 7 ? "GENERATE QUOTE →" : "CONTINUE →"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ========================================================== */}
            {/* STEP 4: PRESENTATION SLIDESHOW MODE (SLIDES 1, 2, & 3)     */}
            {/* ========================================================== */}
            {step === 4 && (
              <motion.div
                key="presentation-container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row gap-6 items-stretch"
              >
                
                {/* --- LEFT SIDEBAR: GOOGLE SLIDES / POWERPOINT STYLE PREVIEW PANEL --- */}
                <div className="flex flex-row md:flex-col gap-3 w-full md:w-52 shrink-0 border-b md:border-b-0 md:border-r border-[#7e72b8]/20 pb-4 md:pb-0 md:pr-4 overflow-x-auto md:overflow-x-visible scrollbar-thin select-none">
                  
                  {/* Thumbnail 1: Savings Quote */}
                  <button
                    onClick={() => setSlideIndex(1)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all w-full min-w-[150px] cursor-pointer ${
                      slideIndex === 1
                        ? "bg-[#7e72b8]/20 border-[#b3a7eb] shadow-[0_0_12px_rgba(179,167,235,0.15)]"
                        : "bg-[#18152c]/40 border-transparent hover:border-[#7e72b8]/35"
                    }`}
                  >
                    <div className="w-8 h-8 rounded bg-[#7e72b8]/30 flex items-center justify-center font-manrope text-xs font-bold text-[#ebdfff] shrink-0">
                      1
                    </div>
                    <div className="min-w-0 font-manrope flex-1">
                      <div className="text-[11px] font-bold text-white truncate">Savings Quote</div>
                      <div className="text-[9px] text-[#cbbef0]/65 font-light truncate">Custom Audit</div>
                    </div>
                  </button>

                  {/* Thumbnail 2: Custom Workflow Map */}
                  <button
                    onClick={() => setSlideIndex(2)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all w-full min-w-[150px] cursor-pointer ${
                      slideIndex === 2
                        ? "bg-[#7e72b8]/20 border-[#b3a7eb] shadow-[0_0_12px_rgba(179,167,235,0.15)]"
                        : "bg-[#18152c]/40 border-transparent hover:border-[#7e72b8]/35"
                    }`}
                  >
                    <div className="w-8 h-8 rounded bg-[#7e72b8]/30 flex items-center justify-center font-manrope text-xs font-bold text-[#ebdfff] shrink-0 relative">
                      2
                      <div className="absolute inset-0 bg-[#0c0919]/70 rounded flex items-center justify-center">
                        <Lock className="w-3 h-3 text-[#b3a7eb]" />
                      </div>
                    </div>
                    <div className="min-w-0 font-manrope flex-1">
                      <div className="text-[11px] font-bold text-white truncate">Workflow Map</div>
                      <div className="text-[9px] text-[#cbbef0]/65 font-light truncate">
                        <span>Diagram</span>
                      </div>
                    </div>
                  </button>

                  {/* Thumbnail 3: Roadmap */}
                  <button
                    onClick={() => setSlideIndex(3)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all w-full min-w-[150px] cursor-pointer ${
                      slideIndex === 3
                        ? "bg-[#7e72b8]/20 border-[#b3a7eb] shadow-[0_0_12px_rgba(179,167,235,0.15)]"
                        : "bg-[#18152c]/40 border-transparent hover:border-[#7e72b8]/35"
                    }`}
                  >
                    <div className="w-8 h-8 rounded bg-[#7e72b8]/30 flex items-center justify-center font-manrope text-xs font-bold text-[#ebdfff] shrink-0 relative">
                      3
                      <div className="absolute inset-0 bg-[#0c0919]/70 rounded flex items-center justify-center">
                        <Lock className="w-3 h-3 text-[#b3a7eb]" />
                      </div>
                    </div>
                    <div className="min-w-0 font-manrope flex-1">
                      <div className="text-[11px] font-bold text-white truncate">Implementation</div>
                      <div className="text-[9px] text-[#cbbef0]/65 font-light truncate">
                        <span>Roadmap</span>
                      </div>
                    </div>
                  </button>

                </div>

                {/* --- RIGHT DISPLAY STAGE: PRESENTATION WINDOW --- */}
                <div className="flex-1 min-w-0 flex flex-col justify-between relative min-h-[420px]">
                  
                  {/* Outer Frame Wrapper containing the actual slides */}
                  <div className="w-full flex-1 flex flex-col justify-between">
                    
                    {/* Slide content area with gating blur if applicable */}
                    <div className={`transition-all duration-500 flex-1 flex flex-col justify-between ${
                      (slideIndex === 2 || slideIndex === 3)
                        ? "filter blur-[5px] opacity-55 select-none pointer-events-none"
                        : ""
                    }`}>
                      
                      {/* --- SLIDE 1: SAVINGS QUOTE --- */}
                      {slideIndex === 1 && (
                        <div className="space-y-6">
                           {/* Slide Header */}
                          <div className="border-b border-[#7e72b8]/20 pb-4">
                            <span className="text-[10px] text-[#b3a7eb] uppercase tracking-widest font-extrabold font-manrope block">
                              Operational Automation Proposal
                            </span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#ebdfff] font-manrope mt-1">
                              Custom Efficiency & Savings Quote
                            </h3>
                          </div>

                          {/* Minimal Two-Column PPT Layout */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch pt-2">
                            
                            {/* Left Column: Cost and Hour savings */}
                            <div className="flex flex-col justify-center space-y-5 border-r border-[#7e72b8]/15 pr-0 md:pr-6 text-left">
                              <div>
                                <span className="text-[9px] text-[#7e72b8] uppercase font-bold tracking-widest font-manrope block mb-0.5">
                                  ESTIMATED TIME RECOVERED
                                </span>
                                <span className="text-4xl sm:text-5xl font-light text-[#ebdfff] font-instrument block">
                                  {auditData.annualHoursSaved} hrs
                                </span>
                                <span className="text-[11px] text-[#cbbef0]/60 font-manrope font-light mt-1 block">
                                  recovered per year in manual {selectedDeptsText.toLowerCase()} tasks.
                                </span>
                              </div>

                              <div className="pt-2">
                                <span className="text-[9px] text-[#7e72b8] uppercase font-bold tracking-widest font-manrope block mb-0.5">
                                  ESTIMATED BUDGET RECLAIMED
                                </span>
                                <span className="text-4xl sm:text-5xl font-semibold text-[#b3a7eb] font-manrope block">
                                  {auditData.potentialFinancialSavings}
                                </span>
                                <span className="text-[11px] text-[#cbbef0]/60 font-manrope font-light mt-1 block">
                                  saved annually by automating copying and updating operations.
                                </span>
                              </div>
                            </div>

                            {/* Right Column: Operations Flow Strategy */}
                            <div className="flex flex-col justify-start space-y-4 text-left">
                              <span className="text-[9px] text-[#7e72b8] uppercase font-bold tracking-widest font-manrope block">
                                OPERATIONS FLOW STRATEGY
                              </span>
                              
                              <div className="space-y-3.5 font-manrope">
                                {getFlowSteps().map((item) => (
                                  <div key={item.step} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#7c3aed]/15 text-[#a484ff] border border-[#a484ff]/10">
                                        {item.step}
                                      </span>
                                      <span className="text-xs font-bold text-white tracking-tight">
                                        {item.title}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-[#cbbef0]/70 leading-relaxed font-light">
                                      {item.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>
                      )}

                      {/* --- SLIDE 2: WORKFLOW DIAGRAM --- */}
                      {slideIndex === 2 && (
                        <div className="space-y-6">
                          {/* Slide Header */}
                          <div className="border-b border-[#7e72b8]/20 pb-4">
                            <span className="text-[10px] text-[#b3a7eb] uppercase tracking-widest font-extrabold font-manrope block">
                              Interactive Architecture Map
                            </span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#ebdfff] font-manrope mt-1">
                              Step-By-Step {selectedDeptsText} Workflow
                            </h3>
                            <p className="text-xs text-[#cbbef0]/60 font-manrope font-light mt-0.5">
                              Custom visual representation of your proposed backend automation pipeline
                            </p>
                          </div>

                          {/* Horizontal Flowchart */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch pt-2 font-manrope">
                            
                            {/* Node 1 */}
                            <div className="bg-[#18152c]/80 border-2 border-[#7e72b8]/30 rounded-xl p-4 space-y-1 text-center flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] text-[#b3a7eb] font-bold block tracking-wider">1. INTAKE</span>
                                <h5 className="text-xs font-semibold text-white mt-1">Capture Trigger</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">Form submission, API callback, or incoming file arrival triggers the automation pipeline instantly.</p>
                            </div>

                            {/* Node 2 */}
                            <div className="bg-[#18152c]/80 border-2 border-[#7e72b8]/30 rounded-xl p-4 space-y-1 text-center flex flex-col justify-between relative">
                              <div>
                                <span className="text-[10px] text-[#b3a7eb] font-bold block tracking-wider">2. EXTRACT</span>
                                <h5 className="text-xs font-semibold text-white mt-1">Parse Records</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">The system extracts key values, matches CRM templates, and formats the record fields safely.</p>
                            </div>

                            {/* Node 3 */}
                            <div className="bg-[#18152c]/80 border-2 border-[#7e72b8]/30 rounded-xl p-4 space-y-1 text-center flex flex-col justify-between relative">
                              <div>
                                <span className="text-[10px] text-[#b3a7eb] font-bold block tracking-wider">3. RESOLVE</span>
                                <h5 className="text-xs font-semibold text-white mt-1">Database Sync</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">Structured updates are pushed securely to matching spreadsheet columns, client databases, or legacy CRM rows.</p>
                            </div>

                            {/* Node 4 */}
                            <div className="bg-[#18152c]/80 border-2 border-[#7e72b8]/30 rounded-xl p-4 space-y-1 text-center flex flex-col justify-between relative">
                              <div>
                                <span className="text-[10px] text-[#b3a7eb] font-bold block tracking-wider">4. NOTIFY</span>
                                <h5 className="text-xs font-semibold text-white mt-1">Instant Alerts</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">Slack channels, team boards, or customer notification threads are automatically updated with real-time logs.</p>
                            </div>

                          </div>

                          {/* Unlocked Dispatch Message */}
                          {isReportUnlocked && (
                            <div className="bg-[#7e72b8]/10 border-2 border-[#b3a7eb]/30 rounded-xl p-3.5 text-center font-manrope">
                              <p className="text-xs text-[#ebdfff] font-semibold">
                                ✓ Custom technical design and full integration parameters have been successfully sent to {emailAddress}.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* --- SLIDE 3: IMPLEMENTATION ROADMAP --- */}
                      {slideIndex === 3 && (
                        <div className="space-y-6">
                          {/* Slide Header */}
                          <div className="border-b border-[#7e72b8]/20 pb-4">
                            <span className="text-[10px] text-[#b3a7eb] uppercase tracking-widest font-extrabold font-manrope block">
                              Execution Blueprint
                            </span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#ebdfff] font-manrope mt-1">
                              Delivery Roadmap & Timeline
                            </h3>
                            <p className="text-xs text-[#cbbef0]/60 font-manrope font-light mt-0.5">
                              Estimated timeline for setting up and deploying the custom automated flows
                            </p>
                          </div>

                          {/* Timeline Layout */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch pt-2 font-manrope text-left">
                            
                            {/* Week 1 */}
                            <div className="bg-[#18152c]/60 border border-[#7e72b8]/20 rounded-xl p-4 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] bg-[#7e72b8]/20 text-[#ebdfff] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Week 1</span>
                                <h5 className="text-xs font-bold text-white mt-2">Mapping Operations</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">Document current workflows, map target data fields, and structure webhook formats.</p>
                            </div>

                            {/* Week 2 */}
                            <div className="bg-[#18152c]/60 border border-[#7e72b8]/20 rounded-xl p-4 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] bg-[#7e72b8]/20 text-[#ebdfff] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Week 2</span>
                                <h5 className="text-xs font-bold text-white mt-2">Core Pipeline Setup</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">Establish database endpoints, code validation routines, and connect secure APIs.</p>
                            </div>

                            {/* Week 3 */}
                            <div className="bg-[#18152c]/60 border border-[#7e72b8]/20 rounded-xl p-4 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] bg-[#7e72b8]/20 text-[#ebdfff] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Week 3</span>
                                <h5 className="text-xs font-bold text-white mt-2">Testing & Validation</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">Run test records through the system to catch errors and verify data parsing reliability.</p>
                            </div>

                            {/* Week 4 */}
                            <div className="bg-[#18152c]/60 border border-[#7e72b8]/20 rounded-xl p-4 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] bg-[#b3a7eb]/20 text-[#b3a7eb] px-2 py-0.5 rounded font-bold uppercase tracking-wider">Week 4</span>
                                <h5 className="text-xs font-bold text-white mt-2">Launch & Handoff</h5>
                              </div>
                              <p className="text-[10px] text-[#cbbef0]/60 leading-relaxed font-light mt-2">Deliver documentation log lines, hand off administration credentials, and go fully live.</p>
                            </div>

                          </div>

                          {/* Unlocked Dispatch Message */}
                          {isReportUnlocked && (
                            <div className="bg-[#7e72b8]/10 border-2 border-[#b3a7eb]/30 rounded-xl p-3.5 text-center font-manrope">
                              <p className="text-xs text-[#ebdfff] font-semibold">
                                ✓ Full project milestone tracking sheet has been delivered to {emailAddress}.
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* --- COMMON SLIDE BOTTOM STATUS BAR (only clear / unlocked slides) --- */}
                      <div className="pt-4 mt-6 border-t border-[#7e72b8]/20 flex items-center justify-between font-manrope text-xs">
                        <button
                          onClick={handleReset}
                          className="text-[#7e72b8] hover:text-[#b3a7eb] transition-all font-bold tracking-wider cursor-pointer"
                        >
                          Restart Audit
                        </button>
                        <span className="text-[#7e72b8]/60 select-none">
                          Slide {slideIndex} of 3
                        </span>
                        
                        {slideIndex === 1 ? (
                          <button
                            onClick={() => setSlideIndex(2)}
                            className="px-5 py-2.5 bg-gradient-to-r from-[#7e72b8] to-[#b3a7eb] text-[#0f0b24] font-bold rounded-xl transition-all hover:scale-102 cursor-pointer uppercase tracking-wider text-[10px]"
                          >
                            Next: Slide 2 →
                          </button>
                        ) : slideIndex === 2 ? (
                          <button
                            onClick={() => setSlideIndex(3)}
                            className="px-5 py-2.5 bg-gradient-to-r from-[#7e72b8] to-[#b3a7eb] text-[#0f0b24] font-bold rounded-xl transition-all hover:scale-102 cursor-pointer uppercase tracking-wider text-[10px]"
                          >
                            Next: Slide 3 →
                          </button>
                        ) : (
                          <button
                            onClick={() => setSlideIndex(1)}
                            className="px-5 py-2.5 border-2 border-[#7e72b8]/30 hover:border-[#7e72b8]/60 rounded-xl text-[#cbbef0] transition-all cursor-pointer uppercase tracking-wider text-[10px]"
                          >
                            ← Back To Slide 1
                          </button>
                        )}
                      </div>

                    </div>

                    {/* --- GATED POP-UP WINDOW (OVERLAY ON SLIDES 2 AND 3 ALWAYS) --- */}
                    {(slideIndex === 2 || slideIndex === 3) && (
                      <div className="absolute inset-0 flex items-center justify-center p-4 z-40 bg-black/40 rounded-2xl backdrop-blur-sm">
                        <div className="bg-[#131024]/98 border-2 border-[#b3a7eb]/60 p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-[0_15px_45px_rgba(179,167,235,0.25)] text-center space-y-5">
                          
                          {!isMailSubmitted ? (
                            <>
                              <div className="space-y-1.5">
                                <h4 className="text-lg font-bold text-white font-manrope tracking-tight leading-tight">
                                  Receive the full audit on your email
                                </h4>
                                <p className="text-[#a484ff] text-xs font-manrope font-semibold tracking-wide">
                                  Enter your email below to instantly receive your custom interactive workflow diagram & implementation roadmap.
                                </p>
                              </div>

                              <form onSubmit={handleEmailSubmit} className="space-y-3">
                                <input
                                  type="email"
                                  value={emailAddress}
                                  onChange={(e) => setEmailAddress(e.target.value)}
                                  placeholder="e.g. jane@company.com"
                                  className="w-full bg-[#18152c] border-2 border-[#7e72b8]/40 focus:border-[#b3a7eb] rounded-xl px-4 py-3 text-white placeholder-[#7e72b8]/40 text-xs outline-none transition-all font-semibold font-manrope"
                                  required
                                />

                                {errorText && (
                                  <p className="text-red-400 text-xs font-bold font-manrope text-center animate-pulse leading-none pt-1">
                                    ✕ {errorText}
                                  </p>
                                )}

                                <button
                                  type="submit"
                                  disabled={isSubmittingMail}
                                  className="w-full py-3.5 bg-gradient-to-r from-[#7e72b8] to-[#b3a7eb] text-[#0f0b24] text-xs font-manrope tracking-wider font-extrabold rounded-xl transition-all hover:shadow-[0_0_15px_rgba(179,167,235,0.25)] uppercase cursor-pointer flex items-center justify-center gap-2"
                                >
                                  {isSubmittingMail ? (
                                    <span>PROCESSING AUDIT...</span>
                                  ) : (
                                    <span>Receive The Full Audit On My Email</span>
                                  )}
                                </button>
                              </form>
                            </>
                          ) : (
                            <div className="space-y-4 py-2">
                              <div className="w-12 h-12 bg-purple-950/45 border border-[#b3a7eb]/45 rounded-full flex items-center justify-center mx-auto text-[#b3a7eb]">
                                <ShieldCheck className="w-6 h-6 animate-bounce" />
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-base sm:text-lg font-bold text-white font-manrope tracking-tight">
                                  Audit Queued For Delivery!
                                </h4>
                                <p className="text-[#cbbef0]/80 text-xs font-manrope leading-relaxed font-light">
                                  We have compiled your answers. The system is processing your custom automation specs and will send the final audit report directly to your email address at <span className="text-white font-semibold">{emailAddress}</span> within 24 hours.
                                </p>
                                <div className="p-3 bg-[#18152c]/80 rounded-xl border border-[#7e72b8]/20 text-[10px] text-[#b3a7eb] font-mono tracking-tight text-center">
                                  ✓ DELIVERY QUEUE ACTIVE • DELIVERING IN 24 HOURS
                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => setSlideIndex(1)}
                            className="text-xs text-[#7e72b8] hover:text-[#b3a7eb] transition-all font-semibold block mx-auto pt-2 cursor-pointer"
                          >
                            ← Back To Slide 1
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}
