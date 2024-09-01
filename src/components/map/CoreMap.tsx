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

const VITE_MAP_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const CoreMap = (props) => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    latitude: 30.832352,
    longitude: 120.921868,
    zoom: 12,
  });
  const [features, setFeatures] = useState({});
  const [hoverMarker, setHoverMarker] = useState({});
  const [districtPopup, setDistrictPopup] = useState<any>({
    visible: false,
    lntlat: [0, 0],
    data: {},
  });

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }

      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);
  useEffect(() => {
    console.log('onUpdate===', features);
  }, [features]);

  const onSelect = useCallback(
    (e) => {
      if (e.features.length === 0) return;

      console.log('onSelect===', e.features);
    },
    [mapRef]
  );

  const onClick = useCallback((evt) => {
    const lnglat = evt.lngLat;
  }, []);

  const onLoad = () => {
    const map = mapRef.current.getMap();
    const layers = map.getStyle().layers;

    console.log('onload===layers', layers);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    // setMap(mapRef.current.getMap());
  }, [mapRef.current]);

  function showPopup(e) {
    const features = e.features;
    if (!mapRef.current) return;

    const map = mapRef.current?.getMap();
    if (features.length > 0) {
      map.getCanvas().style.cursor = 'pointer';
      const properties = features[0].properties;
      const cityName = properties.name; // 城市名称

      setDistrictPopup({
        visible: false,
        lngLat: JSON.parse(properties.center),
        data: cityName,
      });
    } else {
      map.getCanvas().style.cursor = '';
    }
  }

  return (
    <>
      <Map
        {...viewState}
        ref={mapRef}
        mapboxAccessToken={VITE_MAP_TOKEN}
        projection={{
          name: 'equirectangular',
        }}
        mapStyle={MAP_STYLE.Statellite}
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
          showPopup(evt);
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

        <NavigationControl showCompass={false} />
      </Map>
    </>
  );
};

export default CoreMap;
