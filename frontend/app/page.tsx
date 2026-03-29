"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-white">

      {/* 🔥 Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`fixed lg:static z-50 top-0 left-0 h-full w-64 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* 🔥 Main Content */}
      <div className="flex-1 w-full flex flex-col">

        {/* 🔥 Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 rounded-lg bg-[#111827] border border-gray-700"
          >
            ☰
          </button>
          <h1 className="text-sm font-semibold">ViralForge AI</h1>
          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">
              Welcome to ViralForge AI 🚀
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            <div className="p-5 sm:p-6 rounded-xl bg-[#111827] border border-gray-800 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition">
              <p className="text-gray-400 text-sm">Generated Posts</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">120+</h2>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#111827] border border-gray-800 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition">
              <p className="text-gray-400 text-sm">Active Sessions</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">8</h2>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#111827] border border-gray-800 hover:shadow-[0_0_25px_rgba(236,72,153,0.2)] transition">
              <p className="text-gray-400 text-sm">Optimizations</p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">24</h2>
            </div>

          </div>

          {/* Quick Generate */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#111827] border border-gray-800 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition">

            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Quick Generate
            </h2>

            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Instantly create viral social media content using AI
            </p>

            <Link href="/generate">
              <button className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-lg font-semibold 
                bg-gradient-to-r from-blue-500 to-purple-500 
                hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] 
                transition-all duration-300">
                Go to Generator →
              </button>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}