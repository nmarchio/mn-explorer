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
    column: "area_type",
    label: "Area Type"
  },
  {
    column: "block_id",
    label: "Block ID"
  },
  {
    column: "agglosname",
    label: "Agglomeration"
  },
  {
    column: "k_complexity",
    label: "Block Complexity",
  }
]