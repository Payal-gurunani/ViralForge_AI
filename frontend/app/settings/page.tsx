"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function SettingsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0B0F17] via-[#0F172A] to-[#020617] text-white">

      {/* 🔥 Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col">

        {/* 🔥 Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 
          bg-[#0F172A]/70 backdrop-blur-lg border-b border-white/10">

          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
          >
            ☰
          </button>

          <h1 className="text-sm font-semibold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            ViralForge
          </h1>

          <div className="w-8" />
        </div>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 md:px-10 py-6 md:py-8 max-w-6xl mx-auto w-full">

          {/* Heading */}
          <div className="space-y-2">
           <h1 className="text-3xl font-semibold tracking-tight">
         Settings Pannel
        </h1>

            <p className="text-gray-400 text-sm sm:text-base">
              Manage your preferences here ⚙️
            </p>
          </div>

          {/* Glass Card */}
          <div className="mt-6 p-5 sm:p-6 md:p-8 
            bg-white/5 backdrop-blur-xl 
            border border-white/10 rounded-2xl 
            shadow-lg space-y-6">

            {/* Example Setting Item */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>
                <h2 className="text-base sm:text-lg font-medium">
                  Notifications
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Enable or disable system notifications
                </p>
              </div>

              <button className="px-4 py-2 rounded-lg 
                bg-gradient-to-r from-purple-500 to-pink-500 
                text-sm font-medium hover:scale-[1.03] transition">
                Toggle
              </button>

            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Another Setting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>
                <h2 className="text-base sm:text-lg font-medium">
                  Theme Mode
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Switch between dark and light mode
                </p>
              </div>

              <button className="px-4 py-2 rounded-lg 
                bg-white/5 border border-white/10 
                hover:border-purple-500/50 transition text-sm">
                Dark Mode 🌙
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}