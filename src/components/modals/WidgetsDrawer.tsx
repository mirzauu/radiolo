"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function WidgetsDrawer() {
  const { closeModal, examDaysLeft, setExamDaysLeft, showToast } = useApp();

  // Dose Calculator State
  const [distance, setDistance] = useState(1);
  const [initialDose, setInitialDose] = useState(10); // mGy/h

  // Calculated Dose
  const calculatedDose = (initialDose / Math.pow(distance, 2)).toFixed(2);

  // TNM Lung Stage Calculator
  const [tStage, setTStage] = useState("T1a");
  const [nStage, setNStage] = useState("N0");

  const getTnmStage = () => {
    if (nStage === "N3") return "Stage IIIB";
    if (nStage === "N2") return "Stage IIIA";
    if (nStage === "N1") return "Stage IIB";
    if (tStage === "T1a" || tStage === "T1b") return "Stage IA";
    return "Stage IB / IIA";
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex justify-end"
    >
      <div className="w-full max-w-lg bg-[#fafafc] h-full border-l-2 border-black shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#fef08a] text-black p-5 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">widgets</span>
            </div>
            <div>
              <h3 className="font-grotesk font-black text-lg leading-tight">
                Radiology Quick Tools &amp; Calculators
              </h3>
              <p className="text-xs text-black/70 font-medium">Diagnostic &amp; Physics References</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full border border-black bg-white text-black flex items-center justify-center font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tools Body */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
          {/* 1. Exam Target Countdown Adjustment */}
          <div className="bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="font-grotesk font-bold text-sm text-black flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">event</span>
                <span>DHA Exam Target Date</span>
              </h4>
              <span className="font-mono font-bold text-xs bg-black text-white px-2.5 py-0.5 rounded-full">
                {examDaysLeft} Days Remaining
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="120"
                value={examDaysLeft}
                onChange={(e) => setExamDaysLeft(parseInt(e.target.value, 10))}
                className="flex-1 accent-black cursor-pointer"
              />
              <button
                onClick={() => showToast("Exam countdown schedule updated!")}
                className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full"
              >
                Set
              </button>
            </div>
          </div>

          {/* 2. ALARA Inverse Square Law Dose Calculator */}
          <div className="bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col gap-3">
            <h4 className="font-grotesk font-bold text-sm text-black flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>ALARA Radiation Inverse-Square Calculator</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-neutral-600 block mb-1">Source Dose (mGy/h at 1m)</label>
                <input
                  type="number"
                  value={initialDose}
                  onChange={(e) => setInitialDose(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 border border-black rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="font-bold text-neutral-600 block mb-1">Staff Distance (m)</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value) || 1)}
                  className="w-full p-2 border border-black rounded-lg font-mono"
                />
              </div>
            </div>
            <div className="p-3 bg-neutral-100 rounded-xl border border-black flex justify-between items-center text-xs">
              <span className="font-bold text-neutral-700">Calculated Operator Exposure:</span>
              <span className="font-mono font-black text-sm text-blue-700">
                {calculatedDose} mGy/h
              </span>
            </div>
          </div>

          {/* 3. TNM Lung Staging Lookup */}
          <div className="bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col gap-3">
            <h4 className="font-grotesk font-bold text-sm text-black flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">coronavirus</span>
              <span>IASLC 8th Ed. TNM Lung Cancer Stager</span>
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-neutral-600 block mb-1">Tumor Size (T)</label>
                <select
                  value={tStage}
                  onChange={(e) => setTStage(e.target.value)}
                  className="w-full p-2 border border-black rounded-lg"
                >
                  <option value="T1a">T1a (&le; 1cm)</option>
                  <option value="T1b">T1b (&gt;1 to &le;2cm)</option>
                  <option value="T2a">T2a (&gt;3 to &le;4cm)</option>
                  <option value="T3">T3 (&gt;5 to &le;7cm)</option>
                  <option value="T4">T4 (&gt;7cm or invasive)</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-neutral-600 block mb-1">Nodes (N)</label>
                <select
                  value={nStage}
                  onChange={(e) => setNStage(e.target.value)}
                  className="w-full p-2 border border-black rounded-lg"
                >
                  <option value="N0">N0 (No regional nodes)</option>
                  <option value="N1">N1 (Ipsilateral hilar)</option>
                  <option value="N2">N2 (Ipsilateral mediastinal)</option>
                  <option value="N3">N3 (Contralateral/scalene)</option>
                </select>
              </div>
            </div>
            <div className="p-3 bg-[#dcfce7] rounded-xl border border-[#16a34a] flex justify-between items-center text-xs">
              <span className="font-bold text-[#15803d]">AJCC Calculated Overall Stage:</span>
              <span className="font-mono font-black text-sm text-[#15803d]">{getTnmStage()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

