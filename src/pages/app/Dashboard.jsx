"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-slate-800 border-slate-700 shadow-lg">
        <CardContent className="p-8 sm:p-12">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Icon */}
            <Code2 className="w-16 h-16 text-[#F49D03]" />

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#F49D03]">
              Welcome to E-LeetSquad
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl leading-relaxed">
              Tired of solving DSA challenges alone? With{" "}
              <span className="text-[#F49D03] font-semibold">E-LeetSquad</span>,
              you can now collaborate with friends to tackle coding challenges
              together. Say goodbye to solving DSA sheets alone and welcome an
              exciting way to level up your coding skills with friends!
            </p>

            {/* Contact Developer */}
            <p className="text-slate-400 text-base sm:text-lg mt-4">
              Have any feedback or just want to connect? Reach out to the
              developer below:
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <Link
                to="https://github.com/dhananjaykhodaskar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-[#F49D03]"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                to="https://www.linkedin.com/in/dhananjay-khodaskar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-[#F49D03]"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link
                to="https://x.com/DhananjayK27"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-[#F49D03]"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link to="mailto:dhananjaykhodaskar27@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-[#F49D03]"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
