import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILLS = [
  {
    category: "Backend",
    items: ["Java", "Spring Boot", "Hibernate", "JPA", "REST API", "Microservices", "PostgreSQL", "MySQL"]
  },
  {
    category: "Frontend",
    items: ["Angular", "React", "TypeScript", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Mobile",
    items: ["Android", "Java", "Firebase", "SQLite"]
  },
  {
    category: "AI / ML",
    items: ["Machine Learning", "Deep Learning", "PyTorch", "Keras"]
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Linux", "Postman", "Maven"]
  }
];

export default function Skills() {
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
    <section id="skills" className="py-24 w-full max-w-4xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-primary font-mono text-xl md:text-2xl mr-2 font-normal">05.</span>
            Technical Skills
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILLS.map((skillGroup, i) => (
            <div key={i} className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4 font-mono text-primary/80">
                // {skillGroup.category}
              </h3>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
              >
                {skillGroup.items.map((skill, j) => (
                  <motion.span
                    key={j}
                    variants={item}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
