import QuoteForm from "@/components/QuoteForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="w-full max-w-md space-y-5">
        
        {/* NATIVE APP BAR LAYOUT */}
        <div className="flex flex-row items-center justify-start space-x-4 pl-1">
          {/* The Trust Anchor */}
          <Image 
            src="/cic-logo.png" 
            alt="CIC Insurance" 
            width={75} 
            height={30} 
            priority 
            className="object-contain shrink-0"
          />
          
          {/* Title & Badge */}
          <div className="flex flex-col justify-center border-l-2 border-gray-200 pl-4 py-1">
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">
              Coop Care
            </h1>
            <span className="text-[10px] font-bold tracking-widest text-cic-red uppercase mt-1.5">
              Premium Calculator
            </span>
          </div>
        </div>

        <QuoteForm />
      </div>
    </main>
  );
}