import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Network, Shield, Cpu, Activity, Lock } from 'lucide-react';

const INTERESTS = [
  { name: "Machine Learning", icon: Brain },
  { name: "Deep Learning", icon: Cpu },
  { name: "Network Security", icon: Shield },
  { name: "IoT", icon: Network },
  { name: "Traffic Analysis", icon: Activity },
  { name: "Cybersecurity", icon: Lock },
];

export default function Research() {
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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <section id="research" className="py-24 w-full max-w-4xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">

            Research
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <div className="bg-card border border-card-border p-8 md:p-10 rounded-xl relative overflow-hidden group">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 space-y-6">
            <div>
              <p className="font-mono text-primary mb-2">PhD Candidate in Artificial Intelligence</p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Scalable and Resilient IoT Fingerprinting Using Machine Learning Techniques on Network Traffic
              </h3>
            </div>
            
            <div className="text-muted-foreground leading-relaxed">
              <p>
                My research sits at the intersection of AI and network security. By analyzing network traffic patterns, 
                we can reliably identify and monitor IoT devices at scale. This approach builds resilience against 
                spoofing and enhances the security posture of large-scale IoT deployments.
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Research Interests</h4>
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
              >
                {INTERESTS.map((interest) => {
                  const Icon = interest.icon;
                  return (
                    <motion.div 
                      key={interest.name}
                      variants={item}
                      className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium border border-secondary-border hover:border-primary/50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-accent" />
                      {interest.name}
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
