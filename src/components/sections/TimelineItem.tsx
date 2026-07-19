import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import ExperienceCard from "./ExperienceCard";
import { Experience } from "./types";
import {
    activeNode,
    inactiveNode,
    nodeTransition,
} from "./animations";

interface Props {
    experience: Experience;
    left: boolean;
}

export default function TimelineItem({
                                         experience,
                                         left,
                                     }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const active = useInView(ref, {
        amount: 0.45,
        once: false,
    });

    return (
        <div
            ref={ref}
            className="
      relative

      grid

      grid-cols-1
      lg:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)]

      gap-y-6

      items-start
    "
        >
            {/* LEFT CARD */}

            <div
                className={`
          hidden
          lg:block

          ${left ? "" : "invisible"}
        `}
            >
                {left && <ExperienceCard experience={experience} />}
            </div>

            {/* TIMELINE */}

            <div
                className="
        relative

        hidden
        lg:flex

        justify-center
      "
            >
                {/* connector */}

                <div
                    className={`
            absolute

            top-10

            h-px

            bg-gradient-to-r

                from-primary/40
            to-transparent

            transition-all

            duration-500

            ${
                        left
                            ? "right-1/2 w-12"
                            : "left-1/2 w-12 rotate-180"
                    }
          `}
                />

                {/* node */}

                <motion.div
                    animate={active ? activeNode : inactiveNode}
                    transition={nodeTransition}
                    className="relative mt-6"
                >
                    {/* outer glow */}

                    <motion.div
                        animate={{
                            opacity: active ? 1 : 0,
                            scale: active ? 1 : 0.8,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="
            absolute

            inset-0

            rounded-full

                        bg-primary/30

            blur-xl
          "
                    />

                    {/* ring */}

                    <div
                        className="
            relative

            flex

            h-8
            w-8

            items-center
            justify-center

            rounded-full

            border

            border-border

            bg-card
          "
                    >
                        <motion.div
                            animate={{
                                backgroundColor: active
                                    ? "hsl(var(--primary))"
                                    : "hsl(var(--muted-foreground))",
                            }}
                            className="
              h-3.5
              w-3.5

              rounded-full
            "
                        />
                    </div>
                </motion.div>
            </div>

            {/* RIGHT CARD */}

            <div
                className={`
          hidden
          lg:block

          ${left ? "invisible" : ""}
        `}
            >
                {!left && <ExperienceCard experience={experience} />}
            </div>

            {/* MOBILE */}

            <div className="lg:hidden pl-10 relative">
                <div
                    className="
          absolute

          left-0
          top-8

          h-6
          w-6

          rounded-full

          border

          border-border

          bg-card

          flex
          items-center
          justify-center
        "
                >
                    <motion.div
                        animate={{
                            scale: active ? 1.2 : 1,
                            backgroundColor: active
                                ? "hsl(var(--primary))"
                                : "hsl(var(--muted-foreground))",
                        }}
                        className="h-3 w-3 rounded-full"
                    />
                </div>

                <ExperienceCard experience={experience} />
            </div>
        </div>
    );
}