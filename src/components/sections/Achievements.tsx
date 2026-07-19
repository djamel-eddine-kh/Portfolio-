import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';

const ACHIEVEMENTS = [
  { label: "NVIDIA Fundamentals of Deep Learning" },
  { label: "Hackathon Judge" },
  { label: "Android Bootcamp Instructor", url: "https://drive.google.com/drive/folders/1Ayl7jqfVDoSWcg--35OgTOnBRhkuaILF" },
  { label: "JunctionX Participant" }
];

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section id="achievements" className="py-24 w-full max-w-4xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            Achievements
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <motion.div 
          className="grid sm:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {ACHIEVEMENTS.map((achievement, i) => (
            <motion.div
              key={i}
              variants={item}
              className="flex items-center gap-4 p-4 rounded-lg bg-card border border-card-border hover:border-accent/50 transition-colors group"
            >
              <div className="text-accent group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 stroke-1" />
              </div>
              {achievement.url ? (
                <a
                  href={achievement.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-accent transition-colors"
                >
                  {achievement.label}
                </a>
              ) : (
                <span className="font-medium text-foreground">{achievement.label}</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
