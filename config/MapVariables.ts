const kComplexitySchema: MapVariableSchema = {
  name: "Block Complexity",
  description: "Distance from network sorta kinda, more here...",
  columnAccessors: {
    region: "k_ls_labels",
    blocks: "k_labels",
  },
  colorMapping: {
    "1": "#414141",
    "2": "#777777",
    "3": "#93328E",
    "4": "#B83A85",
    "5": "#D9477A",
    "6": "#F25D6D",
    "7": "#FB7962",
    "8": "#FF9859",
    "9": "#FFB857",
    "10+": "#FCD860",
    "Off-network": "#F9F871"
  },
};

const BlockTypeSchema: MapVariableSchema = {
  name: "Block Type",
  description: "The typography of the block as urban, peri-urban, or non-urban.",
  columnAccessors: {
    region: "area_type",
    blocks: "area_type",
  },
  colorMapping: {
    "Urban": "#5a5f68",
    "Peri-urban": "#9aaac7",
    "Non-urban": "#c5e6a4",
  },
};

const PopulationSchema: MapVariableSchema = {
  name: "Population Density",
  description: "Population density of the block.",
  columnAccessors: {
    region: "landscan_population_un_density_hectare",
    blocks: "landscan_population_un_density_hectare",
  },
  rangeType: "unclassified",
  colorMapping: {
    1: "#440154",
    5: "#481a6c",
    10: "#472f7d",
    25: "#414487",
    50: "#39568c",
    75: "#31688e",
    100: "#2a788e",
    200: "#23888e",
    300: "#1f988b",
    400: "#22a884",
    500: "#35b779",
    600: "#54c568",
    700: "#7ad151",
    800: "#a5db36",
    900: "#d2e21b",
    1000: "#fde725",
  }
};

const variables: Array<MapVariableSchema> = [kComplexitySchema, BlockTypeSchema,PopulationSchema];

export const mapVariables = variables.map((schema) => ({
  ...schema,
  colorMapping: Object.entries(schema.colorMapping).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: convertHexToRgb(value),
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
  rangeType?: "binned" | "unclassified" | undefined;
  colorMapping: {
    [value: string | number]: string;
  };
};