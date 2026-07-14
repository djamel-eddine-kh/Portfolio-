import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const EDUCATION = [
  {
    degree: "PhD Candidate — Artificial Intelligence",
    school: "University of M'Hamed Bougara",
    period: "2025 – Present"
  },
  {
    degree: "Master's — Information Technology",
    school: "University", // Add university if known
    period: "2022 – 2024"
  },
  {
    degree: "Bachelor — Computer Systems",
    school: "University", // Add university if known
    period: "2019 – 2022"
  }
];

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 w-full max-w-3xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-primary font-mono text-xl md:text-2xl mr-2 font-normal">06.</span>
            Education
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <div className="space-y-8">
          {EDUCATION.map((edu, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-4 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors z-10">
                  <GraduationCap className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                {i !== EDUCATION.length - 1 && (
                  <div className="w-px h-full bg-border mt-2 group-hover:bg-primary/50 transition-colors" />
                )}
              </div>
              <div className="pb-8 pt-1">
                <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                <p className="text-muted-foreground">{edu.school}</p>
                <p className="font-mono text-xs text-primary/70 mt-1">{edu.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
