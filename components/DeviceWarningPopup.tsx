"use client";

import { useEffect, useState } from "react";

export default function DeviceWarningPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isSmallDevice = window.innerWidth <= 1024;
        const hasSeenPopup = sessionStorage.getItem("seenDevicePopup");

        if (isSmallDevice && !hasSeenPopup) {
            setIsVisible(true);
            sessionStorage.setItem("seenDevicePopup", "true");
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-50 bg-zinc-100/60 border border-gray-200/70 text-black px-4 py-3 rounded-lg shadow-lg animate-fade-in">
            <div className="flex justify-between items-start gap-3">
                <div>
                    <strong className="block font-medium">Desktop Recommended</strong>
                    <p className="text-sm mt-1">
                        This site is built to shine on desktop. Some features might not look right on mobile or tablet.
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-black hover:text-gray-700 text-lg font-bold"
                    aria-label="Close"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
