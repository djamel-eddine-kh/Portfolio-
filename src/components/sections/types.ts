import type { FC } from "react";

export interface Experience {
    id: number;
    company: string;
    role: string;
    period: string;
    duration?: string;
    current?: boolean;

    points: string[];
    skills: string[];

    icon: FC<{ size?: number; className?: string }>;
}