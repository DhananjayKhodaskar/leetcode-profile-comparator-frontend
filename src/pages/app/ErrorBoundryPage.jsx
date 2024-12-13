"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Astronaut() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <div className="w-24 h-32 bg-white rounded-t-full relative">
        <div className="absolute inset-2 bg-gray-200 rounded-t-full">
          <div className="absolute inset-4 bg-gray-800 rounded-full">
            {/* Distressed eyes */}
            <div className="absolute top-1/2 left-1/4 w-2 h-1 bg-red-500 rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-1 bg-red-500 rounded-full"></div>
            {/* Worried mouth */}
            <div className="absolute bottom-1/4 left-1/4 right-1/4 h-1 bg-red-500 rounded-full"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-white" />
        <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gray-300 rounded-b-full" />
      </div>
    </motion.div>
  );
}

export function Planet() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-purple-600 rounded-full shadow-lg" />
    </motion.div>
  );
}

export function Stars() {
  const starCount = 50;

  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(starCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

export default function ErrorBoundaryPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-between">
      <Stars />
      <div className="flex-grow relative">
        <Planet />
        <Astronaut />
      </div>
      <motion.div
        className="z-10 text-center pb-12 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          We've lost contact with mission control
        </p>
        <motion.button
          className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/auth/login")}
        >
          Return to Earth
        </motion.button>
      </motion.div>
    </div>
  );
}
