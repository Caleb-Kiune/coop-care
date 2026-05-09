"use client";

import { Drawer } from "vaul";
import { QuoteFormValues } from "@/lib/schema";

interface QuoteDrawerProps {
  data: QuoteFormValues;
  premiumTotal: number;
}

export default function QuoteDrawer({ data, premiumTotal }: QuoteDrawerProps) {
  // A quick helper to display dummy limits for the MVP based on the selected tier
  const getInpatientLimit = () => {
    if (data.benefitOption === "OPTION_1") return "100,000";
    if (data.benefitOption === "OPTION_2") return "200,000";
    return "300,000";
  };

  return (
    <Drawer.Root>
      
      {/* THE TRIGGER: What the user clicks to open the drawer */}
      <Drawer.Trigger asChild>
        <button type="button" className="text-sm font-semibold text-red-600 underline hover:text-red-800 transition py-2">
          View Benefit Limits Breakdown
        </button>
      </Drawer.Trigger>

      {/* THE PORTAL: Renders the drawer outside the normal DOM flow so it overlays everything */}
      <Drawer.Portal>
        {/* The dark, semi-transparent background */}
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        
        {/* The actual sliding drawer sheet */}
        <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] mt-24 h-[80vh] fixed bottom-0 left-0 right-0 z-50">
          <div className="p-6 bg-white rounded-t-[20px] flex-1 overflow-y-auto">
            
            {/* The little grey pill at the top indicating it can be swiped down */}
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-bold mb-2 text-2xl text-gray-900">
                Benefit Breakdown
              </Drawer.Title>
              <p className="text-gray-500 mb-8 text-sm">
                Limits for {data.coverageType.replace('_', ' ')} — {data.benefitOption.replace('_', ' ')}
              </p>
              
              {/* THE LIMITS TABLE */}
              <div className="space-y-5">
                 <div className="flex justify-between border-b border-gray-100 pb-3">
                   <span className="text-gray-600">Inpatient Limit</span>
                   <span className="font-bold text-gray-900">KES {getInpatientLimit()}</span>
                 </div>
                 <div className="flex justify-between border-b border-gray-100 pb-3">
                   <span className="text-gray-600">Outpatient Limit</span>
                   <span className="font-bold text-gray-900">
                     {data.coverageType === 'INPATIENT_ONLY' ? 'Not Covered' : 'KES 50,000'}
                   </span>
                 </div>
                 <div className="flex justify-between border-b border-gray-100 pb-3">
                   <span className="text-gray-600">Dental & Optical</span>
                   <span className="font-bold text-gray-900">
                     {data.coverageType === 'INPATIENT_ONLY' ? 'Not Covered' : 'KES 10,000'}
                   </span>
                 </div>
              </div>

              {/* REITERATE THE TOTAL IN THE DRAWER */}
              <div className="mt-10 p-5 bg-red-50 rounded-xl flex justify-between items-center border border-red-100">
                <span className="font-bold text-red-900">Total Premium</span>
                <span className="font-bold text-2xl text-red-600">KES {premiumTotal.toLocaleString()}</span>
              </div>
              
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}