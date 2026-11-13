"use client";

import { useState, useEffect } from "react";
import { SPRINT_QUESTIONS } from "@/data/questions";
import { useApp } from "@/context/AppContext";

export default function SprintModal() {
  const { closeModal, showToast } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60s sprint total

  const q = SPRINT_QUESTIONS[currentIdx];

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const isCorrect = idx === q.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentIdx < SPRINT_QUESTIONS.length - 1) {
        setCurrentIdx((c) => c + 1);
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
        showToast(`Sprint finished! You scored ${score + (isCorrect ? 1 : 0)}/10`);
      }
    }, 1100);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(60);
    setIsFinished(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-white border-2 border-black rounded-3xl w-full max-w-lg overflow-hidden shadow-[6px_6px_0px_#000] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#fef08a] border-b-2 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-black">timer</span>
            <div>
              <h3 className="font-grotesk font-black text-lg text-black uppercase tracking-tight">
                Morning Case Sprint
              </h3>
              <p className="text-[11px] font-mono text-black/70">
                Question {currentIdx + 1} of {SPRINT_QUESTIONS.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs bg-black text-white px-3 py-1 rounded-full">
              ⏳ {timeLeft}s
            </span>
            <button
              onClick={closeModal}
              className="w-8 h-8 rounded-full border border-black bg-white flex items-center justify-center font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="p-5 flex flex-col gap-4 overflow-y-auto">
            {/* Progress bar */}
            <div className="w-full bg-neutral-100 h-2.5 rounded-full border border-black overflow-hidden p-[1px]">
              <div
                className="bg-black h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / SPRINT_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-600/30 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                {q.domain}
              </span>
              <span className="text-xs font-mono font-bold text-black/60">
                Score: {score} pts
              </span>
            </div>

            <h4 className="font-grotesk font-extrabold text-base text-black leading-snug">
              {q.question}
            </h4>

            {/* Options */}
            <div className="flex flex-col gap-2.5 pt-2">
              {q.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === q.correctAnswer;
                let btnStyle = "bg-white text-black border-black hover:bg-neutral-50";

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = "bg-[#dcfce7] text-[#15803d] border-[#16a34a] font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-[#fee2e2] text-[#b91c1c] border-[#dc2626] font-bold";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between text-xs md:text-sm cursor-pointer ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {selectedAnswer !== null && (
                      <span className="material-symbols-outlined text-[18px]">
                        {isCorrect ? "check_circle" : isSelected ? "cancel" : ""}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="p-3 bg-neutral-100 rounded-xl border border-black/20 text-xs text-neutral-800 animate-in fade-in">
                <strong>Key Takeaway:</strong> {q.explanation}
              </div>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="p-6 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-black bg-[#bbf7d0] flex items-center justify-center text-black shadow-xs">
              <span className="material-symbols-outlined text-[36px]">military_tech</span>
            </div>
            <div>
              <h3 className="font-grotesk font-black text-2xl text-black">Sprint Complete!</h3>
              <p className="text-sm text-neutral-600 mt-1 font-medium">
                You scored <span className="font-black text-black">{score} / 10</span> correctly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-xs pt-2">
              <div className="p-3 border border-black rounded-xl bg-neutral-50 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase text-neutral-500">Accuracy</span>
                <span className="font-mono font-black text-lg">{score * 10}%</span>
              </div>
              <div className="p-3 border border-black rounded-xl bg-neutral-50 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase text-neutral-500">Time Left</span>
                <span className="font-mono font-black text-lg">{timeLeft}s</span>
              </div>
            </div>

            <div className="flex gap-3 w-full pt-3">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-full border border-black bg-white font-grotesk font-bold text-xs uppercase hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Retry Sprint
              </button>
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-full bg-black text-white font-grotesk font-bold text-xs uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

