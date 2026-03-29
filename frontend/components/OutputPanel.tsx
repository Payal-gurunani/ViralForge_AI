"use client";
import axios from "axios";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OutputPanel({ data,platform,tone,topic }: any) {
  const [activeTab, setActiveTab] = useState("caption");
  const [displayText, setDisplayText] = useState("");
  const [optimizedText, setOptimizedText] = useState("");
const [isOptimizing, setIsOptimizing] = useState(false);
  const tabs = [
    { key: "caption", label: "Caption" },
    { key: "hashtags", label: "Hashtags" },
    { key: "hooks", label: "Hooks" },
  ];

const handleSaveExample = async () => {
  if (!data) return;

  try {
    await axios.post("http://127.0.0.1:8000/api/optimize/add-example", {
      topic,
      platform: platform.toLowerCase(),
      tone: tone.toLowerCase(),
      content: data.caption,
      clarity_score: data.clarity_score,
      engagement_score: data.engagement_score,
      platform_fit_score: data.platform_fit_score,
    });

   setTimeout(() => {
    toast.success("Example saved for training! ✅");
}, 300);
  } catch (err) {
    console.error(err);
    toast.error("Failed to save example. ❌");
  }
};

const handleReject = () => {
  toast("Example rejected. It won't be used for training.", {
    icon: "👎",
  });
};
  const handleOptimize = async () => {
  if (!data?.caption) return;

  setIsOptimizing(true);

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/optimize/",
      {
        content: data.caption,
        platform: platform.toLowerCase(),
        tone: tone.toLowerCase(),
      }
    );


    setOptimizedText(res.data.optimized_content);

  } catch (err) {
    console.error(err);
  }

  setIsOptimizing(false);
};

 useEffect(() => {
  if (!data) return;

  const fullText =
    activeTab === "caption"
      ? data.caption
      : activeTab === "hashtags"
      ? data.hashtags
      : data.hooks;

  if (!fullText) return;

  let i = 0;
  setDisplayText("");

  const interval = setInterval(() => {
    setDisplayText((prev) => prev + fullText.charAt(i));
    i++;

    if (i >= fullText.length) clearInterval(interval);
  }, 10);

  return () => clearInterval(interval);
}, [data, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayText || "");
  };

  if (!data) {
    return (
<div className="p-4 sm:p-6 rounded-xl bg-[#111827] border border-gray-800 flex flex-col max-h-[80vh] overflow-hidden">        Your generated content will appear here...
      </div>
    );
  }

  return (
  <div className="p-6 rounded-2xl bg-[#111827] border border-gray-800 h-full flex flex-col shadow-lg">

    {/* Tabs */}
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 cursor-pointer rounded-xl text-sm transition font-medium
            ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                : "bg-[#0b0f19] border border-gray-700 text-gray-400 hover:text-white"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>

    {/* Content Box */}
    <div className="flex-1 overflow-y-auto space-y-4 pr-1">

      {/* ORIGINAL */}
      <div className="p-4 rounded-xl bg-[#0b0f19] border border-gray-700">
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">
          Original
        </p>
        <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words leading-relaxed">
          {displayText || "No content available"}
        </pre>
      </div>

      <div className="flex gap-3 mt-4">

  {/* 👍 Save */}
  <button
    onClick={handleSaveExample}
    className="flex-1 py-2 rounded-xl cursor-pointer bg-green-600 hover:scale-105 transition"
  >
    👍 Use for Training
  </button>

  {/* 👎 Reject */}
  <button
    onClick={handleReject}
    className="flex-1 py-2 cursor-pointer rounded-xl bg-red-600 hover:scale-105 transition"
  >
    👎 Skip
  </button>

</div>
<p className="text-xs text-gray-500 mt-2 text-center">
  💡 Save good outputs to improve AI performance
</p>
      {/* OPTIMIZED */}
      {optimizedText && (
        <div className="p-4 rounded-xl bg-[#0b0f19] border border-green-500/30">
          <p className="text-xs text-green-400 mb-2 uppercase tracking-wide">
            Optimized ✨
          </p>
          <pre className="text-sm text-white whitespace-pre-wrap break-words leading-relaxed">
            {optimizedText}
          </pre>
        </div>
      )}
    </div>

    {/* Buttons */}
    <div className="mt-4 grid grid-cols-2 gap-3">

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="flex cursor-pointer items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
      >
        <Copy size={16} />
        Copy
      </button>

      {/* Optimize */}
      <button
        onClick={handleOptimize}
        className="flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 hover:scale-105 transition"
      >
        {isOptimizing ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 cursor-pointer border-white border-t-transparent rounded-full animate-spin"></span>
            Optimizing...
          </span>
        ) : (
          "✨ Optimize"
        )}
      </button>

    </div>
  </div>
);
}