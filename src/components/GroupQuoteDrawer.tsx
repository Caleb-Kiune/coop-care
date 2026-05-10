"use client";

import { Drawer } from "vaul";
import { RosterMember } from "@/lib/schema";
import { PremiumBreakdown } from "@/lib/pricing";
import { formatMemberPlan, formatDependents } from "@/lib/formatters";
import { Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import TermsDrawer from "./TermsDrawer";

const DownloadButton = dynamic(() => import("./DownloadButton"), { ssr: false });

interface GroupQuoteDrawerProps {
  roster: RosterMember[];
  premiumBreakdown: PremiumBreakdown;
  onRemoveMember: (id: string) => void;
}

export default function GroupQuoteDrawer({ roster, premiumBreakdown, onRemoveMember }: GroupQuoteDrawerProps) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button type="button" className="w-full bg-gray-900 text-white font-bold py-4 rounded-md shadow-md hover:bg-gray-800 transition">
          Preview Group Quote
        </button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] mt-10 h-[90vh] fixed bottom-0 left-0 right-0 z-50">
          <div className="p-6 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
            <div className="max-w-md mx-auto w-full">
              <Drawer.Title className="font-bold text-2xl text-cic-text mb-2">
                Group Quote Preview
              </Drawer.Title>

              {roster.length > 0 && roster.length < 4 && (
                <div className="bg-amber-50 text-amber-800 p-3 rounded-md text-sm mb-6 border border-amber-200 font-medium">
                  ⚠️ Minimum 4 members required to activate. Currently: {roster.length} of 4.
                </div>
              )}

              {roster.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg mb-8">
                  <p className="text-gray-500 text-sm">No members added yet. Add members to see the breakdown.</p>
                </div>
              ) : (
                <>
                  {/* ROSTER TABLE */}
                  <div className="mb-8">
                    <h3 className="font-semibold text-cic-text mb-3 text-sm uppercase">Roster ({roster.length})</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-gray-100 text-gray-600 uppercase">
                            <th className="text-left py-2.5 pl-3 pr-1 font-semibold w-8">#</th>
                            <th className="text-left py-2.5 px-1 font-semibold">Name</th>
                            <th className="text-left py-2.5 px-1 font-semibold">Plan</th>
                            <th className="text-center py-2.5 px-1 font-semibold w-10">Deps</th>
                            <th className="text-right py-2.5 px-1 font-semibold">Premium</th>
                            <th className="py-2.5 pr-3 pl-1 w-9"><span className="sr-only">Remove</span></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {roster.map((member, index) => (
                            <tr key={member.id} className="even:bg-gray-50">
                              <td className="py-2.5 pl-3 pr-1 text-gray-400 font-medium">{index + 1}</td>
                              <td className="py-2.5 px-1 font-bold text-cic-text truncate max-w-[90px]">{member.clientName || `Member ${index + 1}`}</td>
                              <td className="py-2.5 px-1 text-gray-600">{formatMemberPlan(member.coverageType!, member.benefitOption!)}</td>
                              <td className="py-2.5 px-1 text-center text-gray-600">{formatDependents(member.dependentCount)}</td>
                              <td className="py-2.5 px-1 text-right font-bold text-cic-red whitespace-nowrap">KES {member.basePremium?.toLocaleString() ?? "0"}</td>
                              <td className="py-2.5 pr-3 pl-1 text-center">
                                <button onClick={() => onRemoveMember(member.id)} className="text-gray-400 hover:text-cic-red active:text-cic-red transition p-1 rounded" aria-label={`Remove ${member.clientName || `Member ${index + 1}`}`}>
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* PREMIUM BREAKDOWN */}
                  <div className="mb-6 space-y-2 px-2">
                    <h3 className="font-semibold text-cic-text mb-3 text-sm uppercase">Premium Breakdown</h3>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Total Base Premium</span>
                      <span className="font-medium text-cic-text">KES {premiumBreakdown.basePremium.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Training Levy (0.2%)</span>
                      <span className="font-medium text-cic-text">KES {premiumBreakdown.trainingLevy.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>PHCF (0.25%)</span>
                      <span className="font-medium text-cic-text">KES {premiumBreakdown.phcf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Stamp Duty</span>
                      <span className="font-medium text-cic-text">KES {premiumBreakdown.stampDuty.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* TOTAL */}
                  <div className="p-5 bg-cic-red-light rounded-xl flex justify-between items-center border border-cic-red-border mb-8">
                    <span className="block text-sm font-semibold text-cic-red-dark">Total Group Premium</span>
                    <span className="font-bold text-xl text-cic-red">KES {premiumBreakdown.totalPremium.toLocaleString()}</span>
                  </div>
                </>
              )}

              <TermsDrawer />

              <DownloadButton roster={roster} premiumBreakdown={premiumBreakdown} />
              <Drawer.Close asChild>
                <button className="w-full mt-4 bg-gray-100 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-200 transition">Close Preview</button>
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
