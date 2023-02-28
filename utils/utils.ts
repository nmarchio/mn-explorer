import { BitmapLayer } from "@deck.gl/layers/typed";
import { TileLayer } from "@deck.gl/geo-layers/typed";
import {scaleLinear} from "d3-scale";
import { MapVariableSchema } from "@/config/MapVariables";

export const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 0,
  zoom: 0,
  pitch: 0,
  bearing: 0,
};

const defaultColorFunc = (_f: any) => [120, 120, 120];

// export const generateColorFunc = (
//   colorScale?: keyof typeof colorSchemeMapping,
//   colorDomain?: [number, number],
//   property?: string
// ) => {
//   if (!colorScale || !colorDomain || !property) return defaultColorFunc;

//   const colorFunc =
//     colorSchemeMapping[
//       colorScale.toLocaleLowerCase() as keyof typeof colorSchemeMapping
//     ];
//   if (!colorFunc) return defaultColorFunc;

//   const colorScaleFunc = d3.scaleSequential(colorFunc).domain(colorDomain);
//   const increment = (colorDomain[1] - colorDomain[0]) / 9;
//   const values = (new Array(9).fill(0) as number[]).map(
//     (_, i) => Math.round(colorDomain[0] + increment * (i+1) * 100) / 100
//   );
//   const colors = values.map((v: number)=> colorScaleFunc(v)
//     .slice(4, -1)
//     .split(",")
//     .map((v: string) => parseInt(v))
//   );
//   const accessor = (d: any) => d.properties[property];
//   const findColorBin = (n: number) => {
//     for (let i = 0; i < values.length; i++) {
//       if (n < values[i]) return colors[i];
//     }
//     return colors[colors.length - 1];
//   } 
//   return (f: any) => findColorBin(accessor(f));
// };

export const generateColorFunc = (colorSchema: any, column: string, rangeType?: string) => {
  if (rangeType === "unclassified") {
    return generateGradientColorFunc(colorSchema, column);
  } else if (rangeType === "binned") {
    return generateRangeColorFunc(colorSchema, column);
  } else {
    return generateLabeledColorFunc(colorSchema, column);
  }
}
export const generateRangeColorFunc = (
  colorScale: {[value: string | number]: number[]},
  column: string
) => {
  const accessor = (d: any) => d.properties[column];
  const entries = Object.entries(colorScale);
  return (f: any) => {
    const value = accessor(f);
    if (value === null || value === undefined) return [0,0,0,0];
    if (value > entries[entries.length-1][0]) return entries[entries.length-1][1];
    for (let i=0; i<entries.length; i++) {
      if (value <= entries[i][0]) return entries[i][1];
    }
    return [0,0,0,0];
  }
}

export const generateLabeledColorFunc = (
  colorScale: {[value: string | number]: number[]},
  column: string
) => {
  const accessor = (d: any) => d.properties[column];
  return (f: any) => colorScale?.[accessor(f)] || [0,0,0,0];
}

export const generateGradientColorFunc = (
  colorScale: {[value: string | number]: number[]},
  column: string
) => {
  const accessor = (d: any) => d.properties[column];
  const entries = Object.entries(colorScale);
  const colorRange = entries.map((e: any) => `rgb(${e[1].join(",")})`);
  const valueDomain = entries.map((e: any) => e[0]);
  const colorScaleFunc = scaleLinear()
    .domain([
      -Math.pow(10,12),
      ...valueDomain,
      Math.pow(10,12)
    ])
    // @ts-ignore
    .range([colorRange[0],...colorRange,colorRange[colorRange.length-1]]);
  
  return (f: any) => {
    const color = colorScaleFunc(accessor(f))
    // @ts-ignore
    return color.slice(4, -1).split(",").map((v: string) => parseInt(v));
  }
}