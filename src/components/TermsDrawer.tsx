"use client";

import { Drawer } from "vaul";
import { POLICY_TERMS } from "@/lib/policyTerms";

export default function TermsDrawer() {
  return (
    <Drawer.Root nested={true}>
      <div className="mb-6">
        <Drawer.Trigger asChild>
          <button type="button" className="text-sm font-semibold text-cic-red underline hover:text-cic-red-dark transition">
            View Underwriting Terms &amp; Exclusions
          </button>
        </Drawer.Trigger>
      </div>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[60]" />
        
        <Drawer.Content className="bg-white flex flex-col rounded-t-[20px] mt-24 h-[85vh] fixed bottom-0 left-0 right-0 mx-auto max-w-[31rem] w-full z-[70] shadow-2xl border border-gray-200">
          <div className="p-6 bg-white rounded-t-[20px] flex-1 overflow-y-auto scrollbar-hide">
            
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
            
            <div className="max-w-md mx-auto w-full">
              <Drawer.Title className="font-bold text-2xl text-cic-text mb-6">
                Underwriting Terms &amp; Exclusions
              </Drawer.Title>

              <div className="space-y-8">
                {POLICY_TERMS.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-lg text-cic-text mb-4 border-b border-gray-200 pb-2">
                      {section.heading}
                    </h4>
                    
                    <div className="space-y-5">
                      {section.categories.map((category, catIdx) => (
                        <div key={catIdx}>
                          <p className="font-semibold text-gray-800 mb-2">
                            {category.title}
                          </p>
                          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-600">
                            {category.items.map((item, itemIdx) => (
                              <li key={itemIdx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Drawer.Close asChild>
                <button className="w-full mt-8 bg-gray-100 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-200 transition">
                  Close Terms
                </button>
              </Drawer.Close>

            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
