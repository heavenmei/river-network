import React, { useCallback, useMemo, useState } from 'react';
import { useEffect, useRef } from 'react';
import Map, {
  MapProvider,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  Popup,
  Source,
  Layer,
  Marker,
  useControl,
} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { MAP_STYLE } from '@/config';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useMapStore } from '@/models/useMapStore';
import MarkerLayer from './MarkerLayer';

import GateIcon from '@/assets/img/water-gate2.png';
import BoundaryLayer from './BoundaryLayer';
import WaterLayer from './WaterLayer';

const VITE_MAP_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const CoreMap = (props) => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    latitude: 30.832352,
    longitude: 120.921868,
    zoom: 10,
  });
  const { mapType, setMap } = useMapStore();

  const onClick = useCallback((evt) => {
    const lnglat = evt.lngLat;
  }, []);

  const onLoad = () => {
    const map = mapRef.current.getMap();
    const layers = map.getStyle().layers;

    map.loadImage(GateIcon, (error, image) => {
      if (error) throw error;
      if (!map.hasImage('custom-marker')) {
        map.addImage('custom-marker', image);
      }
    });

    console.log('onload===layers', layers);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    setMap(mapRef.current.getMap());
  }, [mapRef.current]);

  return (
    <>
      <Map
        {...viewState}
        ref={mapRef}
        mapboxAccessToken={VITE_MAP_TOKEN}
        projection={{
          name: 'equirectangular',
        }}
        mapStyle={mapType}
        // interactiveLayerIds={['points']}
        onLoad={onLoad}
        onMove={(evt) => {
          setViewState(evt.viewState);
          // console.log(evt.viewState);
        }}
        interactiveLayerIds={['district']}
        onMouseMove={(evt) => {
          // setHoverCoord(evt.lngLat);
          // changeLocation(evt.lngLat);
          // showPopup(evt);
        }}
        onMoveEnd={() => {
          // console.log('====onMoveEnd');
        }}
        onClick={onClick}
        // onMouseEnter={onMouseEnter}
        // onMouseLeave={onMouseLeave}
        onStyleData={() => {}}
      >
        {/* <ImgLayer id="heatmap" imgUrl={heatMapImg} /> */}
        <MarkerLayer />
        <BoundaryLayer />
        <WaterLayer />

        <NavigationControl showCompass={false} />
      </Map>
    </>
  );
};

export default CoreMap;
