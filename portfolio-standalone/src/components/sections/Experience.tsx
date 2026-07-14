import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const EXPERIENCES = [
  {
    company: "Enageo / Sonatrach",
    role: "Software Engineer",
    period: "Since Jan. 2026 – Present",
    points: [
      "Developed an internal telecom asset management platform",
      "Built backend services using Spring Boot",
      "Developed Angular interfaces",
      "Managed SIM cards and IP phone allocations"
    ]
  },
  {
    company: "Algérienne des Eaux",
    role: "Software Engineer",
    period: "From May 2025 to Nov. 2025",
    points: [
      "Redesigned Miyahi Mob app",
      "Improved application performance",
      "Fixed production issues",
      "Developed a nationwide SMS API"
    ]
  },
  {
    company: "Djezzy",
    role: "Software Engineer Intern",
    period: "From Feb. 2024 to Sept. 2024 ",
    points: [
      "Engineered backend solutions using Microservices architecture",
      "Implemented Spring Cloud Gateway and Spring Security",
      "Managed databases with PostgreSQL",
      "Built frontend interfaces using React"
    ]
  },
  {
    company: "Freelance",
    role: "Android Developer",
    period: "2023 – 2024",
    points: [
      "Developed a Delivery application from scratch",
      "Integrated Google Maps for real-time tracking",
      "Utilized Firebase for real-time database and authentication",
      "Leveraged Android SDK for native performance"
    ]
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 w-full max-w-3xl mx-auto" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-primary font-mono text-xl md:text-2xl mr-2 font-normal">02.</span>
            Where I've Worked
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-[50%] top-0 bottom-0 w-px bg-border">
            <motion.div 
              className="absolute top-0 left-0 right-0 w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {EXPERIENCES.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative w-full flex flex-col md:flex-row justify-between items-start md:items-center">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[-37px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10" />

                  {/* Content Left (Even) or Right (Odd) */}
                  <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-card border border-card-border p-6 rounded-lg shadow-lg"
                    >
                      <h3 className="text-lg font-bold text-foreground">
                        {exp.role} <span className="text-primary">@ {exp.company}</span>
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground mt-1 mb-4">{exp.period}</p>
                      
                      <ul className={`space-y-2 text-sm text-muted-foreground ${isEven ? 'md:text-right md:list-none' : 'list-none'}`}>
                        {exp.points.map((point, j) => (
                          <li key={j} className={`relative ${isEven ? 'md:pr-0 pl-4 md:pl-0' : 'pl-4'}`}>
                            <span className={`absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary ${isEven ? 'md:hidden' : ''}`} />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
