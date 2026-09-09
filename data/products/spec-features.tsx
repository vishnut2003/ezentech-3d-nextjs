import type { FeatureId, StarRating } from "./specs";

/** The eight "Key features" printed on every spec sheet, with 16px line icons. */
export const specFeatures: Record<
  FeatureId,
  { label: (stars: StarRating) => string; icon: React.ReactNode }
> = {
  r32: {
    label: () => "R32 refrigerant",
    icon: (
      <path
        d="M8 2.5c-2.6 2-4 4-4 6.3A4 4 0 0 0 12 8.8c0-2.3-1.4-4.3-4-6.3zM8 6v7.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  "energy-efficient": {
    label: () => "Energy efficient",
    icon: (
      <path
        d="M9 1.5 3.5 9H7.8l-.8 5.5L13 7H8.6L9 1.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
  },
  "rotary-compressor": {
    label: () => "Rotary compressor",
    icon: (
      <>
        <rect x="4" y="2.5" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
      </>
    ),
  },
  "powerful-cooling": {
    label: () => "Powerful cooling",
    icon: (
      <path
        d="M8 1.5v13M2.4 4.75l11.2 6.5M2.4 11.25l11.2-6.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    ),
  },
  inverter: {
    label: () => "Inverter technology",
    icon: (
      <path
        d="M1.5 8c1.6-3.5 3.2-3.5 4.8 0s3.2 3.5 4.8 0 3.2-3.5 3.4 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    ),
  },
  "star-rated": {
    label: (stars) => `${stars}-Star rated`,
    icon: (
      <path
        d="m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.8z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
  },
  "low-noise": {
    label: () => "Low noise operation",
    icon: (
      <path
        d="M2.5 6h2.3L8 3.2v9.6L4.8 10H2.5V6zM10.5 5.8a3 3 0 0 1 0 4.4M12.6 3.9a5.8 5.8 0 0 1 0 8.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  reliable: {
    label: () => "Reliable performance",
    icon: (
      <>
        <path
          d="M8 1.5l5.5 2v4c0 3.2-2.3 5.6-5.5 7-3.2-1.4-5.5-3.8-5.5-7v-4l5.5-2z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 8l1.8 1.8L10.8 6.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
};
