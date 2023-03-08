import { create } from "zustand";
import { TooltipSchema } from "@/config/TooltipColumns";
import type { PickingInfo } from "@deck.gl/core/typed";

export const useTooltipStore = create<{
  tooltipInfo: any;
  setTooltipInfo: (tooltipInfo: PickingInfo) => void;
}>((set) => ({
  tooltipInfo: {},
  setTooltipInfo: (tooltipInfo: PickingInfo) =>
    set((state) => ({ tooltipInfo })),
}));

const NAV_OFFSET = 84;

export function Tooltip({ columns }: { columns: Array<TooltipSchema> }) {
  const tooltipInfo = useTooltipStore((state) => state.tooltipInfo);
  if (typeof window === "undefined") return null;
  const { object } = tooltipInfo;
  // const directionX = x < window.innerWidth / 2 ? "left" : "right";
  // const directionY = y < window.innerHeight / 2 ? "top" : "bottom";
  // const [posX, posY] = [
  //   directionX === "left" ? x + 10 : window.innerWidth - x + 10,
  //   directionY === "top" ? y + 10 + 84 : window.innerHeight - y + 20 - 84,
  // ];
  const properties = object?.properties;
  if (!properties) return null;

  return (
      <div className="max-w-full w-full">
        <div className="divider"/>
          <p className="text-bold">Feature Info</p>
          {columns.map(({ column, label, format }, idx) =>
            column in properties ? (
              <div key={label} className={`py-0.5 flex flex-row text-xs border-b-2`}>
                <div className="w-[50%]">{label}:</div>
                <div className="w-[50%]">
                  {format ? format(properties[column]) : properties[column]}
                </div>
              </div>
            ) : null
          )}
      </div>
  );
}
