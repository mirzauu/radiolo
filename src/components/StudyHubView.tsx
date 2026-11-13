"use client";

import Image from "next/image";
import { useApp } from "@/context/AppContext";

interface StudyHubProps {
  onNavigateToQBank?: () => void;
}

export default function StudyHubView({ onNavigateToQBank }: StudyHubProps) {
  const {
    streak,
    isCheckedInToday,
    checkIn,
    openModal,
    examDaysLeft,
    totalSolved,
    registeredExams,
    reminders,
    toggleRegisterExam,
    toggleReminder,
    setActiveTrackFilter,
  } = useApp();

  const handleDomainClick = (filter: string) => {
    setActiveTrackFilter(filter);
    if (onNavigateToQBank) {
      onNavigateToQBank();
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-32 md:pb-16 w-full">
      {/* Warm Pastel Gradient Top Section */}
      <div className="w-full bg-gradient-to-b from-[#fff6d6] via-[#ffe3f0] to-[#fafafc] pb-2 md:pb-6 pt-safe transition-colors border-b border-black/5">
        <header className="w-full px-5 md:px-8 pt-3 md:pt-6 pb-2 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-grotesk font-black text-xl md:text-2xl tracking-tight leading-none text-black">
                RadTinker
              </span>
              <span className="inline-block w-2.5 h-2.5 md:w-3 md:h-3 bg-[#ff4d6d] rounded-full"></span>
            </div>
            <span className="hidden md:inline-flex text-xs font-mono px-2 py-0.5 rounded-full border border-black/15 bg-white/70 text-black/70 ml-2">
              DHA Radiology Portal 2025
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div
              onClick={() => openModal("widgets")}
              className="flex items-center gap-1.5 px-3 md:px-3.5 py-1 md:py-1.5 bg-white border border-black rounded-full shadow-xs cursor-pointer hover:bg-neutral-50 transition-colors"
              title="Click to change exam target"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="font-grotesk font-bold text-[11px] md:text-xs tracking-wide text-black uppercase">
                Exam in {examDaysLeft}d
              </span>
            </div>
            <button
              onClick={() => openModal("widgets")}
              aria-label="Menu"
              className="w-9 h-9 md:w-10 md:h-10 border border-black bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
              title="Open Radiology Calculators & Tools"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">widgets</span>
            </button>
          </div>
        </header>

        {/* Space Subtitle / URL Bar Header Container */}
        <div className="px-5 md:px-8 mt-2 mb-3 max-w-7xl mx-auto">
          <div className="border border-black bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-black/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-black/20 hidden md:inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-black/20 hidden md:inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-black/20 hidden md:inline-block"></span>
                <span className="text-xs md:text-sm font-mono font-medium text-black/60 md:ml-2">
                  radtinker.org/@dha-fellow
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex text-[11px] font-space font-bold uppercase text-neutral-500">
                  Secure DHA Instance
                </span>
                <button
                  onClick={() => openModal("widgets")}
                  className="material-symbols-outlined text-[18px] md:text-[20px] text-black/50 hover:text-black cursor-pointer"
                  title="More actions"
                >
                  more_horiz
                </button>
              </div>
            </div>
            <div className="mt-3 md:mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#dcfce7] border border-[#16a34a]/30 text-[#15803d] text-[10px] md:text-xs font-bold tracking-tight inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[11px] md:text-[13px]">arrow_downward</span>
                    High Pass Rate
                  </span>
                  <span className="hidden md:inline-flex px-2 py-0.5 rounded-full bg-[#ede9fe] border border-[#8b5cf6]/30 text-[#6d28d9] text-xs font-bold tracking-tight">
                    98.4% Resident Benchmark
                  </span>
                </div>
                <h1 className="font-grotesk text-2xl md:text-4xl font-black tracking-tight text-black leading-tight">
                  DHA Radiology Hub
                </h1>
                <p className="text-xs md:text-sm text-neutral-600 font-medium mt-1">
                  Clinical recall &amp; Prometric mock matrix with DICOM case spotters
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={onNavigateToQBank}
                  className="hidden md:inline-flex border border-black bg-white text-black font-grotesk font-bold text-xs uppercase px-5 py-2.5 rounded-full hover:bg-black/5 transition-all cursor-pointer"
                >
                  Browse Q-Bank
                </button>
                <button
                  onClick={checkIn}
                  className={`font-grotesk font-bold text-xs md:text-sm uppercase px-4 md:px-6 py-2 md:py-2.5 rounded-full active:scale-95 transition-all flex items-center gap-1.5 shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] md:shadow-[3px_3px_0px_#000] cursor-pointer ${
                    isCheckedInToday
                      ? "bg-[#10b981] text-white hover:bg-[#059669]"
                      : "bg-black text-white hover:bg-neutral-800"
                  }`}
                >
                  <span>{isCheckedInToday ? "CHECKED IN ✓" : "CHECK-IN"}</span>
                  <span className="material-symbols-outlined text-[15px]">done_all</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full px-5 md:px-8 bg-[#fafafc] gap-5 md:gap-8 pt-3 md:pt-6 max-w-7xl mx-auto">
        {/* Continuous Ticker / Marquee Banner */}
        <div className="w-full overflow-hidden border-y border-black bg-black text-white py-2.5 md:rounded-2xl select-none">
          <div className="animate-marquee flex items-center gap-6 text-xs md:text-sm font-grotesk font-bold tracking-wider uppercase">
            {/* Loop Item 1 */}
            <div className="flex items-center gap-6 shrink-0">
              <button
                onClick={() => openModal("dicom-viewer")}
                className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer"
              >
                ✦ DAILY SPOTTERS
              </button>
              <button
                onClick={() => handleDomainClick("Past Papers")}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                ⚡ DHA 2025 CLINICAL RECALLS
              </button>
              <button
                onClick={() => openModal("community")}
                className="text-[#ffed4a] hover:underline cursor-pointer"
              >
                ✦ 4,800+ RESIDENTS
              </button>
              <button
                onClick={onNavigateToQBank}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                ⚡ 1,240 REVISED MCQS
              </button>
              <button
                onClick={() => handleDomainClick("Radiation Physics")}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                ⚡ ALARA PHYSICS
              </button>
            </div>

            {/* Loop Item 2 (Seamless Infinite Repeat) */}
            <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
              <button
                onClick={() => openModal("dicom-viewer")}
                className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer"
              >
                ✦ DAILY SPOTTERS
              </button>
              <button
                onClick={() => handleDomainClick("Past Papers")}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                ⚡ DHA 2025 CLINICAL RECALLS
              </button>
              <button
                onClick={() => openModal("community")}
                className="text-[#ffed4a] hover:underline cursor-pointer"
              >
                ✦ 4,800+ RESIDENTS
              </button>
              <button
                onClick={onNavigateToQBank}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                ⚡ 1,240 REVISED MCQS
              </button>
              <button
                onClick={() => handleDomainClick("Radiation Physics")}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                ⚡ ALARA PHYSICS
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Layout: Left 8-col, Right 4-col */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 w-full">
          {/* Main Column */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-5 md:gap-7">
            {/* Morning Case Sprint Card */}
            <section className="w-full border border-black bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
              <div className="p-4 md:p-6 border-b border-black flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f1f1f5] border border-black/20 text-black text-[10px] md:text-xs font-bold tracking-wider uppercase mb-1.5 md:mb-2">
                    <span className="material-symbols-outlined text-[12px] md:text-[14px] text-blue-600">
                      verified
                    </span>
                    FREE DAILY HIGH-YIELD
                  </div>
                  <h2 className="font-grotesk text-xl md:text-2xl font-extrabold tracking-tight text-black">
                    Morning Case Sprint
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-600 mt-1 leading-snug">
                    10 Rapid-fire axial CT chest spotters &amp; core physics drills.
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black bg-[#fef08a] flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-black text-[20px] md:text-[24px]">timer</span>
                </div>
              </div>
              <div className="px-4 md:px-6 py-3 md:py-4 bg-[#fafafb] flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black text-white text-[9px] md:text-[11px] font-grotesk font-bold flex items-center justify-center border border-white">
                      DR
                    </div>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#a3e635] text-black text-[9px] md:text-[11px] font-grotesk font-bold flex items-center justify-center border border-white">
                      MK
                    </div>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-200 text-black text-[9px] md:text-[11px] font-grotesk font-bold flex items-center justify-center border border-white">
                      +41
                    </div>
                  </div>
                  <span className="text-[11px] md:text-xs font-bold text-neutral-500 uppercase tracking-tight">
                    Active Now (184 Online)
                  </span>
                </div>
                <button
                  onClick={() => openModal("sprint")}
                  className="bg-black text-white font-grotesk font-extrabold text-xs md:text-sm uppercase px-4 md:px-5 py-2 md:py-2.5 rounded-full active:scale-95 transition-transform flex items-center gap-1.5 shadow-sm cursor-pointer hover:bg-neutral-800"
                  type="button"
                >
                  <span>Start Sprint</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </section>

            {/* Practice Domains 2x2 Grid */}
            <section className="w-full">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <h3 className="font-grotesk text-lg md:text-xl font-black tracking-tight text-black">
                  Practice Domains
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-black/20 text-neutral-700 font-mono text-[10px] md:text-xs font-bold uppercase">
                  4 Core Hubs
                </span>
              </div>
              <div className="border border-black bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
                <div className="grid grid-cols-2 divide-x divide-y divide-black">
                  {/* Quadrant 1 */}
                  <button
                    onClick={() => handleDomainClick("Past Papers")}
                    className="p-4 md:p-6 flex items-center justify-between hover:bg-neutral-50 active:bg-neutral-100 transition-colors group text-left cursor-pointer"
                  >
                    <div className="pr-2">
                      <h4 className="font-grotesk font-extrabold text-sm md:text-base text-black leading-tight group-hover:underline">
                        DHA Recalls
                      </h4>
                      <span className="text-[11px] md:text-xs text-neutral-500 font-medium block mt-1">
                        1,240 Qs Mock
                      </span>
                    </div>
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl border border-black bg-[#e0e7ff] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[19px] md:text-[22px] text-black">quiz</span>
                    </div>
                  </button>

                  {/* Quadrant 2 */}
                  <button
                    onClick={() => handleDomainClick("Radiation Physics")}
                    className="p-4 md:p-6 flex items-center justify-between hover:bg-neutral-50 active:bg-neutral-100 transition-colors group text-left cursor-pointer"
                  >
                    <div className="pr-2">
                      <h4 className="font-grotesk font-extrabold text-sm md:text-base text-black leading-tight group-hover:underline">
                        ALARA Physics
                      </h4>
                      <span className="text-[11px] md:text-xs text-neutral-500 font-medium block mt-1">
                        Radiation Dose
                      </span>
                    </div>
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl border border-black bg-[#bbf7d0] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[19px] md:text-[22px] text-black">bolt</span>
                    </div>
                  </button>

                  {/* Quadrant 3 */}
                  <button
                    onClick={() => handleDomainClick("Trauma")}
                    className="p-4 md:p-6 flex items-center justify-between hover:bg-neutral-50 active:bg-neutral-100 transition-colors group text-left cursor-pointer"
                  >
                    <div className="pr-2">
                      <h4 className="font-grotesk font-extrabold text-sm md:text-base text-black leading-tight group-hover:underline">
                        Plain Film
                      </h4>
                      <span className="text-[11px] md:text-xs text-neutral-500 font-medium block mt-1">
                        Chest &amp; Bone
                      </span>
                    </div>
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl border border-black bg-[#fef08a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[19px] md:text-[22px] text-black">radiology</span>
                    </div>
                  </button>

                  {/* Quadrant 4 */}
                  <button
                    onClick={() => handleDomainClick("Neuroradiology")}
                    className="p-4 md:p-6 flex items-center justify-between hover:bg-neutral-50 active:bg-neutral-100 transition-colors group text-left cursor-pointer"
                  >
                    <div className="pr-2">
                      <h4 className="font-grotesk font-extrabold text-sm md:text-base text-black leading-tight group-hover:underline">
                        CT &amp; MRI
                      </h4>
                      <span className="text-[11px] md:text-xs text-neutral-500 font-medium block mt-1">
                        Cross-Section
                      </span>
                    </div>
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl border border-black bg-[#fbcfe8] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[19px] md:text-[22px] text-black">
                        view_carousel
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* Upcoming Mocks Section */}
            <section className="w-full">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-grotesk text-lg md:text-xl font-black tracking-tight text-black">
                    Upcoming Exam Simulations
                  </h3>
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-black bg-white text-[11px] md:text-xs font-grotesk font-black flex items-center justify-center">
                    2
                  </span>
                </div>
                <button
                  onClick={() => openModal("mock-exam")}
                  className="text-xs md:text-sm font-grotesk font-extrabold text-black uppercase underline tracking-wide cursor-pointer"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Mock Exam Card 1 */}
                <div className="border border-black bg-white rounded-2xl p-4 md:p-5 shadow-[3px_3px_0px_#000] flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-black text-white font-grotesk text-[10px] font-bold uppercase">
                          DHA Pattern
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-black/30 bg-neutral-100 text-black font-grotesk text-[10px] font-bold uppercase">
                          150 Min
                        </span>
                      </div>
                      <span className="text-[11px] font-grotesk font-bold uppercase flex items-center gap-1 text-black">
                        <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Live
                      </span>
                    </div>
                    <h4 className="font-grotesk text-base font-extrabold text-black leading-snug">
                      Grand DHA Simulator #08: Full Spectrum
                    </h4>
                    <p className="text-xs text-neutral-600 font-medium">
                      100 Prometric-style questions including 25 high-res DICOM spotters.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      Sat, 10:00 AM GST
                    </div>
                    <button
                      onClick={() => {
                        toggleRegisterExam("mock-08");
                        openModal("mock-exam");
                      }}
                      className={`font-grotesk font-bold text-xs uppercase px-4 py-2 rounded-full transition-transform active:scale-95 cursor-pointer ${
                        registeredExams["mock-08"]
                          ? "bg-emerald-600 text-white"
                          : "bg-black text-white hover:bg-neutral-800"
                      }`}
                      type="button"
                    >
                      {registeredExams["mock-08"] ? "Open Simulator ✓" : "Register"}
                    </button>
                  </div>
                </div>

                {/* Mock Exam Card 2 */}
                <div className="border border-black bg-white rounded-2xl p-4 md:p-5 shadow-[3px_3px_0px_#000] flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full border border-black bg-[#fed7aa] text-black font-grotesk text-[10px] font-bold uppercase">
                          Trauma Rad
                        </span>
                        <span className="px-2 py-0.5 rounded-full border border-black/30 bg-neutral-100 text-black font-grotesk text-[10px] font-bold uppercase">
                          45 Min Drill
                        </span>
                      </div>
                      <span className="text-[11px] font-grotesk font-bold uppercase flex items-center gap-1 text-black">
                        <span className="w-2 h-2 rounded-full bg-[#3b82f6]"></span> Speed
                      </span>
                    </div>
                    <h4 className="font-grotesk text-base font-extrabold text-black leading-snug">
                      Acute Abdomen &amp; Neuro Blitz
                    </h4>
                    <p className="text-xs text-neutral-600 font-medium">
                      Rapid detection of pneumoperitoneum, aortic dissection &amp; herniation.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      Tue, 08:30 PM GST
                    </div>
                    <button
                      onClick={() => toggleReminder("drill-blitz")}
                      className={`border border-black font-grotesk font-bold text-xs uppercase px-4 py-2 rounded-full transition-transform active:scale-95 cursor-pointer ${
                        reminders["drill-blitz"]
                          ? "bg-amber-100 text-black border-amber-600"
                          : "bg-white text-black hover:bg-neutral-100"
                      }`}
                      type="button"
                    >
                      {reminders["drill-blitz"] ? "Reminder Set 🔔" : "Remind Me"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-5 md:gap-6">
            {/* Discord / Community Banner */}
            <section className="w-full bg-[#4355f9] text-white rounded-2xl md:rounded-3xl p-5 md:p-6 border border-black shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000] relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className="max-w-[78%]">
                  <h3 className="font-grotesk text-xl font-black tracking-tight leading-snug">
                    Join 10K+ Radiology Residents
                  </h3>
                  <p className="text-xs text-white/90 mt-2 font-medium leading-relaxed">
                    Need help with spotters? Want to talk to seniors who cleared DHA? Daily recall case discussion!
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => openModal("community")}
                      className="bg-white text-black font-grotesk font-black text-xs uppercase px-5 py-2.5 rounded-full hover:bg-neutral-100 active:scale-95 transition-transform shadow-[2px_2px_0px_#000] border border-black inline-flex items-center gap-1.5 cursor-pointer"
                      type="button"
                    >
                      <span>JOIN NOW</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 relative flex items-center justify-center">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
              </div>
            </section>

            {/* Radiologist Spotlight Card */}
            <section className="w-full border border-black rounded-2xl md:rounded-3xl bg-white overflow-hidden shadow-[3px_3px_0px_#000] md:shadow-[4px_4px_0px_#000]">
              <div className="bg-black text-white px-4 md:px-5 py-2.5 flex items-center justify-between">
                <span className="font-grotesk text-xs font-black uppercase tracking-wider">
                  Spotlight Resident
                </span>
                <span className="text-[11px] font-mono text-neutral-300">#01 LEADER</span>
              </div>
              <div className="p-4 md:p-5 flex items-center gap-3.5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-black overflow-hidden shrink-0 relative">
                  <Image
                    alt="Radiologist Portrait"
                    className="w-full h-full object-cover"
                    src="/doctor-portrait.jpg"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-grotesk font-black text-base md:text-lg text-black truncate">
                    Dr. Tariq Al-Hashimi
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium truncate">
                    Specialist Radiologist • 98.4% Accuracy
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full border border-black bg-[#fef08a] text-black font-grotesk text-[10px] font-bold">
                      🔥 {streak} Day Streak
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-black/30 bg-neutral-100 text-black font-grotesk text-[10px] font-bold">
                      {totalSolved} Solved
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 md:px-5 py-3 bg-[#fafafb] border-t border-black/10 flex items-center justify-between">
                <p className="text-xs text-neutral-600 italic">
                  &quot;Focus on pediatric bone age &amp; MRI spine artifacts.&quot;
                </p>
                <button
                  onClick={() => openModal("notes")}
                  className="border border-black bg-white font-grotesk font-bold text-[10px] uppercase px-3 py-1 rounded-full hover:bg-black hover:text-white transition-colors shrink-0 cursor-pointer"
                >
                  Notes
                </button>
              </div>
            </section>

            {/* Quick Practice Matrix Card on Desktop */}
            <div className="hidden md:flex flex-col border border-black rounded-2xl md:rounded-3xl bg-white p-5 shadow-[4px_4px_0px_#000] gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <h4 className="font-grotesk font-bold text-sm text-black uppercase">
                  Exam Syllabus Breakdown
                </h4>
                <span className="text-xs font-mono font-bold text-neutral-500">100% DHA</span>
              </div>
              <div className="space-y-2 text-xs font-medium">
                <div className="flex justify-between items-center">
                  <span>Chest &amp; Cardiovascular</span>
                  <span className="font-mono font-bold">25%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full border border-black/30 overflow-hidden">
                  <div className="bg-black h-full" style={{ width: "25%" }}></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span>Physics &amp; Radiation Safety</span>
                  <span className="font-mono font-bold">20%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full border border-black/30 overflow-hidden">
                  <div className="bg-black h-full" style={{ width: "20%" }}></div>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span>Neuroradiology &amp; Spine</span>
                  <span className="font-mono font-bold">20%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full border border-black/30 overflow-hidden">
                  <div className="bg-black h-full" style={{ width: "20%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
