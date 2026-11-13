"use client";

import { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import StudyHubView from "@/components/StudyHubView";
import QuestionBankView from "@/components/QuestionBankView";
import SprintModal from "@/components/modals/SprintModal";
import MockExamModal from "@/components/modals/MockExamModal";
import CommunityDrawer from "@/components/modals/CommunityDrawer";
import NotesDrawer from "@/components/modals/NotesDrawer";
import WidgetsDrawer from "@/components/modals/WidgetsDrawer";
import ProfileDrawer from "@/components/modals/ProfileDrawer";
import NotificationsDrawer from "@/components/modals/NotificationsDrawer";
import DicomViewerModal from "@/components/modals/DicomViewerModal";

type ActiveTab = "study-hub" | "question-bank";

function AppContent() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("study-hub");
  const { activeModal, openModal } = useApp();

  return (
    <div className="relative bg-[#fafafc] flex flex-col items-center w-full">
      {/* Container: retains max-w-md on mobile, expands cleanly to full max-w-7xl on desktop */}
      <div className="w-full max-w-md md:max-w-7xl flex flex-col bg-[#fafafc] relative md:border-x border-black/5">
        {/* Active Screen */}
        {activeTab === "study-hub" ? (
          <StudyHubView onNavigateToQBank={() => setActiveTab("question-bank")} />
        ) : (
          <QuestionBankView onNavigateToHub={() => setActiveTab("study-hub")} />
        )}

        {/* Floating Bottom Navigation Capsule (TinkerStyle) */}
        <div className="fixed bottom-3 md:bottom-6 inset-x-0 z-50 pointer-events-none flex justify-center pb-safe">
          <nav className="pointer-events-auto bg-[#111111] text-white rounded-full p-1.5 md:p-2 flex items-center gap-1.5 md:gap-2 shadow-[0_8px_24px_rgba(0,0,0,0.35)] md:shadow-[0_12px_32px_rgba(0,0,0,0.45)] border border-white/10">
            {/* Study Hub Tab */}
            <button
              onClick={() => setActiveTab("study-hub")}
              className={`flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-space font-bold text-xs md:text-sm uppercase transition-all cursor-pointer ${
                activeTab === "study-hub"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">home</span>
              <span>Study Hub</span>
            </button>

            {/* Q-Bank Tab */}
            <button
              onClick={() => setActiveTab("question-bank")}
              className={`flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-space font-bold text-xs md:text-sm uppercase transition-all cursor-pointer ${
                activeTab === "question-bank"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">quiz</span>
              <span>Q-Bank</span>
            </button>

            {/* Explore Spotters Button */}
            <button
              onClick={() => openModal("dicom-viewer")}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Explore DICOM Spotters"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px] md:text-[22px]">explore</span>
            </button>

            {/* Profile / Stats Button */}
            <button
              onClick={() => openModal("profile")}
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Candidate Profile & Readiness"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px] md:text-[22px]">person</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Render Active Overlays & Modals */}
      {activeModal === "sprint" && <SprintModal />}
      {activeModal === "mock-exam" && <MockExamModal />}
      {activeModal === "community" && <CommunityDrawer />}
      {activeModal === "notes" && <NotesDrawer />}
      {activeModal === "widgets" && <WidgetsDrawer />}
      {activeModal === "profile" && <ProfileDrawer />}
      {activeModal === "notifications" && <NotificationsDrawer />}
      {activeModal === "dicom-viewer" && <DicomViewerModal />}
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
