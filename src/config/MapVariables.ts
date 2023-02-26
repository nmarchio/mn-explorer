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
  },
};

const BlockTypeSchema: MapVariableSchema = {
  name: "Block Type",
  description: "The typography of the block as urban, peri-urban, or non-urban.",
  columnAccessors: {
    region: "k_ls_labels",
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
  numericRange: true,
  colorMapping: {
    1:'#FCFFFC',
    5:'#F0F0E4',
    10:'#D6D5D3',
    20:'#B1B8C7',
    40:'#8C9BA5',
    100:'#5C6D7E',
    200:'#34495E',
    300:'#00204C',
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
  numericRange?: boolean;
  colorMapping: {
    [value: string | number]: string;
  };
};