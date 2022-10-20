import React from 'react';

export const ColorRange: React.FC<{
  colorScale: {color: number[], label: string}[]
}> = ({
  colorScale
})=> {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      fontSize: '.75rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {colorScale.map((c, i) => (
          <div key={i} style={{
            width: '10px',
            height: '10px',
            background: `rgb(${c.color.join(',')}`
          }}></div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        {colorScale.map((r, i) => (
          <p key={i} style={{ margin: '0 .5em' }}>{r.label}</p>
        ))
        }
      </div>
    </div>
  )

}
function formatNumber(number: number): string {
  const val = +number;
  if (isNaN(val)) return `${number}`;
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 4,
    maximumSignificantDigits: 2,
    compactDisplay: "short"
  }).format(val);
}