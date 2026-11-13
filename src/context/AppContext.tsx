"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CommunityPost, INITIAL_COMMUNITY_POSTS } from "@/data/questions";

interface AppContextType {
  streak: number;
  isCheckedInToday: boolean;
  totalSolved: number;
  accuracyRate: number;
  examDaysLeft: number;
  setExamDaysLeft: (days: number) => void;
  checkIn: () => void;
  // Registrations & Reminders
  registeredExams: Record<string, boolean>;
  reminders: Record<string, boolean>;
  toggleRegisterExam: (examId: string) => void;
  toggleReminder: (examId: string) => void;
  // Answer tracking
  solvedQuestions: Record<string, boolean>; // questionId -> isCorrect
  markQuestionSolved: (questionId: string, isCorrect: boolean) => void;
  // Modals state
  activeModal:
    | null
    | "sprint"
    | "mock-exam"
    | "community"
    | "notes"
    | "widgets"
    | "profile"
    | "notifications"
    | "dicom-viewer";
  openModal: (modal: NonNullable<AppContextType["activeModal"]>) => void;
  closeModal: () => void;
  // Community Posts
  communityPosts: CommunityPost[];
  addCommunityPost: (text: string) => void;
  likeCommunityPost: (id: string) => void;
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Active Filter / Track Selection
  activeTrackFilter: string;
  setActiveTrackFilter: (track: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [streak, setStreak] = useState<number>(42);
  const [isCheckedInToday, setIsCheckedInToday] = useState<boolean>(false);
  const [totalSolved, setTotalSolved] = useState<number>(1850);
  const [examDaysLeft, setExamDaysLeft] = useState<number>(34);
  const [registeredExams, setRegisteredExams] = useState<Record<string, boolean>>({});
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [solvedQuestions, setSolvedQuestions] = useState<Record<string, boolean>>({});
  const [activeModal, setActiveModal] = useState<AppContextType["activeModal"]>(null);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTrackFilter, setActiveTrackFilter] = useState<string>("All Topics");

  // Load state from localStorage on client mount
  useEffect(() => {
    try {
      const savedStreak = localStorage.getItem("radiolo_streak");
      const savedCheckedIn = localStorage.getItem("radiolo_checked_in");
      const savedSolved = localStorage.getItem("radiolo_solved");
      const savedDays = localStorage.getItem("radiolo_exam_days");
      const savedRegistered = localStorage.getItem("radiolo_registered");
      const savedReminders = localStorage.getItem("radiolo_reminders");
      const savedSolvedMap = localStorage.getItem("radiolo_solved_map");
      const savedPosts = localStorage.getItem("radiolo_posts");

      if (savedStreak) setStreak(parseInt(savedStreak, 10));
      if (savedCheckedIn === "true") setIsCheckedInToday(true);
      if (savedSolved) setTotalSolved(parseInt(savedSolved, 10));
      if (savedDays) setExamDaysLeft(parseInt(savedDays, 10));
      if (savedRegistered) setRegisteredExams(JSON.parse(savedRegistered));
      if (savedReminders) setReminders(JSON.parse(savedReminders));
      if (savedSolvedMap) setSolvedQuestions(JSON.parse(savedSolvedMap));
      if (savedPosts) setCommunityPosts(JSON.parse(savedPosts));
    } catch (e) {
      console.error("Failed to load local storage state", e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const checkIn = () => {
    if (isCheckedInToday) {
      showToast("You have already checked in today! Streak active.");
      return;
    }
    const nextStreak = streak + 1;
    setStreak(nextStreak);
    setIsCheckedInToday(true);
    localStorage.setItem("radiolo_streak", nextStreak.toString());
    localStorage.setItem("radiolo_checked_in", "true");
    showToast(`🔥 Streak incremented to ${nextStreak} Days! Keep it up!`);
  };

  const toggleRegisterExam = (examId: string) => {
    setRegisteredExams((prev) => {
      const isRegistered = !prev[examId];
      const next = { ...prev, [examId]: isRegistered };
      localStorage.setItem("radiolo_registered", JSON.stringify(next));
      showToast(
        isRegistered
          ? "Registered for exam simulator! Added to study schedule."
          : "Registration cancelled."
      );
      return next;
    });
  };

  const toggleReminder = (examId: string) => {
    setReminders((prev) => {
      const isSet = !prev[examId];
      const next = { ...prev, [examId]: isSet };
      localStorage.setItem("radiolo_reminders", JSON.stringify(next));
      showToast(
        isSet ? "🔔 Reminder set! You will receive notification before session." : "Reminder cleared."
      );
      return next;
    });
  };

  const markQuestionSolved = (questionId: string, isCorrect: boolean) => {
    setSolvedQuestions((prev) => {
      const next = { ...prev, [questionId]: isCorrect };
      localStorage.setItem("radiolo_solved_map", JSON.stringify(next));
      return next;
    });
    setTotalSolved((prev) => {
      const next = prev + 1;
      localStorage.setItem("radiolo_solved", next.toString());
      return next;
    });
  };

  const openModal = (modal: NonNullable<AppContextType["activeModal"]>) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const addCommunityPost = (text: string) => {
    const newPost: CommunityPost = {
      id: "p-" + Date.now(),
      author: "Dr. Candidate (You)",
      badge: "DHA Candidate",
      avatarBg: "bg-indigo-600",
      initials: "YOU",
      time: "Just now",
      text,
      likes: 1,
      replies: 0,
    };
    const nextPosts = [newPost, ...communityPosts];
    setCommunityPosts(nextPosts);
    localStorage.setItem("radiolo_posts", JSON.stringify(nextPosts));
    showToast("Case recall posted to community!");
  };

  const likeCommunityPost = (id: string) => {
    const nextPosts = communityPosts.map((p) =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    setCommunityPosts(nextPosts);
    localStorage.setItem("radiolo_posts", JSON.stringify(nextPosts));
  };

  const accuracyRate = 98.4;

  return (
    <AppContext.Provider
      value={{
        streak,
        isCheckedInToday,
        totalSolved,
        accuracyRate,
        examDaysLeft,
        setExamDaysLeft: (days) => {
          setExamDaysLeft(days);
          localStorage.setItem("radiolo_exam_days", days.toString());
        },
        checkIn,
        registeredExams,
        reminders,
        toggleRegisterExam,
        toggleReminder,
        solvedQuestions,
        markQuestionSolved,
        activeModal,
        openModal,
        closeModal,
        communityPosts,
        addCommunityPost,
        likeCommunityPost,
        toastMessage,
        showToast,
        activeTrackFilter,
        setActiveTrackFilter,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-sm w-full px-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-black text-white text-xs md:text-sm font-space font-bold py-3 px-4 rounded-2xl border-2 border-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
              {toastMessage}
            </span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/60 hover:text-white text-xs uppercase"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

