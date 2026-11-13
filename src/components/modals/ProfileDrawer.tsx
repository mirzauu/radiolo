"use client";

import { useApp } from "@/context/AppContext";

export default function ProfileDrawer() {
  const { closeModal, streak, totalSolved, isCheckedInToday, showToast } = useApp();

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex justify-end"
    >
      <div className="w-full max-w-lg bg-[#fafafc] h-full border-l-2 border-black shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-black text-white p-5 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white text-black font-space font-bold text-base flex items-center justify-center border-2 border-white">
              RS
            </div>
            <div>
              <h3 className="font-grotesk font-black text-lg leading-tight">
                Dr. Resident Scholar
              </h3>
              <p className="text-xs text-neutral-300 font-mono">DHA ID: DHA-RAD-2025-8842</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full border border-white bg-black text-white flex items-center justify-center font-bold text-sm hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-white border border-black rounded-2xl flex flex-col items-center text-center shadow-[2px_2px_0px_#000]">
              <span className="text-[10px] font-bold uppercase text-neutral-500">Day Streak</span>
              <span className="font-mono font-black text-xl text-black">🔥 {streak}</span>
            </div>
            <div className="p-3 bg-white border border-black rounded-2xl flex flex-col items-center text-center shadow-[2px_2px_0px_#000]">
              <span className="text-[10px] font-bold uppercase text-neutral-500">Solved Qs</span>
              <span className="font-mono font-black text-xl text-black">{totalSolved}</span>
            </div>
            <div className="p-3 bg-white border border-black rounded-2xl flex flex-col items-center text-center shadow-[2px_2px_0px_#000]">
              <span className="text-[10px] font-bold uppercase text-neutral-500">Accuracy</span>
              <span className="font-mono font-black text-xl text-black">78.4%</span>
            </div>
          </div>

          {/* Daily Status */}
          <div className="p-4 bg-white border border-black rounded-2xl shadow-[2px_2px_0px_#000] flex items-center justify-between">
            <div>
              <h4 className="font-grotesk font-bold text-sm text-black">Daily Check-In Status</h4>
              <p className="text-xs text-neutral-500">
                {isCheckedInToday ? "Checked in for today!" : "Not checked in yet today"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                isCheckedInToday
                  ? "bg-[#dcfce7] border-[#16a34a] text-[#15803d]"
                  : "bg-neutral-100 border-black/30 text-neutral-600"
              }`}
            >
              {isCheckedInToday ? "COMPLETED ✓" : "PENDING"}
            </span>
          </div>

          {/* Readiness by Domain */}
          <div className="p-4 bg-white border border-black rounded-2xl shadow-[2px_2px_0px_#000] flex flex-col gap-3">
            <h4 className="font-grotesk font-bold text-sm text-black uppercase">
              DHA Domain Competency Matrix
            </h4>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Thoracic &amp; Chest Radiographs</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full border border-black/20 overflow-hidden">
                  <div className="bg-[#10b981] h-full" style={{ width: "88%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Radiation Safety &amp; ALARA</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full border border-black/20 overflow-hidden">
                  <div className="bg-[#3b82f6] h-full" style={{ width: "72%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Emergency Spotters &amp; Trauma</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full border border-black/20 overflow-hidden">
                  <div className="bg-[#f59e0b] h-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Neuroradiology &amp; Head CT</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full border border-black/20 overflow-hidden">
                  <div className="bg-[#8b5cf6] h-full" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-black flex justify-between items-center">
          <button
            onClick={() => {
              localStorage.clear();
              showToast("Data reset to defaults!");
              window.location.reload();
            }}
            className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
          >
            Reset Progress
          </button>
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-black text-white font-grotesk font-bold text-xs uppercase rounded-full hover:bg-neutral-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

