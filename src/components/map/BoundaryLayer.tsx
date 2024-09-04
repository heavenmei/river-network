import React, { useEffect, useState } from 'react';
import { Layer, LineLayer, Source } from 'react-map-gl';
import _ from 'lodash';
import { BoundaryData } from '@/config';
import coordtransform from 'coordtransform';

const BoundaryLayer = (props) => {
  const [data, setData] = useState<any>();

  const lineLayer: LineLayer = {
    id: 'boundary-line',
    type: 'line',
    source: 'boundary',
    layout: {},
    paint: {
      'line-color': '#87CEFA',
      'line-width': 2,
    },
  };

  const getGeoJson = async () => {
    try {
      const response = await fetch(BoundaryData);
      const coordinates = await response.json();
      const convertedCoordinates = coordinates.map(coord => {
        const bd09Lng = coord[0];
        const bd09Lat = coord[1];
        // coordtransform.bd09togcj02方法可以将BD09坐标转换为GCJ02坐标
        const gcj02Coord = coordtransform.bd09togcj02(bd09Lng, bd09Lat);
        // coordtransform.gcj02towgs84方法可以将GCJ02坐标转换为WGS84坐标
        return coordtransform.gcj02towgs84(gcj02Coord[0], gcj02Coord[1]);
      });
      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [convertedCoordinates],
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
