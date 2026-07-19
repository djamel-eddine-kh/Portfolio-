import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

import { Experience } from "./types";
import {
    badgeHover,
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

      backdrop-blur-xl

            text-card-foreground

        w-full

      transition-all
      duration-300
      "
        >
            {/* Glow */}

            <div
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

            <div className="relative px-5 py-5 sm:px-7 sm:py-6">

                {/* HEADER */}

                <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-5">

                    <div className="flex gap-4">

                        <motion.div
                            whileHover={iconHover}
                            className="
              flex
              h-12
              w-12
              sm:h-14
              sm:w-14
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

                            <h3 className="text-lg font-bold text-foreground sm:text-xl">
                                {experience.company}
                            </h3>

                            <p className="mt-1 text-sm text-primary sm:text-base">
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

                px-3
                py-1.5

                text-xs
                font-medium

                text-emerald-400
              "
                            >
                <span className="relative flex h-2.5 w-2.5">

                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"/>

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"/>

                </span>
                                Current
                            </div>
                        )}

                        <div className="mt-2 flex items-center justify-end gap-2 text-xs text-muted-foreground sm:mt-3 sm:text-sm">

                            <Calendar size={15} />

                            {experience.period}

                        </div>

                    </div>

                </div>

                {/* Divider */}

                <div className="my-4 h-px bg-border sm:my-5" />

                {/* ACHIEVEMENTS */}

                <div className="space-y-2.5 sm:space-y-3">

                    {experience.points.map((point) => (

                        <div
                            key={point}
                            className="flex items-start gap-3"
                        >

                            <CheckCircle2
                                size={17}
                                className="
                mt-0.5

                shrink-0

                text-primary
                "
                            />

                            <p className="leading-6 text-sm text-muted-foreground sm:text-base sm:leading-7">

                                {point}

                            </p>

                        </div>

                    ))}

                </div>

                {/* Technologies */}

                <div className="mt-6 sm:mt-8">

                    <div
                        className="
            mb-3

            text-xs

            uppercase

            tracking-[0.25em]

                        text-muted-foreground
          "
                    >
                        Technologies
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">

                        {experience.skills.map((skill) => (

                            <motion.div
                                key={skill}
                                whileHover={badgeHover}
                                className="
                rounded-full

                border
                border-primary/15

                bg-primary/5

                px-2.5
                py-1

                sm:px-3
                sm:py-1.5

                text-xs
                font-medium

                text-primary
                "
                            >
                                {skill}
                            </motion.div>

                        ))}

                    </div>

                </div>

            </div>
        </motion.article>
    );
}