import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Folder, ExternalLink, Github, Globe } from 'lucide-react';

interface Project {
  title: string;
  type: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  status: 'production' | 'internal' | 'opensource';
}

const TECH_CATEGORIES: Record<string, { bg: string; text: string; border: string }> = {
  // Backend
  "Spring Boot": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
  "Hibernate": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
  "JPA": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
  "REST API": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  "Microservices": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  "Spring Cloud": { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-800" },
  "Spring Security": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },
  "PostgreSQL": { bg: "bg-slate-100 dark:bg-slate-900/30", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800" },
  "MySQL": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  "SQLite": { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-800" },
  "Oracle": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },
  // Frontend
  "React": { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800" },
  "Angular": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },
  "TypeScript": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  "JavaScript": { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-800" },
  "HTML": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
  "CSS": { bg: "bg-sky-100 dark:bg-sky-900/30", text: "text-sky-700 dark:text-sky-300", border: "border-sky-200 dark:border-sky-800" },
  "Bootstrap": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  // Mobile
  "Android": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
  "Firebase": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
  "Java": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },
  "Google Maps": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  // AI/ML
  "Python": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  "Django": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
  "PyTorch": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
  "Keras": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },
  "Deep Learning": { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
  // DevOps
  "Docker": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
  "Linux": { bg: "bg-slate-100 dark:bg-slate-900/30", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-800" },
  "Git": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
  "Maven": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },
  "Postman": { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
};

const STATUS_BADGES: Record<Project['status'], { label: string; className: string }> = {
  production: { label: "Production", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
  internal: { label: "Internal", className: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800" },
  opensource: { label: "Open Source", className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
};

const PROJECTS: Project[] = [
  {
    title: "TRM Telecom Management",
    type: "Enterprise Application",
    description: "Telecom asset management platform for SIM cards, IP Phones, and Employee assignments.",
    tech: ["Spring Boot", "Angular", "PostgreSQL"],
    githubUrl: "https://github.com/djamel-eddine-kh/trm-telecom",
    liveUrl: "https://trm-telecom.example.com",
    status: "internal",
  },
  {
    title: "Miyahi Mob",
    type: "Enterprise Mobile Platform",
    description: "Redesign of an enterprise mobile platform, improving performance, fixing bugs, and providing robust backend APIs.",
    tech: ["Spring Boot", "Kotlin"],
    githubUrl: "https://github.com/djamel-eddine-kh/miyahi-mob",
    status: "production",
  },
  {
    title: "National SMS Platform",
    type: "REST API",
    description: "A highly scalable nationwide SMS broadcasting system built to handle high throughput and reliability.",
    tech: ["Spring Boot"],
    githubUrl: "https://github.com/djamel-eddine-kh/national-sms-platform",
    status: "internal",
  },
  {
    title: "Microservices Intranet",
    type: "Internal Portal",
    description: "Company intranet leveraging a microservices architecture for modularity and scalability.",
    tech: ["Spring Boot", "React", "Spring Cloud", "Spring Security", "PostgreSQL"],
    githubUrl: "https://github.com/djamel-eddine-kh/microservices-intranet",
    status: "internal",
  },
  {
    title: "Delivery Android App",
    type: "Mobile App",
    description: "A complete delivery solution featuring real-time tracking, authentication, and database sync.",
    tech: ["Android", "Java", "Firebase", "Google Maps"],
    githubUrl: "https://github.com/djamel-eddine-kh/delivery-android-app",
    liveUrl: "https://play.google.com/store/apps/details?id=com.djamel.delivery",
    status: "production",
  },
  {
    title: "Flight School ERP",
    type: "Management System",
    description: "Enterprise resource planning system customized for flight school operations and scheduling.",
    tech: ["Python", "Django", "Bootstrap"],
    githubUrl: "https://github.com/djamel-eddine-kh/flight-school-erp",
    status: "internal",
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

  const getTechStyles = (tech: string) => {
    return TECH_CATEGORIES[tech] || { 
      bg: "bg-secondary", 
      text: "text-secondary-foreground", 
      border: "border-border" 
    };
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
            Some Things I've Built
          </h2>
          <div aria-hidden="true" className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {PROJECTS.map((project, i) => (
            <motion.div key={i} variants={item} className="h-full">
              <div className="bg-card border border-card-border p-6 rounded-xl flex flex-col h-full glow-card group transition-transform hover:-translate-y-2 duration-300 relative">
                {/* Header with status badge and links */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <Folder aria-hidden="true" className="w-10 h-10 text-primary stroke-1 flex-shrink-0" />
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Status badge */}
                    <span className={`px-2 py-0.5 text-xs font-mono font-medium rounded-full border ${STATUS_BADGES[project.status].className}`}>
                      {STATUS_BADGES[project.status].label}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-colors"
                          aria-label={`View ${project.title} live`}
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      {!project.githubUrl && !project.liveUrl && (
                        <span className="flex items-center gap-2 text-muted-foreground" aria-label="Private repository — no public links available">
                          <Github aria-hidden="true" className="w-5 h-5" />
                          <ExternalLink aria-hidden="true" className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs font-mono text-accent mb-2">{project.type}</p>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 flex-grow">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-x-2 gap-y-2 mt-auto font-mono text-xs">
                  {project.tech.map((tech, j) => {
                    const styles = getTechStyles(tech);
                    return (
                      <li key={j} className={`px-2.5 py-1 rounded-md border font-medium ${styles.bg} ${styles.text} ${styles.border}`}>
                        {tech}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
