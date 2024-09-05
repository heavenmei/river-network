import React, { useEffect, useState } from 'react';
import { Layer, RasterLayer, Source } from 'react-map-gl';
import { useMapStore } from '@/models/useMapStore';
import { WindLayer } from '@sakitam-gis/mapbox-wind';
import { WindLayerData } from '@/config';

const WaterLayer = (props) => {
  const [windLayer, setWindLayer] = useState<any>();
  const { map, waterFlow } = useMapStore();

  const init = async () => {
    try {
      const response = await fetch(WindLayerData);
      const data = await response.json();
      console.log(data);

      const _windLayer = new WindLayer('wind', data, {
        windOptions: {
          colorScale: [
            'rgb(36,104, 180)',
            'rgb(60,157, 194)',
            'rgb(128,205,193 )',
            'rgb(151,218,168 )',
            'rgb(198,231,181)',
            'rgb(238,247,217)',
            'rgb(255,238,159)',
            'rgb(252,217,125)',
            'rgb(255,182,100)',
            'rgb(252,150,75)',
            'rgb(250,112,52)',
            'rgb(245,64,32)',
            'rgb(237,45,28)',
            'rgb(220,24,32)',
            'rgb(180,0,35)',
          ],
          // velocityScale: 1 / 20,
          // paths: 5000,
          frameRate: 16,
          maxAge: 60,
          globalAlpha: 0.9,
          velocityScale: 0.01,
          // velocityScale: () => {
          // 	const zoom = map.getZoom();
          // 	return velocityScales[zoom] || 0.01
          // },
          // paths: 10000,
          paths: 3782,
        },
        fieldOptions: {
          wrapX: true,
        },
      });
      setWindLayer(_windLayer);
      map.addLayer(_windLayer);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  useEffect(() => {
    if (!map) return;
    if (waterFlow) {
      init();
    } else {
      map.removeLayer(windLayer?.id);
      windLayer?.remove();
    }
  }, [map, waterFlow]);

  return (
    <>
      {/* <Source id="water"> */}
      {/* <Layer {...waterLayer} /> */}
      {/* </Source> */}
    </>
  );
};
export default WaterLayer;
