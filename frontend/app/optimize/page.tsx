"use client";

import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function OptimizePage() {
  const [open, setOpen] = useState(false); // 🔥 sidebar control
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [trainingCount, setTrainingCount] = useState(0);
  const [compiled, setCompiled] = useState(false);

  const fetchStatus = async () => {
    try {
      setStatusLoading(true);
      const res = await axios.get(
        "http://127.0.0.1:8000/api/optimize/status"
      );

      setTrainingCount(res.data.training_examples);
      setCompiled(res.data.compiled_program_exists);
    } catch (err) {
      console.error(err);
    }
    setStatusLoading(false);
  };

  const runOptimizer = async () => {
    try {
      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/optimize/run");

      toast.success("Optimizer completed 🚀");

      fetchStatus();
    } catch (err) {
      console.error(err);
      toast.error("Optimizer failed ❌");
      }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

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
        <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">

          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              AI Optimization Dashboard
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Train and improve your AI model using DSPy
            </p>
          </div>

          {/* STATUS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="p-4 sm:p-5 rounded-2xl bg-[#111827] border border-gray-800 shadow">
              <p className="text-gray-400 text-sm">Training Examples</p>
              <h2 className="text-xl sm:text-2xl font-bold mt-2">
                {statusLoading ? "..." : trainingCount}
              </h2>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#111827] border border-gray-800 shadow">
              <p className="text-gray-400 text-sm">Model Status</p>
              <h2 className="text-xl sm:text-2xl font-bold mt-2">
                {statusLoading
                  ? "..."
                  : compiled
                  ? "Optimized ✅"
                  : "Not Ready ❌"}
              </h2>
            </div>

          </div>

          {/* MAIN CARD */}
          <div className="p-5 sm:p-6 bg-[#111827] rounded-2xl border border-gray-800 shadow-lg space-y-4">

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Run optimization to retrain your AI model using collected examples.
              More high-quality data = better results 🚀
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">

              <div className="p-3 rounded-xl bg-[#0b0f19] border border-gray-700 text-center sm:text-left">
                ⚡ Fast Training
              </div>

              <div className="p-3 rounded-xl bg-[#0b0f19] border border-gray-700 text-center sm:text-left">
                🧠 Learns from data
              </div>

              <div className="p-3 rounded-xl bg-[#0b0f19] border border-gray-700 text-center sm:text-left">
                📈 Improves quality
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={runOptimizer}
                className="flex-1 px-6 py-3 rounded-xl font-medium 
                bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 
                hover:scale-[1.03] active:scale-[0.97] transition 
                flex items-center justify-center shadow-md"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Optimizing...
                  </span>
                ) : (
                  "Run Optimizer ⚡"
                )}
              </button>

              <button
                onClick={fetchStatus}
                className="flex-1 px-6 py-3 rounded-xl font-medium 
                bg-[#0b0f19] border cursor-pointer border-gray-700 hover:border-purple-500 transition"
              >
                Refresh Status 🔄
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}