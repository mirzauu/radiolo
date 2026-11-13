"use client";

import { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { MOCK_QUESTIONS } from "@/data/questions";

interface QuestionBankProps {
  onNavigateToHub?: () => void;
}

export default function QuestionBankView({ onNavigateToHub }: QuestionBankProps) {
  const {
    openModal,
    activeTrackFilter,
    setActiveTrackFilter,
    markQuestionSolved,
    solvedQuestions,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const filterChips = [
    "All Topics",
    "Past Papers",
    "Radiation Physics",
    "Neuroradiology",
    "Trauma",
  ];

  // Daily Challenge Question (#184 - Pneumothorax)
  const dailyQ = MOCK_QUESTIONS[0];

  const handleOptionClick = (idx: number) => {
    setSelectedOption(idx);
  };

  const handleRevealAnswer = () => {
    if (selectedOption === null) {
      showToast("Please select an option first!");
      return;
    }
    const isCorrect = dailyQ.options[selectedOption].isCorrect;
    markQuestionSolved(dailyQ.id, isCorrect);
    setShowExplanation(true);
    showToast(
      isCorrect
        ? "✓ Correct diagnosis! Pneumothorax visceral line verified."
        : "✗ Incorrect. Review the diagnostic rationale below."
    );
  };

  const toggleExplanation = () => {
    if (!showExplanation) {
      handleRevealAnswer();
    } else {
      setShowExplanation(false);
    }
  };

  // Filtered tracks based on search or chip
  const matchesSearch = (term: string) =>
    searchQuery === "" || term.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <div className="flex flex-col min-h-full pb-32 md:pb-16 w-full">
      {/* Fixed Top Header */}
      <header className="sticky top-0 w-full z-40 pt-safe bg-[#fcfcfc]/95 backdrop-blur-md border-b border-black/5">
        <div className="h-16 px-4 md:px-8 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-black bg-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-space font-bold text-[11px] md:text-xs tracking-wider uppercase text-black">
                DHA Radiology 2025
              </span>
            </div>
            <span className="text-xs font-bold text-black/60 hidden sm:inline">
              @rad_scholar
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={onNavigateToHub}
              className="hidden md:inline-flex border border-black bg-white text-black font-space font-bold text-xs uppercase px-4 py-2 rounded-full hover:bg-black/5 transition-all cursor-pointer"
            >
              Back to Study Hub
            </button>
            <button
              onClick={() => openModal("notifications")}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full border border-black bg-white flex items-center justify-center text-black active:scale-95 transition-transform cursor-pointer hover:bg-neutral-50"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
            </button>
            <button
              onClick={() => openModal("profile")}
              aria-label="Profile"
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-space font-bold text-xs active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              RS
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Flow */}
      <main className="flex-1 flex flex-col w-full px-4 md:px-8 max-w-7xl mx-auto gap-y-6 pt-4 md:pt-6">
        {/* Header Section with Bold Title */}
        <section className="flex flex-col gap-2 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-space font-bold text-[10px] md:text-xs uppercase tracking-wider">
                Module 04
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dcfce7] border border-black text-[#15803d] font-space font-bold text-[10px] md:text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]"></span>
                Readiness: 78%
              </span>
            </div>
            <span className="font-space font-bold text-xs md:text-sm uppercase tracking-wider text-black/60">
              2,200 MCQs
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <h1 className="font-space font-black text-3xl md:text-4xl tracking-tight text-black">
              Question Bank
            </h1>
            <span className="text-xs md:text-sm font-bold text-black/50">DHA Blueprints</span>
          </div>
        </section>

        {/* Search Bar with Crisp Black Outline & Desktop Action Bar */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-black/70 text-[20px] pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-black rounded-full pl-10 pr-10 py-2.5 md:py-3 font-sans font-medium text-xs md:text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black transition-all"
              placeholder="Search case keywords, pathology, DICOM..."
              type="text"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-black"
              >
                ✕
              </button>
            ) : (
              <button
                onClick={() => openModal("widgets")}
                aria-label="Filters"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-85 transition-opacity cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px] md:text-[17px]">tune</span>
              </button>
            )}
          </div>

          {/* Scrollable Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-4 md:mx-0 px-4 md:px-0">
            {filterChips.map((chip) => {
              const isActive = activeTrackFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveTrackFilter(chip)}
                  className={`whitespace-nowrap px-4 py-1.5 md:py-2 rounded-full font-space font-bold text-[11px] md:text-xs uppercase tracking-wider transition-transform active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-black text-white"
                      : "border border-black bg-white text-black hover:bg-black/5"
                  }`}
                  type="button"
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </section>

        {/* Desktop 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          {/* Left Column: Full Mock Banner & Curated Tracks */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Hero Simulator Card */}
            <section className="border border-black rounded-2xl md:rounded-3xl bg-white overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="p-4 md:p-6 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h2 className="font-space font-black text-lg md:text-xl tracking-tight text-black leading-tight">
                    DHA Full Specialist Mock #04
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-black font-medium">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#dcfce7] text-[#15803d] border border-black text-[10px]">
                      ✓
                    </span>
                    <span className="font-space font-bold text-[12px] md:text-xs text-black">
                      Active DHA Blueprint
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openModal("mock-exam")}
                  className="shrink-0 bg-black text-white font-space font-bold text-xs md:text-sm uppercase px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-black/90 active:scale-95 transition-all shadow-sm cursor-pointer"
                  type="button"
                >
                  START MOCK
                </button>
              </div>

              {/* Segmented 2-Column Split Details */}
              <div className="grid grid-cols-2 border-t border-black divide-x divide-black bg-white">
                <div className="p-3.5 md:p-5 flex items-center justify-between">
                  <div>
                    <p className="font-space font-bold text-[10px] md:text-xs uppercase tracking-wider text-black/60">
                      Time &amp; Count
                    </p>
                    <p className="font-space font-black text-sm md:text-base text-black">150 Mins / 100 Qs</p>
                  </div>
                  <span className="material-symbols-outlined text-[20px] md:text-[24px] text-black">timer</span>
                </div>
                <div className="p-3.5 md:p-5 flex items-center justify-between">
                  <div>
                    <p className="font-space font-bold text-[10px] md:text-xs uppercase tracking-wider text-black/60">
                      Benchmark
                    </p>
                    <p className="font-space font-black text-sm md:text-base text-black">60% Required</p>
                  </div>
                  <span className="material-symbols-outlined text-[20px] md:text-[24px] text-black">verified</span>
                </div>
              </div>
            </section>

            {/* Curated Domain Tracks Section */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-space font-black text-lg md:text-xl tracking-tight text-black uppercase">
                    Curated Domain Tracks
                  </h2>
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-black text-white font-space font-bold text-[11px] md:text-xs flex items-center justify-center">
                    {activeTrackFilter === "All Topics" ? "3" : "1"}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveTrackFilter("All Topics");
                    setSearchQuery("");
                  }}
                  className="font-space font-bold text-xs md:text-sm uppercase text-black hover:underline tracking-wider cursor-pointer"
                  type="button"
                >
                  Reset View
                </button>
              </div>
              <div className="flex flex-col gap-3 md:gap-4">
                {/* Track Card 1 */}
                {(activeTrackFilter === "All Topics" || activeTrackFilter === "Past Papers") &&
                  matchesSearch("DHA Prometric Core Questions General recall") && (
                    <article className="border border-black rounded-2xl md:rounded-3xl bg-white p-4 md:p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-black text-white font-space font-bold text-[10px] uppercase tracking-wider">
                            High Yield
                          </span>
                          <span className="px-2 py-0.5 rounded-full border border-black bg-white text-black font-space font-bold text-[10px] uppercase">
                            DHA 2025
                          </span>
                        </div>
                        <div className="flex items-center gap-1 border border-black px-2 py-0.5 rounded-full text-[10px] font-space font-bold">
                          <span className="w-2 h-2 rounded-full bg-black"></span>
                          <span>Foundation</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-space font-black text-base md:text-lg text-black tracking-tight">
                            DHA Prometric Core Questions
                          </h3>
                          <span className="font-space font-bold text-xs text-black/70 ml-2">1,250 Qs</span>
                        </div>
                        <p className="text-xs md:text-sm text-black/70 mt-0.5">
                          General diagnostic radiology recall patterns and core blueprinted items.
                        </p>
                      </div>
                      <div className="border border-black rounded-xl p-2.5 md:p-3 bg-[#fcfcfc] flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[11px] md:text-xs font-space font-bold">
                          <span>Completion Rate</span>
                          <span>88% (1,100 / 1,250)</span>
                        </div>
                        <div className="w-full h-2 rounded-full border border-black bg-white overflow-hidden p-[1px]">
                          <div className="h-full rounded-full bg-black" style={{ width: "88%" }}></div>
                        </div>
                      </div>
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => openModal("mock-exam")}
                          className="border border-black bg-white hover:bg-black hover:text-white font-space font-bold text-xs uppercase px-4 py-1.5 rounded-full transition-colors active:scale-95 cursor-pointer"
                        >
                          Practice Set
                        </button>
                      </div>
                    </article>
                  )}

                {/* Track Card 2 */}
                {(activeTrackFilter === "All Topics" || activeTrackFilter === "Radiation Physics") &&
                  matchesSearch("Radiation Safety ALARA dose limits fluoroscopy") && (
                    <article className="border border-black rounded-2xl md:rounded-3xl bg-white p-4 md:p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-black text-white font-space font-bold text-[10px] uppercase tracking-wider">
                            Mandatory 15%
                          </span>
                          <span className="px-2 py-0.5 rounded-full border border-black bg-white text-black font-space font-bold text-[10px] uppercase">
                            ICRP Revised
                          </span>
                        </div>
                        <div className="flex items-center gap-1 border border-black px-2 py-0.5 rounded-full text-[10px] font-space font-bold">
                          <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                          <span>Hard</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-space font-black text-base md:text-lg text-black tracking-tight">
                            Radiation Safety &amp; ALARA
                          </h3>
                          <span className="font-space font-bold text-xs text-black/70 ml-2">320 Qs</span>
                        </div>
                        <p className="text-xs md:text-sm text-black/70 mt-0.5">
                          Dose limits, fluoroscopic protection, detector physics, and QA phantoms.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-semibold text-black/60">
                          45 questions completed (14%)
                        </span>
                        <button
                          onClick={() => openModal("mock-exam")}
                          className="border border-black bg-white hover:bg-black hover:text-white font-space font-bold text-xs uppercase px-4 py-1.5 rounded-full transition-colors active:scale-95 cursor-pointer"
                          type="button"
                        >
                          RESUME SET
                        </button>
                      </div>
                    </article>
                  )}

                {/* Track Card 3 */}
                {(activeTrackFilter === "All Topics" ||
                  activeTrackFilter === "Trauma" ||
                  activeTrackFilter === "Neuroradiology") &&
                  matchesSearch("Emergency Radiology Spotters trauma plain CT") && (
                    <article className="border border-black rounded-2xl md:rounded-3xl bg-white p-4 md:p-5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full bg-black text-white font-space font-bold text-[10px] uppercase tracking-wider">
                            Image Based
                          </span>
                          <span className="px-2 py-0.5 rounded-full border border-black bg-white text-black font-space font-bold text-[10px] uppercase">
                            Trauma &amp; CT
                          </span>
                        </div>
                        <div className="flex items-center gap-1 border border-black px-2 py-0.5 rounded-full text-[10px] font-space font-bold">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span>Moderate</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h3 className="font-space font-black text-base md:text-lg text-black tracking-tight">
                            Emergency Radiology Spotters
                          </h3>
                          <span className="font-space font-bold text-xs text-black/70 ml-2">450 Qs</span>
                        </div>
                        <p className="text-xs md:text-sm text-black/70 mt-0.5">
                          Rapid acute plain radiograph &amp; polytrauma whole-body CT identification.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-semibold text-black/60">
                          High-res DICOM key slides
                        </span>
                        <button
                          onClick={() => openModal("dicom-viewer")}
                          className="border border-black bg-white hover:bg-black hover:text-white font-space font-bold text-xs uppercase px-4 py-1.5 rounded-full transition-colors active:scale-95 cursor-pointer"
                          type="button"
                        >
                          START SPOTTERS
                        </button>
                      </div>
                    </article>
                  )}
              </div>
            </section>
          </div>

          {/* Right Column: Daily MCQ Challenge Section */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <section className="border border-black rounded-2xl md:rounded-3xl bg-white p-4 md:p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 sticky top-24">
              <div className="flex items-center justify-between border-b border-black pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black"></span>
                  <h2 className="font-space font-black text-base md:text-lg uppercase text-black">
                    Daily MCQ Challenge #184
                  </h2>
                </div>
                <span className="font-space font-bold text-[11px] px-2.5 py-0.5 rounded-full border border-black bg-[#f3f4f6]">
                  2,419 attempts
                </span>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-black font-medium">
                {dailyQ.stem}
              </p>

              {/* Radiograph Frame with Zoom Button */}
              <div className="border border-black rounded-xl md:rounded-2xl overflow-hidden bg-black relative">
                <div className="relative w-full h-48 md:h-64">
                  <Image
                    alt="Diagnostic chest radiograph"
                    className="object-cover opacity-90"
                    src="/chest-xray.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  <div className="pointer-events-auto px-2.5 py-1 rounded-full bg-white/95 border border-black font-space font-bold text-[10px] md:text-xs uppercase text-black flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[13px] md:text-[15px]">contrast</span>
                    <span>Window: Lung (W:1500 L:-600)</span>
                  </div>
                  <button
                    onClick={() => openModal("dicom-viewer")}
                    aria-label="Zoom image"
                    className="pointer-events-auto w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                    type="button"
                    title="Open Fullscreen DICOM Lightbox"
                  >
                    <span className="material-symbols-outlined text-[15px] md:text-[17px]">fullscreen</span>
                  </button>
                </div>
              </div>

              {/* MCQ Options */}
              <div className="flex flex-col gap-2">
                <span className="font-space font-bold text-[11px] md:text-xs uppercase tracking-wider text-black/70">
                  Select Most Likely Diagnosis:
                </span>
                {dailyQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let style = "bg-white text-black hover:bg-black/5";

                  if (showExplanation) {
                    if (opt.isCorrect) {
                      style = "bg-[#dcfce7] text-[#15803d] border-[#16a34a] font-bold";
                    } else if (isSelected) {
                      style = "bg-[#fee2e2] text-[#b91c1c] border-[#dc2626] font-bold";
                    }
                  } else if (isSelected) {
                    style = "bg-black text-white";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(idx)}
                      className={`w-full text-left p-2.5 md:p-3 rounded-xl border border-black transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer ${style}`}
                      type="button"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-full border border-black flex items-center justify-center font-space font-bold text-xs ${
                            isSelected && !showExplanation
                              ? "bg-black text-white border-white"
                              : "bg-white text-black"
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="text-xs md:text-sm font-semibold">{opt.text}</span>
                      </div>
                      {showExplanation && (
                        <span className="material-symbols-outlined text-[18px]">
                          {opt.isCorrect ? "check_circle" : isSelected ? "cancel" : ""}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Breakdown */}
              {showExplanation && (
                <div className="flex flex-col gap-2 p-3.5 md:p-4 rounded-xl border border-black bg-[#f8fafc] animate-in fade-in">
                  <div className="flex items-center gap-1.5 text-black font-space font-bold text-xs uppercase">
                    <span className="material-symbols-outlined text-[17px]">lightbulb</span>
                    <span>Diagnostic Rationale</span>
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed text-black/80">
                    {dailyQ.explanation}
                  </p>
                  <div className="flex items-center gap-2 pt-1 font-space text-[10px] md:text-xs font-bold text-black/60">
                    <span className="px-2 py-0.5 rounded border border-black/40 bg-white">
                      {dailyQ.dhaBlueprintWeight}
                    </span>
                    <span>Ref: {dailyQ.reference}</span>
                  </div>
                </div>
              )}

              {/* Submit / Reveal Pill Button */}
              <button
                onClick={toggleExplanation}
                className={`w-full font-space font-bold text-xs md:text-sm uppercase tracking-wider py-3 md:py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                  showExplanation
                    ? "border border-black bg-white text-black hover:bg-black/5"
                    : "bg-black text-white hover:bg-black/90 active:scale-[0.99]"
                }`}
                type="button"
              >
                <span>{showExplanation ? "HIDE RATIONALE" : "SUBMIT & REVEAL ANSWER"}</span>
                <span className="material-symbols-outlined text-[16px] md:text-[18px]">
                  {showExplanation ? "visibility_off" : "arrow_forward"}
                </span>
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
