"use client";

import { useApp } from "@/context/AppContext";

export default function NotesDrawer() {
  const { closeModal, showToast } = useApp();

  const handleCopyNote = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("📋 Clinical pearl copied to clipboard!");
  };

  const pearls = [
    {
      title: "Pediatric Bone Age Milestones (Greulich & Pyle)",
      body: "Capitate & Hamate appear at 3 months. Triquetral at 3 yrs. Lunate at 4 yrs. Scaphoid & Trapezium at 5 yrs. Trapezoid at 6 yrs. Pisiform at 10-12 yrs (mnemonic: 'C-H-T-L-S-T-T-P').",
    },
    {
      title: "Solitary Pulmonary Nodule (SPN) Fleischner 2017",
      body: "Solid nodules < 6mm in low-risk: No routine follow-up. 6-8mm: CT at 6-12 mos. >8mm: Consider CT at 3 mos, PET-CT, or tissue sampling.",
    },
    {
      title: "Bowel Ischemia CT Triple Sign",
      body: "1. Bowel wall hypoenhancement or target sign. 2. Mesenteric stranding and venous gas (portal venous gas). 3. Pneumatosis intestinalis.",
    },
    {
      title: "Acute Stroke DWI vs ADC Mismatch",
      body: "Cytotoxic edema = Bright on DWI (restricted diffusion) + Dark on ADC. T2-shine-through = Bright on DWI + Bright or Iso on ADC (NOT acute infarction!).",
    },
  ];

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
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shrink-0">
              <img src="/doctor-portrait.jpg" alt="Dr. Tariq" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-grotesk font-black text-lg leading-tight">
                Dr. Tariq&apos;s High-Yield DHA Notes
              </h3>
              <p className="text-xs text-neutral-300 font-medium">98.4% Accuracy Clinical Pearls</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full border border-white bg-black text-white flex items-center justify-center font-bold text-sm hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
          <div className="p-3 bg-[#fef08a] border border-black rounded-2xl flex items-center gap-2 text-xs font-semibold text-black">
            <span className="material-symbols-outlined text-[18px]">bookmark</span>
            <span>These 4 topics appeared in 68% of Prometric DHA diagnostic exams since 2023.</span>
          </div>

          {pearls.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-grotesk font-extrabold text-sm text-black">{p.title}</h4>
                <button
                  onClick={() => handleCopyNote(p.body)}
                  className="text-neutral-500 hover:text-black p-1 rounded-md"
                  title="Copy Note"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-black flex justify-between items-center">
          <span className="text-xs font-mono text-neutral-500">Verified by DHA Specialist Panel</span>
          <button
            onClick={() => showToast("Exported all high-yield notes to PDF summary!")}
            className="px-4 py-2 bg-black text-white font-grotesk font-bold text-xs uppercase rounded-full hover:bg-neutral-800 cursor-pointer"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}

