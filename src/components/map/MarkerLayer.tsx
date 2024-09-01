import React, { useEffect, useState } from 'react';
import {
  CircleLayer,
  FillLayer,
  Layer,
  LineLayer,
  Marker,
  Popup,
  RasterLayer,
  Source,
  SymbolLayer,
} from 'react-map-gl';
import _ from 'lodash';
import { useMapStore } from '@/models/useMapStore';
import GateIcon from '@/assets/img/water-gate2.png';
import mapboxgl from 'mapbox-gl';

const DataFile = '../../../public/data/watergate.json';

const MakerLayer = (props) => {
  const [lngLat, setlngLat] = useState();
  const { map } = useMapStore();

  const symbolLayer: SymbolLayer = {
    id: 'water-gate',
    type: 'symbol',
    source: 'points',
    layout: {
      'icon-image': 'custom-marker', // 使用自定义图标
      'icon-size': 1,
      // 'text-field': '{class}', // 假设 GeoJSON 数据中有一个 "class" 属性
      // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      // 'text-offset': [0, 0.6],
      // 'text-anchor': 'top',
    },
  };
  const circleLayer: CircleLayer = {
    id: 'points',
    type: 'circle',
    source: 'points',
    paint: {
      'circle-color': 'red',
      'circle-radius': 2,
    },
  };

  const popup = new mapboxgl.Popup({
    closeButton: false,
    offset: [0, -10],
    className: 'poi-popup',
  });

  useEffect(() => {
    if (!map) return;
    map?.on('mousemove', 'water-gate', function (e) {
      var feature = e.features[0];
      popup
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${feature.properties.class}</strong>`)
        .addTo(map);
    });

    map?.on('mouseleave', 'scatter', function () {
      popup.remove();
    });
  }, [map]);

  return (
    <>
      <Source id="points" type="geojson" data={DataFile}>
        <Layer {...symbolLayer} />
        {/* <Layer {...circleLayer} /> */}
      </Source>
    </>
  );
};
export default MakerLayer;
