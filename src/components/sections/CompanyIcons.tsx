import type { FC } from "react";

import enageoLogo from "./icons/enageo-logo.jpg";
import adeLogo from "./icons/algerienne-des-eaux-ade-seeklogo.png";
import djezzyLogo from "./icons/djezzy.png";

type IconProps = {
  size?: number;
  className?: string;
};

export const OilFlame: FC<IconProps> = ({ size = 24, className }) => (
  <img
    src={enageoLogo}
    alt="Enageo / Sonatrach"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: "contain" }}
  />
);

export const WaterDrop: FC<IconProps> = ({ size = 24, className }) => (
  <img
    src={adeLogo}
    alt="Algérienne des Eaux"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: "contain" }}
  />
);

export const PlayArrow: FC<IconProps> = ({ size = 24, className }) => (
  <img
    src={djezzyLogo}
    alt="Djezzy"
    width={size}
    height={size}
    className={className}
    style={{ objectFit: "contain" }}
  />
);

export const Briefcase: FC<IconProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V7" />
    <path d="M2 12C5 13.5 8.5 14.5 12 14.5C15.5 14.5 19 13.5 22 12" />
  </svg>
);
