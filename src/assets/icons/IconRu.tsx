import { IconActivity } from "@/types/globalInterfaces";

const IconRU = ({ className }: IconActivity) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
    // {...props}
    className={className}
  >
    <path
      d="M31.9 2c-13 0-24.1 8.4-28.2 20h56.6C56.1 10.4 45 2 31.9 2z"
      fill="#f9f9f9"
    />
    <path
      d="M31.9 62c13.1 0 24.2-8.4 28.3-20H3.7c4.1 11.7 15.2 20 28.2 20z"
      fill="#ed4c5c"
    />
    <path
      d="M3.7 22C2.6 25.1 2 28.5 2 32s.6 6.9 1.7 10h56.6c1.1-3.1 1.7-6.5 1.7-10s-.6-6.9-1.7-10H3.7"
      fill="#428bc1"
    />
  </svg>
);
export default IconRU;
