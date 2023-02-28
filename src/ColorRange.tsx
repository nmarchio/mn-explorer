import React from "react";

export const ColorRange: React.FC<{
  colorScale: { value: number[] };
  rangeType: string;
}> = ({ colorScale, rangeType }) => {
  const len = Object.keys(colorScale).length - 1;
  const gradient = rangeType === "unclassified"
    ?  `linear-gradient(180deg, ${Object.values(colorScale).map((v, i) => `rgb(${v.join(',')}) ${Math.round(i / len * 100)}%`).join(', ')})`
    : null;
  console.log(gradient)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: ".75rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
      {rangeType === undefined &&
        Object.entries(colorScale).map(([key, color], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: `rgb(${color.join(",")}`,
              }}
            ></div>
            <p key={i} style={{ margin: "0 .5em" }}>
              {key}
            </p>
          </div>
        ))}
        {rangeType === "binned" &&
          Object.entries(colorScale).map(([key, color], i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: `rgb(${color.join(",")}`,
                }}
              ></div>
              <p style={{ margin: "0 .5em" }}>
                {i === 0 && `< ${key}`}
                {i === Object.entries(colorScale).length - 1 && `> ${key}`}
                {i !== 0 && i !== Object.entries(colorScale).length - 1 && `${key} - ${Object.entries(colorScale)[i+1][0]}`}
              </p>
            </div>
          ))}
          
          {rangeType === "unclassified" && <div style={{display:'flex', flexDirection:"row"}}>
            <div style={{height:'100%', width:'1rem', background:gradient}}></div>
            <div>
            {Object.entries(colorScale).map(([key, color], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                <p style={{ margin: "0 .5em" }}>
                  {key}
                </p>
              </div>
            ))}
            </div>
            </div>}
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
