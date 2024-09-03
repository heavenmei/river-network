import React, { useEffect, useState } from 'react';
import { Layer, LineLayer, Source } from 'react-map-gl';
import _ from 'lodash';
import { BoundaryData } from '@/config';

const BoundaryLayer = (props) => {
  const [data, setData] = useState<any>();

  const lineLayer: LineLayer = {
    id: 'boundary-line',
    type: 'line',
    source: 'boundary',
    layout: {},
    paint: {
      'line-color': 'blue',
      'line-width': 4,
    },
  };

  const getGeoJson = async () => {
    try {
      const response = await fetch(BoundaryData);
      const coordinates = await response.json();

      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates],
            },
            properties: {},
          },
        ],
      };
      setData(geojson);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  useEffect(() => {
    getGeoJson();
  }, []);

  return (
    <>
      <Source id="boundary" type="geojson" data={data}>
        <Layer {...lineLayer} />
      </Source>
    </>
  );
};
export default BoundaryLayer;
