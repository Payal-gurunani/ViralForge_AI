"use client";
import { useState } from "react";

import axios from "axios";
import OutputPanel from "./OutputPanel";
const platforms = ["Instagram", "LinkedIn", "Twitter"];
const tones = ["Professional", "Casual", "Humorous", "Inspirational"];

export default function GeneratorPanel() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Professional");  
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/content/generate",
        {
          topic,
          platform: platform.toLowerCase(),
          tone: tone.toLowerCase(),
        }
      );
  
setOutput(res.data);
    } catch (err) {
      
      setOutput(null); // or { error: true }
    }

    setLoading(false);
  };

 return (
  <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

    {/* LEFT SIDE → INPUT UI */}
    <div className="p-6 rounded-2xl bg-[#111827] border border-gray-800 space-y-6 overflow-y-auto shadow-lg">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Generate Viral Content
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Create AI-powered social media content instantly
        </p>
      </div>

      {/* Topic Input */}
      <div>
        <label className="text-sm text-gray-400">Topic</label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic..."
          className="w-full mt-2 p-3 rounded-xl bg-[#0b0f19] border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
        />
      </div>

      {/* Platform Tabs */}
      <div>
        <label className="text-sm text-gray-400">Platform</label>
        <div className="flex gap-2 mt-2">
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex-1 py-2 cursor-pointer rounded-xl text-sm font-medium transition
                ${
                  platform === p
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                    : "bg-[#0b0f19] border border-gray-700 text-gray-400 hover:text-white"
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selector */}
      <div>
        <label className="text-sm text-gray-400">Tone</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {tones.map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 cursor-pointer py-2 rounded-xl text-sm transition
                ${
                  tone === t
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow"
                    : "bg-[#0b0f19] border border-gray-700 text-gray-400 hover:text-white"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="w-full py-3 rounded-xl cursor-pointer font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center shadow-md"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2  border-white border-t-transparent rounded-full animate-spin"></span>
            Generating...
          </span>
        ) : (
          "Generate 🚀"
        )}
      </button>

    </div>

    {/* RIGHT SIDE → OUTPUT PANEL */}
    <OutputPanel 
      data={output} 
      platform={platform} 
      tone={tone}
      topic={topic}
    />

  </div>
);
}