import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

import ExperienceCard from "./ExperienceCard";
import { experiences } from "./experienceData";
import {
  headerVariants,
} from "./animations";
import TimelineItem from "@/components/sections/TimelineItem.tsx";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: "-150px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", "100%"]
  );

  return (
      <section
          id="experience"
          ref={sectionRef}
          className="relative py-24 overflow-hidden"
      >
        {/* Background */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div
              className="
          absolute
          left-1/2
          top-40
          h-[600px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[180px]
        "
          />

        </div>

        <div className="relative mx-auto max-w-[1500px] px-6">

          {/* HEADER */}

          <motion.div
              variants={headerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-28"
          >
            <div className="flex items-center gap-5">


              <h2 className="text-5xl font-extrabold text-foreground">
                Career{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Journey
              </span>
              </h2>

              <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />

            </div>

            <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">
              Building enterprise software, scalable backend systems and modern
              applications while continuously expanding into Artificial Intelligence.
            </p>

          </motion.div>

          {/* Timeline */}

          <div className="relative">

            {/* Base Line */}

            <div
                className="
            absolute
            left-6
            top-0
            bottom-0
            w-px
            bg-border

            lg:left-1/2
            lg:-translate-x-1/2
          "
            >

              {/* Animated Line */}

              <motion.div
                  style={{
                    height: progressHeight,
                  }}
                  className="
              absolute
              top-0
              left-0
              w-full

              origin-top

              rounded-full

              bg-gradient-to-b
              from-primary
              via-accent
              to-primary/40

              shadow-[0_0_20px_hsl(var(--primary)/0.3)]
            "
              />

            </div>

            <div className="space-y-16">
              {experiences.map((experience, index) => {

                const left = index % 2 === 0;

                return (

                    <TimelineItem
                        key={experience.id}
                        experience={experience}
                        left={left}
                    />

                );

              })}
            </div>

          </div>

        </div>

      </section>
  );
}