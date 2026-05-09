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
      coverageType: "COMPREHENSIVE",
      benefitOption: "OPTION_1",
      dependentCount: 0,
    },
  });

  const currentCoverage = watch("coverageType");
  const currentOption = watch("benefitOption");
  const currentDependents = watch("dependentCount");

  useEffect(() => {
    if (currentCoverage && currentOption && currentDependents !== undefined) {
      const total = calculatePremium(
        currentCoverage,
        currentOption,
        currentDependents,
      );
      setPremiumTotal(total);
    }
  }, [currentCoverage, currentOption, currentDependents]);

  const onSubmit = (data: QuoteFormValues) => {
    alert(`Ready for PDF! Premium: KES ${premiumTotal}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm border max-w-md mx-auto"
    >
      {/* CLIENT NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Name (Optional)
        </label>
        <input
          type="text"
          {...register("clientName")}
          className="block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-red-500 focus:border-red-500"
          placeholder="e.g. John Kamau"
        />
        {errors.clientName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.clientName.message}
          </p>
        )}
      </div>
      {/* COVERAGE TYPE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Coverage Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => setValue("coverageType", "COMPREHENSIVE")}
            className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${
              currentCoverage === "COMPREHENSIVE"
                ? "border-red-600 bg-red-50 text-red-700 font-bold"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            Comprehensive
          </div>
          <div
            onClick={() => setValue("coverageType", "INPATIENT_ONLY")}
            className={`p-4 border rounded-lg cursor-pointer text-center transition-all ${
              currentCoverage === "INPATIENT_ONLY"
                ? "border-red-600 bg-red-50 text-red-700 font-bold"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            Inpatient Only
          </div>
        </div>
      </div>
      {/* BENEFIT OPTION */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Benefit Tier
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["OPTION_1", "OPTION_2", "OPTION_3"].map((option) => (
            <div
              key={option}
              onClick={() =>
                setValue(
                  "benefitOption",
                  option as QuoteFormValues["benefitOption"],
                )
              }
              className={`p-3 border rounded-lg cursor-pointer text-center text-sm transition-all ${
                currentOption === option
                  ? "border-red-600 bg-red-50 text-red-700 font-bold"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {option.replace("_", " ")}
            </div>
          ))}
        </div>
      </div>
      {/* DEPENDENTS */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Dependents (M+)
        </label>
        <div className="flex items-center justify-between border border-gray-300 rounded-md p-2">
          {/* MINUS BUTTON */}
          <button
            type="button"
            onClick={() =>
              setValue("dependentCount", Math.max(0, currentDependents - 1))
            }
            className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-700 font-bold text-xl rounded hover:bg-gray-200 transition"
          >
            -
          </button>

          {/* CURRENT NUMBER DISPLAY */}
          <span className="text-2xl font-bold text-gray-900 w-12 text-center">
            {currentDependents}
          </span>

          {/* PLUS BUTTON */}
          <button
            type="button"
            onClick={() => setValue("dependentCount", currentDependents + 1)}
            className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-700 font-bold text-xl rounded hover:bg-gray-200 transition"
          >
            +
          </button>
        </div>
        {errors.dependentCount && (
          <p className="text-red-500 text-xs mt-1">
            {errors.dependentCount.message}
          </p>
        )}
      </div>

      {/* STICKY FOOTER PREVIEW */}
      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
        <span className="text-gray-600 font-medium">Total Premium</span>
        <span className="text-2xl font-bold text-red-600">
          KES {premiumTotal.toLocaleString()}
        </span>
      </div>

      {/* DRAWER TRIGGER */}
      <div className="flex justify-center pb-2">
        <QuoteDrawer data={watch()} premiumTotal={premiumTotal} />
      </div>

      {/* PDF DOWNLOAD BUTTON */}
      <DownloadButton
        data={watch()}
        premiumTotal={premiumTotal}
        isValid={Object.keys(errors).length === 0}
      />
    </form>
  );
}
