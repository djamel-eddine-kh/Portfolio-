import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../ThemeProvider.tsx';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = e.currentTarget;
    try {
      iframe.contentWindow?.postMessage({ type: 'theme-change', theme }, '*');
    } catch {
      // Cross-origin iframe, skip silently
    }
  };

  return (
    <section id="about" className="py-24 w-full max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center">
            <span className="text-primary font-mono text-xl md:text-2xl mr-2 font-normal">01.</span>
            About Me
          </h2>
          <div className="h-px bg-muted flex-grow max-w-[300px]"></div>
        </div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-10">
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
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
          
          <div className="relative w-full max-w-[620px] mx-auto md:max-w-[760px] md:mx-0  md:-mt-14">
            <div className="rounded aspect-[690/490] overflow-hidden bg-transparent">
              <div className="w-full h-full flex items-center justify-center bg-transparent">
                <iframe
                  src="/software_engineer_illustration.html"
                  title="Software engineer illustration"
                  scrolling="no"
                  className="w-full h-full border-0 bg-transparent"
                  onLoad={handleIframeLoad}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
