"use client";

import { reportContent } from "@/action/reportContent";
import { useUser } from "@clerk/nextjs";
import { Flag } from "lucide-react";
import { useState } from "react";

interface ReportButtonProps {
  contentId: string;
}

const ReportButton = ({ contentId }: ReportButtonProps) => {
  const [isReported, setIsReported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useUser();

  const handleReport = async () => {
    if (isReported || isLoading || !isSignedIn) return;

    setIsLoading(true);
    setIsReported(true);

    try {
      const response = await reportContent(contentId);
      if (response.error) {
        setIsReported(false);
        console.error(response.error);
      }
    } catch (error) {
      setIsReported(false);
      console.error("Failed to report content", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={handleReport}
      disabled={isReported || isLoading || !isSignedIn}
      className={`flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-500 transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed ${
        isReported ? "text-red-600 dark:text-red-400" : ""
      }`}
    >
      <Flag
        size={14}
        className={isReported ? "fill-red-600 dark:fill-red-400" : ""}
      />
      <span className="hidden md:block">
        {isReported ? "Reported" : isSignedIn ? "Report" : "Sign in to report"}
      </span>
    </button>
  );
};

export default ReportButton;
