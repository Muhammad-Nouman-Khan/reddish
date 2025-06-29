import React from "react";
import { Bot } from "lucide-react";
const CALL_STATUS = {
  INACTIVE: "INACTIVE",
  CONNECTING: "CONNECTING",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
};

const Agent = ({ userName }) => {
  const isSpeaking = true;
  const callStatus = CALL_STATUS.INACTIVE;
  const messages = [
    "Whats your name?",
    "My name is Nouman Khan, nice to meet you",
  ];
  const lastMessage = messages[messages.length - 1];
  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <div className="flex sm:flex-row flex-col gap-10 items-center justify-between w-full">
        {/* AI Interviewer Card */}
        <div className="flex items-center justify-center flex-col gap-2 p-7 h-[400px] bg-base-300 rounded-lg border-2 border-primary/50 flex-1 sm:basis-1/2 w-full">
          <div className="relative">
            {isSpeaking && (
              <div className="absolute -inset-4 bg-primary/30 rounded-full animate-pulse-ring"></div>
            )}
            <div className="rounded-full p-8 bg-primary/10 relative">
              <Bot className="w-28 h-28 object-contain rounded-full text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold">AI Interviewer</h2>
        </div>

        {/* User Card - Hidden on mobile */}
        <div className="hidden sm:flex items-center justify-center flex-col gap-2 p-7 h-[400px] bg-base-300 rounded-lg border-2 border-primary/50 flex-1 sm:basis-1/2 w-full">
          <div className="relative">
            {isSpeaking && (
              <div className="absolute -inset-4 bg-primary/30 rounded-full animate-pulse-ring"></div>
            )}
            <div className="bg-primary/10 rounded-full p-8 relative">
              <img
                src="/user-avatar.png"
                alt="user"
                className="w-28 h-28 object-cover rounded-full"
              />
            </div>
          </div>
          <h2 className="text-2xl font-semibold">{userName}</h2>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="bg-base-300 p-0.5 rounded-2xl w-full border-primary/50 border">
          <div className="rounded-2xl  min-h-12 px-5 py-3 flex items-center justify-center">
            <p key={lastMessage} className="text-lg text-center ">
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center w-full">
        {callStatus !== "ACTIVE" ? (
          <button className="btn btn-primary">
            <span className="text-lg font-bold">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : "..."}
            </span>
          </button>
        ) : (
          <button className="btn btn-error">End</button>
        )}
      </div>
    </div>
  );
};

export default Agent;
