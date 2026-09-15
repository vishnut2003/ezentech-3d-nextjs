import type { Photo } from "@/components/ui/photo-slot";

/**
 * Fixed drop-in paths for the client's photography. Drop a file at the
 * path and the PhotoSlot swaps from placeholder to image on the next build.
 */
export const ABOUT_PHOTOS = {
  plantExterior: {
    src: "/images/about/plant-exterior.jpg",
    alt: "Exterior of an Ezentech India manufacturing plant",
    caption: "Manufacturing plant · Ezentech India",
  },
  groupPlant: {
    src: "/images/about/group-plant.jpg",
    alt: "Manufacturing floor at a Nidhi group plant",
    caption: "Group manufacturing footprint",
  },
  coilLine: {
    src: "/images/about/coil-line.jpg",
    alt: "Heat-exchanger coil line with fin pack and copper hairpins",
    caption: "Heat-exchanger coil line",
  },
  assemblyLine: {
    src: "/images/about/assembly-line.jpg",
    alt: "Final assembly line with indoor units moving toward test",
    caption: "Final assembly and charging",
  },
  lab: {
    src: "/images/about/psychrometric-lab.jpg",
    alt: "NABL-accredited psychrometric laboratory with a unit under test",
    caption: "NABL-accredited psychrometric laboratory",
  },
  leadershipFloor: {
    src: "/images/about/leadership-shop-floor.jpg",
    alt: "Leadership team on the shop floor beside the assembly line",
    caption: "Leadership on the line",
  },
  engineeringReview: {
    src: "/images/about/engineering-review.jpg",
    alt: "Engineering review of a chassis and coil prototype",
    caption: "Engineering review",
  },
} satisfies Record<string, Photo>;
