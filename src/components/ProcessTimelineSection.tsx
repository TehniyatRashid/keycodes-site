import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Check, 
  ChevronRight,
  TrendingUp,
  Clock,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Send,
  ChevronDown,
  FileText,
  User,
  Workflow,
  ListTodo,
  Plus,
  Trash2
} from "lucide-react";

// Robust contextual analysis helper
function getContextualSolution(problem: string) {
  const text = problem.toLowerCase();
  
  // 1. Finance / Invoice / Payments
  if (
    text.includes("invoice") || 
    text.includes("billing") || 
    text.includes("payment") || 
    text.includes("finance") || 
    text.includes("receipt") || 
    text.includes("accounting") || 
    text.includes("quickbooks") || 
    text.includes("stripe")
  ) {
    return {
      department: "Finance",
      shortTitle: "Automated Billing & Ledger Reconciliation",
      triggerName: "New Invoice PDF Ingested",
      triggerDesc: "Invoices entering mailboxes trigger the parsing pipeline.",
      action1Name: "Automated OCR Parsing Engine",
      action1Desc: "Extracts table items, subtotals, and vendor metadata with 99.8% precision.",
      action2Name: "QuickBooks Reconciliation",
      action2Desc: "Matches verified totals with bank ledger deposits to flag anomalies.",
      triggerTime: "0.4s (Instant Scan)",
      action1Time: "12.5s (Data Parsing)",
      action2Time: "1.2s (Quick Ledger Match)",
      workflowSavedHours: "18 Hours/Wk Saved",
      checklist: [
        { id: 1, text: "Configure email attachment scrapers for incoming billing PDFs", checked: true },
        { id: 2, text: "Deploy Automated OCR Parsing Pipelines To Extract Unstructured Table Lines", checked: true },
        { id: 3, text: "Set up validation matching rules inside QuickBooks ledgers", checked: false, isCurrent: true },
        { id: 4, text: "Configure instant Slack notifications for invoicing discrepancies", checked: false },
        { id: 5, text: "Sync daily reconciliation aggregates to prevent manual audit periods", checked: false }
      ],
      messages: [
        { id: 1, sender: "Sarah K.", role: "Lead Engineer", text: "OCR pipeline connected. We are getting perfect table extractions from raw invoice uploads.", time: "11:42 AM", isSelf: false },
        { id: 2, sender: "Alex S.", role: "Developer", text: " QuickBooks reconciliation checks are green. Ledgers sync automatically.", time: "11:43 AM", isSelf: false },
        { id: 3, sender: "Reign", role: "You", text: "Incredible work! Let's verify that anomalous invoice alerts ping the accounting channel immediately.", time: "11:45 AM", isSelf: true }
      ],
      queue: [
        { id: 1042, title: "Automated Invoice Parser API", status: "Deployed", metric: "Saved 18h/wk" },
        { id: 1043, title: "QuickBooks Match Engine", status: "Testing (95% Live)", metric: "Reconciled" },
        { id: 1044, title: "Slack Billing Alert Triggers", status: "Scheduled", metric: "Active Alert" }
      ]
    };
  }

  // 2. Customer Support / Helpdesk
  if (
    text.includes("support") || 
    text.includes("ticket") || 
    text.includes("customer") || 
    text.includes("helpdesk") || 
    text.includes("feedback") || 
    text.includes("chat") || 
    text.includes("zendesk") || 
    text.includes("intercom")
  ) {
    return {
      department: "Support",
      shortTitle: "Automated Helpdesk Ticket Router",
      triggerName: "Zendesk/Intercom Ticket Created",
      triggerDesc: "A new inquiry or support ticket registers in your workspace stream.",
      action1Name: "Urgency Parsing System",
      action1Desc: "Extracts customer emotion, language, and assigns an urgency priority score.",
      action2Name: "Auto-Draft Response Generator",
      action2Desc: "Queries company knowledge base to pre-populate personalized resolution replies.",
      triggerTime: "0.2s (Real-time Webhook)",
      action1Time: "5.8s (Urgency Tagging)",
      action2Time: "1.1s (KB Article Match)",
      workflowSavedHours: "22 Hours/Wk Saved",
      checklist: [
        { id: 1, text: "Connect streaming webhook listeners to support channels (Zendesk/Intercom)", checked: true },
        { id: 2, text: "Structure Urgency Classifiers To Detect Angry Or Urgent Issues", checked: true },
        { id: 3, text: "Seed Knowledge Base Document Search Inside Developer Data Nodes", checked: false, isCurrent: true },
        { id: 4, text: "Build Resolution Draft Composer Within Support Dashboard", checked: false },
        { id: 5, text: "Establish auto-escalation pathways to notify managers on urgent tickets", checked: false }
      ],
      messages: [
        { id: 1, sender: "Sarah K.", role: "Lead Engineer", text: "The support webhook listener is fully live. We are receiving support tickets in under 50ms.", time: "11:42 AM", isSelf: false },
        { id: 2, sender: "Alex S.", role: "Developer", text: "I've seeded the document knowledge base search nodes. Automation rules are extremely accurate.", time: "11:43 AM", isSelf: false },
        { id: 3, sender: "Reign", role: "You", text: "Let's ensure tickets with urgent sentiment scores trigger managers' phone alerts instantly.", time: "11:45 AM", isSelf: true }
      ],
      queue: [
        { id: 1042, title: "Helpdesk Webhook Stream", status: "Deployed", metric: "Saved 22h/wk" },
        { id: 1043, title: "Knowledge Draft Composer", status: "Testing (96% Live)", metric: "80% Faster" },
        { id: 1044, title: "Manager Escalation Channels", status: "Scheduled", metric: "Under 5m SLA" }
      ]
    };
  }

  // 3. E-commerce / Warehousing / Inventory
  if (
    text.includes("inventory") || 
    text.includes("product") || 
    text.includes("order") || 
    text.includes("shipping") || 
    text.includes("ecommerce") || 
    text.includes("shopify") || 
    text.includes("cart") || 
    text.includes("shipstation")
  ) {
    return {
      department: "E-Commerce",
      shortTitle: "Live Stock & Fulfillment Sync",
      triggerName: "New Order Placed on Shopify",
      triggerDesc: "Customers purchasing items triggers warehouse distribution checks.",
      action1Name: "Multi-Warehouse Stock Sync",
      action1Desc: "Instantly decrements item quantity levels across connected fulfillment systems.",
      action2Name: "ShipStation Label Dispatch",
      action2Desc: "Auto-generates shipping documentation and prints label batches instantly.",
      triggerTime: "0.6s (Shopify Event)",
      action1Time: "8.4s (Stock Validation)",
      action2Time: "15.0s (Label Dispatch)",
      workflowSavedHours: "25 Hours/Wk Saved",
      checklist: [
        { id: 1, text: "Establish webhook endpoints on Shopify checkout orders", checked: true },
        { id: 2, text: "Deploy warehouse stock protection layers to prevent double-selling", checked: true },
        { id: 3, text: "Connect ShipStation API to print shipping documents automatically", checked: false, isCurrent: true },
        { id: 4, text: "Deploy customized SMS update notifications to tracking customers", checked: false },
        { id: 5, text: "Format dashboard logs to record labor metrics and package processing rates", checked: false }
      ],
      messages: [
        { id: 1, sender: "Sarah K.", role: "Lead Engineer", text: "Shopify stream matches perfect order payloads. Real-time fulfillment triggers in under 120ms.", time: "11:42 AM", isSelf: false },
        { id: 2, sender: "Alex S.", role: "Developer", text: "Twilio tracking SMS triggers automatically now whenever ShipStation outputs shipping labels.", time: "11:43 AM", isSelf: false },
        { id: 3, sender: "Reign", role: "You", text: "Excellent. Let's make sure stock protection matches warehouse inventory perfectly.", time: "11:45 AM", isSelf: true }
      ],
      queue: [
        { id: 1042, title: "Shopify Checkout webhook", status: "Deployed", metric: "Saved 25h/wk" },
        { id: 1043, title: "ShipStation Label Generator", status: "Testing (97% Live)", metric: "Auto Printed" },
        { id: 1044, title: "Warehousing Stock Guard", status: "Scheduled", metric: "0 Stock Loss" }
      ]
    };
  }

  // 4. Default / Outbound / Leads / Sales (Lead follow-up / general case)
  return {
    department: "Sales & Marketing",
    shortTitle: "Instant Outbound Lead Follow-Up System",
    triggerName: "New Contact Form Submission",
    triggerDesc: "Prospective lead enters database details or landing page forms.",
    action1Name: "Advanced Profiler & Lead Score",
    action1Desc: "Enriches leads with business metrics and constructs custom follow-up outlines.",
    action2Name: "SMS & Email Dispatcher",
    action2Desc: "Dispatches direct, high-converting follow-up texts and emails in under 60 seconds.",
    triggerTime: "0.3s (Form Webhook)",
    action1Time: "4.2s (Profile Enrichment)",
    action2Time: "0.8s (SMS API Dispatch)",
    workflowSavedHours: "20 Hours/Wk Saved",
    checklist: [
      { id: 1, text: "Setup incoming lead webhook receivers to capture profiles in under 1s", checked: true },
      { id: 2, text: "Build Personalization Flow Structures To Tailor Outbound Messaging", checked: true },
      { id: 3, text: "Integrate Twilio SMS & SendGrid email APIs for instant follow-ups", checked: false, isCurrent: true },
      { id: 4, text: "Verify automated CRM updating to cut out manual administrative data work", checked: false },
      { id: 5, text: "Deploy weekly efficiency analytics summaries directly to corporate Slack", checked: false }
    ],
    messages: [
      { id: 1, sender: "Sarah K.", role: "Lead Engineer", text: "Webhook receiver integrated. We're capturing incoming landing page leads instantly.", time: "11:42 AM", isSelf: false },
      { id: 2, sender: "Alex S.", role: "Developer", text: "Twilio SMS/email triggers are green. Personalized outreach is dispatching in 45 seconds.", time: "11:43 AM", isSelf: false },
      { id: 3, sender: "Reign", role: "You", text: "Superb. Let's make sure the follow-up updates the CRM record automatically with the outbound logs.", time: "11:45 AM", isSelf: true }
    ],
    queue: [
      { id: 1042, title: "Landing Page Webhooks", status: "Deployed", metric: "Saved 20h/wk" },
      { id: 1043, title: "Outbound API Personalizer", status: "Testing (98% Live)", metric: "Active" },
      { id: 1044, title: "CRM Logging & Slack Sync", status: "Scheduled", metric: "Auto Logged" }
    ]
  };
}

interface CenterShowcaseWrapperProps {
  index: number;
  isActive: boolean;
  hoveredStepIndex: number | null;
  setHoveredStepIndex: (index: number | null) => void;
  paddingClass?: string;
  wrapperClass?: string;
  children: React.ReactNode;
}

const CenterShowcaseWrapper: React.FC<CenterShowcaseWrapperProps> = ({
  index,
  isActive,
  hoveredStepIndex,
  setHoveredStepIndex,
  paddingClass = "",
  wrapperClass = "",
  children
}) => {
  return (
    <div 
      className={wrapperClass}
    >
      <div
        className={`${paddingClass} w-full h-full flex flex-col justify-between rounded-2xl bg-[#0a0717]/95 border overflow-hidden transition-[border-color,opacity] duration-[280ms] ease-out ${
          isActive
            ? "border-[#a484ff]/60 shadow-[0_0_40px_rgba(164,132,255,0.25),_inset_0_0_15px_rgba(164,132,255,0.1)] ring-1 ring-[#a484ff]/30 cursor-pointer hover:border-[#a484ff]"
            : "border-white/5 bg-[#0a0717]/70 pointer-events-none opacity-50"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

interface ProcessTimelineSectionProps {
  onOpenPricingModal?: () => void;
  tryNowTrigger?: number;
}

export default function ProcessTimelineSection({ onOpenPricingModal, tryNowTrigger = 0 }: ProcessTimelineSectionProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isCentered, setIsCentered] = useState(false);
  const [visibleIndices, setVisibleIndices] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false
  });
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);
  const hoveredStepIndexRef = useRef<number | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const scrollAnimRef = useRef<number | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const lastPointerMoveRef = useRef(0);
  const exitTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (exitTimerRef.current !== null) {
      window.clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
  };

  // Arm the pop only from genuine pointer movement over the middle of a card.
  // Content sliding under a still pointer never gets here, so scrolling past a
  // row can no longer trigger (or cancel) the effect.
  const armHover = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (performance.now() - lastPointerMoveRef.current > 160) return;
    clearTimers();
    if (hoveredStepIndexRef.current === index) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = Math.abs(e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = Math.abs(e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    if (dx > 0.6 || dy > 0.62) return; // edges don't arm it — only the card's middle
    hoverTimerRef.current = window.setTimeout(() => {
      hoverTimerRef.current = null;
      setHoveredStepIndex(index);
      setActiveIndex(index);
    }, 60);
  };

  // Leaving sideways (or any direction) releases it, with a hair of grace so a
  // pointer riding the card's own edge doesn't flicker it on and off.
  const cancelHover = (index: number) => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (hoveredStepIndexRef.current !== index) return;
    if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null;
      setHoveredStepIndex(null);
    }, 70);
  };

  const releaseHoverNow = () => {
    clearTimers();
    if (hoveredStepIndexRef.current !== null) setHoveredStepIndex(null);
  };

  // Track real pointer motion ahead of the card handlers (capture phase)
  useEffect(() => {
    const onMove = () => { lastPointerMoveRef.current = performance.now(); };
    window.addEventListener("mousemove", onMove, { passive: true, capture: true });
    return () => window.removeEventListener("mousemove", onMove, { capture: true } as any);
  }, []);

  // Background simulations only tick while the section is on screen
  useEffect(() => {
    const section = document.getElementById("process-pipeline");
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { rootMargin: "250px 0px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    hoveredStepIndexRef.current = hoveredStepIndex;
  }, [hoveredStepIndex]);

  // Whenever activeIndex changes, reset centering and start a 2-second delay timer
  useEffect(() => {
    if (activeIndex === -1) {
      setIsCentered(false);
      return;
    }
    setIsCentered(false);
    const timer = setTimeout(() => {
      setIsCentered(true);
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Trigger scroll to Step 1 (index 0) from external "Try Now" buttons
  useEffect(() => {
    if (tryNowTrigger > 0) {
      scrollToStep(0);
    }
  }, [tryNowTrigger]);

  // Custom live input problems for each step to support fully personalized flows
  const [customProblem, setCustomProblem] = useState(
    "I want to automate outbound lead follow-ups to save 20 hours a week and double sales response speed."
  );
  const [step2Problem, setStep2Problem] = useState(
    "Draft custom high-converting follow-up emails and dispatch instant SMS texts via Twilio API."
  );
  const [step3Problem, setStep3Problem] = useState(
    "Set up form webhook receivers and trigger instant outbound profile personalization flows."
  );
  const [step4Problem, setStep4Problem] = useState(
    "Review outbound follow-up open rates, weekly hours saved, and lead conversion metrics."
  );

  // Auto-align steps 2, 3, and 4 whenever the main step 1 problem changes
  useEffect(() => {
    const text = customProblem.toLowerCase();
    if (text.includes("invoice") || text.includes("billing") || text.includes("reconcile") || text.includes("payment")) {
      setStep2Problem("Verify line items automatically inside QuickBooks and set up email notifications for discrepancies.");
      setStep3Problem("Establish real-time webhook listeners and alert our developer support team on Slack.");
      setStep4Problem("Monitor billing aggregates, OCR precision rates, and track total invoice audit hours saved.");
    } else if (text.includes("support") || text.includes("ticket") || text.includes("sentiment") || text.includes("customer")) {
      setStep2Problem("Generate draft answers from our internal developer knowledge base and flag angry customers.");
      setStep3Problem("Create Zendesk ticket integrations and train support assistants to review automated drafts.");
      setStep4Problem("Visualize support team response speeds, SLA compliance levels, and customer sentiment trends.");
    } else if (text.includes("inventory") || text.includes("product") || text.includes("shopify") || text.includes("order")) {
      setStep2Problem("Decrement warehouse stock automatically and trigger ShipStation labels for rapid dispatch.");
      setStep3Problem("Connect multi-warehouse tracking databases and print package batches seamlessly.");
      setStep4Problem("Track checkout order success rates, shipping dispatch queue speeds, and live stock levels.");
    } else {
      setStep2Problem("Draft custom high-converting follow-up emails and dispatch instant SMS texts via Twilio API.");
      setStep3Problem("Set up form webhook receivers and trigger instant outbound profile personalization flows.");
      setStep4Problem("Review outbound follow-up open rates, weekly hours saved, and lead conversion metrics.");
    }
  }, [customProblem]);

  // Parse custom dynamic context for each step individually (using previous step inputs)
  const contextStep1 = getContextualSolution(customProblem);
  const contextStep2 = getContextualSolution(customProblem); // Step 2 displays unique details from Step 1 input
  const contextStep3 = getContextualSolution(step2Problem || customProblem); // Step 3 displays unique details from Step 2 input
  const contextStep4 = getContextualSolution(step3Problem || step2Problem || customProblem); // Step 4 displays unique details from Step 3 input

  // Deprecate single context variable to avoid confusion, pointing it to Step 1 baseline
  const context = contextStep1;

  // State for Step 2 Flow Cycles & Pipeline Steps
  const [pipelineSteps, setPipelineSteps] = useState<Array<{
    id: string;
    type: "Trigger" | "Action";
    name: string;
    desc: string;
  }>>([]);
  const [isUserModifiedPipeline, setIsUserModifiedPipeline] = useState(false);
  const [newStepName, setNewStepName] = useState("");
  const [step2Cycle, setStep2Cycle] = useState(0);

  // Sync initial pipeline steps when customProblem shifts (unless modified by user)
  useEffect(() => {
    if (isUserModifiedPipeline) return;
    const fresh = getContextualSolution(customProblem);
    setPipelineSteps([
      {
        id: "1",
        type: "Trigger",
        name: fresh.triggerName,
        desc: fresh.triggerDesc,
      },
      {
        id: "2",
        type: "Action",
        name: fresh.action1Name,
        desc: fresh.action1Desc,
      },
      {
        id: "3",
        type: "Action",
        name: fresh.action2Name,
        desc: fresh.action2Desc,
      }
    ]);
  }, [customProblem, isUserModifiedPipeline]);

  // Rotate through pipeline steps based on dynamic length
  useEffect(() => {
    if (!isSectionVisible) return;
    const timer = setInterval(() => {
      setStep2Cycle(prev => (prev + 1) % (pipelineSteps.length || 3));
    }, 2000);
    return () => clearInterval(timer);
  }, [pipelineSteps.length, isSectionVisible]);

  // State for Step 3 Interactive human builder (uses contextStep3 checklists & messages!)
  const [step3Tab, setStep3Tab] = useState(0); // 0: Checklist, 1: Flow View, 2: Ticket Chat
  const [step3Checklist, setStep3Checklist] = useState<any[]>(contextStep3.checklist);
  const [step3Messages, setStep3Messages] = useState<any[]>(contextStep3.messages);
  const [typingState, setTypingState] = useState<string | null>(null);
  const [activeFlowNode, setActiveFlowNode] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [isUserModifiedChecklist, setIsUserModifiedChecklist] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [chatMessageInput, setChatMessageInput] = useState("");
  const [isUserModifiedChat, setIsUserModifiedChat] = useState(false);
  const [isAutoTabEnabled, setIsAutoTabEnabled] = useState(true);

  // Step 4 dashboard states (resonating with main command center)
  const [step4Executions, setStep4Executions] = useState(14820);
  const [step4HoursSaved, setStep4HoursSaved] = useState(342.5);
  const [step4Accuracy, setStep4Accuracy] = useState(98.8);

  useEffect(() => {
    if (!isSectionVisible) return;
    const interval = setInterval(() => {
      setStep4Executions(prev => prev + Math.floor(Math.random() * 2) + 1);
      setStep4HoursSaved(prev => +(prev + (Math.random() * 0.15 + 0.05)).toFixed(1));
    }, 3200);
    return () => clearInterval(interval);
  }, [isSectionVisible]);

  // Sync checklist and messages when customProblem or step2Problem shifts
  useEffect(() => {
    const fresh = getContextualSolution(step2Problem || customProblem);
    setStep3Checklist(fresh.checklist);
    setStep3Messages(fresh.messages);
    setIsUserModifiedChecklist(false);
  }, [step2Problem, customProblem]);

  // Auto tab rotation every 5.5 seconds (only if auto tab is enabled)
  useEffect(() => {
    if (!isAutoTabEnabled || !isSectionVisible) return;
    const timer = setInterval(() => {
      setStep3Tab(prev => (prev + 1) % 3);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoTabEnabled, isSectionVisible]);

  // Flow node toggle based on dynamic pipeline steps length
  useEffect(() => {
    if (!isSectionVisible) return;
    const timer = setInterval(() => {
      setActiveFlowNode(prev => (prev + 1) % (pipelineSteps.length || 3));
    }, 2000);
    return () => clearInterval(timer);
  }, [pipelineSteps.length, isSectionVisible]);

  // Auto-scroll chat internally inside the container
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [step3Messages, step3Tab]);

  // Real-time developer comment and checklist simulation in background
  useEffect(() => {
    if (!isSectionVisible) return;
    const subInterval = setInterval(() => {
      // 1. Run checklist progress (only if not customized by user)
      if (!isUserModifiedChecklist) {
        setStep3Checklist(prev => {
          if (!prev || prev.length === 0) return prev;
          const currentIdx = prev.findIndex(item => !item.checked);
          if (currentIdx === -1) {
            // Reset checklist to original baseline
            const base = getContextualSolution(customProblem).checklist;
            return base;
          }
          const updated = [...prev];
          updated[currentIdx] = { ...updated[currentIdx], checked: true, isCurrent: false };
          if (currentIdx + 1 < updated.length) {
            updated[currentIdx + 1] = { ...updated[currentIdx + 1], isCurrent: true };
          }
          return updated;
        });
      }

      // 2. Chat messaging simulator
      if (isUserModifiedChat) return;

      setStep3Messages(current => {
        if (!current || current.length === 0) return current;
        if (current.length >= 6) {
          return getContextualSolution(customProblem).messages;
        }
        const extraMessages = [
          { sender: "Alex S.", role: "Developer", text: `Custom pipeline logic validated. Running testing cycles inside staging environment.`, time: "11:48 AM", isSelf: false },
          { sender: "Sarah K.", role: "Lead Engineer", text: `Checking edge cases now. Ingestion speeds look beautiful—completely resolved under 100ms.`, time: "11:49 AM", isSelf: false },
          { sender: "Alex S.", role: "Developer", text: `All pipelines verified. Dashboard is live and recording cumulative savings records.`, time: "11:51 AM", isSelf: false }
        ];
        const nextIdx = current.length - 3;
        if (nextIdx >= 0 && nextIdx < extraMessages.length) {
          setTypingState(extraMessages[nextIdx].sender);
          setTimeout(() => {
            setTypingState(null);
            setStep3Messages(prev => {
              if (prev.some(m => m.text === extraMessages[nextIdx].text)) return prev;
              return [...prev, { id: Date.now(), ...extraMessages[nextIdx] }];
            });
          }, 1000);
        }
        return current;
      });
    }, 4500);

    return () => clearInterval(subInterval);
  }, [customProblem, isSectionVisible]);

  // State for Step 4 Successful Runs Counter
  const [successCount, setSuccessCount] = useState(1482);
  useEffect(() => {
    if (!isSectionVisible) return;
    const interval = setInterval(() => {
      setSuccessCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 3800);
    return () => clearInterval(interval);
  }, [isSectionVisible]);

  // Refs for focusing
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  // Input/textarea refs for auto-focusing on active step
  const step1TextareaRef = useRef<HTMLTextAreaElement>(null);
  const step2InputRef = useRef<HTMLInputElement>(null);
  const step3InputRef = useRef<HTMLInputElement>(null);
  const step4InputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Disabled auto-focus on scroll to ensure stable mobile layout and prevent automatic keyboard popups
  }, [activeIndex, isCentered]);

  // Ultra-fast scrolling & wheel listener: clears hover state ONLY if currently hovered, preventing scroll lag
  useEffect(() => {
    let ticking = false;

    const scrollKeys = new Set([
      "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
      "PageUp", "PageDown", "Home", "End", " ", "Spacebar"
    ]);

    const handleUserTakeover = () => {
      // The user grabbed the scroll: abort any programmatic glide and drop the pop
      if (scrollAnimRef.current !== null) {
        cancelAnimationFrame(scrollAnimRef.current);
        scrollAnimRef.current = null;
      }
      releaseHoverNow();
    };

    const handleKeyTakeover = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (scrollKeys.has(e.key)) handleUserTakeover();
    };

    const handleScroll = () => {

      if (hoveredStepIndexRef.current !== null) return; // don't re-shuffle under a popped card

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = document.getElementById("process-pipeline");
          if (!section) {
            ticking = false;
            return;
          }
          const sectionRect = section.getBoundingClientRect();
          // If the section hasn't entered the viewport yet, keep any step from being active
          if (sectionRect.top > window.innerHeight * 0.8) {
            setActiveIndex((prev) => (prev !== -1 ? -1 : prev));
            ticking = false;
            return;
          }

          const refs = [step1Ref, step2Ref, step3Ref, step4Ref];
          const viewportCenter = window.innerHeight / 2;
          let minDistance = Infinity;
          let closestIdx = 0;

          refs.forEach((ref, idx) => {
            const el = ref.current;
            if (el) {
              const rect = el.getBoundingClientRect();
              const elementCenter = rect.top + rect.height / 2;
              const distance = Math.abs(elementCenter - viewportCenter);
              if (distance < minDistance) {
                minDistance = distance;
                closestIdx = idx;
              }
            }
          });

          setActiveIndex((prev) => {
            if (prev !== closestIdx) {
              return closestIdx;
            }
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserTakeover, { passive: true });
    window.addEventListener("touchmove", handleUserTakeover, { passive: true });
    window.addEventListener("keydown", handleKeyTakeover);
    // Run once initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserTakeover);
      window.removeEventListener("touchmove", handleUserTakeover);
      window.removeEventListener("keydown", handleKeyTakeover);
      if (scrollAnimRef.current !== null) cancelAnimationFrame(scrollAnimRef.current);
      if (hoverTimerRef.current !== null) window.clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const luxuryScrollTo = (element: HTMLElement, duration: number = 680) => {
    if (scrollAnimRef.current !== null) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }
    const rect = element.getBoundingClientRect();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const startY = window.scrollY;
    const targetY = Math.max(
      0,
      Math.min(rect.top + startY - window.innerHeight / 2 + rect.height / 2, maxScroll)
    );
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    let startTime: number | null = null;
    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // behavior "auto" overrides the global CSS smooth scrolling, which would
      // otherwise animate every frame of this loop and cause the stutter.
      window.scrollTo({ top: startY + distance * easeOutQuint(progress), behavior: "auto" });
      if (progress < 1) {
        scrollAnimRef.current = requestAnimationFrame(animateScroll);
      } else {
        scrollAnimRef.current = null;
      }
    };

    scrollAnimRef.current = requestAnimationFrame(animateScroll);
  };

  const scrollToStep = (idx: number, customDuration?: number) => {
    setActiveIndex(idx);
    const refs = [step1Ref, step2Ref, step3Ref, step4Ref];
    const target = refs[idx]?.current;
    if (target) {
      luxuryScrollTo(target, customDuration || 600);
    }
  };

  const isStepActive = (idx: number) => {
    return activeIndex === idx;
  };

  return (
    <section 
      id="process-pipeline"
      className={`relative w-full overflow-hidden text-left py-16 sm:py-24 md:py-28 px-4 sm:px-8 md:px-12 lg:px-[120px] bg-transparent transition-all duration-300 ease-out ${
        hoveredStepIndex !== null ? "z-30" : "z-10"
      }`}
    >
      
      {/* Global Backdrop Blur Overlay when hovering over any mockup card */}
      <div 
        style={{ willChange: "opacity" }}
        className={`fixed inset-0 w-screen h-screen bg-[#05030a]/85 transition-opacity duration-[320ms] ease-out pointer-events-none ${
          hoveredStepIndex !== null 
            ? "opacity-100 z-10" 
            : "opacity-0 z-[-1]"
        }`}
      />
      
      {/* Background Soft Ambient Lights & Auras */}
      <div className="absolute left-[10%] top-[20%] w-[500px] h-[500px] bg-[#7b39fc]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute right-[10%] top-[50%] w-[500px] h-[500px] bg-pink-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute left-[20%] bottom-[10%] w-[450px] h-[450px] bg-[#a484ff]/4 rounded-full blur-[140px] pointer-events-none" />

      {/* Dynamic Ambient Blur Layer that intensifies depending on activeIndex */}
      <div 
        className="absolute inset-0 transition-opacity duration-[600ms] ease-out pointer-events-none z-[1]"
        style={{
          opacity: activeIndex < 0 ? 0.4 : 1,
          background: `radial-gradient(circle at ${Math.max(0, activeIndex) % 2 === 0 ? '30%' : '70%'} ${20 + Math.max(0, activeIndex) * 20}%, rgba(123, 57, 252, 0.06) 0%, transparent 60%)`
        }}
      />

      {/* Grid Lines backdrop */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" className="text-[#a484ff]/20">
          <defs>
            <pattern id="process-layout-grid-custom" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#process-layout-grid-custom)" />
        </svg>
      </div>

      <div className={`max-w-5xl mx-auto relative transition-all duration-300 ${hoveredStepIndex !== null ? "z-20" : "z-10"}`}>
        
        {/* ========================================================== */}
        {/* Section Header                                             */}
        {/* ========================================================== */}
        <div className={`text-center space-y-4 mb-24 md:mb-28 max-w-4xl mx-auto transition-opacity duration-[380ms] ease-out ${hoveredStepIndex !== null ? "opacity-[0.18] pointer-events-none" : ""}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/20 to-indigo-950/20 border border-[#a484ff]/30 text-[#d5c9ff] backdrop-blur-md shadow-[0_0_15px_rgba(164,132,255,0.15)] hover:border-[#a484ff]/50 hover:shadow-[0_0_25px_rgba(164,132,255,0.25)] transition-all duration-300 select-none">
            <Sparkles className="h-3.5 w-3.5 text-[#a484ff]" />
            <span className="text-xs font-semibold tracking-wider text-[#d5c9ff] font-manrope uppercase">
              Workflow Sequence
            </span>
          </div>

          <h2 className="font-instrument text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight leading-[1.15]">
            Your Fastest Path to 500+ Saved Hours Every Month.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e2dbff] to-[#a484ff]">
              Custom Systems Delivered in Under 5 Days.
            </span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[#7e72b8]/70 font-manrope max-w-md mx-auto pt-1 font-light leading-relaxed">
            Enter your biggest operational challenge. Our system will map out a tailored automation solution for you instantly.
          </p>
        </div>

        {/* ========================================================== */}
        {/* Focused Steps List                                         */}
        {/* ========================================================== */}
        <div className="relative space-y-24 sm:space-y-36 md:space-y-40">
          
          <style>{`
            @keyframes flow-pulse-down {
              0% { transform: translateY(-100%); opacity: 0; }
              40% { opacity: 1; }
              70% { opacity: 1; }
              100% { transform: translateY(220%); opacity: 0; }
            }
            .animate-line-pulse {
              animation: flow-pulse-down 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            }
            @keyframes step-card-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            .animate-step-card-float {
              animation: step-card-float 4.5s ease-in-out infinite;
            }
          `}</style>

          {/* ========================================================== */}
          {/* STEP 01 - Text Left, Custom Input Right                    */}
          {/* ========================================================== */}
          <div 
            ref={step1Ref}
            data-step-index={0}
            onClick={() => { if (activeIndex !== 0) scrollToStep(0); }}
            onMouseLeave={() => cancelHover(0)}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative transition-[opacity,transform] duration-[380ms] ease-out py-8 transform-gpu ${
              hoveredStepIndex !== null
                ? hoveredStepIndex === 0
                  ? "opacity-100 pointer-events-auto z-30"
                  : "opacity-[0.16] pointer-events-none z-10"
                : isStepActive(0) 
                  ? "opacity-100 pointer-events-auto z-20" 
                  : "opacity-45 pointer-events-auto cursor-pointer hover:opacity-100"
            }`}
          >
            {/* Text Segment */}
            <div className={`lg:col-span-5 text-left space-y-4 lg:pr-6 order-1 transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
              hoveredStepIndex === 0
                ? "lg:-translate-x-8 opacity-0 pointer-events-none"
                : isStepActive(0)
                  ? "translate-x-0 scale-100 opacity-100 pointer-events-auto" 
                  : "scale-[0.99] opacity-50 pointer-events-auto"
            }`}>
              <div className="flex items-center gap-4">
                <span className={`font-instrument text-5xl md:text-6xl font-normal tracking-wide transition-colors duration-200 ${isStepActive(0) ? "text-[#a484ff]" : "text-slate-600"}`}>
                  01
                </span>
                <div className={`h-[1px] flex-grow bg-gradient-to-r transition-all duration-300 ${isStepActive(0) ? "from-[#a484ff] to-transparent" : "from-slate-800 to-transparent"}`} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal font-instrument tracking-tight text-white">
                Define Your Operational Goals
              </h3>
              <p className="text-sm sm:text-base leading-relaxed font-manrope text-white/80">
                Identify Exactly Where Your Organization Is Facing Manual Bottlenecks Or Inefficiencies. Whether It Involves Copy-Pasting Spreadsheets, Delayed Inbound Lead Responding, Or Complex File Sorting, We Work With You To Structure Clear Integration Targets.
              </p>
            </div>
 
            {/* Live Interactive Problem Textarea matching User Image Layout perfectly */}
            <div 
              className="lg:col-span-7 order-2 lg:pl-6 relative"
              onMouseMove={(e) => armHover(0, e)}
              onMouseLeave={() => cancelHover(0)}
            >
              <div className={`w-full h-full transition-transform duration-[430ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform backface-hidden relative ${
                hoveredStepIndex === 0
                  ? "z-50 scale-[1.02] lg:scale-[1.04] lg:-translate-x-[calc(35.7%+2rem)]"
                  : isStepActive(0)
                    ? "scale-100 z-30" 
                    : "translate-x-0 scale-100 z-10"
              }`}>
                <CenterShowcaseWrapper
                  index={0}
                  isActive={isStepActive(0)}
                  hoveredStepIndex={hoveredStepIndex}
                  setHoveredStepIndex={setHoveredStepIndex}
                  wrapperClass="relative w-full aspect-[16/10] md:aspect-auto md:min-h-[410px] lg:min-h-[445px]"
                  paddingClass=""
                >
                  {/* "Try Now" annotation pointing to Step 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10, rotate: -12 }}
                    animate={{ 
                       opacity: hoveredStepIndex === 0 ? 0 : 1, 
                       y: [0, -6, 0],
                       rotate: -12
                    }}
                    transition={{
                       opacity: { duration: 0.5, delay: 0.6 },
                       y: {
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut"
                       }
                    }}
                    className="absolute -top-16 -left-16 hidden md:flex flex-col items-center pointer-events-none select-none z-50"
                  >
                    <span className="font-instrument italic text-3xl text-white font-light tracking-wide drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                      Try Now
                    </span>
                    <svg width="75" height="55" viewBox="0 0 75 55" fill="none" className="text-[#a484ff] -mt-1 -rotate-6 drop-shadow-[0_0_10px_rgba(164,132,255,0.6)]">
                      <path 
                        d="M 10,6 C 30,4 50,12 56,36" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        fill="none" 
                      />
                      <path 
                        d="M 46,28 L 57,36 L 58,23" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        fill="none" 
                      />
                    </svg>
                  </motion.div>
                
                  {/* Header Title Bar of New Task Protocol */}
                  <div className="flex justify-between items-center px-5 py-3.5 bg-white/[0.02] border-b border-white/5 select-none font-manrope">
                    <div className="flex gap-2.5 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#a182ff] animate-pulse" />
                      <span className="text-xs font-bold text-white tracking-wide block">
                        Step 1: Scoping Phase
                      </span>
                    </div>
                    <span className="text-[10px] text-[#a484ff] font-medium uppercase tracking-wider animate-pulse">
                      Active Input Dashboard
                    </span>
                  </div>
 
                  {/* Main content body */}
                  <div className="p-6 sm:p-8 space-y-4 my-auto text-left">
                    <div className="space-y-2">
                      <h4 className="font-instrument text-2xl font-light text-white leading-tight">
                        What Problem Are We Solving?
                      </h4>
                      <p className="text-xs text-white/50 font-manrope leading-relaxed">
                        Enter your biggest operational challenge or click any of our interactive workflow presets below.
                      </p>
                    </div>
 
                    {/* Real-time typing simulator / input container */}
                    <div className="space-y-3">
                      <textarea
                        ref={step1TextareaRef}
                        value={customProblem}
                        onChange={(e) => setCustomProblem(e.target.value)}
                        className="w-full bg-black/60 border border-[#a484ff]/30 focus:border-[#a484ff] rounded-xl p-4 text-xs text-white/95 placeholder-white/30 outline-none transition-all font-mono leading-relaxed min-h-[95px] resize-none shadow-inner animate-pulse-glow"
                        placeholder="Describe what manual data entry or repetitive operations you want to automate..."
                      />
                      
                      {/* Suggested quick presets */}
                      <div className="flex flex-wrap gap-1.5 pt-1 items-center">
                        <span className="text-[9px] text-white/40 font-manrope font-semibold tracking-wider mr-1">PRESETS:</span>
                        {[
                          { label: "Lead Flows", text: "I want to automate outbound lead follow-ups to save 20 hours a week and double sales response speed." },
                          { label: "Invoice OCR", text: "I want to scan incoming invoice PDFs, extract totals, and reconcile QuickBooks records." },
                          { label: "Support Flows", text: "I want to route Zendesk tickets using automations, analyze support urgency, and write auto-replies." },
                          { label: "Shopify Stock", text: "I want to sync Shopify checkout orders, update warehouse stock, and print shipping labels." }
                        ].map((preset) => (
                          <button
                             key={preset.label}
                             onClick={(e) => {
                               e.stopPropagation();
                               setCustomProblem(preset.text);
                             }}
                             className={`px-2 py-1 rounded text-[9px] font-semibold font-manrope transition-all border cursor-pointer ${
                               customProblem === preset.text
                                 ? "bg-[#a484ff]/20 border-[#a484ff] text-[#ebdfff]"
                                 : "bg-white/5 border-white/5 text-white/45 hover:text-white hover:bg-white/10"
                             }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      {/* Next step button inside the active card */}
                      {isStepActive(0) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToStep(1);
                          }}
                          className="w-full mt-3 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#a484ff] hover:from-[#6d28d9] hover:to-[#8b5cf6] text-white rounded-xl text-xs font-semibold font-manrope shadow-lg shadow-[#7c3aed]/20 hover:shadow-[#7c3aed]/40 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <span>See your custom solution &rarr;</span>
                        </button>
                      )}
                    </div>
                  </div>
 
                  {/* Footer specs details bar */}
                  <div className="px-5 py-2.5 border-t border-white/5 flex justify-between items-center text-[10px] font-manrope text-white/40 bg-black/20">
                    <span>Status: Draft Ready</span>
                    <span className="text-[#bc9eff] font-manrope">✓ Interactive Coordination Standby</span>
                  </div>
 
                </CenterShowcaseWrapper>
              </div>
            </div>
          </div>
 
          {/* ========================================================== */}
          {/* STEP 02 - Text Right, Dynamic Solution Pipeline Left       */}
          {/* ========================================================== */}
          <div 
            ref={step2Ref}
            data-step-index={1}
            onClick={() => { if (activeIndex !== 1) scrollToStep(1); }}
            onMouseLeave={() => cancelHover(1)}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative transition-[opacity,transform] duration-[380ms] ease-out py-8 transform-gpu ${
              hoveredStepIndex !== null
                ? hoveredStepIndex === 1
                  ? "opacity-100 pointer-events-auto z-30"
                  : "opacity-[0.16] pointer-events-none z-10"
                : isStepActive(1) 
                  ? "opacity-100 pointer-events-auto z-20" 
                  : "opacity-45 pointer-events-auto cursor-pointer hover:opacity-100"
            }`}
          >
            {/* Interactive Flow Sequence Dashboard (On Left) */}
            <div 
              className="lg:col-span-7 order-2 lg:order-1 lg:pr-6 relative"
              onMouseMove={(e) => armHover(1, e)}
              onMouseLeave={() => cancelHover(1)}
            >
              <div className={`w-full h-full transition-transform duration-[430ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform backface-hidden relative ${
                hoveredStepIndex === 1
                  ? "z-50 scale-[1.02] lg:scale-[1.04] lg:translate-x-[calc(35.7%+2rem)]"
                  : isStepActive(1)
                    ? "scale-100 z-30" 
                    : "translate-x-0 scale-100 z-10"
              }`}>
                <CenterShowcaseWrapper
                  index={1}
                  isActive={isStepActive(1)}
                  hoveredStepIndex={hoveredStepIndex}
                  setHoveredStepIndex={setHoveredStepIndex}
                  wrapperClass="relative w-full aspect-[16/10] md:aspect-auto md:min-h-[410px] lg:min-h-[445px]"
                  paddingClass="p-4 sm:p-5"
                >
                {/* Simulated Canvas header */}
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5 select-none">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-[#a484ff] animate-pulse" />
                    <span className="font-manrope text-[10px] text-white/85 uppercase font-bold tracking-widest">
                      Your automation builder
                    </span>
                  </div>
                  <span className="font-manrope text-[10px] uppercase font-semibold text-[#a484ff]">
                    How your solution comes together
                  </span>
                </div>

                {/* Main Interactive Workspace Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-2.5 my-auto overflow-hidden">
                  
                  {/* Left Column: Flow List View (7 cols) */}
                  <div className="md:col-span-7 space-y-2">
                    <div className="space-y-1.5 max-h-[245px] overflow-y-auto no-scrollbar pr-0.5">
                      {pipelineSteps.map((step, idx) => (
                        <div 
                          key={step.id}
                          onClick={() => setStep2Cycle(idx)}
                          className={`relative rounded-xl border p-2 sm:p-2.5 flex justify-between items-start transition-all duration-500 font-manrope group cursor-pointer ${
                            step2Cycle === idx
                              ? "border-[#a484ff]/45 bg-[#7c3aed]/10 shadow-[0_0_15px_rgba(164,132,255,0.08)] scale-[1.01]"
                              : "border-white/5 bg-white/[0.01] opacity-50 hover:opacity-80"
                          }`}
                        >
                          <div className="space-y-1 text-left flex-grow pr-3">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[7.5px] text-white/40 uppercase font-bold tracking-wider">
                                {idx === 0 ? "[Trigger Event]" : `[Workflow Step 0${idx}]`}
                              </span>
                            </div>
                            
                            {/* Inline Editable Step Title */}
                            <input 
                              type="text"
                              value={step.name}
                              onChange={(e) => {
                                setIsUserModifiedPipeline(true);
                                setPipelineSteps(prev => prev.map(s => s.id === step.id ? { ...s, name: e.target.value } : s));
                              }}
                              className="bg-transparent border-none p-0 text-[10px] sm:text-[11px] font-bold text-white outline-none focus:ring-1 focus:ring-[#a484ff]/40 rounded px-1 -ml-1 w-full"
                              onClick={(e) => e.stopPropagation()}
                            />
                            
                            {/* Inline Editable Step Description */}
                            <textarea 
                              value={step.desc}
                              onChange={(e) => {
                                setIsUserModifiedPipeline(true);
                                setPipelineSteps(prev => prev.map(s => s.id === step.id ? { ...s, desc: e.target.value } : s));
                              }}
                              rows={1}
                              className="bg-transparent border-none p-0 text-[8.5px] text-white/55 font-light leading-snug outline-none focus:ring-1 focus:ring-[#a484ff]/40 rounded px-1 -ml-1 w-full resize-none h-auto"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          
                          <div className="flex items-center gap-2 flex-shrink-0 self-center">
                            {/* Trash action button */}
                            {idx > 0 && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsUserModifiedPipeline(true);
                                  setPipelineSteps(prev => prev.filter(s => s.id !== step.id));
                                }}
                                className="text-white/20 hover:text-rose-400 p-1 rounded hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100 duration-200"
                                title="Remove Step"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}

                            <span className={`text-sm sm:text-base font-bold font-instrument transition-colors duration-500 ${
                              step2Cycle === idx ? "text-[#a484ff]" : "text-white/10"
                            }`}>
                              0{idx + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Architect Bot Assistant (5 cols) */}
                  <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4 space-y-3">
                    
                    <div className="space-y-1.5 font-manrope text-left">
                      {/* Bot Header */}
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="h-3.5 w-3.5 text-[#a484ff] animate-pulse" />
                        <span className="text-[10px] uppercase font-black text-white/80 tracking-wider">
                          Architect Bot
                        </span>
                      </div>

                      {/* Textbox block with bullet points */}
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[9px] leading-normal text-white/70 space-y-1.5 font-light shadow-inner min-h-[142px]">
                        <span className="font-bold text-white block">Business Impact Analysis</span>
                        
                        <p className="text-white/70 leading-normal font-manrope">
                          This structured **{contextStep2.shortTitle}** targets bottlenecks immediately inside your **{contextStep2.department}** operations.
                        </p>
                        
                        <div className="space-y-1 border-t border-white/5 pt-1.5 mt-1">
                          <p className="flex items-start gap-1">
                            <span className="text-[#a484ff] font-bold select-none">•</span>
                            <span>Bypasses manual file copies</span>
                          </p>
                          <p className="flex items-start gap-1">
                            <span className="text-[#a484ff] font-bold select-none">•</span>
                            <span>Prevents process lag completely</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Complexity & Est Build Time */}
                    <div className="flex items-center justify-between font-manrope text-left border-t border-white/5 pt-1.5">
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-white/40 block">
                          Complexity
                        </span>
                        <span className="text-[9px] font-bold text-[#a484ff] uppercase tracking-wider">
                          Standard
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-wider text-white/40 block">
                          Estimate
                        </span>
                        <div className="flex items-center gap-1 text-white select-none">
                          <Clock className="h-3 w-3 text-[#a484ff]" />
                          <span className="text-[11px] font-bold tracking-tight">
                            2 Days
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Add Custom Step to Workflow Pipeline */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newStepName.trim()) return;
                    setIsUserModifiedPipeline(true);
                    setPipelineSteps(prev => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        type: "Action",
                        name: newStepName.trim(),
                        desc: "Custom executed workflow action to balance labor workloads."
                      }
                    ]);
                    setNewStepName("");
                  }}
                  className="flex gap-2 pt-2 border-t border-white/5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input 
                    type="text"
                    value={newStepName}
                    onChange={(e) => setNewStepName(e.target.value)}
                    placeholder="Type any step to add to pipeline (e.g. lead scoring)..."
                    className="flex-grow bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-[9.5px] text-white/90 placeholder-white/25 outline-none focus:border-[#a484ff]/40 transition-colors font-manrope"
                  />
                  <button 
                    type="submit"
                    className="px-3 py-1.5 bg-[#7C3AED]/20 border border-[#a484ff]/30 text-[#a484ff] hover:bg-[#7C3AED] hover:text-white rounded-lg text-[9px] font-bold transition-all flex items-center gap-0.5 whitespace-nowrap cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Step</span>
                  </button>
                </form>

                {/* Footer and Proceed Option */}
                <div className="flex items-center justify-between gap-2 mt-2 border-t border-white/5 pt-2 select-none font-manrope">
                  <span className="text-[9px] text-white/35 font-light">
                    Changes instantly sync to Developer Workspace
                  </span>

                  {isStepActive(1) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToStep(2);
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-[#7c3aed] to-[#a484ff] hover:from-[#6d28d9] hover:to-[#8b5cf6] text-white rounded-lg text-[10px] font-semibold shadow-md shadow-[#7c3aed]/15 transition-all cursor-pointer flex items-center gap-0.5 whitespace-nowrap"
                    >
                      <span>Proceed to Step 3</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </CenterShowcaseWrapper>
            </div>
            </div>
 
            {/* Text Segment (On Right) */}
            <div className={`lg:col-span-5 text-left space-y-4 lg:pl-6 order-1 lg:order-3 transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
              hoveredStepIndex === 1
                ? "lg:translate-x-8 opacity-0 pointer-events-none"
                : isStepActive(1)
                  ? "translate-x-0 scale-100 opacity-100 pointer-events-auto" 
                  : "scale-[0.99] opacity-50 pointer-events-auto"
            }`}>
              <div className="flex items-center gap-4">
                <span className={`font-instrument text-5xl md:text-6xl font-normal tracking-wide transition-colors duration-200 ${isStepActive(1) ? "text-[#a484ff]" : "text-slate-600"}`}>
                  02
                </span>
                <div className={`h-[1px] flex-grow bg-gradient-to-r transition-all duration-300 ${isStepActive(1) ? "from-[#a484ff] to-transparent" : "from-slate-800 to-transparent"}`} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal font-instrument tracking-tight text-white">
                Approve Your Customized Blueprint
              </h3>
              <p className="text-sm sm:text-base leading-relaxed font-manrope text-white/80">
                Review Your Complete Dynamic Automation Blueprint Specifying Precise Software Integrations, Live Workflows, And Expected Cost Savings. You Work Hand-In-Hand With Our Strategy Leads To Tweak Parameters Or Lock Down Operational Rules Before Setup.
              </p>
            </div>
          </div>
 
          {/* ========================================================== */}
          {/* STEP 03 - Text Left, Custom Engineer Ticket Workspace Right*/}
          {/* ========================================================== */}
          <div 
            ref={step3Ref}
            data-step-index={2}
            onClick={() => { if (activeIndex !== 2) scrollToStep(2); }}
            onMouseLeave={() => cancelHover(2)}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative transition-[opacity,transform] duration-[380ms] ease-out py-8 transform-gpu ${
              hoveredStepIndex !== null
                ? hoveredStepIndex === 2
                  ? "opacity-100 pointer-events-auto z-30"
                  : "opacity-[0.16] pointer-events-none z-10"
                : isStepActive(2) 
                  ? "opacity-100 pointer-events-auto z-20" 
                  : "opacity-45 pointer-events-auto cursor-pointer hover:opacity-100"
            }`}
          >
            {/* Text Segment */}
            <div className={`lg:col-span-5 text-left space-y-4 lg:pr-6 order-1 transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
              hoveredStepIndex === 2
                ? "lg:-translate-x-8 opacity-0 pointer-events-none"
                : isStepActive(2)
                  ? "translate-x-0 scale-100 opacity-100 pointer-events-auto" 
                  : "scale-[0.99] opacity-50 pointer-events-auto"
            }`}>
              <div className="flex items-center gap-4">
                <span className={`font-instrument text-5xl md:text-6xl font-normal tracking-wide transition-colors duration-200 ${isStepActive(2) ? "text-[#a484ff]" : "text-slate-600"}`}>
                  03
                </span>
                <div className={`h-[1px] flex-grow bg-gradient-to-r transition-all duration-300 ${isStepActive(2) ? "from-[#a484ff] to-transparent" : "from-slate-800 to-transparent"}`} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal font-instrument tracking-tight text-white">
                Our Engineers Build Your System
              </h3>
              <p className="text-sm sm:text-base leading-relaxed font-manrope text-white/80">
                Our engineers build, test, and refine your automation, then hand it over ready to run.
              </p>
            </div>
 
            {/* Project Ticket Dashboard Mockup */}
            <div 
              className="lg:col-span-7 order-2 lg:pl-6 relative"
              onMouseMove={(e) => armHover(2, e)}
              onMouseLeave={() => cancelHover(2)}
            >
              <div className={`w-full h-full transition-transform duration-[430ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform backface-hidden relative ${
                hoveredStepIndex === 2
                  ? "z-50 scale-[1.02] lg:scale-[1.04] lg:-translate-x-[calc(35.7%+2rem)]"
                  : isStepActive(2)
                    ? "scale-100 z-30" 
                    : "translate-x-0 scale-100 z-10"
              }`}>
                <CenterShowcaseWrapper
                  index={2}
                  isActive={isStepActive(2)}
                  hoveredStepIndex={hoveredStepIndex}
                  setHoveredStepIndex={setHoveredStepIndex}
                  wrapperClass="relative w-full aspect-[16/10] md:aspect-auto md:min-h-[410px] lg:min-h-[445px]"
                  paddingClass="p-4 sm:p-5"
                >
                {/* Active check board header */}
                <div className="flex justify-between items-center pb-2.5 border-b border-white/5 select-none flex-wrap gap-2">
                  {/* Dynamic select Tabs */}
                  <div className="flex gap-1 bg-white/[0.03] border border-white/5 p-0.5 rounded-full text-[10px]">
                    <button 
                      onClick={() => {
                        setStep3Tab(0);
                        setIsAutoTabEnabled(false);
                      }}
                      className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 font-semibold tracking-wider font-manrope cursor-pointer ${
                        step3Tab === 0 ? "bg-white text-[#0a0717]" : "text-white/50 hover:text-white"
                      }`}
                    >
                      <ListTodo className="h-3 w-3" />
                      <span>CHECKLIST</span>
                      <span className={`px-1 rounded-full text-[8px] font-bold ${step3Tab === 0 ? "bg-[#0a0717]/10 text-[#0a0717]" : "bg-white/10 text-white/70"}`}>
                        {step3Checklist.filter(c => c.checked).length}/{step3Checklist.length}
                      </span>
                    </button>
                    <button 
                      onClick={() => {
                        setStep3Tab(1);
                        setIsAutoTabEnabled(false);
                      }}
                      className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 font-semibold tracking-wider font-manrope cursor-pointer ${
                        step3Tab === 1 ? "bg-white text-[#0a0717]" : "text-white/50 hover:text-white"
                      }`}
                    >
                      <Workflow className="h-3 w-3" />
                      <span>MAP VIEW</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-pulse" />
                    </button>
                    <button 
                      onClick={() => {
                        setStep3Tab(2);
                        setIsAutoTabEnabled(false);
                      }}
                      className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 font-semibold tracking-wider font-manrope cursor-pointer ${
                        step3Tab === 2 ? "bg-white text-[#0a0717]" : "text-white/50 hover:text-white"
                      }`}
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>TICKET CHAT</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-purple-300 font-manrope text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-pulse" /> COMPILER LIVE
                  </div>
                </div>
 
                <div className="flex-grow my-auto py-1 sm:py-2.5 overflow-hidden text-left">
                  {step3Tab === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
                      {/* Left: Checklists (7 cols) */}
                      <div className="md:col-span-7 flex flex-col justify-between h-full space-y-1.5 min-h-[235px] max-h-[275px] pr-1">
                        <div className="space-y-1.5 overflow-y-auto no-scrollbar max-h-[215px] pr-0.5">
                          {step3Checklist.map((item) => (
                            <div 
                              key={item.id} 
                              onClick={() => {
                                setIsUserModifiedChecklist(true);
                                setStep3Checklist(prev => prev.map(c => c.id === item.id ? { ...c, checked: !c.checked } : c));
                              }}
                              className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all duration-300 font-manrope cursor-pointer select-none group ${
                                item.checked 
                                  ? "bg-[#7c3aed]/5 border-[#a484ff]/10 opacity-75 hover:bg-[#7c3aed]/10" 
                                  : item.isCurrent 
                                    ? "bg-[#7c3aed]/10 border-[#a484ff]/30 shadow-[0_0_12px_rgba(164,132,255,0.06)] hover:bg-[#7c3aed]/15" 
                                    : "bg-white/[0.01] border-white/5 opacity-50 hover:opacity-80 hover:bg-white/[0.03]"
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {item.checked ? (
                                  <div className="w-4 h-4 rounded bg-[#7c3aed]/15 border border-[#a484ff]/30 flex items-center justify-center text-[#bc9eff]">
                                    <Check className="h-2.5 w-2.5" />
                                  </div>
                                ) : (
                                  <div className="w-4 h-4 rounded border border-[#a484ff]/40 flex items-center justify-center relative">
                                    {item.isCurrent && (
                                      <>
                                        <span className="absolute inset-0 w-full h-full rounded border border-[#a484ff]/70 animate-ping opacity-60" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-pulse" />
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                              <span className={`text-[10px] leading-snug font-manrope ${
                                item.checked ? "line-through text-white/35" : "text-white/85 font-medium"
                              }`}>
                                {item.text}
                              </span>
                              
                              {/* Delete task button */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsUserModifiedChecklist(true);
                                  setStep3Checklist(prev => prev.filter(c => c.id !== item.id));
                                }}
                                className="ml-auto text-white/20 hover:text-rose-400 p-1 rounded hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100 duration-200"
                                title="Remove item"
                              >
                                <Trash2 className="h-2.5 w-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Add checklist item form */}
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!newChecklistItem.trim()) return;
                            setIsUserModifiedChecklist(true);
                            setStep3Checklist(prev => [
                              ...prev,
                              { id: Date.now(), text: newChecklistItem.trim(), checked: false, isCurrent: prev.length === 0 }
                            ]);
                            setNewChecklistItem("");
                          }}
                          className="flex gap-1 pt-2 border-t border-white/5 mt-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input 
                            type="text"
                            value={newChecklistItem}
                            onChange={(e) => setNewChecklistItem(e.target.value)}
                            placeholder="Add manual checklist step..."
                            className="flex-grow bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-[9.5px] text-white/90 placeholder-white/25 outline-none focus:border-[#a484ff]/40 transition-colors font-manrope"
                          />
                          <button 
                            type="submit"
                            className="px-2.5 py-1 bg-[#7C3AED]/20 border border-[#a484ff]/30 text-[#a484ff] hover:bg-[#7C3AED] hover:text-white rounded-lg text-[9px] font-bold transition-all flex items-center gap-0.5 whitespace-nowrap cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                            <span>Add Step</span>
                          </button>
                        </form>
                      </div>
 
                      {/* Right: Protocol details (5 cols) */}
                      <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4 flex flex-col justify-between h-full space-y-3">
                        {/* Details */}
                        <div className="space-y-2 font-manrope text-left">
                          <span className="text-[9px] uppercase tracking-wider text-white/45 font-semibold block">
                            Protocol Details
                          </span>
                          
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] border-b border-white/[0.03] pb-1">
                              <span className="text-white/40 flex items-center gap-1">
                                <Clock className="h-3 w-3 text-white/30" /> TIMELINE
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-[#7c3aed]/20 border border-[#a484ff]/30 text-[#a484ff] text-[9px] font-extrabold animate-pulse">
                                2 Days
                              </span>
                            </div>
 
                            <div className="flex items-center justify-between text-[10px] border-b border-white/[0.03] pb-1">
                              <span className="text-white/44 flex items-center gap-1">
                                <User className="h-3 w-3 text-white/30" /> ASSIGNEE
                              </span>
                              <div className="flex items-center gap-1">
                                <div className="w-3.5 h-3.5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[#a484ff] text-[8px] font-bold">
                                  K
                                </div>
                                <span className="text-white/80 font-medium">Alex S. (Lead Eng)</span>
                              </div>
                            </div>
 
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-white/40">DIVISION</span>
                              <span className="px-1.5 py-0.5 rounded bg-[#7c3aed]/10 border border-[#a484ff]/25 text-[#a484ff] text-[8px] font-bold uppercase tracking-wider">
                                {contextStep3.department}
                              </span>
                            </div>
                          </div>
                        </div>
 
                        {/* Assets box */}
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3 font-manrope text-left">
                          <div className="w-7 h-7 rounded-lg bg-[#a484ff]/10 border border-[#a484ff]/20 flex items-center justify-center text-[#a484ff]">
                            <FileText className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-[#a484ff] block uppercase tracking-wider font-mono">STAGING UNIT</span>
                            <span className="text-[10px] text-white/75 font-semibold">Checks Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
 
                  {step3Tab === 1 && (
                    <div className="flex flex-col justify-between h-full py-1">
                      {/* Map Header */}
                      <div className="flex justify-between items-center pb-2 select-none border-b border-white/[0.02]">
                        <div>
                          <span className="text-[10px] text-white/40 uppercase font-black tracking-wider block font-manrope">
                            WORKFLOW MAP
                          </span>
                          <span className="text-[9px] text-[#a484ff]/75 font-normal">
                            generated step-by-step execution flow
                          </span>
                        </div>
                        <div className="flex gap-1.5 items-center">
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            COMPLEX
                          </span>
                        </div>
                      </div>
 
                      {/* Map Content (Flow Nodes) */}
                      <div className="relative flex flex-col items-center justify-center py-2 h-full my-auto space-y-1.5 max-w-[340px] mx-auto w-full max-h-[245px] overflow-y-auto no-scrollbar">
                        
                        {/* Particle stream down - single, smooth line */}
                        <div className="absolute inset-y-0 w-[1px] h-full bg-gradient-to-b from-[#a484ff]/25 via-[#a484ff]/20 to-transparent" />

                        {pipelineSteps.slice(0, 4).map((step, idx) => (
                          <React.Fragment key={step.id}>
                            {idx > 0 && (
                              <div className="h-4 flex flex-col justify-center items-center relative w-full">
                                <div className={`absolute w-1.5 h-1.5 rounded-full bg-[#a484ff] shadow-[0_0_8px_rgba(164,132,255,1)] transition-all duration-[1000ms] ${
                                  activeFlowNode === idx ? "top-full opacity-100" : "top-0 opacity-10"
                                }`} />
                              </div>
                            )}

                            <div className={`w-full z-10 p-2 rounded-xl border transition-all duration-500 ${
                              activeFlowNode === idx 
                                ? "border-[#a484ff]/40 bg-[#7c3aed]/10 shadow-[0_0_15px_rgba(164,132,255,0.15)] scale-[1.01]" 
                                : "border-white/5 bg-white/[0.01] opacity-60"
                            } text-left relative`}>
                              <span className={`absolute top-1.5 right-2 px-1 text-[7px] border font-bold uppercase tracking-wider rounded transition-all duration-300 ${
                                activeFlowNode === idx 
                                  ? "bg-[#7c3aed]/20 border-[#a484ff]/45 text-[#ebdfff]" 
                                  : "bg-white/5 border-white/10 text-white/40"
                              }`}>
                                {idx === 0 ? "TRIGGER" : "ACTION"}
                              </span>
                              <h4 className="text-[10px] sm:text-xs font-bold text-white pr-12 truncate">{step.name}</h4>
                              <p className="text-[9px] text-white/50 font-light mt-0.5 truncate">
                                {step.desc}
                              </p>
                            </div>
                          </React.Fragment>
                        ))}

                      </div>
                    </div>
                  )}
 
                  {step3Tab === 2 && (
                    <div className="flex flex-col justify-between h-full py-1">
                      {/* Chat Messages Log Panel */}
                      <div 
                        ref={chatContainerRef}
                        className="flex-grow space-y-2 overflow-y-auto no-scrollbar max-h-[225px] pr-1.5 text-left mb-1.5 flex flex-col"
                      >
                        {step3Messages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`flex gap-2 items-start max-w-[85%] ${
                              msg.isSelf ? "self-end flex-row-reverse" : "self-start"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-black uppercase text-white/80 border ${
                              msg.isSelf 
                                ? "bg-purple-600/20 border-purple-500/30" 
                                : msg.sender.startsWith("Sarah") 
                                  ? "bg-purple-600/20 border-purple-500/30" 
                                  : "bg-purple-600/20 border-purple-500/30"
                            }`}>
                              {msg.sender.slice(0, 2)}
                            </div>
                            
                            <div className="space-y-0.5">
                              <div className={`flex items-center gap-1.5 text-[8px] ${msg.isSelf ? "flex-row-reverse" : ""}`}>
                                <span className="font-extrabold text-white/50">{msg.sender}</span>
                                <span className="text-white/30 text-[7px] font-light">{msg.time}</span>
                              </div>
 
                              <div className={`p-2 rounded-xl text-[9.5px] leading-relaxed font-manrope ${
                                msg.isSelf 
                                  ? "bg-[#7C3AED] text-white rounded-tr-none shadow shadow-[#7C3AED]/20" 
                                  : "bg-white/[0.03] border border-white/5 text-white/80 rounded-tl-none shadow-sm"
                              }`}>
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        ))}
 
                        {/* Typing state */}
                        {typingState && (
                          <div className="flex gap-2 items-center self-start text-[8px] text-white/40 italic pl-1 font-manrope">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-ping" />
                            {typingState} is typing...
                          </div>
                        )}
                      </div>
 
                      {/* Interactive Chat Input footer */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!chatMessageInput.trim()) return;
                          setIsUserModifiedChat(true);
                          const userMsg = {
                            id: Date.now(),
                            sender: "You",
                            role: "Product Owner",
                            text: chatMessageInput.trim(),
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            isSelf: true
                          };
                          setStep3Messages(prev => [...prev, userMsg]);
                          setChatMessageInput("");
                          
                          // Simulate dynamic developer feedback
                          setTypingState("Alex S.");
                          setTimeout(() => {
                            setTypingState(null);
                            setStep3Messages(prev => [
                              ...prev,
                              {
                                id: Date.now() + 1,
                                sender: "Alex S.",
                                role: "Developer",
                                text: `Got it! Deploying specific adjustment into our workspace integration tests now. We'll monitor real-time execution speeds.`,
                                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                isSelf: false
                              }
                            ]);
                          }, 1600);
                        }}
                        className="p-1 sm:p-1.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex gap-2 items-center flex-grow font-manrope px-1">
                          <Paperclip className="h-3 w-3 text-white/30 cursor-pointer hover:text-white" />
                          <input 
                            type="text"
                            value={chatMessageInput}
                            onChange={(e) => setChatMessageInput(e.target.value)}
                            placeholder="Type a message to the developers..."
                            className="w-full bg-transparent border-none text-[10px] text-white/95 placeholder-white/20 outline-none focus:ring-0 p-0"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="w-6 h-6 rounded-lg bg-[#7C3AED] hover:bg-[#8342f5] flex items-center justify-center text-white transition-all cursor-pointer"
                        >
                          <Send className="h-2.5 w-2.5" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {/* Interactive Custom Problem Input for Step 3 */}
                <div className="px-1.5 pb-2.5 text-left border-t border-white/5 pt-2 flex flex-col gap-1">
                  <label className="text-[8px] uppercase tracking-wider text-[#a484ff] block font-manrope">
                    Direct Developer Task Instruction:
                  </label>
                  <input
                    ref={step3InputRef}
                    type="text"
                    value={step3Problem}
                    onChange={(e) => setStep3Problem(e.target.value)}
                    className="w-full bg-black/60 border border-[#a484ff]/25 focus:border-[#a484ff] rounded-lg px-2.5 py-1 text-[9.5px] text-white/90 placeholder-white/30 outline-none transition-all font-mono"
                    placeholder="E.g., customize instructions for developers..."
                  />
                </div>
 
                {/* Footer and Next Action Button */}
                <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 select-none">
                  <span className="text-[9px] font-manrope text-white/30">
                    Secure Developer Workspace Sync Active
                  </span>
                  
                  {isStepActive(2) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToStep(3);
                      }}
                      className="w-full sm:w-auto px-4 py-1.5 bg-[#7C3AED] hover:bg-[#8342f5] text-white rounded-lg text-[10px] font-semibold font-manrope shadow-md shadow-[#7C3AED]/20 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Proceed to Dashboard (Step 4)</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>              </CenterShowcaseWrapper>
            </div>
            </div>
            </div>          {/* ========================================================== */}
          {/* STEP 04 - Text Right, Contextual Running Dashboard Left    */}
          {/* ========================================================== */}
          <div 
            ref={step4Ref}
            data-step-index={3}
            onClick={() => { 
              if (activeIndex !== 3) {
                scrollToStep(3); 
              }
            }}
            onMouseLeave={() => cancelHover(3)}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative transition-[opacity,transform] duration-[380ms] ease-out py-8 transform-gpu ${
              hoveredStepIndex !== null
                ? hoveredStepIndex === 3
                  ? "opacity-100 pointer-events-auto z-30"
                  : "opacity-[0.16] pointer-events-none z-10"
                : isStepActive(3) 
                  ? "opacity-100 pointer-events-auto z-20" 
                  : "opacity-45 pointer-events-auto cursor-pointer hover:opacity-100"
            }`}
          >
            {/* Screenshot Layout (On Left for Alternating Layout) */}
            <div 
              className="lg:col-span-7 order-2 lg:order-1 lg:pr-6 relative"
              onMouseMove={(e) => armHover(3, e)}
              onMouseLeave={() => cancelHover(3)}
            >
              <div className={`w-full h-full transition-transform duration-[430ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform backface-hidden relative ${
                hoveredStepIndex === 3
                  ? "z-50 scale-[1.02] lg:scale-[1.04] lg:translate-x-[calc(35.7%+2rem)]"
                  : isStepActive(3)
                    ? "scale-100 z-30" 
                    : "translate-x-0 scale-100 z-10"
              }`}>
                <CenterShowcaseWrapper
                  index={3}
                  isActive={isStepActive(3)}
                  hoveredStepIndex={hoveredStepIndex}
                  setHoveredStepIndex={setHoveredStepIndex}
                  wrapperClass="relative w-full aspect-[16/10] md:aspect-auto md:min-h-[410px] lg:min-h-[445px]"
                  paddingClass="p-5 sm:p-6"
                >
                {/* Header */}
                <div className="flex justify-between items-center pb-3 border-b border-white/5 select-none font-manrope text-[10px]">
                  <span className="text-white/60 font-bold block uppercase tracking-wider">{contextStep4.department} Operational Command</span>
                  <div className="flex items-center gap-1.5 text-purple-300 font-semibold font-mono text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-pulse" /> SYSTEM ONLINE
                  </div>
                </div>
 
                {/* Micro Dashboard Grid */}
                <div className="grid grid-cols-3 gap-2.5 my-3 select-none">
                  {/* Stat 1 */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between text-left">
                    <span className="text-[8px] text-white/40 font-manrope font-semibold uppercase tracking-wider block">
                      Total Executions
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-sm sm:text-base font-bold text-white font-mono leading-none tracking-tight">
                        {step4Executions.toLocaleString()}
                      </span>
                      <span className="text-[8px] text-[#a484ff] font-bold leading-none">
                        +1
                      </span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-2.5 rounded-xl bg-[#7C3AED]/5 border border-[#a484ff]/10 flex flex-col justify-between text-left">
                    <span className="text-[8px] text-[#a484ff] font-manrope font-semibold uppercase tracking-wider block">
                      Hours Saved
                    </span>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-sm sm:text-base font-bold text-white font-mono leading-none tracking-tight">
                        {step4HoursSaved.toFixed(1)}
                      </span>
                      <span className="text-[7.5px] text-purple-300 font-medium leading-none font-manrope ml-0.5">
                        Hrs
                      </span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between text-left">
                    <span className="text-[8px] text-white/40 font-manrope font-semibold uppercase tracking-wider block">
                      On-Time Delivery
                    </span>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-sm sm:text-base font-bold text-white/90 font-mono leading-none tracking-tight">
                        {step4Accuracy}%
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-pulse mb-1 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Real-time Metric Bars instead of raw code logs */}
                <div className="flex-grow my-2 py-3 px-3.5 rounded-xl bg-black/60 border border-white/5 flex flex-col justify-between h-full space-y-3.5 min-h-[140px] max-h-[165px] overflow-hidden text-left">
                  <div className="flex justify-between items-center text-white/40 border-b border-white/5 pb-1.5 uppercase tracking-wider font-semibold font-manrope text-[9px]">
                    <span className="flex items-center gap-1.5 text-white/75">
                      <TrendingUp className="h-3 w-3 text-[#a484ff]" /> How Your Automations Are Performing
                    </span>
                    <span className="text-[#a484ff] font-extrabold animate-pulse text-[8px] tracking-widest">● LIVE ANALYTICS</span>
                  </div>

                  <div className="space-y-2.5 flex-grow pt-0.5 font-manrope">
                    {/* Metric 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-white/80 font-medium">
                        <span>Review outbound follow-up open rates</span>
                        <span className="text-[#a484ff] font-mono font-bold">68%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative">
                        <div className="bg-gradient-to-r from-[#7c3aed] to-[#a484ff] h-full rounded-full" style={{ width: "68%" }} />
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-white/80 font-medium">
                        <span>Weekly hours saved</span>
                        <span className="text-[#a484ff] font-mono font-bold">84%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative">
                        <div className="bg-gradient-to-r from-[#7c3aed] to-[#a484ff] h-full rounded-full" style={{ width: "84%" }} />
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-white/80 font-medium">
                        <span>Lead conversion metrics</span>
                        <span className="text-[#a484ff] font-mono font-bold">75%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden relative">
                        <div className="bg-gradient-to-r from-[#7c3aed] to-[#a484ff] h-full rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="text-[8.5px] text-white/35 border-t border-white/[0.03] pt-1.5 flex justify-between font-manrope">
                    <span>Target optimization matrix locked</span>
                    <span>Performance standard: SLA validated</span>
                  </div>
                </div>
 
                {/* Saved runs panel */}
                <div className="p-2 py-2.5 px-3 rounded-xl bg-[#7C3AED]/10 border border-[#a484ff]/20 flex items-center justify-between mt-1 select-none font-manrope">
                  <span className="text-[10px] text-white/80 flex items-center gap-1.5 leading-none">
                    <Check className="h-3 w-3 text-[#a484ff]" /> Operational Pipeline Verified
                  </span>
                  <span className="text-[10px] text-[#a484ff] font-bold tracking-wide uppercase leading-none font-mono">
                    {step4Executions} Active Runs
                  </span>
                </div>

             
                {/* Final Primary action button inside Step 4 card */}
                {isStepActive(3) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenPricingModal) {
                        onOpenPricingModal();
                      }
                    }}
                    className="w-full mt-4 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#a484ff] hover:from-[#6d28d9] hover:to-[#8b5cf6] text-white font-bold rounded-xl text-xs font-manrope tracking-wider hover:scale-[1.01] transition-all cursor-pointer shadow-lg shadow-[#7c3aed]/20 flex items-center justify-center gap-1.5 animate-bounce"
                  >
                    <span>Start Your 7-Day Free Trial</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                )}
              </CenterShowcaseWrapper>
            </div>
            </div>
 
            {/* Text Segment (On Right for Alternating Layout) */}
            <div className={`lg:col-span-5 text-left space-y-4 lg:pl-6 order-1 lg:order-3 transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
              hoveredStepIndex === 3
                ? "lg:translate-x-8 opacity-0 pointer-events-none"
                : isStepActive(3)
                  ? "translate-x-0 scale-100 opacity-100 pointer-events-auto" 
                  : "scale-[0.99] opacity-50 pointer-events-auto"
            }`}>
              <div className="flex items-center gap-4">
                <span className={`font-instrument text-5xl md:text-6xl font-normal tracking-wide transition-colors duration-200 ${isStepActive(3) ? "text-[#a484ff]" : "text-slate-600"}`}>
                  04
                </span>
                <div className={`h-[1px] flex-grow bg-gradient-to-r transition-all duration-300 ${isStepActive(3) ? "from-[#a484ff] to-transparent" : "from-slate-800 to-transparent"}`} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal font-instrument tracking-tight text-white">
                Launch And Measure Compounding Savings
              </h3>
              <p className="text-sm sm:text-base leading-relaxed font-manrope text-white/80">
                Your Customized Systems Deploy Seamlessly Into Live Production. From Day One, Reclaim Critical Focus, Guard Against Manual Mistakes, And Observe Your Saved Labor Hours And Operating Budget Compound Automatically.
              </p>
            </div>
          </div>
 
        </div>
 
      </div>
 
    </section>
  );
}
