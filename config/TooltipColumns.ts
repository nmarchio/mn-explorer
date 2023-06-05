import React from "react";

export type DataAccesor = (d: any) => any;
export type TooltipSchema = {
  column: string | DataAccesor;
  label?: string | React.ReactNode;
  format?: (value: any) => string;
};

export const regionTooltipColumns: Array<TooltipSchema> = [
  {
    column: "country_name",
    label: "Country",
  },
  {
    column: "area_type",
    label: "Block type",
  },
  {
    column: "k_ls_labels",
    label: "Block street access",
  },
  {
    column: (properties) => ({
      ls: properties["landscan_population_un"],
      wp: properties["worldpop_population_un"],
    }),
    label: "Population",
    format: (data: { wp: number; ls: number }) =>
      `${Math.round(data.ls).toLocaleString()} (LS) | ${Math.round(
        data.wp
      ).toLocaleString()} (WP)`,
  },
  {
    column: (properties) => ({
      ls: properties["landscan_population_un_density_hectare"],
      wp: properties["worldpop_population_un_density_hectare"],
    }),
    label: "Population per hectare",
    format: (data: { wp: number; ls: number }) =>
      `${(Math.round(data.ls * 100) / 100).toLocaleString()} (LS) | ${(
        Math.round(data.wp * 100) / 100
      ).toLocaleString()} (WP)`,
  },
  {
    column: "building_count",
    label: "Number of buildings",
    format: (v: number) => Math.round(v).toLocaleString(),
  },
  {
    column: "block_area_km2",
    label: "Block area",
    format: (v: number) =>
      `${(Math.round(v * 100) / 100).toLocaleString()}  (km²)`,
  },
  {
    column: "average_building_area_m2",
    label: "Average building area",
    format: (v: number) =>
      `${(Math.round(v * 100) / 100).toLocaleString()}  (m²)`,
  },
  {
    column: "block_id",
    label: "Block ID",
  },
];

export const blockTooltipColumns: Array<TooltipSchema> = [
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
    column: "k_labels_detailed",
    label: "Block street access",
  },
  {
    column: (properties) => ({
      ls: properties["landscan_population_un"],
      wp: properties["worldpop_population_un"],
    }),
    label: "Population",
    format: (data: { wp: number; ls: number }) =>
      `${Math.round(data.ls).toLocaleString()} (LS) | ${Math.round(
        data.wp
      ).toLocaleString()} (WP)`,
  },
  {
    column: (properties) => ({
      ls: properties["landscan_population_un_density_hectare"],
      wp: properties["worldpop_population_un_density_hectare"],
    }),
    label: "Population per hectare",
    format: (data: { wp: number; ls: number }) =>
      `${(Math.round(data.ls * 100) / 100).toLocaleString()} (LS) | ${(
        Math.round(data.wp * 100) / 100
      ).toLocaleString()} (WP)`,
  },
  {
    column: "building_count",
    label: "Number of buildings",
    format: (v: number) => Math.round(v).toLocaleString(),
  },
  {
    column: "block_hectares",
    label: "Block area",
    format: (v: number) =>
      `${(Math.round(v * 100) / 100).toLocaleString()} (hectares)`,
  },
  {
    column: "average_building_area_m2",
    label: "Average building area",
    format: (v: number) =>
      `${(Math.round(v * 100) / 100).toLocaleString()}  (m²)`,
  },
  {
    column: "block_id",
    label: "Block ID",
  },
];
