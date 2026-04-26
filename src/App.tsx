/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Database, Layers, ChevronDown } from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";
import Story from "./components/Story";

// --- Components ---

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-50"
    >
      <div className="flex items-center justify-between py-3.5 px-10 rounded-full border border-white/[0.08] bg-black/20 backdrop-blur-xl">
        {/* Logo */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
          <img 
            src="https://i.postimg.cc/XvLppR4q/image-removebg-preview-(4).png" 
            alt="COREBASE Logo" 
            className="h-8 w-auto"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#story" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
            Story
          </a>
          <a href="#why-us" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
            Why Corebase
          </a>
          <a href="#faq" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
            FAQ
          </a>
          <a href="#" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors tracking-wide">
            Pricing
          </a>
        </div>

        {/* Actions */}
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

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void, key?: any }) => {
  return (
    <div 
      className={`group w-full max-w-3xl border border-white/[0.08] rounded-2xl bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.15] hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] ${isOpen ? 'border-white/[0.15] bg-white/[0.04]' : ''}`}
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between px-8 py-6 text-left"
      >
        <span className="text-[17px] font-medium text-white/90 tracking-wide">{question}</span>
        <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 text-[15px] text-white/50 leading-relaxed font-light tracking-wide">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

const Landing = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
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
          className="w-full h-full object-cover object-center opacity-60"
          referrerPolicy="no-referrer"
        />
        {/* Soft Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-transparent to-[#030303]/80" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Particle/Grid Overlay (kept for subtle texture) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: `40px 40px` 
        }} 
      />

      <Navbar />
 
      <main className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center pt-32 pb-20">
          {/* Central Icon Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-20"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-[#5865F2]/25 blur-[50px] rounded-[2.5rem]" />
            
            {/* Icon Box */}
            <div className="relative w-32 h-32 bg-[#121212] rounded-[2.5rem] border border-white/[0.08] flex items-center justify-center shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
              <Layers className="w-16 h-16 text-white opacity-90" />
            </div>
          </motion.div>

          {/* Content Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-[68px] font-medium tracking-tight mb-10 text-white leading-[1.05]">
              Structure Your Data.<br />Unlock Better Decisions.
            </h1>
            
            <p className="text-lg md:text-[21px] text-white/45 max-w-2xl mx-auto mb-16 leading-relaxed font-light tracking-wide">
              COREBASE brings all your data into one reliable system — clean, structured, and ready to use.
            </p>

            <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-12 py-4.5 rounded-2xl text-[17px] font-semibold transition-all shadow-2xl shadow-[#5865F2]/20 active:scale-95">
              Get Started
            </button>
          </motion.div>
        </section>

        {/* Section 2: Our Story */}
        <section id="story" className="w-full py-40 flex flex-col items-center border-t border-white/[0.05]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 items-start w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-5xl md:text-[68px] font-medium tracking-tight text-white leading-none">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto mb-56 text-center space-y-8"
          >
            <p className="text-lg md:text-[21px] text-white/60 leading-relaxed font-light tracking-wide">
              We focus on clarity over complexity. Every feature is designed to reduce noise, automate routine work, and make systems easier to understand.
            </p>
            <p className="text-lg md:text-[21px] text-white/60 leading-relaxed font-light tracking-wide">
              Corebase helps teams move faster without sacrificing control, reliability, or performance.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative w-full py-40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1.5 }}
              className="relative flex items-center"
            >
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="relative w-full flex justify-between px-10">
                {timelineData.map((item, index) => (
                  <TimelineItem key={index} title={item.title} date={item.date} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Why We're Building Corebase */}
        <section id="why-us" className="w-full py-40 flex flex-col items-center border-t border-white/[0.05]">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-32"
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
              Why We’re Building Corebase
            </h2>
            <p className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              We believe working with data should feel clear, predictable, and built for real-world teams.
            </p>
          </motion.div>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-left"
            >
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-10 text-white">
                Clarity Over Complexity
              </h3>
              <div className="space-y-8 mb-12">
                <p className="text-lg text-white/60 leading-relaxed font-light tracking-wide">
                  At Corebase, we focus on removing unnecessary complexity from data workflows. 
                  Modern teams move fast, but their tools often slow them down.
                </p>
                <p className="text-lg text-white/60 leading-relaxed font-light tracking-wide">
                  We design systems that are easier to understand, safer to scale, and more reliable over time.
                </p>
                <p className="text-lg text-white/80 font-medium tracking-wide">
                  Clarity isn’t a feature — it’s a foundation.
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-5 mb-14">
                {[
                  "Designed to reduce setup and configuration overhead",
                  "Built around real workflows",
                  "Focused on long-term scalability, not shortcuts"
                ].map((bullet, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/60 font-light text-lg">
                    <div className="w-1.5 h-1.5 bg-[#5865F2] rounded-full shadow-[0_0_10px_rgba(88,101,242,0.8)]" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 py-4 rounded-xl text-base font-semibold transition-all shadow-lg shadow-[#5865F2]/20 active:scale-95">
                Learn More
              </button>
            </motion.div>

            {/* Right Content (Image) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-[#5865F2]/10 blur-[80px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative rounded-[3rem] overflow-hidden border border-white/[0.08] shadow-2xl aspect-[4/3]">
                <img 
                  src="https://i.postimg.cc/yWRn1Rp8/image.png" 
                  alt="Corebase Team" 
                  className="w-full h-full object-cover grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section id="faq" className="w-full py-40 flex flex-col items-center border-t border-white/[0.05]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Got a question? Here’s everything you need to know before getting started.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 w-full items-center">
            {[
              {
                q: "What is Corebase and how does it work?",
                a: "Corebase is a platform that helps teams structure, manage, and scale their data in a clear and reliable way. It removes complexity and gives you a unified system to work with."
              },
              {
                q: "Can I use Corebase for free before upgrading?",
                a: "Yes, you can start with a free plan that includes core features. As your needs grow, you can upgrade at any time."
              },
              {
                q: "What types of data workflows does Corebase support?",
                a: "Corebase supports structured workflows, automation processes, and scalable data systems designed for modern teams."
              },
              {
                q: "How does collaboration work in Corebase?",
                a: "Teams can work together in real time, manage shared systems, and maintain clarity across all workflows."
              },
              {
                q: "Can I export or integrate my data with other tools?",
                a: "Yes, Corebase is built to integrate with external systems and allows flexible data export options."
              }
            ].map((item, index) => (
              <FAQItem 
                key={index}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-[15px] text-white/30 font-light tracking-wide"
          >
            Still have questions? <a href="#" className="text-white/60 hover:text-white transition-colors underline underline-offset-4">Contact us.</a>
          </motion.p>
        </section>
      </main>

      {/* Subtle Bottom Border/Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/story" element={<Story />} />
    </Routes>
  );
}
