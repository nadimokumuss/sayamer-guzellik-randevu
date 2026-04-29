"use client";

import { motion } from "framer-motion";

export function SuccessCheck() {
  return (
    <motion.div
      className="relative grid h-24 w-24 place-items-center"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-emerald-400/30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.4, 1.8], opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-emerald-400/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.6, 2.0], opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
      />

      {/* Disk */}
      <motion.div
        className="relative grid h-20 w-20 place-items-center rounded-full bg-graphite text-white shadow-[0_20px_60px_-15px_rgba(43,29,27,0.5)]"
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 32 32" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <motion.path
            d="M7 16.5l5.5 5.5L25 9.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
