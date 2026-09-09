import {
  modelImageList,
  specModels,
  type SpecModel,
} from "@/data/products/specs";
import { absUrl, ORG } from "@/lib/site";

export const SPECS_PATH = "/products/technical-specifications";

const manufacturer = {
  "@type": "Organization",
  name: ORG.legalName,
  url: absUrl("/"),
  logo: absUrl(ORG.logo),
  address: { "@type": "PostalAddress", ...ORG.address },
};

function property(name: string, value: string | number, unitCode?: string) {
  return {
    "@type": "PropertyValue",
    name,
    value,
    ...(unitCode ? { unitCode } : {}),
  };
}

function productLd(m: SpecModel) {
  const s = m.sheet;
  const id = absUrl(`${SPECS_PATH}#${m.slug}`);
  return {
    "@type": "Product",
    "@id": id,
    url: id,
    name: m.name,
    sku: m.sheetName,
    category:
      m.type === "split" ? "Split Air Conditioner" : "Window Air Conditioner",
    description: `${m.name} by Ezentech India: ${s.general.coolingCapacityW} W cooling capacity, rated ISEER ${s.general.iseer.toFixed(2)}, ${s.indoorUnit.airflowM3h} m³/h indoor air flow, R32 refrigerant, ${s.general.chassis} chassis.`,
    image: modelImageList(m).map((i) => absUrl(i.src)),
    brand: { "@type": "Brand", name: ORG.name },
    manufacturer,
    additionalProperty: [
      property("Cooling capacity", s.general.coolingCapacityW, "WTT"),
      property("Rated ISEER", s.general.iseer),
      property("BEE star rating", m.stars),
      property("Type", s.general.type),
      property("Chassis type", s.general.chassis),
      property("Refrigerant", s.condenser.refrigerant),
      property("Indoor air flow", s.indoorUnit.airflowM3h, "MQH"),
      ...(s.compressor
        ? [property("Compressor", `${s.compressor.type} (${s.compressor.brand})`)]
        : []),
      property("Indoor fan motor", `${s.indoorFanMotor.type}, ${s.indoorFanMotor.powerInput}, ${s.indoorFanMotor.rpm} RPM`),
      property("Expansion type", s.condenser.expansionType),
      property("Indoor unit dimensions (W×D×H, mm)", s.indoorUnit.unitDims),
      property("Outdoor unit dimensions (W×H×D, mm)", s.condenser.unitDims),
      property("Refrigerant pipe, liquid side (mm)", s.refrigerantPipe.liquid),
      property("Refrigerant pipe, gas side (mm)", s.refrigerantPipe.gas),
    ],
  };
}

export function technicalSpecificationsJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Products", item: absUrl("/products") },
        {
          "@type": "ListItem",
          position: 3,
          name: "Technical Specifications",
          item: absUrl(SPECS_PATH),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Ezentech inverter air-conditioner technical specifications",
      numberOfItems: specModels.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: specModels.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: productLd(m),
      })),
    },
  ];
}
