import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

import { Experience } from "./types";
import {
    cardHover,
    cardVariants,
    iconHover,
} from "./animations";

interface Props {
    experience: Experience;
}

export default function ExperienceCard({
                                           experience,
                                       }: Props) {
    const Icon = experience.icon;

    return (
        <motion.article
            variants={cardVariants}
            whileHover={cardHover}
            className="
      group
      relative
      overflow-hidden

      rounded-3xl

      border
            border-card-border

            bg-card/90

            text-card-foreground

        w-full

      transition-all
      duration-300
      "
        >
            {/* Glow */}

            <div
                aria-hidden="true"
                className="
        absolute
        inset-0

        opacity-0

        transition-opacity
        duration-500

        group-hover:opacity-100

        bg-gradient-to-br
                from-primary/5
        via-transparent
                to-accent/5
      "
            />

            {/* Top Accent */}

            <div
                aria-hidden="true"
                className="
        absolute
        left-0
        right-0
        top-0

        h-px

        bg-gradient-to-r
        from-transparent
                via-primary/30
        to-transparent
      "
            />

            <div className="relative px-4 py-4 sm:px-6 sm:py-5">

                {/* HEADER */}

                <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">

                    <div className="flex gap-4">

                        <motion.div
                            whileHover={iconHover}
                            className="
              flex
              h-11
              w-11
              sm:h-12
              sm:w-12
              shrink-0
              items-center
              justify-center

              rounded-2xl

              border
              border-primary/20

              bg-primary/10

              text-primary
            "
                        >
                            <Icon size={24} />
                        </motion.div>

                        <div>

                            <h3 className="text-lg font-bold text-foreground sm:text-[1.05rem]">
                                {experience.company}
                            </h3>

                            <p className="mt-0.5 text-sm text-primary">
                                {experience.role}
                            </p>

                        </div>

                    </div>

                    <div className="text-right">

                        {experience.current && (
                            <div
                                className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-emerald-500/20

                bg-emerald-500/10

                px-2.5
                py-1

                text-xs
                font-medium

                text-emerald-400
              "
                            >
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">

                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"/>

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"/>

                </span>
                                Current
                            </div>
                        )}

                        <div className="mt-1.5 flex items-center justify-end gap-2 text-[11px] text-muted-foreground sm:mt-2 sm:text-sm">

                            <Calendar aria-hidden="true" size={15} />

                            {experience.period}

                        </div>

                    </div>

                </div>

                {/* Divider */}

                <div aria-hidden="true" className="my-3 h-px bg-border sm:my-4" />

                {/* ACHIEVEMENTS */}

                <div className="space-y-2 sm:space-y-2.5">

                    {experience.points.map((point) => (

                        <div
                            key={point}
                            className="flex items-start gap-3"
                        >

                            <CheckCircle2
                                aria-hidden="true"
                                size={16}
                                className="
                mt-0.5

                shrink-0

                text-primary
                "
                            />

                            <p className="text-sm leading-5 text-muted-foreground sm:leading-6">

                                {point}

                            </p>

                        </div>

                    ))}

                </div>

            </div>
        </motion.article>
    );
}