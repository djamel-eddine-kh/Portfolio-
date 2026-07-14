import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SUBTITLES = [
  "Scalable Backend Systems",
  "AI Solutions",
  "Mobile Applications"
];

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = SUBTITLES[subtitleIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentWord) {
      typingSpeed = 2000;
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(currentWord.substring(0, displayText.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, subtitleIndex]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-start max-w-5xl mx-auto pt-20" id="hero">
      {/* Background Dots */}
      <div className="absolute inset-0 -z-10 dot-pattern opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

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
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4">
          Djamel Eddine Khelifaoui.
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-muted-foreground mb-6 h-[2em]">
          I build <span className="text-accent">{displayText}</span><span className="animate-pulse text-accent">|</span>
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
          href="https://cvdesignr.com/p/688b37ce46bc7" 
          className="px-8 py-4 bg-transparent border border-primary text-primary font-mono rounded-md hover:bg-primary/10 transition-colors"
        >
          Download Resume
        </a>
        <a 
          href="#projects" 
          className="px-8 py-4 bg-secondary text-secondary-foreground font-mono rounded-md hover:bg-secondary/80 transition-colors"
        >
          View Projects
        </a>
      </motion.div>
    </section>
  );
}
