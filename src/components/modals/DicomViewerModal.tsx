"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function DicomViewerModal() {
  const { closeModal } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [windowPreset, setWindowPreset] = useState<"lung" | "bone" | "mediastinum" | "brain">("lung");
  const [invert, setInvert] = useState(false);

  const getFilterStyle = () => {
    let filter = "";
    if (invert) filter += "invert(1) ";
    if (windowPreset === "lung") filter += "contrast(1.6) brightness(1.1)";
    else if (windowPreset === "bone") filter += "contrast(2.2) brightness(0.9)";
    else if (windowPreset === "mediastinum") filter += "contrast(1.3) brightness(0.95)";
    else if (windowPreset === "brain") filter += "contrast(1.8) brightness(1.0)";
    return filter;
  };

  return (
    <div className="fixed inset-0 z-[95] bg-black flex flex-col">
      {/* Lightbox Top Controls */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between text-white select-none">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-emerald-400">medical_services</span>
          <div>
            <h3 className="font-space font-bold text-sm leading-tight">
              DICOM High-Resolution Case Viewer
            </h3>
            <p className="text-[11px] font-mono text-neutral-400">
              Posteroanterior Chest Radiograph • 16-bit Depth
            </p>
          </div>
        </div>

        {/* Window Presets */}
        <div className="hidden sm:flex items-center gap-1.5 bg-neutral-800 p-1 rounded-full border border-neutral-700">
          {(["lung", "mediastinum", "bone", "brain"] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => setWindowPreset(preset)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold capitalize transition-all cursor-pointer ${
                windowPreset === preset ? "bg-white text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setInvert(!invert)}
            className={`p-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${
              invert ? "bg-white text-black border-white" : "border-neutral-700 text-white hover:bg-neutral-800"
            }`}
            title="Invert Grayscale"
          >
            Invert
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
            className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-white cursor-pointer"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
            className="p-2 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-white cursor-pointer"
            title="Zoom Out"
          >
            -
          </button>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold text-sm ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Viewer Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-neutral-950 relative">
        <div
          className="transition-transform duration-200 ease-out select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src="/chest-xray.jpg"
            alt="DICOM Key Slide"
            className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg shadow-2xl border border-neutral-800"
            style={{ filter: getFilterStyle() }}
          />
        </div>

        {/* OSD Overlay */}
        <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md border border-white/20 p-3 rounded-xl text-white font-mono text-xs flex flex-col gap-1 pointer-events-none">
          <span className="text-emerald-400 font-bold">DICOM OSD Tag 0028,1050</span>
          <span>Window Preset: {windowPreset.toUpperCase()}</span>
          <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
          <span>Patient: 34M Pleuritic Pain</span>
        </div>
      </div>
    </div>
  );
}

