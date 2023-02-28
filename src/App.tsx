import { useState, useMemo, useCallback, useEffect, useLayoutEffect } from "react";
import DeckGL from "@deck.gl/react/typed";
import { PMTLayer } from "@maticoapp/deck.gl-pmtiles";
import {ScatterplotLayer} from '@deck.gl/layers/typed';
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
//@ts-ignore
import Map, { NavigationControl, useControl } from "react-map-gl";
import { Config } from "./config";
import {
  ConfigSpec,
  generateColorFunc,
  // BgTileLayer,
  INITIAL_VIEW_STATE,
  // generateExplicitColorFunc,
  // generateLabeledColorFunc,
} from "./utils";
import { ColorRange } from "./ColorRange";
import "mapbox-gl/dist/mapbox-gl.css";
import { Deck } from "@deck.gl/core/typed";
import maplibre from "maplibre-gl";
import { mapVariables } from "./config/MapVariables";
import { Tooltip, useTooltipStore } from "./Tooltip";
import { tooltipColumns } from "./config/TooltipColumns";
import type {PickingInfo } from '@deck.gl/core/typed';

function DeckGLOverlay(props: MapboxOverlayProps & {
  interleaved?: boolean;
}) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}


const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const REGION_URL =
  "https://d386ho3t0q1oea.cloudfront.net/region_map-2-10.pmtiles";
const BLOCK_URL =
  "https://d386ho3t0q1oea.cloudfront.net/africa_map-9-14_simp3.pmtiles";
  

const loadOptions = {
  pmt: {
    // workerUrl: '/node_modules/@loaders.gl/mvt/dist/mvt-worker.js',
    maxConcurrency:
      typeof navigator !== "undefined" ? navigator.hardwareConcurrency - 1 : 3,
    maxMobileConcurrency:
      typeof navigator !== "undefined" ? navigator.hardwareConcurrency - 1 : 3,
    workerUrl: "https://unpkg.com/@maticoapp/deck.gl-pmtiles@0.0.14/dist/pmt-worker.js"
  }
};
const colors = [
  "#E8E7F4",
  "#CEC8DA",
  "#93328E",
  "#B83A85",
  "#D9477A",
  "#F25D6D",
  "#FB7962",
  "#FF9859",
  "#FFB857",
  "#FCD860",
  "#F9F871",
];

function toRgb(c: string) {
  if (c.length != 6) {
    throw "Only six-digit hex colors are allowed.";
  }

  var aRgbHex = c.match(/.{1,2}/g);
  var aRgb = [
    // @ts-ignore
    parseInt(aRgbHex[0], 16),
    // @ts-ignore
    parseInt(aRgbHex[1], 16),
    // @ts-ignore
    parseInt(aRgbHex[2], 16),
  ];
  return aRgb;
}

const kcomplexityColorScheme = [
  {
    value: 1,
    color: toRgb("E8E7F4"),
    label: "1",
  },
  {
    value: 2,
    color: toRgb("CEC8DA"),
    label: "2",
  },
  {
    value: 3,
    color: toRgb("93328E"),
    label: "3",
  },
  {
    value: 4,
    color: toRgb("B83A85"),
    label: "4",
  },
  {
    value: 5,
    color: toRgb("D9477A"),
    label: "5",
  },
  {
    value: 6,
    color: toRgb("F25D6D"),
    label: "6",
  },
  {
    value: 7,
    color: toRgb("FB7962"),
    label: "7",
  },
  {
    value: 8,
    color: toRgb("FF9859"),
    label: "8",
  },
  {
    value: 9,
    color: toRgb("FFB857"),
    label: "9",
  },
  {
    value: 10,
    color: toRgb("FCD860"),
    label: "10+",
  },
  // {
  //   value: 999,
  //   color: toRgb("F9F871"),
  //   label: "Off Network+",
  // },
];

export default function App() {
  const [variable, setVariable] = useState(mapVariables[0].name);
  const [tileContent, setTileContent] = useState({});
  const [z, setZ] = useState(INITIAL_VIEW_STATE.zoom);
  const zTransitionLevel = 7;
  const numZfade = 4;
  const colorScale = "warm";
  const setTooltipInfo = useTooltipStore(state => state.setTooltipInfo);
  // @ts-ignore
  const currSchema = useMemo(() => mapVariables.find(v => v.name === variable) || mapVariables[0], [variable]);

  const blocksColorFunc = useCallback(generateColorFunc(
    currSchema.colorMapping,
    currSchema.columnAccessors.blocks,
    currSchema.rangeType
  ), [currSchema])

  
  const regionsColorFunc = useCallback(generateColorFunc(
    currSchema.colorMapping,
    currSchema.columnAccessors.region,
    currSchema.rangeType
  ), [currSchema])
  
  const handleTooltipInfo = (info: PickingInfo) => {
    console.log(info?.object?.properties)
    info && setTooltipInfo(info)
  }

  const layers = [
    new PMTLayer({
      id: "regions-0-10-zoom",
      data: REGION_URL,
      onHover: handleTooltipInfo,
      minZoom: 2,
      maxZoom: 10,
      filled: true,
      // @ts-ignore
      getFillColor: d => {
        const c = regionsColorFunc(d)
        return c
      },
      stroked: true,
      getLineColor: z > 9 ? [40, 40, 40, 255] : [0, 0, 0, 0],
      lineWidthMinPixels: 1,
      pickable: true,
      tileSize: 256,
      // @ts-ignore
      visible: z < 9,
      updateTriggers: {
        visible: z,
        getFillColor: [regionsColorFunc],
      },
      loadOptions,
      beforeId: "waterway-shadow"
    }),
    new PMTLayer({
      id: "blocks-9-14-zoom",
      data: BLOCK_URL,
      onHover: handleTooltipInfo,
      autoHighlight: true,
      autoHighlightColor: [255, 255, 255, 255],
      // autoHighlight: true,
      minZoom: 10,
      maxZoom: 13,
      //@ts-ignore
      getFillColor: blocksColorFunc,
      lineWidthMinPixels: 1,
      pickable: true,
      stroked: false,
      tileSize: 256,
      updateTriggers: {
        getFillColor: [blocksColorFunc],
      },
      loadOptions,
      beforeId: "waterway-shadow"
    }),
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", padding: 0, margin: 0 }}>
          
      <Map
        mapStyle="mapbox://styles/dhalpern/cl8n48kzu000a15p9o8z7wjmb"
        mapboxAccessToken={MAPBOX_TOKEN}
        maxBounds={[-50, -47, 80, 43]}
        reuseMaps={true}
        hash={true}
        onMoveEnd={(e) => {
          const z = e.viewState.zoom;
          setZ(Math.round(z));
        }}
      >

      <DeckGLOverlay layers={layers} interleaved={true} />
      {/* <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        onViewStateChange={(e) => {
          const { zoom } = e.viewState;
          setZ(Math.round(zoom));
        }}
        /> */}
        <NavigationControl />
      </Map>
        {/* </DeckGL> */}

      {!!Object.keys(tileContent) && (
        <pre
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            background: "rgba(255,255,255,0.9)",
            maxWidth: "300px",
            padding: "1em",
          }}
        >
          {JSON.stringify(tileContent, null, 2)}
        </pre>
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "rgba(255,255,255,0.9)",
          padding: "1em",
        }}
      >
        <h1 style={{ margin: "0 0 .5em 0", padding: 0 }}>
          Million Neighborhoods Data Explorer
        </h1>
        <p>
          <a href="https://miurban.uchicago.edu/">
            Mansueto Institute for Urban Innovation :: University of Chicago
          </a>
        </p>
        <br/>
        <hr/>
        <br/>
        <label id="variable-label">Choose a variable:</label>
        <select aria-labelledby="variable-label" onChange={e => setVariable(e.target.value)}>
          {mapVariables.map(f=> (
            <option value={f.name}>{f.name}</option>
          ))}
        </select>
        {/* <p style={{padding:'1rem'}}>
          {currSchema.description}
        </p> */}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: '2rem',
          left: 0,
          background: "rgba(255,255,255,0.9)",
          padding: "1em",
        }}
      >
        <h3 style={{ margin: "0 0 .5em 0", padding: 0 }}>{currSchema.name}</h3>
        {/* @ts-ignore */}
        <Tooltip columns={tooltipColumns} />
        <ColorRange colorScale={currSchema.colorMapping} />
      </div>
    </div>
  );
}
