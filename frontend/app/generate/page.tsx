"use client";
import Sidebar from "@/components/Sidebar";
import GeneratorPanel from "@/components/GeneratorPanel";
import { useState } from "react";

export default function GeneratePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-white">

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 lg:static top-0 left-0 h-full cursortransition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 rounded-lg bg-[#111827] border border-gray-700"
          >
            ☰
          </button>
          <h1 className="text-sm font-semibold">ViralForge AI</h1>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          <GeneratorPanel />
        </div>

      </div>
    </div>
  );
}