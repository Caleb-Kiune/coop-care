"use client";

import { Drawer } from "vaul";
import { RosterMember } from "@/lib/schema";
import { PremiumBreakdown } from "@/lib/pricing";
import dynamic from "next/dynamic";

const DownloadButton = dynamic(() => import("./DownloadButton"), { ssr: false });

interface GroupQuoteDrawerProps {
  roster: RosterMember[];
  premiumBreakdown: PremiumBreakdown;
  onRemoveMember: (id: string) => void;
}

export default function GroupQuoteDrawer({ roster, premiumBreakdown, onRemoveMember }: GroupQuoteDrawerProps) {

  return (
    <Drawer.Root>
      
      {/* TRIGGER */}
      <Drawer.Trigger asChild>
        <button type="button" className="w-full bg-gray-900 text-white font-bold py-4 rounded-md shadow-md hover:bg-gray-800 transition">
          Preview Group Quote
        </button>
      </Drawer.Trigger>

      {/* PORTAL */}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        
        <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] mt-10 h-[90vh] fixed bottom-0 left-0 right-0 z-50">
          <div className="p-6 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
            
            {/* SWIPE DOWN GREY PILL */}
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
            
            <div className="max-w-md mx-auto w-full">
              <Drawer.Title className="font-bold text-2xl text-gray-900 mb-2">
                Group Quote Preview
              </Drawer.Title>

              {/* INFO BANNER */}
              <div className="bg-blue-50 text-blue-800 p-3 rounded-md text-sm mb-6 border border-blue-100">
                ℹ️ Coop Care group policies require a minimum of 4 members to activate.
              </div>

              {roster.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg mb-8">
                  <p className="text-gray-500 text-sm">No members added yet. Add members to see the breakdown.</p>
                </div>
              ) : (
                <>
                  {/* ROSTER LIST */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase">Roster ({roster.length})</h3>
                    <div className="space-y-3">
                      {roster.map((member, index) => (
                        <div key={member.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg shadow-sm">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{member.clientName || `Member ${index + 1}`}</p>
                            <p className="text-xs text-gray-500">
                              {member.coverageType?.replace('_', ' ')} — {member.benefitOption?.replace('_', ' ')}
                            </p>
                            <p className="text-xs text-gray-500">
                              + {member.dependentCount} Dependents
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="font-bold text-red-700 text-sm">KES {member.basePremium?.toLocaleString() ?? "0"}</span>
                            <button
                              onClick={() => onRemoveMember(member.id)}
                              className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded bg-red-50"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PREMIUM BREAKDOWN */}
                  <div className="mb-6 space-y-2 px-2">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase">Aggregate Breakdown</h3>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Total Base Premium</span>
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

                  {/* REITERATE THE TOTAL IN THE DRAWER */}
                  <div className="p-5 bg-red-50 rounded-xl flex justify-between items-center border border-red-100 mb-8">
                    <div>
                      <span className="block text-sm font-semibold text-red-900">Total Group Premium</span>
                    </div>
                    <span className="font-bold text-xl text-red-600">KES {premiumBreakdown.totalPremium.toLocaleString()}</span>
                  </div>
                </>
              )}
              
              <DownloadButton roster={roster} premiumBreakdown={premiumBreakdown} />

              {/* CLOSE BUTTON */}
              <Drawer.Close asChild>
                <button className="w-full mt-4 bg-gray-100 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-200 transition">
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
