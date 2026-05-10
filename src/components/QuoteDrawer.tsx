"use client";

import { Drawer } from "vaul";
import { QuoteFormValues } from "@/lib/schema";
import { BENEFIT_LIMITS } from "@/lib/constants";
import { PremiumBreakdown } from "@/lib/pricing";

interface QuoteDrawerProps {
  data: QuoteFormValues;
  premiumBreakdown: PremiumBreakdown | null;
}

export default function QuoteDrawer({ data, premiumBreakdown }: QuoteDrawerProps) {
  // Safe check: Ensure both fields are actually selected
  const isSelectionComplete = data.coverageType && data.benefitOption;
  
  // Safely extract the limits
  const limits = isSelectionComplete 
    ? BENEFIT_LIMITS[data.coverageType as keyof typeof BENEFIT_LIMITS][data.benefitOption as "OPTION_1" | "OPTION_2" | "OPTION_3"]
    : null;

  return (
    <Drawer.Root>
      
      {/* TRIGGER */}
      <Drawer.Trigger asChild>
        <button type="button" className="text-sm font-semibold text-red-600 underline hover:text-red-800 transition py-2">
          Preview Quote Breakdown
        </button>
      </Drawer.Trigger>

      {/* PORTAL */}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        
        <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] mt-24 h-[85vh] fixed bottom-0 left-0 right-0 z-50">
          <div className="p-6 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
            
            {/* SWIPE DOWN GREY PILL */}
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
            
            <div className="max-w-md mx-auto w-full">
              <Drawer.Title className="font-bold text-2xl text-gray-900 mb-2">
                Quote Preview
              </Drawer.Title>

              {!isSelectionComplete ? (
                // EMPTY STATE
                <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg mb-8">
                  <p className="text-gray-500 text-sm">Please select a Coverage Type and Benefit Tier to view the complete breakdown.</p>
                </div>
              ) : (
                // POPULATED STATE
                <>
                  <p className="text-gray-500 mb-6 text-sm">
                    {data.coverageType?.replace('_', ' ')} — {data.benefitOption?.replace('_', ' ')}
                  </p>
                  
                  {/* THE LIMITS TABLE */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden mb-8 shadow-sm">
                    {/* Table Header */}
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between font-semibold text-gray-700 text-sm uppercase">
                      <span>Benefit</span>
                      <span>Limit (KES)</span>
                    </div>
                    
                    {/* Table Body */}
                    <div className="divide-y divide-gray-100 bg-white text-sm">
                      <div className="flex justify-between px-4 py-3">
                        <span className="text-gray-600">Inpatient</span>
                        <span className="font-bold text-gray-900">{limits?.inpatient}</span>
                      </div>
                      <div className="flex justify-between px-4 py-3 bg-gray-50/50">
                        <span className="text-gray-600">Outpatient</span>
                        <span className="font-bold text-gray-900">{limits?.outpatient}</span>
                      </div>
                      <div className="flex justify-between px-4 py-3">
                        <span className="text-gray-600">Maternity</span>
                        <span className="font-bold text-gray-900">{limits?.maternity}</span>
                      </div>
                      <div className="flex justify-between px-4 py-3 bg-gray-50/50">
                        <span className="text-gray-600">Dental</span>
                        <span className="font-bold text-gray-900">{limits?.dental}</span>
                      </div>
                      <div className="flex justify-between px-4 py-3">
                        <span className="text-gray-600">Optical</span>
                        <span className="font-bold text-gray-900">{limits?.optical}</span>
                      </div>
                      <div className="flex justify-between px-4 py-3 bg-gray-50/50">
                        <span className="text-gray-600">Last Expense</span>
                        <span className="font-bold text-gray-900">{limits?.lastExpense}</span>
                      </div>
                      <div className="flex justify-between px-4 py-3">
                        <span className="text-gray-600">Accommodation</span>
                        <span className="font-bold text-gray-900">{limits?.accommodation}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* PREMIUM BREAKDOWN */}
              {premiumBreakdown && (
                <div className="mb-6 space-y-2 px-2">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase">Premium Breakdown</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Base Premium</span>
                    <span className="font-medium text-gray-900">KES {premiumBreakdown.basePremium.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Training Levy (0.2%)</span>
                    <span className="font-medium text-gray-900">KES {premiumBreakdown.trainingLevy.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>PHCF (0.25%)</span>
                    <span className="font-medium text-gray-900">KES {premiumBreakdown.phcf.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Stamp Duty</span>
                    <span className="font-medium text-gray-900">KES {premiumBreakdown.stampDuty.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* REITERATE THE TOTAL IN THE DRAWER */}
              <div className="p-5 bg-red-50 rounded-xl flex justify-between items-center border border-red-100">
                <div>
                  <span className="block text-sm font-semibold text-red-900">Total Premium</span>
                  <span className="block text-xs text-red-700 mt-1">
                    Principal + {data.dependentCount || 0} Dependents
                  </span>
                </div>
                <span className="font-bold text-xl text-red-600">KES {premiumBreakdown?.totalPremium.toLocaleString() ?? "0"}</span>
              </div>
              
              {/* CLOSE BUTTON */}
              <Drawer.Close asChild>
                <button className="w-full mt-6 bg-gray-100 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-200 transition">
                  Close Preview
                </button>
              </Drawer.Close>

            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}