"use client";

import { useEffect, useState } from "react";

export default function PwaUpdater() {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setShowReload(true);
        }
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setShowReload(true);
              }
            });
          }
        });
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
  };

  if (!showReload) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] bg-gray-900 text-white p-4 rounded-lg shadow-xl flex items-center justify-between border border-gray-700">
      <span className="text-sm font-medium">New rates/update available.</span>
      <button 
        onClick={reloadPage}
        className="bg-cic-red hover:bg-cic-red-dark text-white px-4 py-2 rounded-md text-sm font-bold transition"
      >
        Refresh App
      </button>
    </div>
  );
}