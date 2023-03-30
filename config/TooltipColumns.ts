import React from "react";

export type DataAccesor = (d: any) => any;
export type TooltipSchema = {
  column: string | DataAccesor;
  label?: string | React.ReactNode;
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
    column: (properties) => ({wp: properties["worldpop_population_un"], ls: properties["landscan_population_un"]}),
    label:"Population Estimate km²",
    format: (data: {wp:number,ls:number}) => `${Math.round(data.ls).toLocaleString()} (LS) | ${Math.round(data.wp).toLocaleString()} (WP)`
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
    label: "Block area",
    format: (v:number) => `${(Math.round(v*100)/100).toLocaleString()} (hectares)`
  },
  {
    column: "block_area_km2",
    label: "Block area",
    format: (v:number) => `${(Math.round(v*100)/100).toLocaleString()}  (hectares)`
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

