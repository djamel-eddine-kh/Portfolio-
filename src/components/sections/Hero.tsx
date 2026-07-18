import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUBTITLES = [
  "Scalable Backend Systems",
  "AI Solutions", 
  "Mobile Applications"
];

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-start max-w-5xl mx-auto pt-20" id="hero">
      {/* Background Dots - reduced opacity */}
      <div className="absolute inset-0 -z-10 dot-pattern opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-primary font-mono mb-5 text-sm md:text-base">Hi, my name is</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4 max-w-3xl">
          Djamel Eddine Khelifaoui.
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-muted-foreground mb-6 h-[1.5em]">
          I build{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={subtitleIndex}
              className="text-accent font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {SUBTITLES[subtitleIndex]}
            </motion.span>
          </AnimatePresence>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          I build scalable backend systems, mobile applications, and AI-powered solutions. 
          Currently working as a Software Engineer while pursuing a PhD in Artificial Intelligence 
          focused on resilient IoT fingerprinting using Machine Learning.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-wrap gap-4"
      >
        <a 
          href="#projects" 
          className="px-8 py-4 bg-primary text-primary-foreground font-mono rounded-md hover:bg-primary/90 transition-colors"
        >
          View Projects
        </a>
        <a 
          href="https://cvdesignr.com/p/688b37ce46bc7" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-transparent border border-primary text-primary font-mono rounded-md hover:bg-primary/10 transition-colors"
        >
          Download Resume
        </a>
      </motion.div>
    </section>
  );
}
