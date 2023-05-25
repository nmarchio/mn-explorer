const kComplexitySchema: MapVariableSchema = {
  name: "Block street access",
  description: "Measures the number of building parcels between the least accessible structure and the street network. This metric is called block complexity.",
  columnAccessors: {
    region: "k_ls_labels",
    blocks: "k_labels",
  },
  colorMapping: [
    { value: "1", color: "#414141" },
    { value: "2 (high)", color: "#777777" },
    { value: "3", color: "#93328E" },
    { value: "4 (moderate)", color: "#B83A85" },
    { value: "5", color: "#D9477A" },
    { value: "6 (low)", color: "#F25D6D" },
    { value: "7", color: "#FB7962" },
    { value: "8", color: "#FF9859" },
    { value: "9", color: "#FFB857" },
    { value: "10+ (very low)", color: "#FCD860" },
    { value: "Off-network", color: "#F9F871" },
  ],
};

const BlockTypeSchema: MapVariableSchema = {
  name: "Block Type",
  description:
    "Classification of street block as urban, peri-urban, or non-urban.",
  columnAccessors: {
    region: "area_type",
    blocks: "area_type",
  },
  colorMapping: [
    { value: "Urban", color: "#5a5f68" },
    { value: "Peri-urban", color: "#9aaac7" },
    { value: "Non-urban", color: "#c5e6a4" },
  ],
};

const PopulationSchema: MapVariableSchema = {
  name: "Population Density",
  description: "Population per hectare (based on LandScan 2020, adjusted to UN statistics).",
  columnAccessors: {
    region: "landscan_population_un_density_hectare",
    blocks: "landscan_population_un_density_hectare",
  },
  legendLabels: ["1", "10", "100", "1000"],
  rangeType: "unclassified",
  colorMapping: [
    { value: 1, color: "#440154" },
    { value: 1.7, color: "#472172" },
    { value: 5.6, color: "#423E84" },
    { value: 10, color: "#38578C" },
    { value: 17.7, color: "#2D6F8E" },
    { value: 31.6, color: "#24858E" },
    { value: 56.2, color: "#1F9A89" },
    { value: 100, color: "#2CB07E" },
    { value: 177.8, color: "#51C369" },
    { value: 316.2, color: "#85D349" },
    { value: 562.3, color: "#C1DF24" },
    { value: 1000, color: "#FDE725" },
  ],
};

const variables: Array<MapVariableSchema> = [
  kComplexitySchema,
  BlockTypeSchema,
  PopulationSchema,
];

export const mapVariables = variables.map((schema) => ({
  ...schema,
  colorMapping: schema.colorMapping.map(
    ({ color, value }) => ({
      value: value,
      color: convertHexToRgb(color),
    }),
    {}
  ),
}));

// convert hext to rgb values
function convertHexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

export type MapVariableSchema = {
  name: string; // short name
  description: string; // short helpful description of map variable
  columnAccessors: {
    region: string;
    blocks: string;
  };
  legendLabels?: Array<string>;
  rangeType?: "binned" | "unclassified" | undefined;
  colorMapping: Array<{
    color: string;
    value: string | number;
  }>;
};
