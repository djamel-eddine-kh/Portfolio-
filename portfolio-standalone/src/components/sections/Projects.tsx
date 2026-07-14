import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Folder, ExternalLink, Github } from 'lucide-react';

const PROJECTS = [
  {
    title: "TRM Telecom Management",
    type: "Enterprise Application",
    description: "Telecom asset management platform for SIM cards, IP Phones, and Employee assignments.",
    tech: ["Spring Boot", "Angular", "PostgreSQL"]
  },
  {
    title: "Miyahi Mob",
    type: "Enterprise Mobile Platform",
    description: "Redesign of an enterprise mobile platform, improving performance, fixing bugs, and providing robust backend APIs.",
    tech: ["Spring Boot", "Angular"]
  },
  {
    title: "National SMS Platform",
    type: "REST API",
    description: "A highly scalable nationwide SMS broadcasting system built to handle high throughput and reliability.",
    tech: ["Spring Boot"]
  },
  {
    title: "Microservices Intranet",
    type: "Internal Portal",
    description: "Company intranet leveraging a microservices architecture for modularity and scalability.",
    tech: ["Spring Boot", "React", "Spring Cloud", "Security", "PostgreSQL"]
  },
  {
    title: "Delivery Android App",
    type: "Mobile App",
    description: "A complete delivery solution featuring real-time tracking, authentication, and database sync.",
    tech: ["Android", "Java", "Firebase", "Google Maps"]
  },
  {
    title: "Flight School ERP",
    type: "Management System",
    description: "Enterprise resource planning system customized for flight school operations and scheduling.",
    tech: ["Python", "Django", "Bootstrap"]
  }
];

export default function Projects() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-24 w-full max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-primary font-mono text-xl md:text-2xl mr-2 font-normal">04.</span>
            Some Things I've Built
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {PROJECTS.map((project, i) => (
            <motion.div key={i} variants={item} className="h-full">
              <div className="bg-card border border-card-border p-6 rounded-xl flex flex-col h-full glow-card group transition-transform hover:-translate-y-2 duration-300">
                <div className="flex justify-between items-center mb-6">
                  <Folder className="w-10 h-10 text-primary stroke-1" />
                  <div className="flex gap-4">
                    {/* Placeholder links, since no actual URLs provided */}
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <p className="text-xs font-mono text-accent mb-2">{project.type}</p>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-x-3 gap-y-2 mt-auto font-mono text-xs text-muted-foreground">
                  {project.tech.map((tech, j) => (
                    <li key={j}>{tech}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
