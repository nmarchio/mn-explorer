import React from "react";

export const ColorRange: React.FC<{
  colorScale: Array<{ color: number[]; value: string; label?: string }>;
  rangeType: string;
  labelsToInclude: string[];
}> = ({ colorScale, rangeType, labelsToInclude }) => {
  const colors = colorScale.map((d) => d.color);
  const values = colorScale.map((d) => d.value);

  const len = Object.keys(colorScale).length - 1;

  const gradient =
    rangeType === "unclassified"
      ? `linear-gradient(180deg, ${colors
          .map((v, i) => `rgb(${v.join(",")}) ${Math.round((i / len) * 100)}%`)
          .join(", ")})`
      : "";

  return (
    <div className="flex flex-row text-xs">
      <div className="flex flex-col justify-between items-start">
        {rangeType === undefined &&
          colorScale.map(({ color, value, label }, i) => (
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
                {!labelsToInclude?.length ||
                labelsToInclude?.includes(`${value}`) ? (
                  label || value
                ) : (
                  <EmptyCharacter />
                )}
              </p>
            </div>
          ))}
        {rangeType === "binned" &&
          colorScale.map(({ color, value, label }, i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center text-left"
            >
              <div
                className="w-3 h-3"
                style={{ background: `rgb(${color.join(",")}` }}
              />
              <p>
                {label ? (
                  label
                ) : (
                  <>
                    {i === 0 && `< ${value}`}
                    {i === colorScale.length - 1 && `> ${value}`}
                    {i !== 0 &&
                      i !== colorScale.length - 1 &&
                      `${value} - ${colorScale[i + 1].value}`}
                  </>
                )}
              </p>
            </div>
          ))}

        {rangeType === "unclassified" && (
          <div className="flex flex-row">
            <div className="w-4 h-full" style={{ background: gradient }}></div>
            <div>
              {colorScale.map(({ value, color, label }, i) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-center text-left ml-1"
                >
                  <p>
                    {!labelsToInclude?.length ||
                    labelsToInclude?.includes(`${value}`) ? (
                      label || value
                    ) : (
                      <EmptyCharacter />
                    )}
                  </p>
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

const EmptyCharacter = () => <>&nbsp;</>;
