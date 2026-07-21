import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 w-full max-w-2xl mx-auto text-center" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary font-mono mb-4">What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Let's build something together.</h2>
        
        <p className="text-muted-foreground text-lg mb-12">
          Whether you have a question, a project idea, or just want to say hi, 
          I'll try my best to get back to you! My inbox is always open.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a 
            href="mailto:djamelEddinekhelifaoui@gmail.com" 
            className="flex items-center gap-2 px-6 py-3 bg-card border border-card-border rounded-md hover:border-primary hover:text-primary transition-all duration-300"
          >
            <Mail aria-hidden="true" className="w-5 h-5" />
            <span className="font-mono">Email</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/djamel-eddine-khelifaoui/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-card-border rounded-md hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all duration-300"
          >
            <Linkedin aria-hidden="true" className="w-5 h-5" />
            <span className="font-mono">LinkedIn</span>
          </a>
          
          <a 
            href="https://github.com/djamel-eddine-kh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-card-border rounded-md hover:border-foreground hover:text-foreground transition-all duration-300"
          >
            <Github aria-hidden="true" className="w-5 h-5" />
            <span className="font-mono">GitHub</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
