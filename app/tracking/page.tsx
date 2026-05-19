"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const statuses = ["pending", "baking", "in-delivery", "delivered"];

export default function TrackingPage() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  // Mock progression for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 5000); // Change status every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (currentStatusIndex / (statuses.length - 1)) * 100;

  return (
    <main className="min-h-screen bg-zinc-100 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Order Tracking</h1>
            <p className="mt-1 text-sm text-zinc-500">Order ID: <span className="font-semibold text-zinc-700">#FR-9824</span></p>
          </div>
          <Link
            href="/"
            className="rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            Back to Home
          </Link>
        </div>

        {/* Progress Bar Container */}
        <div className="mb-12 px-2 sm:px-6">
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 rounded-full bg-zinc-100" />
            
            {/* Active progress line */}
            <div
              className="absolute top-1/2 left-0 h-1.5 -translate-y-1/2 rounded-full bg-yellow-400 transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Status Steps */}
            <div className="relative flex justify-between">
              {statuses.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={status} className="relative flex flex-col items-center">
                    <div
                      className={`relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-4 transition-all duration-500 bg-white ${
                        isCompleted
                          ? "border-yellow-400 text-zinc-900 shadow-[0_0_15px_rgba(250,204,21,0.4)] scale-110"
                          : "border-zinc-100 text-zinc-300"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-bold sm:text-base">{index + 1}</span>
                      )}
                    </div>
                    <span
                      className={`absolute top-12 sm:top-14 text-[10px] font-bold uppercase tracking-wider sm:text-xs text-center transition-colors duration-300 w-24 left-1/2 -translate-x-1/2 ${
                        isCurrent ? "text-yellow-600" : isCompleted ? "text-zinc-800" : "text-zinc-400"
                      }`}
                    >
                      {status.replace('-', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Status Details */}
        <div className="mt-16 rounded-xl border border-yellow-100 bg-yellow-50/50 p-6 text-center shadow-inner">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
             {currentStatusIndex === 0 && (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             )}
             {currentStatusIndex === 1 && (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
             )}
             {currentStatusIndex === 2 && (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             )}
             {currentStatusIndex === 3 && (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
             )}
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2 capitalize">
            {statuses[currentStatusIndex].replace('-', ' ')}
          </h2>
          <p className="text-zinc-600 max-w-md mx-auto">
            {currentStatusIndex === 0 && "We've received your order and are currently reviewing it. Hang tight!"}
            {currentStatusIndex === 1 && "Your food is being prepared with fresh ingredients and is baking in the oven."}
            {currentStatusIndex === 2 && "Our delivery partner has picked up your order and is on their way to your location."}
            {currentStatusIndex === 3 && "Your order has been delivered successfully. Enjoy your delicious meal!"}
          </p>
        </div>
      </div>
    </main>
  );
}
