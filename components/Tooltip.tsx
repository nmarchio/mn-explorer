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
  const { x, y, object } = tooltipInfo;
  const directionX = x < window.innerWidth / 2 ? "left" : "right";
  const directionY = y < window.innerHeight / 2 ? "top" : "bottom";
  const [posX, posY] = [
    directionX === "left" ? x + 10 : window.innerWidth - x + 10,
    directionY === "top" ? y + 10 + 84 : window.innerHeight - y + 20 - 84,
  ];
  const properties = object?.properties;
  if (x === undefined || x === -1 || !properties) return null;

  return (
    <div
      className="fixed opacity-75 text-left"
      style={{
        [directionX]: posX,
        [directionY]: posY,
      }}
    >
      <table className="table table-zebra table-compact">
        <tbody>
          {columns.map(({ column, label, format }) =>
            column in properties ? (
              <tr key={label}>
                <td>{label}:</td>
                <td>
                  {format ? format(properties[column]) : properties[column]}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {/* {columns.map(({column, label}) => (
        <div key={label}>
          {label}: {properties[column]}
        </div>
      ))} */}
    </div>
  );
}
