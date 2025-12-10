
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export const Turnstile = ({ onVerify, onError, onExpire }: TurnstileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackChecked, setFallbackChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile && containerRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: "0x4AAAAAAAklcPm1NNXEV_xO", // Cloudflare test site key
            callback: (token: string) => {
              setIsLoading(false);
              onVerify(token);
            },
            "error-callback": () => {
              console.log("Turnstile error, showing fallback checkbox");
              setIsLoading(false);
              setShowFallback(true);
              if (onError) onError();
            },
            "expired-callback": () => {
              setIsLoading(false);
              setShowFallback(true);
              if (onExpire) onExpire();
            },
            theme: "light",
            size: "normal",
          });
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to render Turnstile:", error);
          setIsLoading(false);
          setShowFallback(true);
        }
      } else {
        // Fallback if Turnstile doesn't load
        setTimeout(() => {
          setIsLoading(false);
          setShowFallback(true);
        }, 3000); // Wait 3 seconds for Turnstile to load
      }
    };

    // Check if Turnstile is already loaded
    if (window.turnstile) {
      loadTurnstile();
    } else {
      // Load Turnstile script
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = loadTurnstile;
      script.onerror = () => {
        console.error("Failed to load Turnstile script");
        setIsLoading(false);
        setShowFallback(true);
      };
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [onVerify, onError, onExpire]);

  // Handle fallback checkbox change
  const handleFallbackChange = (checked: boolean) => {
    setFallbackChecked(checked);
    if (checked) {
      // Generate a fallback token to indicate checkbox verification
      onVerify("fallback-verification-token");
    } else {
      // Clear verification if unchecked
      onVerify("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="text-sm text-gray-600">Loading security check...</div>
      </div>
    );
  }

  if (showFallback) {
    return (
      <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg bg-gray-50">
        <Checkbox
          id="security-fallback"
          checked={fallbackChecked}
          onCheckedChange={handleFallbackChange}
        />
        <label
          htmlFor="security-fallback"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          I confirm that I am not a robot
        </label>
      </div>
    );
  }

  return <div ref={containerRef} className="turnstile-container" />;
};
