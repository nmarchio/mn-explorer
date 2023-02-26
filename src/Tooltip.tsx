import { create } from "zustand";
import { TooltipSchema } from "./config/TooltipColumns";
import type {PickingInfo } from '@deck.gl/core/typed';

export const useTooltipStore = create<{
  tooltipInfo: any;
  setTooltipInfo: (tooltipInfo: PickingInfo) => void;
}>((set) => ({
  tooltipInfo: {},
  setTooltipInfo: (tooltipInfo: PickingInfo) => set((state) => ({ tooltipInfo })),
}));
export function Tooltip({ columns }: { columns: Array<TooltipSchema> }) {
  const tooltipInfo = useTooltipStore((state) => state.tooltipInfo);
  const {x,y,object} = tooltipInfo
  const properties = object?.properties
  if (x === undefined || x===-1 || !properties) return null

  return (
    <div style={{
      position:'fixed',
      pointerEvents: 'none',
      background:'white',
      padding:'1rem',
      left: x + 10,
      top: y + 10
    }}>
      {columns.map(({column, label}) => (
        <div key={label}>
          {label}: {properties[column]}
        </div>
      ))}
    </div>
  );
}
