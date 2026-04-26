/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Database, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-50"
    >
      <div className="flex items-center justify-between py-3.5 px-10 rounded-full border border-white/[0.08] bg-black/20 backdrop-blur-xl">
        <Link to="/" className="flex items-center">
          <img 
            src="https://i.postimg.cc/XvLppR4q/image-removebg-preview-(4).png" 
            alt="COREBASE Logo" 
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
            Home
          </Link>
          <Link to="/story" className="text-[13px] font-medium text-white hover:text-white transition-colors tracking-wide">
            Story
          </Link>
          <a href="#" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
            Sign In
          </button>
          <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold transition-all shadow-lg shadow-[#5865F2]/10">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const TimelineItem = ({ title, date, index }: { title: string, date: string, index: number, key?: any }) => {
  const isEven = index % 2 === 0;
  return (
    <div className="relative flex flex-col items-center flex-1">
      {/* Connector Line */}
      <div 
        className={`absolute w-px h-16 bg-gradient-to-b from-[#5865F2]/40 to-transparent ${isEven ? 'bottom-full mb-2' : 'top-full mt-2'}`} 
      />
      
      {/* Content */}
      <div className={`absolute whitespace-nowrap text-center ${isEven ? 'bottom-[calc(100%+80px)]' : 'top-[calc(100%+80px)]'}`}>
        <div className="text-[15px] font-medium text-white mb-1">{title}</div>
        <div className="text-[13px] font-light text-white/40 tracking-wide uppercase">{date}</div>
      </div>

      {/* Point */}
      <div className="relative z-10">
        <div className="w-2.5 h-2.5 bg-[#5865F2] rounded-full shadow-[0_0_15px_rgba(88,101,242,0.8)]" />
      </div>
    </div>
  );
};

export default function Story() {
  const timelineData = [
    { title: "Project idea formed", date: "March 2022" },
    { title: "First prototype released", date: "August 2022" },
    { title: "Closed beta launch", date: "January 2023" },
    { title: "Public access opened", date: "June 2023" },
    { title: "Scaling infrastructure", date: "February 2024" },
    { title: "Platform expansion", date: "Present" },
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] text-white font-sans overflow-hidden flex flex-col items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://i.postimg.cc/hvTn7mT0/Generate-an-ultra-dark-202604161405.jpg" 
          alt="Background" 
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/90 via-[#030303]/40 to-[#030303]/90" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full max-w-7xl px-6 pt-56 pb-32">
        {/* Section 1: Intro */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-[68px] font-medium tracking-tight text-white leading-none">
              Our Story
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <p className="text-lg md:text-[21px] text-white/60 leading-relaxed font-light tracking-wide">
              Corebase was built to simplify how teams structure, manage, and scale their data. 
              Modern workflows are often slowed down by fragmented systems, unclear processes, and unreliable infrastructure.
            </p>
            <p className="text-lg md:text-[21px] text-white/60 leading-relaxed font-light tracking-wide">
              Our goal is to remove that friction — giving teams a clean, structured, and scalable foundation for decision-making.
            </p>
          </motion.div>
        </section>

        {/* Section 2: Extended Text */}
        <section className="max-w-3xl mx-auto mb-56 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <p className="text-lg md:text-[21px] text-white/60 leading-relaxed font-light tracking-wide">
              We focus on clarity over complexity. Every feature is designed to reduce noise, automate routine work, and make systems easier to understand.
            </p>
            <p className="text-lg md:text-[21px] text-white/60 leading-relaxed font-light tracking-wide">
              Corebase helps teams move faster without sacrificing control, reliability, or performance.
            </p>
          </motion.div>
        </section>

        {/* Section 3: Timeline */}
        <section className="relative py-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.5 }}
            className="relative flex items-center"
          >
            {/* Main Horizontal Line */}
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {/* Timeline Points */}
            <div className="relative w-full flex justify-between px-10">
              {timelineData.map((item, index) => (
                <TimelineItem key={index} title={item.title} date={item.date} index={index} />
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {/* Subtle Bottom Border/Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </div>
  );
}
