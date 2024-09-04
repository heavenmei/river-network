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
import mapboxgl from 'mapbox-gl';
import { WaterGateData } from '@/config';

const MakerLayer = (props) => {
  const [lngLat, setlngLat] = useState();
  const { map } = useMapStore();

  const symbolLayer: SymbolLayer = {
    id: 'water-gate-blue',
    type: 'symbol',
    source: 'points',
    layout: {
      'icon-image': 'custom-marker-1', // 使用自定义图标
      'icon-size': 0.5,
      // 'text-field': '{class}', // 假设 GeoJSON 数据中有一个 "class" 属性
      // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      // 'text-offset': [0, 0.6],
      // 'text-anchor': 'top',
    },
    filter: ['in', 'class', 'bluegate', 'blueslucie']
  };
  const circleLayer: SymbolLayer = {
    id: 'water-gate-red',
    type: 'symbol',
    source: 'points',
    layout: {
      'icon-image': 'custom-marker-2', // 使用自定义图标
      'icon-size': 0.5,
      // 'text-field': '{class}', // 假设 GeoJSON 数据中有一个 "class" 属性
      // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      // 'text-offset': [0, 0.6],
      // 'text-anchor': 'top',
    },
    filter: ['in', 'class', 'redgate', 'redslucie']
  };

  const onClick = (e) => {
    var feature = e.features[0];
    console.log('🚨 ~ onClick ~ feature:', feature);
  };

  const popup = new mapboxgl.Popup({
    closeButton: false,
    offset: [0, 0],
    className: 'poi-popup',
  });

  // useEffect(() => {
  //   if (!map) return;
  //   map?.on('mousemove', 'water-gate', function (e) {
  //     var feature = e.features[0];
  //     // if (feature.properties.class.includes('blue')) {
  //       popup
  //         .setLngLat(e.lngLat)
  //         .setHTML(`<strong>${feature.properties.class} ${feature.geometry.coordinates}</strong>`)
  //         .addTo(map);
  //     // }

  //   });

  //   map?.on('click', 'water-gate', function (e) {
  //     onClick(e);
  //   });

  //   map?.on('mouseleave', 'water-gate', function () {
  //     popup.remove();
  //   });
  //   return () => {
  //     map?.off('mousemove', 'water-gate');
  //     map?.off('click', 'water-gate');
  //     map?.off('mouseleave', 'water-gate');
  //   };
  // }, [map]);
  useEffect(() => {
    if (!map) return;

    map.on('mousemove', 'water-gate-blue', function (e) {
      var feature = e.features[0];
      if (feature.properties.class.includes('blue')) {
        popup
          .setLngLat(e.lngLat)
          .setHTML(`<strong>${feature.properties.class} ${feature.geometry.coordinates}</strong>`)
          .addTo(map);
      }
    });

    map.on('mousemove', 'water-gate-red', function (e) {
      var feature = e.features[0];
      if (feature.properties.class.includes('red')) {
        popup
          .setLngLat(e.lngLat)
          .setHTML(`<strong>${feature.properties.class} ${feature.geometry.coordinates}</strong>`)
          .addTo(map);
      }
    });

    map.on('click', 'water-gate-blue', function (e) {
      onClick(e);
    });

    map.on('click', 'water-gate-red', function (e) {
      onClick(e);
    });

    map.on('mouseleave', 'water-gate-blue', function () {
      popup.remove();
    });

    map.on('mouseleave', 'water-gate-red', function () {
      popup.remove();
    });

    return () => {
      map.off('mousemove', 'water-gate-blue');
      map.off('mousemove', 'water-gate-red');
      map.off('click', 'water-gate-blue');
      map.off('click', 'water-gate-red');
      map.off('mouseleave', 'water-gate-blue');
      map.off('mouseleave', 'water-gate-red');
    };
  }, [map]);
  return (
    <>
      <Source id="points" type="geojson" data={WaterGateData}>
        <Layer {...symbolLayer} />
        <Layer {...circleLayer} />
      </Source>
    </>
  );
};
export default MakerLayer;
