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
  legendLabels: ['1','10','100','1000'],
  rangeType: "unclassified",
  colorMapping: {
    1:     "#440154",
    1.7:   "#472172",
    5.6:   "#423E84",
    10:    "#38578C",
    17.7:  "#2D6F8E",
    31.6:  "#24858E",
    56.2:  "#1F9A89",
    100:   "#2CB07E",
    177.8: "#51C369",
    316.2: "#85D349",
    562.3: "#C1DF24",
    1000:  "#FDE725",
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
  legendLabels?: Array<string>;
  rangeType?: "binned" | "unclassified" | undefined;
  colorMapping: {
    [value: string | number]: string;
  };
};