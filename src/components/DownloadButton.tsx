"use client";

import { pdf } from "@react-pdf/renderer";
import QuoteDocument from "./QuoteDocument";
import { RosterMember } from "@/lib/schema";
import { useState } from "react";
import { PremiumBreakdown } from "@/lib/pricing";

interface DownloadButtonProps {
  roster: RosterMember[];
  premiumBreakdown: PremiumBreakdown | null;
}

export default function DownloadButton({ roster, premiumBreakdown }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAndDownload = async () => {
    setIsGenerating(true);
    
    try {
      const blob = await pdf(
        <QuoteDocument roster={roster} premiumBreakdown={premiumBreakdown} />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const clientName = roster[0]?.clientName ? roster[0].clientName.replace(/\s+/g, '-') : 'Group';
      link.download = `CoopCare-${clientName}-Quote.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("There was an error generating the document.");
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = isGenerating || roster.length === 0;

  return (
    <button
      onClick={handleGenerateAndDownload}
      disabled={isDisabled}
      className={`block w-full text-center font-bold py-4 rounded-md transition shadow-md ${
        isDisabled ? "bg-gray-400 text-white cursor-not-allowed" : "bg-cic-red hover:bg-cic-red-dark text-white"
      }`}
    >
      {isGenerating ? "Compiling Document..." : "Download Official Group Quote"}
    </button>
  );
}