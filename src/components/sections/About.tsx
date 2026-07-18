import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Illustration from '@/components/ui/Illustration';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 w-full max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            About Me
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-10 items-start">
          {/* Illustration first on mobile, text first on desktop */}
          <div className="relative w-full max-w-[620px] mx-auto md:max-w-[760px] md:mx-0 order-2 md:order-1">
            <Illustration />
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl mx-auto md:mx-0 order-1 md:order-2">
            <p>
              I'm a Software Engineer based in Algeria with professional experience building enterprise applications using Java, Spring Boot, Angular, React, and Android.
            </p>
            <p>
              Alongside my software engineering career, I'm pursuing a PhD in Artificial Intelligence where my research focuses on scalable and resilient IoT fingerprinting using Machine Learning on network traffic.
            </p>
            <p>
              I enjoy designing clean architectures, solving backend challenges, and applying AI techniques to real-world security problems. My goal is to build software that not only functions perfectly but is also resilient and scalable under the hood.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
