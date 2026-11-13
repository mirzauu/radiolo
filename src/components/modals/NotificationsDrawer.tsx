"use client";

import { useApp } from "@/context/AppContext";

export default function NotificationsDrawer() {
  const { closeModal, showToast } = useApp();

  const notifications = [
    {
      id: "n-1",
      title: "New Recalls Added",
      time: "2 hours ago",
      desc: "25 verified clinical recalls from Dubai Health Authority Prometric center (October batch) are now available in Question Bank.",
      unread: true,
    },
    {
      id: "n-2",
      title: "Streak Reminder",
      time: "Yesterday",
      desc: "Don't break your 42-day study streak! Complete at least 5 questions today.",
      unread: false,
    },
    {
      id: "n-3",
      title: "Live Mock Simulator Opening",
      time: "2 days ago",
      desc: "Registration open for Grand DHA Simulator #08 (Full 100 Qs with DICOM Spotters).",
      unread: false,
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
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <div>
              <h3 className="font-grotesk font-black text-lg leading-tight">Exam Notifications</h3>
              <p className="text-xs text-neutral-300">DHA Updates &amp; Candidate Alerts</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full border border-white bg-black text-white flex items-center justify-center font-bold text-sm hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* List */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border border-black shadow-[2px_2px_0px_#000] flex flex-col gap-1 ${
                n.unread ? "bg-[#fff6d6]" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-grotesk font-bold text-sm text-black flex items-center gap-1.5">
                  {n.unread && <span className="w-2 h-2 rounded-full bg-red-600"></span>}
                  {n.title}
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">{n.time}</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">{n.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-black flex justify-between items-center">
          <button
            onClick={() => showToast("All notifications marked as read")}
            className="text-xs font-bold text-black uppercase hover:underline cursor-pointer"
          >
            Mark all read
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

