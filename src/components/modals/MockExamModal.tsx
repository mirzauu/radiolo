"use client";

import { useState, useEffect } from "react";
import { MOCK_QUESTIONS } from "@/data/questions";
import { useApp } from "@/context/AppContext";

export default function MockExamModal() {
  const { closeModal, showToast } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(150 * 60); // 150 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentQ = MOCK_QUESTIONS[currentIdx % MOCK_QUESTIONS.length];

  const handleSelectOption = (optId: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentIdx]: optId }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const calculateScore = () => {
    let correct = 0;
    MOCK_QUESTIONS.forEach((q, idx) => {
      const selected = userAnswers[idx];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (selected && correctOpt && selected === correctOpt.id) {
        correct++;
      }
    });
    return {
      correct,
      total: MOCK_QUESTIONS.length,
      percentage: Math.round((correct / MOCK_QUESTIONS.length) * 100),
      passed: Math.round((correct / MOCK_QUESTIONS.length) * 100) >= 60,
    };
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    const result = calculateScore();
    showToast(
      result.passed
        ? `🎉 PASSED! Scored ${result.percentage}% (Benchmark: 60%)`
        : `Score: ${result.percentage}%. Keep studying!`
    );
  };

  return (
    <div className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex flex-col">
      {/* Prometric Top Exam Header */}
      <header className="bg-[#1e293b] text-white px-4 md:px-8 py-3 flex items-center justify-between border-b border-white/20 select-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
            DHA
          </div>
          <div>
            <h2 className="font-space font-bold text-sm md:text-base leading-tight">
              Prometric Examination Simulator #04
            </h2>
            <p className="text-[11px] text-white/60 font-mono">
              Diagnostic Radiology Specialist • Question {currentIdx + 1} of 100
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 font-mono text-xs md:text-sm font-bold">
            <span className="material-symbols-outlined text-[16px] text-amber-400">timer</span>
            <span>{formatTime(secondsRemaining)}</span>
          </div>
          <button
            onClick={() => setShowNavigator(!showNavigator)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/30 text-xs font-bold hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Navigator</span>
          </button>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-lg bg-red-600/80 hover:bg-red-600 flex items-center justify-center font-bold text-sm cursor-pointer"
            title="Exit Exam"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Examination Viewport */}
      {!isSubmitted ? (
        <div className="flex-1 flex overflow-hidden bg-[#f8fafc]">
          {/* Question Stem & Interface */}
          <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto max-w-4xl mx-auto w-full gap-5">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black text-white text-xs font-space font-bold uppercase">
                  {currentQ.domain}
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  Blueprint: {currentQ.dhaBlueprintWeight}
                </span>
              </div>
              <button
                onClick={toggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-space font-bold uppercase transition-colors cursor-pointer ${
                  flagged[currentIdx]
                    ? "bg-amber-100 border-amber-600 text-amber-900"
                    : "border-black/30 hover:bg-black/5 text-neutral-700"
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-amber-500">
                  flag
                </span>
                <span>{flagged[currentIdx] ? "Flagged for Review" : "Flag Question"}</span>
              </button>
            </div>

            {/* Stem */}
            <p className="font-sans text-sm md:text-base leading-relaxed text-black font-medium">
              <strong>Q{currentIdx + 1}:</strong> {currentQ.stem}
            </p>

            {/* Optional Image */}
            {currentQ.image && (
              <div className="border border-black rounded-xl overflow-hidden bg-black max-w-md">
                <img
                  src={currentQ.image}
                  alt="Clinical radiograph"
                  className="w-full h-48 md:h-64 object-cover"
                />
                {currentQ.windowPreset && (
                  <div className="p-2 bg-neutral-900 text-white/80 font-mono text-[11px] border-t border-white/20">
                    {currentQ.windowPreset}
                  </div>
                )}
              </div>
            )}

            {/* Options */}
            <div className="flex flex-col gap-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentIdx] === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-black text-white border-black font-semibold shadow-sm"
                        : "bg-white text-black border-black/30 hover:border-black hover:bg-neutral-50"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full border flex items-center justify-center font-space font-bold text-xs ${
                        isSelected ? "bg-white text-black border-white" : "border-black bg-white"
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="text-xs md:text-sm">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Navigator Drawer */}
          {showNavigator && (
            <div className="w-72 bg-white border-l border-black/20 p-4 flex flex-col gap-3 overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-black/10">
                <h4 className="font-space font-bold text-xs uppercase tracking-wider">
                  Question Map
                </h4>
                <button
                  onClick={() => setShowNavigator(false)}
                  className="text-xs text-neutral-500 hover:text-black font-bold"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }).map((_, i) => {
                  const isCurrent = currentIdx === i;
                  const isAnswered = !!userAnswers[i];
                  const isFlag = !!flagged[i];

                  let color = "bg-neutral-100 text-neutral-800 border-black/20";
                  if (isAnswered) color = "bg-black text-white border-black";
                  if (isFlag) color = "bg-amber-300 text-black border-amber-600 font-bold";
                  if (isCurrent) color += " ring-2 ring-blue-600";

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIdx(i)}
                      className={`h-9 rounded-lg border text-xs font-mono font-bold flex items-center justify-center cursor-pointer transition-all ${color}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#f8fafc] overflow-y-auto">
          {(() => {
            const score = calculateScore();
            return (
              <div className="bg-white border-2 border-black rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[6px_6px_0px_#000] flex flex-col items-center text-center gap-4">
                <div
                  className={`w-20 h-20 rounded-full border-2 border-black flex items-center justify-center text-3xl font-black ${
                    score.passed ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#fee2e2] text-[#b91c1c]"
                  }`}
                >
                  {score.passed ? "✓" : "!"}
                </div>
                <div>
                  <h3 className="font-space font-black text-2xl text-black">
                    {score.passed ? "DHA Benchmark Cleared!" : "Benchmark Not Met"}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Prometric passing score is 60%. Your calculated final score:
                  </p>
                </div>

                <div className="p-4 bg-neutral-100 rounded-2xl border border-black w-full flex justify-around">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-500">Your Score</p>
                    <p className="font-mono font-black text-2xl">{score.percentage}%</p>
                  </div>
                  <div className="border-r border-black/20"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-500">Passing Grade</p>
                    <p className="font-mono font-black text-2xl">60%</p>
                  </div>
                  <div className="border-r border-black/20"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-neutral-500">Correct Qs</p>
                    <p className="font-mono font-black text-2xl">
                      {score.correct}/{score.total}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 w-full pt-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentIdx(0);
                    }}
                    className="flex-1 py-3 rounded-full border border-black bg-white font-space font-bold text-xs uppercase hover:bg-neutral-100 cursor-pointer"
                  >
                    Review Answers
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-full bg-black text-white font-space font-bold text-xs uppercase hover:bg-neutral-800 cursor-pointer"
                  >
                    Finish &amp; Exit
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Prometric Bottom Navigation Bar */}
      {!isSubmitted && (
        <footer className="bg-white border-t border-black/20 px-4 md:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="px-5 py-2 rounded-full border border-black text-xs font-space font-bold uppercase hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-3">
            {currentIdx < MOCK_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx((i) => i + 1)}
                className="px-6 py-2 rounded-full bg-black text-white text-xs font-space font-bold uppercase hover:bg-neutral-800 cursor-pointer"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2 rounded-full bg-emerald-600 text-white text-xs font-space font-bold uppercase hover:bg-emerald-700 shadow-sm cursor-pointer"
              >
                Submit Examination
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}

