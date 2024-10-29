"use client";

import { useState, useEffect } from "react";
import challengeImg from "../assets/challengeHero.jpeg";
import { Card } from "@/components/ui/card";
import { useJoinActiveChallengeMutation } from "@/services/challenge";
import { Button } from "./ui/button";

export default function ChallengeHero({
  title = "150 Problems Challenge",
  endTime = new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
  problemCount,
  activeChallengeId,
  refetchActiveChallengeDetails,
}) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  return (
    <div className="relative w-full h-[20vh] min-h-[400px] overflow-hidden">
      <img
        src={challengeImg}
        alt="Challenge Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white p-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 transition-all duration-300 ease-in-out hover:scale-105">
          {title}
        </h1>
        <div className="flex flex-row gap-2">
          <Card className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-white/20 text-slate-200">
            <p className="text-xl md:text-2xl font-semibold text-center">
              Time Remaining
            </p>
            <div className="text-3xl md:text-4xl font-bold tabular-nums ">
              {`${timeRemaining.hours
                .toString()
                .padStart(2, "0")}:${timeRemaining.minutes
                .toString()
                .padStart(2, "0")}:${timeRemaining.seconds
                .toString()
                .padStart(2, "0")}`}
            </div>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-white/20 text-slate-200">
            <p className="text-xl md:text-2xl font-semibold text-center">
              Total Problems
            </p>
            <div className="text-3xl md:text-4xl font-bold tabular-nums  text-center">
              {problemCount}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
