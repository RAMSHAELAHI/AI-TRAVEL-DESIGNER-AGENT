"use client";
import { useState } from "react";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [dates, setDates] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPlan("");

    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, budget, dates }),
      });

      const data = await res.json();
      if (data.success) {
        setPlan(data.plan);
      } else {
        setPlan("⚠️ Failed to generate plan.");
      }
    } catch (err) {
      setPlan("❌ Error calling API.");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-6">AI Travel Designer Agent</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-xl">
        Plan smarter trips with AI ✈️🌍. Enter your preferences and let AI
        design the perfect travel plan for you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md bg-white shadow-lg p-6 rounded-xl"
      >
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          placeholder="Budget (e.g. $1000)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          placeholder="Travel Dates"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate My Travel Plan"}
        </button>
      </form>

      {plan && (
        <div className="mt-8 max-w-2xl p-6 bg-gray-100 rounded-lg whitespace-pre-line">
          {plan}
        </div>
      )}
    </main>
  );
}
