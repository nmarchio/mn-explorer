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

const variables: Array<MapVariableSchema> = [kComplexitySchema];

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
  colorMapping: {
    [value: string | number]: string;
  };
};