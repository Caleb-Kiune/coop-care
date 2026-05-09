"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormValues } from "@/lib/schema";
import { calculatePremium } from "@/lib/pricing";
import { useEffect, useState } from "react";
import QuoteDrawer from "./QuoteDrawer";
import dynamic from "next/dynamic";

const DownloadButton = dynamic(() => import("./DownloadButton"), { ssr: false });

export default function QuoteForm() {
  const [premiumTotal, setPremiumTotal] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      const total = calculatePremium(currentCoverage, currentOption, currentDependents);
      setPremiumTotal(total);
    } else {
      setPremiumTotal(0); 
    }
  }, [currentCoverage, currentOption, currentDependents]);

  const onSubmit = (data: QuoteFormValues) => {
    console.log("Form validated successfully!");
  };

  const isFormComplete = !!currentCoverage && !!currentOption;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border max-w-md mx-auto">
      
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

      {/* STICKY FOOTER PREVIEW */}
      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-gray-900 font-bold">Total Premium</span>
        <span className="text-2xl font-bold text-red-600">KES {premiumTotal.toLocaleString()}</span>
      </div>

      <div className="flex justify-center pb-2">
        <QuoteDrawer data={watch()} premiumTotal={premiumTotal} />
      </div>

      <DownloadButton data={watch()} premiumTotal={premiumTotal} isValid={isFormComplete} />
    </form>
  );
}