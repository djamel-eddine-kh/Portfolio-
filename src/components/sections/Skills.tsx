import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useTransform,
  useMotionValueEvent,
  motionValue,
  type MotionValue,
} from 'framer-motion';
import { FaJava } from 'react-icons/fa';
import {
  SiSpringboot,
  SiHibernate,
  SiPostgresql,
  SiMysql,
  SiAngular,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiAndroid,
  SiFirebase,
  SiSqlite,
  SiPytorch,
  SiKeras,
  SiGit,
  SiDocker,
  SiLinux,
  SiPostman,
  SiApachemaven,
} from 'react-icons/si';
import { GrOracle } from 'react-icons/gr';
import { Database, Link2, Boxes, Brain, Cpu } from 'lucide-react';

const SKILLS = [
  {
    category: "Languages",
    items: ["Java", "TypeScript", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Backend & APIs",
    items: ["Spring Boot", "Hibernate", "JPA", "REST API", "Microservices"]
  },
  {
    category: "Frontend",
    items: ["React", "Angular"]
  },
  {
    category: "Mobile",
    items: ["Android", "Firebase"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "SQLite","Oracle"]
  },
  {
    category: "AI / Machine Learning",
    items: ["PyTorch", "Keras", "Deep Learning"]
  },
  {
    category: "DevOps & Tooling",
    items: ["Docker", "Linux", "Git", "Maven", "Postman"]
  }
];

const ICON_MAPPING: Record<string, React.ComponentType<{ className?: string }>> = {
  "Java": FaJava,
  "Spring Boot": SiSpringboot,
  "Hibernate": SiHibernate,
  "JPA": Database,
  "REST API": Link2,
  "Microservices": Boxes,
  "PostgreSQL": SiPostgresql,
  "MySQL": SiMysql,
  "Angular": SiAngular,
  "React": SiReact,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "HTML": SiHtml5,
  "CSS": SiCss,
  "Android": SiAndroid,
  "Firebase": SiFirebase,
  "SQLite": SiSqlite,
  "Machine Learning": Brain,
  "Deep Learning": Cpu,
  "PyTorch": SiPytorch,
  "Keras": SiKeras,
  "Git": SiGit,
  "Docker": SiDocker,
  "Linux": SiLinux,
  "Postman": SiPostman,
  "Maven": SiApachemaven,
  "Oracle": GrOracle,
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

// Exactly the values your original whileHover used — both the wave and a real
// mouse hover reuse these same numbers, so the two look identical.
const HOVER_SCALE = 1.03;
const HOVER_Y = -2;
const HOVER_SPRING = { type: "spring" as const, stiffness: 300, damping: 15 };

// Sequential wave timing: each badge fully rises, holds, and falls all the way
// back to 0 before the next one starts. Tune these three numbers to taste —
// bigger numbers = slower, calmer sweep.
const WAVE_RISE_S = 0.7;
const WAVE_HOLD_MS = 200;
const WAVE_FALL_S = 0.7;
const WAVE_EASE = "easeInOut" as const;

function SkillBadge({
                      skill,
                      waveValue,
                    }: {
  skill: string;
  waveValue: MotionValue<number>;
}) {
  const Icon = ICON_MAPPING[skill];

  const [isHovered, setIsHovered] = useState(false);
  const hoverIntensity = useMotionValue(0);

  useEffect(() => {
    const controls = animate(hoverIntensity, isHovered ? 1 : 0, HOVER_SPRING);
    return () => controls.stop();
  }, [isHovered, hoverIntensity]);

  // Whichever is stronger — the sequential wave or an actual mouse hover —
  // wins, then gets mapped through the exact same scale/y/opacity values.
  const intensity = useTransform([waveValue, hoverIntensity], ([w, h]: number[]) =>
      Math.max(w, h)
  );

  const scale = useTransform(intensity, (i) => 1 + (HOVER_SCALE - 1) * i);
  const y = useTransform(intensity, (i) => HOVER_Y * i);
  const iconOpacity = useTransform(intensity, [0, 1], [0.6, 1]);
  const glow = useTransform(intensity, [0, 1], [0, 0.3]);

  // The border/background/brightness shift lives in Tailwind classes rather
  // than motion values, so mirror `intensity` into a boolean toggle to drive
  // it — this covers both the wave and real hover through one code path.
  const [active, setActive] = useState(false);
  useMotionValueEvent(intensity, "change", (i) => {
    const next = i > 0.05;
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
      <motion.div
          variants={itemVariants}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{ scale, y, willChange: "transform" }}
          transition={HOVER_SPRING}
          className={`relative flex items-center gap-2.5 px-3.5 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg border border-border shadow-sm transition-colors duration-100 group cursor-default select-none ${
              active ? "border-primary bg-secondary/80 brightness-105 dark:brightness-110" : ""
          }`}
      >
        {/* Glow rendered as its own opacity-only layer so it's GPU-composited
          instead of forcing a repaint every frame like an animated box-shadow would. */}
        <motion.span
            aria-hidden
            style={{ opacity: glow, willChange: "opacity" }}
            className="pointer-events-none absolute -inset-1 rounded-lg bg-primary/40 blur-md"
        />
        {Icon && (
            <motion.span style={{ opacity: iconOpacity }} className="relative flex items-center">
              <Icon className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </motion.span>
        )}
        <span className="relative">{skill}</span>
      </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const totalSkills = SKILLS.reduce((acc, group) => acc + group.items.length, 0);

  // One plain (non-hook) MotionValue per badge, created once. Using the
  // `motionValue()` factory instead of `useMotionValue()` per item avoids
  // calling a hook inside a loop, and lets each badge subscribe directly to
  // its own value with no parent re-renders involved.
  const waveValues = useMemo(
      () => Array.from({ length: totalSkills }, () => motionValue(0)),
      [totalSkills]
  );

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;

    // Strictly sequential: badge N rises, holds, and falls all the way back
    // to 0 — and only then does badge N+1 start. Nothing overlaps, so at most
    // one wave value (plus whatever's under the mouse) is ever animating.
    async function run() {
      let i = 0;
      while (!cancelled) {
        const mv = waveValues[i];
        await animate(mv, 1, { duration: WAVE_RISE_S, ease: WAVE_EASE }).finished;
        if (cancelled) return;
        await new Promise((resolve) => setTimeout(resolve, WAVE_HOLD_MS));
        if (cancelled) return;
        await animate(mv, 0, { duration: WAVE_FALL_S, ease: WAVE_EASE }).finished;
        if (cancelled) return;
        i = (i + 1) % totalSkills;
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [isInView, waveValues, totalSkills]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  let globalIndex = 0;
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
                    {skillGroup.category}
                  </h3>
                  <motion.div
                      className="flex flex-wrap gap-2.5"
                      variants={container}
                      initial="hidden"
                      animate={isInView ? "show" : "hidden"}
                  >
                    {skillGroup.items.map((skill, j) => {
                      const currentIndex = globalIndex++;
                      return (
                          <SkillBadge
                              key={j}
                              skill={skill}
                              waveValue={waveValues[currentIndex]}
                          />
                      );
                    })}
                  </motion.div>
                </div>
            ))}
          </div>
        </motion.div>
      </section>
  );
}