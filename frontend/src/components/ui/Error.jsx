"use client"

import { twMerge } from "tailwind-merge"

export const Error = ({handleRefetchCount, text, subtext, buttonLabel, buttonClassName = "", className = ""}) => {

    return (
        <div className={`flex flex-col items-center justify-center text-center ${twMerge("p-10", className)}`}>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#74C857]">
            EcoProfit
          </p>
          <h1 className="text-xl font-semibold text-[#1F2937] text-nowrap">
            { text ?? "Something went wrong"}
          </h1>
          <p className="text-sm text-[#6B7280]">
            { subtext ?? "Please try again"}
          </p>
          <button className={`rounded-lg bg-[#74C857] hover:bg-primary px-12 py-2 text-white transition-all mt-4 ${buttonClassName}`} onClick={() => handleRefetchCount()}>{buttonLabel ?? "Reload"}</button>
        </div>
    )
}