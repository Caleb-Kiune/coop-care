"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import QuoteDocument from "./QuoteDocument";
import { QuoteFormValues } from "@/lib/schema";
import { useState, useEffect } from "react";
import { PremiumBreakdown } from "@/lib/pricing";

interface DownloadButtonProps {
  data: QuoteFormValues;
  premiumBreakdown: PremiumBreakdown | null;
  isValid: boolean;
}

export default function DownloadButton({ data, premiumBreakdown, isValid }: DownloadButtonProps) {
  const [debouncedData, setDebouncedData] = useState(data);
  const [debouncedBreakdown, setDebouncedBreakdown] = useState(premiumBreakdown);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData(data);
      setDebouncedBreakdown(premiumBreakdown);
    }, 500);
    return () => clearTimeout(handler);
  }, [data, premiumBreakdown]);

  if (!isValid) {
    return (
      <button disabled className="w-full bg-gray-400 text-white font-bold py-4 rounded-md shadow-md cursor-not-allowed">
        Fill Form to Generate Quote
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<QuoteDocument data={debouncedData} premiumBreakdown={debouncedBreakdown} />}
      fileName={`CoopCare-Quote-${debouncedData.clientName ? debouncedData.clientName.replace(/\s+/g, '-') : 'Standard'}.pdf`}
      className="block w-full text-center bg-red-600 text-white font-bold py-4 rounded-md hover:bg-red-700 transition shadow-md"
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download Official Quote")}
    </PDFDownloadLink>
  );
}