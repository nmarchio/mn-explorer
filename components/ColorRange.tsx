import React from "react";

export const ColorRange: React.FC<{
  colorScale: { value: number[] };
  rangeType: string;
}> = ({ colorScale, rangeType }) => {
  const len = Object.keys(colorScale).length - 1;
  const gradient =
    rangeType === "unclassified"
      ? `linear-gradient(180deg, ${Object.values(colorScale)
          .map((v, i) => `rgb(${v.join(",")}) ${Math.round((i / len) * 100)}%`)
          .join(", ")})`
      : "";

  return (
    <div className="flex flex-row text-xs">
      <div className="flex flex-col justify-between items-start">
        {rangeType === undefined &&
          Object.entries(colorScale).map(([key, color], i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center text-left"
            >
              <div
                className="w-3 h-3"
                style={{
                  background: `rgb(${color.join(",")}`,
                }}
              ></div>
              <p key={i} className="ml-2 my-0">
                {key}
              </p>
            </div>
          ))}
        {rangeType === "binned" &&
          Object.entries(colorScale).map(([key, color], i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center text-left"
            >
              <div
                className="w-3 h-3"
                style={{ background: `rgb(${color.join(",")}` }}
              />
              <p>
                {i === 0 && `< ${key}`}
                {i === Object.entries(colorScale).length - 1 && `> ${key}`}
                {i !== 0 &&
                  i !== Object.entries(colorScale).length - 1 &&
                  `${key} - ${Object.entries(colorScale)[i + 1][0]}`}
              </p>
            </div>
          ))}

        {rangeType === "unclassified" && (
          <div className="flex flex-row">
            <div className="w-4 h-full" style={{ background: gradient }}></div>
            <div>
              {Object.entries(colorScale).map(([key, color], i) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-center text-left"
                >
                  <p>{key}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
function formatNumber(number: number): string {
  const val = +number;
  if (isNaN(val)) return `${number}`;
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 4,
    maximumSignificantDigits: 2,
    compactDisplay: "short",
  }).format(val);
}
