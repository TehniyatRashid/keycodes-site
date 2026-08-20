import React, { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, 
  Bell, 
  MessageSquare, 
  Zap, 
  Clock, 
  Activity, 
  Sparkles, 
  Send,
  MoreHorizontal,
  Plus,
  Columns,
  Trash2,
  Check,
  ChevronRight,
  TrendingUp,
  CircleDot,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LiveLogItem {
  id: string;
  text: string;
  displayTime: string;
  type: "success" | "review" | "alert";
}

interface PortalCommandCenterProps {
  userName?: string;
  userEmail?: string;
  triggerNotification: (msg: string) => void;
  onTryNow?: () => void;
}

interface Message {
  id: number;
  sender: "You" | "Keycodes Team";
  text: string;
  time: string;
}

interface NotificationItem {
  id: number;
  label: string;
  title: string;
  description: string;
  time: string;
  type: "update" | "success" | "warning";
}

interface TaskItem {
  id: number;
  title: string;
  category: "Automation" | "Operations" | "Development" | "Design" | "Marketing & Sales";
  status: "New" | "In Progress" | "On Hold" | "Review/Testing" | "Completed";
  priority: "High" | "Medium" | "Low";
}

export default function PortalCommandCenter({ 
  userName = "Member", 
  userEmail = "",
  triggerNotification,
  onTryNow
}: PortalCommandCenterProps) {
  
  // Custom toast popup notification state that displays for exactly 3 seconds then disappears
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    triggerNotification(msg); // sync with parent
  };

  const handleCompleteNotif = (id: number) => {
    if (completedNotifIds.includes(id)) return;
    setCompletedNotifIds(prev => [...prev, id]);
    triggerToast("Notification marked complete");
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
      setCompletedNotifIds(prev => prev.filter(item => item !== id));
    }, 1500);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const getPriorityBadgeColor = (priority: TaskItem["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Low":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default:
        return "bg-white/10 text-white/60";
    }
  };

  // Tab handling state: Dashboard, Task Board, Notifications, Discussions
  const [activeTab, setActiveTab] = useState<"dashboard" | "taskboard" | "notifications" | "discussions">("dashboard");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Drag and drop column state
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // Simulation Configuration for Communications Loop - highly realistic automation & development discussions
  const SIMULATION_SCENARIOS = [
    {
      topic: "HubSpot CRM & Stripe Auto Sync",
      clientMsg: "Hey team, is the custom automation script ready to sync our Stripe payments directly into HubSpot contact deals?",
      teamMsg: "Yes, fully active! We successfully mapped the Stripe metadata to your HubSpot pipelines. Sync lag is under 200ms."
    },
    {
      topic: "Supplier Site Scraper & Slack Alerts",
      clientMsg: "Can we build a script that daily scrapes our supplier's inventory list and pings Slack whenever a stock count drops under 10?",
      teamMsg: "Definitely! We can run a scheduled cron script using Puppeteer. We'll cross reference the parsed counts and trigger structured Slack blocks."
    },
    {
      topic: "E Commerce Order Verification Script",
      clientMsg: "We need a custom flow that matches new Shopify orders against our local database and flags any matching error alerts.",
      teamMsg: "On it! We are writing a custom webhook receiver to intercept shopify/orders/create and run instant SQL consistency audits."
    }
  ];

  const [isSimulating, setIsSimulating] = useState(true);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [simPhase, setSimPhase] = useState<"client_typing" | "client_message" | "instant_popup" | "team_typing" | "team_message" | "idle">("idle");
  const [popupVisible, setPopupVisible] = useState(false);

  // Dynamic Live Activity Data for Dashboard Feel
  const [liveExecutions, setLiveExecutions] = useState(15000);
  const [liveHoursSaved, setLiveHoursSaved] = useState(355.6);
  const [liveActiveAgents, setLiveActiveAgents] = useState(3);
  const [liveAccuracy, setLiveAccuracy] = useState(98.8);
  const [liveTickets, setLiveTickets] = useState(1);
  const [pulseData, setPulseData] = useState<number[]>([]);
  const [glowingIndices, setGlowingIndices] = useState<number[]>([]);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [isGuideOpen, setIsGuideOpen] = useState(true);

  const [liveLogs, setLiveLogs] = useState<LiveLogItem[]>([
    {
      id: "init-1",
      text: "Staged Stripe Billing triggers for testing",
      displayTime: "5 mins ago",
      type: "success"
    },
    {
      id: "init-2",
      text: "Continuous HubSpot contacts sync activated",
      displayTime: "20 mins ago",
      type: "review"
    },
    {
      id: "init-3",
      text: "Approved client portal layout and UI hierarchy",
      displayTime: "1 hour ago",
      type: "success"
    }
  ]);

  const logTemplates = [
    { text: "Workspace coordinated: updated team deliverables checklist.", type: "review" },
    { text: "Access approved: secure integration verified.", type: "success" },
    { text: "Systems Engineer: optimized customer response sequence.", type: "success" },
    { text: "Database updated: saved 4 new automation rules.", type: "success" },
    { text: "Platform Specialist: checked payment integrations.", type: "review" },
    { text: "Workspace connection: remote data and metrics updated.", type: "review" },
    { text: "Workflow active: automated task scheduling verified.", type: "success" },
    { text: "Systems Engineer: completed automated registration checks.", type: "success" },
    { text: "Workspace deployment: finalized new task scheduling flows.", type: "success" },
    { text: "Dispatch issue: high priority messaging paused on team integrations.", type: "alert" },
    { text: "Platform connection paused: external contact record rate-limited.", type: "alert" },
    { text: "Pipeline alert: response delay noted on task orchestration queues.", type: "alert" }
  ];

  // Initialize heatmap pulse data (140 points)
  useEffect(() => {
    const initData = Array.from({ length: 140 }).map(() => Math.floor(Math.random() * 4));
    setPulseData(initData);
  }, []);

  // Automatic Rotation between tabs until the user interacts with the Command Center
  useEffect(() => {
    if (!isAutoRotating) return;

    const tabs: ("dashboard" | "taskboard" | "notifications" | "discussions")[] = [
      "dashboard",
      "taskboard",
      "notifications",
      "discussions"
    ];

    const rotationInterval = setInterval(() => {
      setActiveTab(prevTab => {
        const currentIndex = tabs.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 4000); // Rotates every 4 seconds for a natural reading pace

    return () => clearInterval(rotationInterval);
  }, [isAutoRotating]);

  // Live Activity Data Ticker - Updates every 10-14 seconds for clean visual changes without layout jitter
  useEffect(() => {
    let timeoutId: any;
    let cycleCount = 0;

    const runTicker = () => {
      cycleCount++;

      // 1. Ticker for executions
      setLiveExecutions(prev => prev + Math.floor(Math.random() * 3) + 1);
      
      // 2. Ticker for hours saved (small increments)
      setLiveHoursSaved(prev => {
        const increment = parseFloat((Math.random() * 0.15 + 0.02).toFixed(2));
        return parseFloat((prev + increment).toFixed(2));
      });

      // 3. Jitter live accuracy
      setLiveAccuracy(prev => {
        const change = parseFloat((Math.random() * 0.4 - 0.2).toFixed(1));
        return parseFloat(Math.min(100, Math.max(95, prev + change)).toFixed(1));
      });

      // 4. Jitter active tickets
      setLiveTickets(prev => {
        const r = Math.random();
        if (r > 0.85) return Math.min(5, prev + 1);
        if (r < 0.15) return Math.max(1, prev - 1);
        return prev;
      });

      // 5. Generate random glowing nodes in the Operational Integrity Log (the heatmap grid)
      const numGlows = Math.floor(Math.random() * 4) + 3; // 3 to 6 glowing cells
      const glows: number[] = [];
      for (let i = 0; i < numGlows; i++) {
        glows.push(Math.floor(Math.random() * 140));
      }
      setGlowingIndices(glows);

      // Clear glows after 1.2s to create smooth pulsing/breathing activity
      setTimeout(() => {
        setGlowingIndices([]);
      }, 1200);

      // 6. Prepend new log entries in Live Operations Feed with stable relative display timestamps
      setLiveLogs(prev => {
        const randomTemplate = logTemplates[Math.floor(Math.random() * logTemplates.length)];
        const newLog: LiveLogItem = {
          id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          text: randomTemplate.text,
          displayTime: "Just now",
          type: randomTemplate.type as "success" | "review" | "alert"
        };
        // Keep logs beautifully aged with relative timestamps
        return [newLog, prev[0], prev[1]].map((item, idx) => {
          let age = item.displayTime;
          if (idx === 1) age = "5 mins ago";
          if (idx === 2) age = "20 mins ago";
          return { ...item, displayTime: age };
        });
      });

      // 7. Live ticket movement simulation (Every 3 cycles or ~7.5 seconds)
      if (isAutoRotating && cycleCount % 3 === 0) {
        setTasks(prev => {
          if (prev.length === 0) return prev;
          const statuses: TaskItem["status"][] = ["New", "In Progress", "On Hold", "Review/Testing", "Completed"];
          const randomIndex = Math.floor(Math.random() * prev.length);
          const taskToMove = prev[randomIndex];
          const currentStatusIndex = statuses.indexOf(taskToMove.status);
          
          let nextStatusIndex = currentStatusIndex;
          if (currentStatusIndex === 0) nextStatusIndex = 1;
          else if (currentStatusIndex === statuses.length - 1) nextStatusIndex = statuses.length - 2;
          else nextStatusIndex = Math.random() > 0.5 ? currentStatusIndex + 1 : currentStatusIndex - 1;
          
          const targetStatus = statuses[nextStatusIndex];
          return prev.map((t, idx) => idx === randomIndex ? { ...t, status: targetStatus } : t);
        });
      }

      // 8. Approved notification fade-away simulation (Every 5 cycles or ~12.5 seconds)
      if (cycleCount % 5 === 0) {
        const tempId = Date.now();
        const approvedNotif: NotificationItem = {
          id: tempId,
          label: "Approved",
          title: "Milestone Approval: Automated trial logic finalized",
          description: "Stripe Billing checkout procedures verified with active sandbox webhooks.",
          time: "Just now",
          type: "success"
        };
        // Add approved notification
        setNotifications(prev => [approvedNotif, ...prev]);

        // Complete and show tick mark after 3.5 seconds
        setTimeout(() => {
          setCompletedNotifIds(prev => [...prev, tempId]);
          // Fade away completely after another 1.5 seconds
          setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== tempId));
            setCompletedNotifIds(prev => prev.filter(item => item !== tempId));
          }, 1500);
        }, 3500);
      }

      // 9. Independent random toast/pill messages at random times (completely decoupled from changes)
      if (Math.random() > 0.6) {
        const messagesList = [
          "Secure Tunnel Connection initialized.",
          "Datacore sync established with zero latency.",
          "Fulfillment micro-services verified active.",
          "Billing audit ledger compiled successfully.",
          "Node-to-node routing protocols updated.",
          "Database trigger optimization active.",
        ];
        const randomMsg = messagesList[Math.floor(Math.random() * messagesList.length)];
        setTimeout(() => {
          triggerToast(randomMsg);
        }, Math.floor(Math.random() * 4000) + 1000);
      }

      // Schedule next run after a random interval between 1.5 and 2.5 seconds
      const nextDelay = Math.floor(Math.random() * 1000) + 1500;
      timeoutId = setTimeout(runTicker, nextDelay);
    };

    // Initial trigger after 1.5 seconds to let the workspace settle
    timeoutId = setTimeout(runTicker, 1500);

    return () => clearTimeout(timeoutId);
  }, [isAutoRotating]);

  // Task Board state - fully interactive and supports Drag & Drop!
  const [tasks, setTasks] = useState<TaskItem[]>([
    { 
      id: 1, 
      title: "Configure Secondary Ingestion Triggers And Schemas", 
      category: "Automation", 
      status: "In Progress", 
      priority: "High",
      description: "Set up Webhook receivers for incoming Salesforce and HubSpot database webhooks, map payload attributes dynamically to database tables, and establish reliable retry procedures.",
      assignee: "S. Rogers (Senior AI Dev)",
      dueDate: "June 29, 2026"
    },
    { 
      id: 2, 
      title: "Deploy Secure Token Routing Middleware", 
      category: "Development", 
      status: "New", 
      priority: "High",
      description: "Create and implement secure JWT authorization and rate-limiting middleware to guard critical API endpoints. Ensure comprehensive logging of unauthorized access attempts.",
      assignee: "N. Romanoff (SecOps Expert)",
      dueDate: "July 2, 2026"
    },
    { 
      id: 3, 
      title: "Map Customer Portal Styling Specification", 
      category: "Design", 
      status: "Review/Testing", 
      priority: "Medium",
      description: "Translate high-fidelity Figma spec prototypes of the member and operation portals to Tailwind CSS utility classes. Maintain smooth responsive layout curves.",
      assignee: "K. Barton (Lead UI Designer)",
      dueDate: "June 30, 2026"
    }
  ]);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [completedNotifIds, setCompletedNotifIds] = useState<number[]>([]);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [taskTitleInput, setTaskTitleInput] = useState("");
  const [taskCategory, setTaskCategory] = useState<TaskItem["category"]>("Automation");
  const [taskPriority, setTaskPriority] = useState<TaskItem["priority"]>("High");
  const [taskFilter, setTaskFilter] = useState<string>("All");

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("text/plain", taskId.toString());
    setIsAutoRotating(false); // Stop auto-rotation immediately when user drags
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskItem["status"]) => {
    e.preventDefault();
    setIsAutoRotating(false); // Stop auto-rotation immediately when user drops
    const taskIdStr = e.dataTransfer.getData("text/plain");
    if (!taskIdStr) return;
    const taskId = parseInt(taskIdStr, 10);
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: targetStatus } : t));
    triggerToast(`Moved task to ${targetStatus}`);
  };

  // Discussions messages state
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "You", text: "Are we on track to finish the auto lead capture workflow for our web forms by tomorrow?", time: "01:21 AM" },
    { id: 2, sender: "Keycodes Team", text: "Hi! Yes, we have successfully created the POST webhook listener, parsed the incoming form JSON structure, and mapped fields straight to your active database. Looking highly stable.", time: "01:22 AM" },
    { id: 3, sender: "You", text: "Perfect. Please make sure that if a submission fails, it triggers a Discord alert.", time: "01:25 AM" },
    { id: 4, sender: "Keycodes Team", text: "Done! We integrated a fail safe catch block that posts direct warning payloads containing error logs to your Discord channel instantly.", time: "01:26 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, label: "Deployment", title: "Updated Trial Messaging & Layout", description: "Successfully refreshed billing components to display the custom 7 Day trial flow and Unlimited Tasks benefit.", time: "03:38 PM", type: "success" },
    { id: 2, label: "Optimization", title: "Refactored Timeline Scroll Speed", description: "Improved key scroll container animations, bringing transition lag down to 500ms for immediate, fluid step switching.", time: "03:12 PM", type: "success" },
    { id: 3, label: "Design Approved", title: "Approved Client Portal Layout And UI Hierarchy", description: "The typography pairings, layout alignments, and user facing copy specifications are approved for live launch.", time: "02:45 PM", type: "success" }
  ]);

  // Autoscroll discussions log (local container positioning avoids viewport shifting)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, simPhase]);

  // Interactive Live Conversation Loop (fully themed in deep purple)
  useEffect(() => {
    if (!isSimulating || activeTab !== "discussions") {
      setSimPhase("idle");
      setPopupVisible(false);
      return;
    }

    let timerId: NodeJS.Timeout;

    const transitionTo = (phase: typeof simPhase, delay: number, actionBefore?: () => void) => {
      timerId = setTimeout(() => {
        if (actionBefore) actionBefore();
        setSimPhase(phase);
      }, delay);
    };

    // Begin cycle
    setSimPhase("client_typing");

    // Client sends small-talk message
    transitionTo("client_message", 2500, () => {
      const scenario = SIMULATION_SCENARIOS[currentScenarioIndex];
      const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => {
        if (prev.some(m => m.text === scenario.clientMsg)) return prev;
        return [
          ...prev,
          {
            id: Date.now(),
            sender: "You",
            text: scenario.clientMsg,
            time: stamp
          }
        ];
      });
    });

    // Instant popup showing response alert - stays on screen for exactly 3 seconds (from 2800ms to 5800ms)
    transitionTo("instant_popup", 2800, () => {
      // Show occasionally for realistic, non-predictable behaviour
      if (Math.random() > 0.45) {
        setPopupVisible(true);
      }
    });

    // Specialist begins typing - hides popup after exactly 3.0 seconds
    transitionTo("team_typing", 5800, () => {
      setPopupVisible(false);
    });

    // Team finishes typing and replies
    transitionTo("team_message", 7800, () => {
      const scenario = SIMULATION_SCENARIOS[currentScenarioIndex];
      const stamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => {
        if (prev.some(m => m.text === scenario.teamMsg)) return prev;
        return [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "Keycodes Team",
            text: scenario.teamMsg,
            time: stamp
          }
        ];
      });
    });

    // Advance to next chapter in 13.5s
    const totalCycleTime = 13500;
    const nextChapterTimer = setTimeout(() => {
      setCurrentScenarioIndex(prev => (prev + 1) % SIMULATION_SCENARIOS.length);
    }, totalCycleTime);

    return () => {
      clearTimeout(timerId);
      clearTimeout(nextChapterTimer);
    };
  }, [isSimulating, activeTab, currentScenarioIndex]);

  const selectTabManually = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setIsAutoRotating(false); // Stop automatic rotation once the user interacts manually
    triggerToast(`Displaying section: ${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
  };

  const handleRefreshPulse = () => {
    const refreshed = Array.from({ length: 140 }).map(() => Math.floor(Math.random() * 4));
    setPulseData(refreshed);
    triggerNotification("Refreshed system signal logs.");
  };

  // Chat message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Pause automated loop temporarily so user feels in control
    setIsSimulating(false);
    setSimPhase("idle");

    const dispatchTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: Date.now(),
      sender: "You",
      text: newMessage.trim(),
      time: dispatchTime
    };

    setMessages(prev => [...prev, userMsg]);
    setNewMessage("");
    triggerNotification("Message transmitted securely to active engineer queue.");

    // Display the popup instantly as requested!
    setPopupVisible(true);

    // After 2.5 seconds, start team typing and hide popup
    setTimeout(() => {
      setPopupVisible(false);
      setSimPhase("team_typing");

      // Respond after 2 more seconds
      setTimeout(() => {
        setSimPhase("idle");
        const respTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "Keycodes Team",
            text: "Copy that! Our specialized engineering team is on it. We're setting up the test pipeline and verifying the automation trigger in your sandbox right now.",
            time: respTime
          }
        ]);
        triggerNotification("Engineers connected successfully.");
      }, 2000);
    }, 2500);
  };

  // Add a new task card
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitleInput.trim()) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: taskTitleInput.trim(),
      category: taskCategory,
      status: "New",
      priority: taskPriority
    };

    setTasks(prev => [newTask, ...prev]);
    setTaskTitleInput("");
    setIsNewTaskOpen(false);
    triggerNotification(`Created new task: ${newTask.title}`);
  };

  return (
    <section 
      className="w-full flex flex-col items-center select-none pt-4 pb-12 relative overflow-hidden" 
      id="portal-glass-section"
      onClick={() => setIsAutoRotating(false)}
    >
      {/* Absolute glassy glow highlights */}
      <div className="absolute right-[10%] top-[15%] w-[450px] h-[450px] bg-purple-500/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute left-[8%] bottom-[5%] w-[350px] h-[350px] bg-pink-500/[0.03] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl w-full px-4 sm:px-6 relative z-10">
        
        {/* ========================================================== */}
        {/* Premium Headless Typography for the Portal                */}
        {/* ========================================================== */}
        <div className="text-center pb-6 mb-8 border-b border-white/5 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-[#a484ff]/30 text-white shadow-[0_0_15px_rgba(164,132,255,0.25)] select-none">
              <Activity className="h-3.5 w-3.5 text-[#a484ff] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider font-manrope uppercase">
                Operations Portal
              </span>
            </div>
          </div>
          
          <h2 className="font-instrument text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.15]">
            Command <span className="font-serif italic text-white/90">Center.</span>
          </h2>

          <p className="font-manrope text-sm text-white/60 max-w-xl mx-auto mt-3 font-light leading-relaxed">
            Your unified hub to track live integrations, manage ongoing development queues, and collaborate directly with your engineering squad in real time.
          </p>
        </div>

        {/* ========================================================== */}
        {/* Sleek Horizontal Tab Selector (Glassy Look)               */}
        {/* ========================================================== */}
        <div className="flex justify-center mb-8 w-full">
          <div className="flex overflow-x-auto scrollbar-none whitespace-nowrap max-w-full bg-white/[0.02] border border-white/5 p-1 rounded-xl items-center shadow-lg backdrop-blur-sm relative">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "taskboard", label: "Task Board", icon: Columns },
              { id: "notifications", label: "Notifications", icon: Bell, badge: notifications.length.toString() },
              { id: "discussions", label: "Communication Loop", icon: MessageSquare }
            ].map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => selectTabManually(item.id as any)}
                  className={`relative flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs font-manrope tracking-tight font-semibold cursor-pointer transition-colors duration-300 shrink-0 select-none ${
                    isActive 
                      ? "text-white" 
                      : "text-white/40 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-gradient-to-r from-[#635BFF] to-[#7c3aed] border border-[#a484ff]/30 rounded-lg shadow-[0_0_20px_rgba(124,58,237,0.45)]"
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  )}
                  <Icon className="h-4 w-4 relative z-10" />
                  <span className="hidden sm:inline relative z-10">{item.label}</span>
                  {item.badge && parseInt(item.badge) > 0 && (
                    <span className="relative z-10 text-[9px] font-extrabold bg-rose-600 text-white ring-1 ring-[#0d0a14] px-1.5 py-0.5 rounded-full leading-none shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.4)] animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================== */}
        {/* Sub-view Content Frame                                     */}
        {/* ========================================================== */}
        <motion.div 
          className="min-h-[500px] rounded-2xl border border-white/5 bg-[#0d0a14]/60 backdrop-blur-md p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD TAB VIEW */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-6 text-left"
              >
                {/* Good Afternoon Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/[0.02] rounded-xl border border-white/5">
                      <LayoutDashboard className="h-5 w-5 text-[#a484ff]" />
                    </div>
                    <div>
                      <h3 className="font-instrument text-2xl sm:text-3xl font-light text-white tracking-tight">
                        Good Afternoon
                      </h3>
                    </div>
                  </div>
                </div>

                 {/* Featured Success Box */}
                <div className="p-4 sm:p-6 md:p-8 rounded-2xl bg-[#120f1c] border border-white/5 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-3.5 max-w-xl">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#a484ff]/10 border border-[#a484ff]/30 shadow-[0_0_12px_rgba(164,132,255,0.22)]">
                      <span className="text-[9px] font-extrabold tracking-widest text-[#a484ff] uppercase font-manrope">
                        Featured Success
                      </span>
                    </div>
                    <h4 className="font-instrument text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-snug">
                      Your Operations Scaled With <span className="text-[#a484ff]">Zero Friction</span>
                    </h4>
                    <div className="pl-4 border-l-2 border-[#7C3AED] py-0.5">
                      <p className="text-xs sm:text-sm text-white/60 font-manrope italic leading-relaxed text-left">
                        "Working with Keycodes has been top-tier. They successfully integrated our HubSpot database triggers and Stripe billing pipelines in record time."
                        <span className="block mt-2 font-bold font-manrope text-white/90 text-[10.5px] uppercase tracking-normal not-italic">&mdash; Director of Operations, Keycodes Partner</span>
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (onTryNow) {
                        onTryNow();
                      } else {
                        const el = document.getElementById("process-section");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }
                    }}
                    className="w-full md:w-auto text-center px-6 py-3 rounded-full bg-[#7c3aed] hover:bg-[#8545fa] text-white border border-[#a484ff]/40 shadow-[0_0_15px_rgba(164,132,255,0.4)] hover:shadow-[0_0_25px_rgba(164,132,255,0.7)] font-bold font-manrope text-xs uppercase tracking-widest cursor-pointer shrink-0 transition-all duration-300 transform hover:scale-[1.03] active:scale-95"
                  >
                    Try Now
                  </button>
                </div>

                {/* Grid of Minimal Metrics matching original dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  
                  {/* Metric Card 1: Executions */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                          <Zap className="h-4 w-4 text-[#a484ff]" />
                        </div>
                        <span className="font-manrope text-[10px] text-white/40 uppercase tracking-widest font-extrabold">Execution Volume</span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-2">
                        <span className="text-3xl font-extrabold font-manrope tracking-tight">{liveExecutions.toLocaleString()}</span>
                        <span className="text-[11px] text-white/40 font-manrope font-semibold">node executions</span>
                      </div>
                    </div>
                    <div className="pt-2 text-[10.5px] font-manrope text-[#bc9eff]">
                      Active automation nodes
                    </div>
                  </div>

                  {/* Metric Card 2: Hours Saved */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="font-manrope text-[10px] text-white/40 uppercase tracking-widest font-extrabold">Time Savings</span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-2">
                        <span className="text-3xl font-extrabold font-manrope tracking-tight text-white">{liveHoursSaved.toFixed(1)}</span>
                        <span className="text-[11px] text-white/30 font-manrope font-semibold">hours saved / 3 months</span>
                      </div>
                    </div>
                    <div className="pt-2 text-[10.5px] font-manrope text-blue-400">
                      Reclaimed audit hours
                    </div>
                  </div>

                  {/* Metric Card 3: Team Pulse */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between min-h-[140px]">
                    <div>
                      <div className="flex items-center justify-between gap-1.5 mb-2.5">
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                             <Activity className="h-4 w-4 text-teal-400" />
                           </div>
                           <span className="font-manrope text-[10px] text-white/40 uppercase tracking-widest font-extrabold font-sans">Workspace Pulse</span>
                        </div>
                        {/* Initials avatars */}
                        <div className="flex -space-x-1.5 shrink-0">
                          <span className="w-4.5 h-4.5 rounded-full bg-[#7C3AED] text-[7.5px] font-black font-manrope flex items-center justify-center ring-1 ring-[#0d0a14] text-white">S</span>
                          <span className="w-4.5 h-4.5 rounded-full bg-pink-500 text-[7.5px] font-black font-manrope flex items-center justify-center ring-1 ring-[#0d0a14] text-white">N</span>
                          <span className="w-4.5 h-4.5 rounded-full bg-teal-400 text-[7.5px] font-black font-manrope flex items-center justify-center ring-1 ring-[#0d0a14] text-white">K</span>
                        </div>
                      </div>
                      <h4 className="text-[11.5px] font-bold font-manrope mt-1">Your Dedicated Engineers Are Working On <span className="text-[#a484ff]">{tasks.filter(t => t.status !== "Completed").length} Deliverables</span></h4>
                      <p className="text-[9.5px] text-white/40 leading-normal font-manrope mt-1.5">
                        We are currently validating final workflows and email integration rules. Overall progress is on track with maximum reliability.
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-white/5 flex flex-wrap gap-2 sm:gap-3 text-[9px] font-semibold font-manrope">
                      <span className="text-[#bc9eff] flex items-center gap-1">● 3 Specialists Active</span>
                      <span className="text-[#a484ff] flex items-center gap-1">● {liveAccuracy}% Target Rate</span>
                    </div>
                  </div>

                </div>

                {/* System Pulse in shades of Purple */}
                <div className="p-4 sm:p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 text-[#a484ff]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-extrabold font-manrope uppercase tracking-wider">Operational Integrity Log</h4>
                          <div className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a484ff] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a484ff] shadow-[0_0_12px_#a484ff]"></span>
                          </div>
                        </div>
                        <span className="text-[9px] text-white/35 font-manrope block leading-none mt-1">Active pipeline execution history (last 140 cycles)</span>
                      </div>
                    </div>
                    <button 
                      onClick={handleRefreshPulse}
                      className="text-white/30 hover:text-white transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Heatmap grid - purple accent as requested by user with random occasionally glowing cells */}
                  <div className="w-full bg-[#120f1c]/30 border border-white/5 rounded-xl p-3 sm:p-4.5">
                    <div className="flex flex-wrap gap-1 px-1 justify-center">
                      {pulseData.map((val, index) => {
                        const isGlowing = glowingIndices.includes(index);
                        // Various elegant shades of purple and charcoal for natural look
                        let color = "bg-white/[0.02]";
                        if (val === 1) color = "bg-[#7c3aed]/15";
                        else if (val === 2) color = "bg-[#7c3aed]/30";
                        else if (val === 3) color = "bg-[#7c3aed]/60";
                        
                        // Clean highlighted node
                        if (index === 115) color = "bg-[#a484ff]";

                        return (
                          <div 
                            key={index} 
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 xl:w-3.5 xl:h-3.5 rounded-full transition-all duration-300 ${
                              isGlowing 
                                ? "bg-[#a484ff] shadow-[0_0_12px_rgba(164,132,255,0.9)] scale-110 border border-white/40" 
                                : color
                            }`}
                            title={`System cycle standard block - Status Normal`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Monthly Activity chart panel with side-by-side multiple bars (completed vs new) */}
                <div className="p-4 sm:p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="h-4 text-[#a484ff]" />
                      <div>
                        <h4 className="text-xs font-extrabold font-manrope uppercase tracking-wider">Monthly Activity</h4>
                        <span className="text-[9px] text-white/35 font-manrope block leading-none mt-1">Last 6 months &mdash; side-by-side comparison</span>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex items-center gap-3 text-[9px] font-semibold font-manrope">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded bg-white/10" />
                        <span className="text-white/45">New Deliverables</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded bg-[#7C3AED]" />
                        <span className="text-[#a484ff]">Completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end gap-3 sm:gap-6 pt-2 h-40">
                    {/* Y-Axis Labeling */}
                    <div className="flex flex-col justify-between h-full text-[9px] font-mono text-white/20 select-none pb-4 font-semibold text-right pr-2">
                      <span>1.0</span>
                      <span>0.8</span>
                      <span>0.6</span>
                      <span>0.4</span>
                      <span>0.2</span>
                      <span>0</span>
                    </div>

                    {/* Chart columns bar plot with multiple bars */}
                    <div className="flex-1 grid grid-cols-6 h-full items-end border-l border-b border-white/5 pl-2 pb-1.5 relative">
                      {[
                        { name: "Jan", newH: "45%", compH: "30%" },
                        { name: "Feb", newH: "60%", compH: "50%" },
                        { name: "Mar", newH: "55%", compH: "58%" },
                        { name: "Apr", newH: "70%", compH: "65%" },
                        { name: "May", newH: "82%", compH: "78%" },
                        { name: "Jun", newH: "95%", compH: "92%", active: true }
                      ].map((column, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-end h-full">
                          <div className="w-full flex items-end justify-center gap-1 h-full pb-1">
                            {/* New Deliverables Bar */}
                            <div 
                              className="w-[8px] sm:w-[12px] rounded-t-sm bg-white/10 transition-all duration-700"
                              style={{ height: column.newH }}
                            />
                            {/* Completed Bar */}
                            <div 
                              className={`w-[8px] sm:w-[12px] rounded-t-sm transition-all duration-700 ${
                                column.active 
                                  ? "bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.4)]" 
                                  : "bg-[#7C3AED]/50"
                              }`}
                              style={{ height: column.compH }}
                            />
                          </div>
                          <span className="text-[10px] font-semibold text-white/35 font-manrope mt-2 block leading-none font-sans">
                            {column.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Operations Stream log card */}
                <div className="p-4 sm:p-5 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse animate-duration-1000" />
                      <div className="text-left">
                        <h4 className="text-xs font-extrabold font-manrope uppercase tracking-wider text-white">Live Operations Feed</h4>
                        <span className="text-[9.5px] text-white/50 font-manrope block leading-none mt-1">Real-time task coordination and optimization</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence initial={false}>
                      {liveLogs.map((log) => {
                        let statusIcon;
                        if (log.type === "success") {
                          statusIcon = (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7c3aed]/15 text-[#bc9eff] border border-[#a484ff]/25">
                              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                            </div>
                          );
                        } else if (log.type === "review") {
                          statusIcon = (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Clock className="h-3.5 w-3.5" />
                            </div>
                          );
                        } else {
                          statusIcon = (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-400 border border-red-500/25">
                              <AlertTriangle className="h-3.5 w-3.5" />
                            </div>
                          );
                        }

                        return (
                          <motion.div
                            key={log.id}
                            initial={{ opacity: 0, y: -12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            whileHover={{ scale: 1.002 }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                            layout
                            className="relative overflow-hidden p-3.5 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            {/* Inner left color highlight */}
                            <div className={`absolute left-0 top-0 bottom-0 w-0.5 opacity-60 ${log.type === "alert" ? "bg-red-500" : "bg-[#7C3AED]"}`} />

                            {/* Left side: Icon + Text */}
                            <div className="flex items-center gap-3 min-w-0">
                              {statusIcon}
                              <div className="min-w-0 text-left">
                                <p className="text-[11px] sm:text-xs text-white/85 font-semibold font-manrope leading-tight">
                                  {log.text}
                                </p>
                              </div>
                            </div>

                            {/* Right side: Optional status Badge + Time badge */}
                            <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pl-10 sm:pl-0">
                              {log.type === "alert" ? (
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold font-manrope bg-red-500/20 text-red-400 border border-red-500/35 whitespace-nowrap shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                                    Fix ETA: 13m
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold font-manrope bg-red-500/20 text-red-400 border border-red-500/35 whitespace-nowrap shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                                    Severity: High
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold font-manrope bg-red-500/20 text-red-400 border border-red-500/35 whitespace-nowrap shadow-[0_0_10px_rgba(239,68,68,0.45)] animate-pulse">
                                    Hotfix Active
                                  </span>
                                </div>
                              ) : null}
                              <span className="text-[10px] font-semibold font-manrope text-white/45 whitespace-nowrap bg-white/[0.02] border border-white/10 shadow-[0_0_8px_rgba(255,255,255,0.04)] py-1 px-2.5 rounded-full ml-auto sm:ml-0">
                                {log.displayTime}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            )}

            {/* 2. TASK BOARD TAB VIEW (CRITICAL COMPONENT INSERTED AS REQUESTED) */}
            {activeTab === "taskboard" && (
              <motion.div
                key="taskboard"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-6 text-left"
              >
                {/* Board actions and filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div className="flex flex-wrap bg-white/[0.02] border border-white/5 p-1 rounded-xl items-center gap-1 max-w-full">
                    {["All", "Automation", "Operations", "Development", "Design", "Marketing & Sales"].map((pill) => (
                      <button
                        key={pill}
                        onClick={() => setTaskFilter(pill)}
                        className={`px-3 py-1.5 rounded-lg text-[9.5px] font-bold font-manrope uppercase select-none transition-all duration-200 cursor-pointer ${
                          pill === taskFilter
                            ? "bg-[#7C3AED]/25 text-white border border-[#a484ff]/30" 
                            : "text-white/40 hover:text-white/80"
                        }`}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Responsive Column Columns Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-2">
                  {[
                    { status: "New", badgeColor: "bg-white/5 text-white/95 border border-white/10 shadow-[0_0_8px_rgba(255,255,255,0.06)]" },
                    { status: "In Progress", badgeColor: "bg-[#7C3AED]/20 text-[#cbbef0] border border-[#a484ff]/35 shadow-[0_0_10px_rgba(164,132,255,0.22)]" },
                    { status: "On Hold", badgeColor: "bg-slate-500/10 text-slate-400 border border-slate-500/20 shadow-[0_0_8px_rgba(148,163,184,0.12)]" },
                    { status: "Review/Testing", badgeColor: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 shadow-[0_0_10px_rgba(99,102,241,0.18)]" },
                    { status: "Completed", badgeColor: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(52,211,153,0.22)]" }
                  ].map((col) => {
                    const filteredList = tasks.filter(t => 
                      t.status === col.status && (taskFilter === "All" || t.category === taskFilter)
                    );
                    const isOver = dragOverCol === col.status;

                    return (
                      <div 
                        key={col.status} 
                        onDragOver={handleDragOver}
                        onDragEnter={() => setDragOverCol(col.status)}
                        onDragLeave={() => setDragOverCol(null)}
                        onDrop={(e) => handleDrop(e, col.status as any)}
                        className={`p-4 rounded-2xl space-y-4 flex flex-col min-h-[350px] transition-all duration-300 border ${
                          isOver 
                            ? "bg-[#7C3AED]/5 border-dashed border-[#a484ff] shadow-[0_0_15px_rgba(124,58,237,0.15)] scale-[1.01]" 
                            : "bg-white/[0.01] border-white/5"
                        }`}
                      >
                        {/* Header tab badge */}
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                          <span className="text-[10px] font-extrabold uppercase font-manrope tracking-tight text-white/70">
                            {col.status}
                          </span>
                          <span className={`text-[9px] font-black font-mono px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                            {filteredList.length}
                          </span>
                        </div>

                        {/* List Area */}
                        <div className="flex-1 space-y-2.5">
                          {filteredList.length === 0 ? (
                            <div className="h-full flex items-center justify-center p-3 border border-dashed border-white/5 rounded-xl min-h-[80px]">
                              <span className="text-[10px] text-white/20 font-semibold font-manrope italic text-center">
                                Drop tickets here
                              </span>
                            </div>
                          ) : (
                            filteredList.map((task) => (
                              <div 
                                key={task.id} 
                                draggable
                                onDragStart={(e) => handleDragStart(e, task.id)}
                                onClick={() => setSelectedTask(task)}
                                className="group p-4 rounded-xl bg-[#120f1c] hover:bg-[#151124] border border-white/5 hover:border-[#a484ff]/30 space-y-3 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_0_15px_rgba(164,132,255,0.15)] transform hover:-translate-y-0.5 select-none"
                              >
                                <div className="space-y-2.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] px-2 py-0.5 rounded-full bg-[#7c3aed]/15 border border-[#a484ff]/30 text-[#bc9eff] font-extrabold tracking-wider uppercase font-manrope block w-fit shadow-[0_0_8px_rgba(164,132,255,0.18)]">
                                      {task.category}
                                    </span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-[#a484ff] uppercase font-manrope">
                                      View File ↗
                                    </span>
                                  </div>
                                  <h5 className="text-[11.5px] font-semibold font-manrope text-white/90 leading-snug group-hover:text-white transition-colors">
                                    {task.title}
                                  </h5>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[8.5px] font-extrabold gap-2">
                                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${getPriorityBadgeColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                  <span className="text-[8px] text-white/30 font-semibold font-mono">
                                    #{task.id}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 3. NOTIFICATIONS TAB VIEW */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-6 text-left"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <div>
                    <h3 className="font-instrument text-2xl font-light tracking-tight text-white leading-none">System Notifications</h3>
                    <span className="text-[10px] font-manrope text-white/35 block mt-1.5">Real-time chronicle of state adjustments, protocol deployments, and pipeline milestones.</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-white/5 bg-white/[0.01]">
                      <span className="text-sm font-semibold font-manrope text-white/20 italic">
                        No notifications. No telemetry events flagged inside the cycle.
                      </span>
                    </div>
                  ) : (
                    notifications.slice(0, 3).map((item) => {
                      const isCompleted = completedNotifIds.includes(item.id);
                      return (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{ 
                            opacity: isCompleted ? 0 : 1,
                            scale: isCompleted ? 0.95 : 1,
                            x: isCompleted ? 15 : 0
                          }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          layout
                          className={`p-5 rounded-xl border border-white/5 flex items-start justify-between gap-4 transition-all duration-300 ${
                            isCompleted 
                              ? "border-l-2 border-l-green-500 bg-green-500/5 text-white/50" 
                              : "border-l-2 border-l-[#7c3aed] bg-white/[0.01] hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/25">
                                  <Check className="h-2.5 w-2.5" /> Resolved
                                </span>
                              ) : (
                                <span className="text-[9px] font-manrope font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#a484ff]">
                                  {item.label}
                                </span>
                              )}
                              <span className={`text-xs font-semibold tracking-tight ${isCompleted ? "text-white/40 line-through" : "text-white"}`}>
                                {item.title}
                              </span>
                            </div>
                            <p className={`text-xs leading-relaxed font-manrope ${isCompleted ? "text-white/25" : "text-white/50"}`}>
                              {item.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className="text-[9.5px] font-mono text-white/30 pt-0.5">
                              {item.time}
                            </span>
                            {!isCompleted && (
                              <button
                                onClick={() => handleCompleteNotif(item.id)}
                                className="px-2.5 py-1 rounded bg-[#7c3aed]/15 hover:bg-green-500/20 text-[#bc9eff] hover:text-green-400 border border-[#a484ff]/20 hover:border-green-500/30 text-[9px] font-bold font-manrope uppercase tracking-wider transition-all duration-200 cursor-pointer"
                              >
                                Resolve
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </motion.div>
            )}

            {/* 4. DISCUSSIONS TAB VIEW */}
            {activeTab === "discussions" && (
              <motion.div
                key="discussions"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col h-[500px] border border-white/5 rounded-2xl bg-white/[0.01] overflow-hidden relative"
              >
                {/* Board header */}
                <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between gap-3">
                  <div className="text-left">
                    <h3 className="font-manrope text-xs font-black text-white uppercase tracking-wider leading-none">
                      Direct Communication With Your Tech Team
                    </h3>
                    <span className="text-[9px] text-white/35 font-semibold font-manrope mt-1 block">Active developer session ID: PRT-94 &bull; Purple Priority</span>
                  </div>
                </div>

                {/* Messages screen */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[360px] relative scrollbar-none">
                  {messages.map((msg) => {
                    const isUser = msg.sender === "You";
                    return (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className={`flex flex-col max-w-[85%] ${isUser ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-manrope font-extrabold text-white/40">{msg.sender}</span>
                          <span className="text-[8.5px] font-mono text-white/20">{msg.time}</span>
                        </div>
                        <div className={`p-3.5 rounded-2xl text-[12.5px] leading-relaxed font-manrope text-left ${
                          isUser 
                            ? "bg-[#7c3aed] text-white rounded-tr-none shadow shadow-[#7c3aed]/10" 
                             : "bg-white/[0.03] text-white/85 rounded-tl-none border border-white/5"
                        }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Simulated typing flows */}
                  {simPhase === "client_typing" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col max-w-[85%] ml-auto items-end"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-manrope font-extrabold text-[#a484ff]">You</span>
                        <span className="text-[8.5px] font-mono text-white/30 italic">Drafting inquiry...</span>
                      </div>
                      <div className="p-3.5 py-2.5 rounded-2xl bg-[#7c3aed]/20 rounded-tr-none border border-[#7c3aed]/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}

                  {simPhase === "team_typing" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col max-w-[85%] mr-auto items-start"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-manrope font-extrabold text-white/50">Keycodes Team</span>
                        <span className="text-[8.5px] font-mono text-white/30 italic">Formulating response...</span>
                      </div>
                      <div className="p-3.5 py-2.5 rounded-2xl bg-white/[0.02] rounded-tl-none border border-white/5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a484ff] animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Instant 3D Clock Node Alert Card */}
                <AnimatePresence>
                  {popupVisible && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -10 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-x-4 top-22 bottom-18 z-30 flex items-center justify-center p-4 bg-[#0a0712]/90 backdrop-blur-sm rounded-xl"
                    >
                      <div className="relative max-w-sm w-full p-6 rounded-2xl border border-violet-500/20 bg-[#120f1c] text-center space-y-4 overflow-hidden">
                        
                        {/* Clean elegant clock element */}
                        <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10">
                          <Clock className="h-6 w-6 text-[#a484ff]" />
                        </div>

                        {/* Text Typography */}
                        <div className="space-y-1 relative z-10">
                          <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#a484ff] font-manrope block">
                            Secure Direct Line Active
                          </span>
                          <h4 className="font-manrope text-base font-black text-white leading-snug">
                            24/7 Access To Your Dedicated Engineers
                          </h4>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/15 border border-[#a484ff]/35 shadow-[0_0_12px_rgba(164,132,255,0.22)] mt-1">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a484ff] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#a484ff]"></span>
                            </span>
                            <span className="text-[11px] font-bold font-manrope text-[#d4c9ff]">
                              Avg Response Time: 3 Minutes
                            </span>
                          </div>
                        </div>

                        {/* Progress line */}
                        <div className="relative w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="absolute left-0 top-0 bottom-0 bg-[#7C3AED]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Secure input line */}
                <form 
                  onSubmit={handleSendMessage}
                  className="p-3 bg-white/[0.02] border-t border-white/5 flex gap-2 items-center"
                >
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={isSimulating ? "Simulation playing... Type to take over" : "Message the development team..."}
                    className="flex-1 bg-white/[0.01] hover:bg-white/[0.02] focus:bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#7c3aed]/50 placeholder-white/20 transition-all font-manrope"
                  />
                  <button
                    type="submit"
                    className="p-3 rounded-xl bg-[#7c3aed] hover:bg-[#8544f5] text-white transition-all shadow shadow-[#7c3aed]/20 shrink-0 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

      </div>

      {/* System Tour Modal Alert Frame */}
      <AnimatePresence>
        {isTourOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-md w-full rounded-2xl border border-white/10 bg-[#120f1c] p-6 shadow-2xl space-y-6 text-left"
            >
              {/* Headline */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#a484ff] uppercase tracking-wider font-manrope block">
                  Feature Tour &mdash; Step {tourStep + 1} of 3
                </span>
                <h3 className="font-instrument text-2xl font-light text-white">
                  {tourStep === 0 && "Interactive Dashboard Tracker"}
                  {tourStep === 1 && "Active Task Board Pipeline"}
                  {tourStep === 2 && "Active Message Loop"}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed font-manrope">
                {tourStep === 0 && "Your central monitoring suite. Watch active executions, tally hours saved, and check live system telemetry metrics running in the background."}
                {tourStep === 1 && "Organize and prioritize features directly. Create, filter, or re-status your active dev tickets to communicate exactly what you want built."}
                {tourStep === 2 && "Speak directly with our dedicated integration experts. Fire a quick message whenever you need customized automation support or instant checks."}
              </p>

              {/* Buttons and controls */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 font-manrope">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((idx) => (
                    <div 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === tourStep ? "bg-[#7C3AED] w-4" : "bg-white/15"}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTourOpen(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/60 hover:text-white transition-opacity cursor-pointer"
                  >
                    Skip
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (tourStep < 2) {
                        setTourStep(prev => prev + 1);
                      } else {
                        setIsTourOpen(false);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#8544f5] text-xs font-bold text-white uppercase tracking-wider transition-opacity cursor-pointer"
                  >
                    {tourStep === 2 ? "Ready!" : "Next Step"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SELECTED TASK DETAILED DIALOG - Dropbox Style */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="absolute inset-0 bg-[#0d0a14]/85 backdrop-blur-md"
            />

            {/* Dialog Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-[#120f1c] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-left overflow-hidden z-10"
            >
              {/* Top gradient indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7c3aed] to-[#bc9eff]" />

              {/* Header info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-[#7c3aed]/15 text-[#bc9eff] border border-[#a484ff]/20 font-manrope">
                    {selectedTask.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityBadgeColor(selectedTask.priority)}`}>
                    {selectedTask.priority} Priority
                  </span>
                </div>
                <h3 className="font-instrument text-xl sm:text-2xl font-light text-white tracking-tight leading-snug mt-3">
                  {selectedTask.title}
                </h3>
              </div>

              {/* Meta details grid */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 text-xs">
                <div>
                  <span className="text-white/40 block font-manrope text-[10px] uppercase tracking-wider mb-1 font-semibold">Assignee Specialist</span>
                  <span className="text-white font-manrope font-bold text-sm">
                    {selectedTask.assignee || "Operations Engineer Team"}
                  </span>
                </div>
                <div>
                  <span className="text-white/40 block font-manrope text-[10px] uppercase tracking-wider mb-1 font-semibold">Target Deadline</span>
                  <span className="text-white font-manrope font-bold text-sm">
                    {selectedTask.dueDate || "As soon as possible"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 text-xs sm:text-sm">
                <span className="text-white/40 block font-manrope text-[10px] uppercase tracking-wider font-semibold">Detailed Specification</span>
                <p className="text-white/70 leading-relaxed font-manrope text-xs sm:text-[13px]">
                  {selectedTask.description || "Set up active listeners and integrations for this delivery milestone to ensure full production grade execution."}
                </p>
              </div>

              {/* Actions / Status updater */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-white/40 font-manrope text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap">Current Stage:</span>
                  <select 
                    value={selectedTask.status} 
                    onChange={(e) => {
                      const newStatus = e.target.value as TaskItem["status"];
                      setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, status: newStatus } : t));
                      setSelectedTask(prev => prev ? { ...prev, status: newStatus } : null);
                      triggerToast(`Task status set to ${newStatus}`);
                    }}
                    className="bg-[#0d0a14] text-white/90 border border-white/10 rounded-lg px-2.5 py-1 text-xs font-manrope font-bold focus:outline-none focus:border-[#a484ff]/50 cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Review/Testing">Review/Testing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <button 
                  onClick={() => setSelectedTask(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/90 font-bold font-manrope text-xs uppercase tracking-wider transition-colors cursor-pointer border border-white/5"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
