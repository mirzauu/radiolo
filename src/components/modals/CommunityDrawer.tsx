"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function CommunityDrawer() {
  const { closeModal, communityPosts, addCommunityPost, likeCommunityPost } = useApp();
  const [postText, setPostText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;
    addCommunityPost(postText.trim());
    setPostText("");
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex justify-end"
    >
      <div className="w-full max-w-lg bg-[#fafafc] h-full border-l-2 border-black shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="bg-[#4355f9] text-white p-5 flex items-center justify-between border-b-2 border-black">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white text-[#4355f9] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">forum</span>
            </div>
            <div>
              <h3 className="font-grotesk font-black text-lg leading-tight">
                Radiology Residents Hub
              </h3>
              <p className="text-xs text-white/80 font-medium">10,480+ DHA Doctors Online</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full border border-black bg-white text-black flex items-center justify-center font-bold text-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Channels / Quick Topics Bar */}
        <div className="bg-white px-4 py-2 border-b border-black/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="px-2.5 py-1 rounded-full bg-black text-white text-[10px] font-space font-bold uppercase whitespace-nowrap">
            # general-recalls
          </span>
          <span className="px-2.5 py-1 rounded-full border border-black/30 text-[10px] font-space font-bold uppercase whitespace-nowrap text-neutral-600">
            # spotters-discussion
          </span>
          <span className="px-2.5 py-1 rounded-full border border-black/30 text-[10px] font-space font-bold uppercase whitespace-nowrap text-neutral-600">
            # prometric-experience
          </span>
        </div>

        {/* Feed of Posts */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {communityPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-black rounded-2xl p-4 shadow-[2px_2px_0px_#000] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full text-white font-space font-bold text-xs flex items-center justify-center ${post.avatarBg}`}
                  >
                    {post.initials}
                  </div>
                  <div>
                    <h4 className="font-grotesk font-bold text-xs text-black">{post.author}</h4>
                    <span className="text-[10px] text-neutral-500 font-medium">{post.badge}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">{post.time}</span>
              </div>

              <p className="text-xs leading-relaxed text-neutral-800">{post.text}</p>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between">
                <button
                  onClick={() => likeCommunityPost(post.id)}
                  className="flex items-center gap-1 text-[11px] font-bold text-neutral-600 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">favorite</span>
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium">
                  <span className="material-symbols-outlined text-[15px]">chat_bubble_outline</span>
                  <span>{post.replies} replies</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-black">
          <div className="relative">
            <input
              type="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Share a recall tip or ask a spotter question..."
              className="w-full pl-4 pr-24 py-3 rounded-full border border-black text-xs font-medium focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-1.5 rounded-full font-space font-bold text-xs uppercase hover:bg-neutral-800 cursor-pointer"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

