"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Zap,
  Settings
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Generate", path: "/generate", icon: Sparkles },
  { name: "Optimize", path: "/optimize", icon: Zap },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-[#0b0f19] border-r border-gray-800 flex flex-col">

      {/* 🔝 Top */}
      <div>
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ViralForge AI
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            AI Creator Studio
          </p>
        </div>

        {/* Menu */}
        <nav className="space-y-2 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link key={item.name} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 shadow-md"
                      : "hover:bg-[#111827]"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 🔥 Bottom (Fixed Properly) */}
      <div className="mt-auto p-4">
        <div className="p-4 rounded-xl bg-[#111827] border border-gray-800 text-gray-400 text-sm hover:border-purple-500/40 transition">
          
          <p className="font-medium text-white">🚀 Pro Tip</p>

          <p className="mt-1 text-xs leading-relaxed">
            Use <span className="text-purple-400">Optimize</span> to improve AI results and boost output quality.
          </p>

        </div>
      </div>

    </div>
  );
}