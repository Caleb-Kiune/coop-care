"use client";

import { pdf } from "@react-pdf/renderer";
import QuoteDocument from "./QuoteDocument";
import { QuoteFormValues } from "@/lib/schema";
import { useState } from "react";
import { PremiumBreakdown } from "@/lib/pricing";

interface DownloadButtonProps {
  data: QuoteFormValues;
  premiumBreakdown: PremiumBreakdown | null;
  isValid: boolean;
}

export default function DownloadButton({ data, premiumBreakdown, isValid }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAndDownload = async () => {
    setIsGenerating(true);
    
    try {
      const blob = await pdf(
        <QuoteDocument data={data} premiumBreakdown={premiumBreakdown} />
      ).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `CoopCare-Quote-${data.clientName ? data.clientName.replace(/\s+/g, '-') : 'Standard'}.pdf`;
      
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

  if (!isValid) {
    return (
      <button disabled className="w-full bg-gray-400 text-white font-bold py-4 rounded-md shadow-md cursor-not-allowed">
        Fill Form to Generate Quote
      </button>
    );
  }

  return (
    <button
      onClick={handleGenerateAndDownload}
      disabled={isGenerating}
      className={`block w-full text-center font-bold py-4 rounded-md transition shadow-md ${
        isGenerating ? "bg-red-400 cursor-wait" : "bg-red-600 hover:bg-red-700 text-white"
      }`}
    >
      {isGenerating ? "Compiling Document..." : "Download Official Quote"}
    </button>
  );
}