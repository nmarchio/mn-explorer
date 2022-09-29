import { useState, useMemo } from "react";
import DeckGL from "@deck.gl/react/typed";
import {
  PMTLayer,
} from "@maticoapp/deck.gl-pmtiles";
import {MapboxOverlay, MapboxOverlayProps} from '@deck.gl/mapbox/typed';
//@ts-ignore
import Map, {NavigationControl, useControl} from 'react-map-gl';
import { Config } from './config';
import { ConfigSpec, generateColorFunc, BgTileLayer, INITIAL_VIEW_STATE } from './utils';
import { ColorRange } from "./ColorRange";
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

function DeckGLOverlay(props: MapboxOverlayProps & {
  interleaved?: boolean;
}) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const loadOptions = {
  pmt: {
    // workerUrl: "/node_modules/@loaders.gl/mvt/dist/mvt-worker.js",
    maxConcurrency:
      typeof navigator !== "undefined"
        ? navigator.hardwareConcurrency - 1
        : 3,
    maxMobileConcurrency:
      typeof navigator !== "undefined"
        ? navigator.hardwareConcurrency - 1
        : 3,
  },
}

export default function App() {
  const [tileContent, setTileContent] = useState({})
  const [z, setZ] = useState(INITIAL_VIEW_STATE.zoom)
  const zTransitionLevel = 7
  const numZfade = 4
  const colorScale = "warm";
  const kComplexityDomain =  [0, 30] as [number,number]
  
  const regionsColorFunc = generateColorFunc(colorScale, kComplexityDomain, "k_complexity_landscan_un");
  const blocksColorFunc = generateColorFunc(colorScale, kComplexityDomain, "k_complexity");
  const zInterpolation = useMemo(() => Math.max(0, Math.min((z-zTransitionLevel)/numZfade, 1)), [z, zTransitionLevel, numZfade])

  const layers = [
    new PMTLayer({
      id: "regions-0-10-zoom",
      data: 'https://d386ho3t0q1oea.cloudfront.net/regions.pmtiles',
      onHover: ({ object }) => { setTileContent(object ? object : {}) },
      maxZoom: 10,
      minZoom: 0,
      filled: true,
      //@ts-ignore
      getFillColor: regionsColorFunc,
      stroked: true,
      getLineColor: z > 7 ? [40,40,40,zInterpolation*255] : [0,0,0,0],
      lineWidthMinPixels: 1,
      pickable: true,
      tileSize: 256,
      beforeId: 'waterway-shadow',
      updateTriggers: {
        stroked: z,
        filled: z
      },
      loadOptions
    }),
    new PMTLayer({
      id: "blocks-8-14-zoom",
      data: 'https://d386ho3t0q1oea.cloudfront.net/block_8_14.pmtiles',
      onHover: ({ object }) => { setTileContent(object ? object : {}) },
      // autoHighlight: true,
      maxZoom: 14,
      minZoom: 8,
      //@ts-ignore
      getFillColor: v => [...blocksColorFunc(v), 255*zInterpolation],
      stroked: !colorScale,
      lineWidthMinPixels: 1,
      pickable: true,
      tileSize: 256,
      beforeId: 'waterway-shadow',
      updateTriggers: {
        getFillColor: zInterpolation
      },
      loadOptions
    }),
  ];

  return (
    <div style={{ width: "100%", height: "100vh", padding:0, margin:0 }}>
      
    <Map
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle="mapbox://styles/dhalpern/cl8n48kzu000a15p9o8z7wjmb?fresh=true"
      mapboxAccessToken={MAPBOX_TOKEN}
      hash={true}
      onMoveEnd={(e) => {
        const {zoom} = e.viewState;
        setZ(zoom)
      }}
      maxBounds={[-50,-47,80,43]}
      reuseMaps={true}
    >
      <DeckGLOverlay layers={layers} interleaved={true} />
      <NavigationControl />
    </Map>
      {!!Object.keys(tileContent)
        &&
        <pre style={{ position: 'fixed', top: 0, right: 0, background: 'rgba(255,255,255,0.9)', maxWidth: '300px', padding: '1em' }}>
          {JSON.stringify(tileContent, null, 2)}
        </pre>
      }
      {/* {(!!colorScale && !!property && !!colorDomain) && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, background: 'rgba(255,255,255,0.9)', padding: '1em' }}>
          <h1 style={{ margin: '0 0 .5em 0', padding: 0 }}>{property}</h1>
          <ColorRange colorFunction={colorFunction} colorDomain={colorDomain} property={property} />
        </div>
      )} */}
    </div>
  );
}
