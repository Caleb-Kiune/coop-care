"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormValues, type RosterMember } from "@/lib/schema";
import { calculateBasePremium, calculateGroupPremium } from "@/lib/pricing";
import { useEffect, useState } from "react";
import QuoteDrawer from "./QuoteDrawer";
import GroupQuoteDrawer from "./GroupQuoteDrawer";

export default function QuoteForm() {
  const [roster, setRoster] = useState<RosterMember[]>([]);
  const [draftBasePremium, setDraftBasePremium] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      clientName: "",
      coverageType: undefined, 
      benefitOption: undefined,
      dependentCount: 0,
    },
  });

  const currentCoverage = watch("coverageType");
  const currentOption = watch("benefitOption");
  const currentDependents = watch("dependentCount");

  useEffect(() => {
    if (currentCoverage && currentOption && currentDependents !== undefined) {
      const base = calculateBasePremium(currentCoverage, currentOption, currentDependents);
      setDraftBasePremium(base);
    } else {
      setDraftBasePremium(0); 
    }
  }, [currentCoverage, currentOption, currentDependents]);

  const onSubmit = (data: QuoteFormValues) => {
    const basePremium = calculateBasePremium(data.coverageType!, data.benefitOption!, data.dependentCount);
    setRoster(prev => [...prev, { ...data, id: crypto.randomUUID(), basePremium }]);
    reset({
      clientName: "",
      coverageType: undefined,
      benefitOption: undefined,
      dependentCount: 0,
    });
  };

  const isFormComplete = !!currentCoverage && !!currentOption;
  const groupBreakdown = calculateGroupPremium(roster);

  return (
    <div className="max-w-md mx-auto relative pb-32">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
        
        {/* CLIENT NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Client Name (Optional)</label>
          <input
            type="text"
            {...register("clientName")}
            className="block w-full text-gray-900 rounded-md border-gray-300 shadow-sm p-3 border focus:ring-2 focus:ring-red-600 focus:border-red-600 placeholder:text-gray-400"
            placeholder="e.g. John Kamau"
          />
          {errors.clientName && <p className="text-red-600 text-xs mt-1 font-medium">{errors.clientName.message}</p>}
        </div>

        {/* COVERAGE TYPE */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Coverage Type</label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setValue("coverageType", "COMPREHENSIVE", { shouldValidate: true })}
              className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${
                currentCoverage === "COMPREHENSIVE" ? "border-red-600 bg-red-50 text-red-700 font-bold" : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              Comprehensive
            </div>
            <div
              onClick={() => setValue("coverageType", "INPATIENT_ONLY", { shouldValidate: true })}
              className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${
                currentCoverage === "INPATIENT_ONLY" ? "border-red-600 bg-red-50 text-red-700 font-bold" : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              Inpatient Only
            </div>
          </div>
        </div>

        {/* BENEFIT OPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Benefit Tier</label>
          <div className="grid grid-cols-3 gap-2">
            {["OPTION_1", "OPTION_2", "OPTION_3"].map((option) => (
              <div
                key={option}
                onClick={() => setValue("benefitOption", option as QuoteFormValues["benefitOption"], { shouldValidate: true })}
                className={`p-3 border rounded-lg cursor-pointer text-center text-sm transition-all ${
                  currentOption === option ? "border-red-600 bg-red-50 text-red-700 font-bold" : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {option.replace("_", " ")}
              </div>
            ))}
          </div>
        </div>

        {/* DEPENDENTS */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Number of Dependents (M+)</label>
          <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
            <button type="button" onClick={() => setValue("dependentCount", Math.max(0, currentDependents - 1))} className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-700 font-bold text-xl rounded hover:bg-gray-200 transition">-</button>
            <span className="text-2xl font-bold text-gray-900 w-12 text-center">{currentDependents}</span>
            <button type="button" onClick={() => setValue("dependentCount", currentDependents + 1)} className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-700 font-bold text-xl rounded hover:bg-gray-200 transition">+</button>
          </div>
        </div>

        {/* ELIGIBILITY FOOTNOTE */}
        <div className="text-center text-xs text-gray-500 italic px-4">
          * Assumes principal is under 70 & dependents meet age limits.
        </div>

        {/* UNIFIED PREMIUM CARD (DRAFT) */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-900 font-bold text-sm">Current Draft Premium</span>
            <span className="text-xl font-bold text-red-600">
              KES {draftBasePremium.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-center border-t border-gray-200 pt-3">
            <QuoteDrawer data={watch()} />
          </div>
        </div>

        {/* PRIMARY ACTION */}
        <button
          type="submit"
          disabled={!isFormComplete}
          className={`w-full font-bold py-4 rounded-md transition shadow-md ${
            isFormComplete ? "bg-red-600 hover:bg-red-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Add to Group
        </button>
      </form>

      {/* STICKY AGGREGATOR FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-900 font-bold">Total Group Premium</span>
            <span className="text-2xl font-bold text-red-600">
              KES {groupBreakdown.totalPremium.toLocaleString()}
            </span>
          </div>
          <GroupQuoteDrawer
            roster={roster}
            premiumBreakdown={groupBreakdown}
            onRemoveMember={(id) => setRoster(prev => prev.filter(m => m.id !== id))}
          />
        </div>
      </div>
    </div>
  );
}