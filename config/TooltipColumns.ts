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
    label: "Place name",
  },
  {
    column: "area_type",
    label: "Block type",
  },
  {
    column: "k_ls_labels",
    label: "Block complexity",
  },
  {
    column: "k_labels_detailed",
    label: "Block complexity",
  },
  {
    column: "landscan_population_un",
    label: "Population estimate (LandScan)",
    format: (v:number) => Math.round(v).toLocaleString()
  },
  {
    column: "worldpop_population_un",
    label: "Population estimate (WorldPop)",
    format: (v:number) => Math.round(v).toLocaleString()
  },
  {
    column: "landscan_population_un_density_hectare",
    label: "Population per hectare (LandScan)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "worldpop_population_un_density_hectare",
    label: "Population per hectare (WorldPop)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "building_count",
    label: "Number of buildings",
    format: (v:number) => Math.round(v).toLocaleString()
  },
  {
    column: "block_hectares",
    label: "Block area (hectares)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "block_area_km2",
    label: "Block area (kilometers square)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "average_building_area_m2",
    label: "Average building area (meters square)",
    format: (v:number) => (Math.round(v*100)/100).toLocaleString()
  },
  {
    column: "block_id",
    label: "Block ID",
  },
]

