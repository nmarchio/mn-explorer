export type TooltipSchema = {
  column: string;
  label?: string;
  format?: (value: any) => string;
}

export const tooltipColumns: Array<TooltipSchema> = [
  {
    column: "country_name",
    label: "Country",
  },
  {
    column: "agglosname",
    label: "Agglomeration"
  },
  {
    column: "area_type",
    label: "Block Type"
  },
  {
    column: "k_complexity",
    label: "Block Complexity",
  },
  {
    column: "landscan_population_un",
    label: "Population",
    format: (v:number) => Math.round(v).toLocaleString()
  },
  {
    column: "landscan_population_un_density_hectare",
    label: "Population Density (p/ha)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "landscan_population_un_density_hectare_log",
    label: "Population Density (log)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "block_hectares",
    label: "Area (ha)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "block_geohash",
    label: "Geohash"
  },
  {
    column: "block_id",
    label: "ID"
  },
]
