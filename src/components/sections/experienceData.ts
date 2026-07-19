import {
    OilFlame,
    WaterDrop,
    PlayArrow,
    Briefcase,
} from "./CompanyIcons";

import { Experience } from "./types";

export const experiences: Experience[] = [
    {
        id: 1,

        company: "Enageo / Sonatrach",

        role: "Software Engineer",

        period: "Jan 2026 — Present",

        duration: "Current",

        current: true,

        icon: OilFlame,

        points: [
            "Architected and developed an enterprise telecom asset management platform.",
            "Designed scalable REST APIs using Spring Boot, Spring Security and JPA.",
            "Built modern Angular dashboards for SIM cards and IP phone lifecycle management.",
            "Improved internal operational workflows by automating asset tracking and reporting."
        ],

        skills: [
            "Spring Boot",
            "Angular",
            "PostgreSQL",
            "Spring Security",
            "JPA",
            "Flyway"
        ]
    },

    {
        id: 2,

        company: "Algérienne des Eaux",

        role: "Software Engineer",

        period: "May 2025 — Nov 2025",

        duration: "7 Months",

        icon: WaterDrop,

        points: [
            "Redesigned the Miyahi Mob mobile application with a modern user experience.",
            "Developed a nationwide SMS API used across multiple regions.",
            "Resolved production issues and significantly improved application stability.",
            "Optimized application performance through backend and mobile improvements."
        ],

        skills: [
            "Spring Boot",
            "Android",
            "REST API",
            "Java",
            "SQL",
            "Performance"
        ]
    },

    {
        id: 3,

        company: "Djezzy",

        role: "Software Engineer Intern",

        period: "Feb 2024 — Sept 2024",

        duration: "8 Months",

        icon: PlayArrow,

        points: [
            "Developed backend services following a Microservices architecture.",
            "Implemented Spring Cloud Gateway and Spring Security.",
            "Designed and optimized PostgreSQL database queries.",
            "Built responsive React interfaces for enterprise applications."
        ],

        skills: [
            "React",
            "Spring Cloud",
            "Microservices",
            "PostgreSQL",
            "Docker",
            "Git"
        ]
    },

    {
        id: 4,

        company: "Freelance",

        role: "Android Developer",

        period: "2023 — 2024",

        duration: "~1 Year",

        icon: Briefcase,

        points: [
            "Built a delivery application from concept to deployment.",
            "Integrated Google Maps for live delivery tracking.",
            "Implemented Firebase Authentication and Realtime Database.",
            "Optimized application performance using native Android components."
        ],

        skills: [
            "Android",
            "Java",
            "Firebase",
            "Google Maps",
            "SQLite",
            "MVVM"
        ]
    }
];