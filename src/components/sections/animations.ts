import type { Transition, Variants } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   EASING                                   */
/* -------------------------------------------------------------------------- */

export const spring = {
    type: "spring",
    stiffness: 110,
    damping: 18,
} satisfies Transition;

export const fastSpring = {
    type: "spring",
    stiffness: 220,
    damping: 20,
} satisfies Transition;

export const smooth = {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
} satisfies Transition;

/* -------------------------------------------------------------------------- */
/*                               SECTION HEADER                               */
/* -------------------------------------------------------------------------- */

export const headerVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 25,
    },

    visible: {
        opacity: 1,
        y: 0,
        transition: smooth,
    },
};

/* -------------------------------------------------------------------------- */
/*                               TIMELINE LIST                                */
/* -------------------------------------------------------------------------- */

export const containerVariants: Variants = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
};

/* -------------------------------------------------------------------------- */
/*                                CARD REVEAL                                 */
/* -------------------------------------------------------------------------- */

export const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 35,
        scale: 0.98,
    },

    visible: {
        opacity: 1,
        y: 0,
        scale: 1,

        transition: {
            ...smooth,
        },
    },
};

/* -------------------------------------------------------------------------- */
/*                              ACHIEVEMENT ROW                               */
/* -------------------------------------------------------------------------- */

export const bulletVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -15,
    },

    visible: (index: number) => ({
        opacity: 1,
        x: 0,

        transition: {
            delay: index * 0.08,
            duration: 0.35,
        },
    }),
};

/* -------------------------------------------------------------------------- */
/*                               TECHNOLOGY CHIP                              */
/* -------------------------------------------------------------------------- */

export const chipVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 8,
    },

    visible: (index: number) => ({
        opacity: 1,
        y: 0,

        transition: {
            delay: index * 0.05,
            duration: 0.3,
        },
    }),
};

/* -------------------------------------------------------------------------- */
/*                                 HOVER CARD                                 */
/* -------------------------------------------------------------------------- */

export const cardHover = {
    y: -8,

    transition: {
        duration: 0.25,
    },
};

/* -------------------------------------------------------------------------- */
/*                                  TIMELINE                                  */
/* -------------------------------------------------------------------------- */

export const nodeTransition = {
    type: "spring",
    stiffness: 250,
    damping: 18,
} satisfies Transition;

export const activeNode = {
    scale: 1.25,
};

export const inactiveNode = {
    scale: 1,
};

/* -------------------------------------------------------------------------- */
/*                                   ICON                                     */
/* -------------------------------------------------------------------------- */

export const iconHover = {
    rotate: 8,
    scale: 1.08,

    transition: {
        duration: 0.25,
    },
};

/* -------------------------------------------------------------------------- */
/*                               SKILL BADGES                                 */
/* -------------------------------------------------------------------------- */

export const badgeHover = {
    y: -2,
    scale: 1.04,

    transition: {
        duration: 0.18,
    },
};