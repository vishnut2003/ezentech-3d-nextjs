export interface LeadershipRole {
  id: string;
  role: string;
  remit: string;
  meetWhen: string;
  /** Unverified today — when supplied, the row renders name + role with no layout change. */
  name?: string;
  photo?: string;
}

/** Leadership functions a brand partner works with. Names are not published until confirmed. */
export const leadershipRoles: LeadershipRole[] = [
  {
    id: "managing",
    role: "Managing leadership",
    remit: "Direction of the company, the plant network and the partnerships it builds for.",
    meetWhen: "At programme kick-off and when a partnership is being shaped.",
  },
  {
    id: "operations",
    role: "Manufacturing and plant operations",
    remit: "Four plants, the in-house component lines and the season's production plan.",
    meetWhen: "When volumes, capacity and dispatch schedules are set.",
  },
  {
    id: "engineering",
    role: "Engineering and product development",
    remit: "Platform architecture, thermal design, industrial design and prototypes.",
    meetWhen: "From the first brief through sample sign-off.",
  },
  {
    id: "quality",
    role: "Quality, testing and the NABL lab",
    remit: "The quality system, the psychrometric laboratory and the certification file.",
    meetWhen: "At lab validation, audits and pre-dispatch sign-off.",
  },
  {
    id: "supply",
    role: "Supply chain and sourcing",
    remit: "Compressors, motors, controls and raw material behind the in-house lines.",
    meetWhen: "When a BOM is agreed or a partner-supplied component is introduced.",
  },
  {
    id: "partners",
    role: "Sales and partner programmes",
    remit: "The RFQ, the commercial terms and the programme once it is live.",
    meetWhen: "First — this is who answers your enquiry.",
  },
];
