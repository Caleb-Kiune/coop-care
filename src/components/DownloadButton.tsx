"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import QuoteDocument from "./QuoteDocument";
import { QuoteFormValues } from "@/lib/schema";

interface DownloadButtonProps {
  data: QuoteFormValues;
  premiumTotal: number;
  isValid: boolean;
}

export default function DownloadButton({ data, premiumTotal, isValid }: DownloadButtonProps) {
  if (!isValid) {
    return (
      <button disabled className="w-full bg-gray-400 text-white font-bold py-4 rounded-md shadow-md cursor-not-allowed">
        Fill Form to Generate Quote
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<QuoteDocument data={data} premiumTotal={premiumTotal} />}
      fileName={`CoopCare-Quote-${data.clientName ? data.clientName.replace(/\s+/g, '-') : 'Standard'}.pdf`}
      className="block w-full text-center bg-red-600 text-white font-bold py-4 rounded-md hover:bg-red-700 transition shadow-md"
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download Official Quote")}
    </PDFDownloadLink>
  );
}