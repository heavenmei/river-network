export enum MAP_STYLE {
  My = 'mapbox://styles/heavenmei117/clurzjfa800ee01pb8qs7a187',
  Street = 'mapbox://styles/mapbox/streets-v12',
  Light = 'mapbox://styles/mapbox/light-v11',
  StepLine = 'mapbox://styles/mapbox/navigation-day-v1',
  Statellite = 'mapbox://styles/mapbox/satellite-streets-v12',
}
// top-left top-right bottom-right bottom-left
export const imgLatLngBound = [
  [120.8, 31.898],
  [122.16, 31.898],
  [122.16, 30.66],
  [120.8, 30.66],
];
export const heatImgSize: [number, number] = [4000, 4200];

export const mapTiles = {
  base: `https://api.mapbox.com/styles/v1/heavenmei117/clurxbque00v401qqfgbjar0i/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGVhdmVubWVpMTE3IiwiYSI6ImNscTM1dGo2YjA5Zmgyam1zenZkc2dkc24ifQ.07c6UE5RFGkwlJ3rg_vMeA&fresh=true`,
  roadOnly:
    'https://api.mapbox.com/styles/v1/billchen2k/clfdky8k2001301pi5r1wiwzu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmlsbGNoZW4yayIsImEiOiJja3R2MDBwNWgyNDljMnBvMmdzbnU0dTZ5In0.To49SgD0gHYceQ8Ap2BG3g',
};
export const throttleTime = 100;

// export const WindLayerData =
//   'https://blog.sakitam.com/wind-layer/data/wind.json';
// const WindLayerData = '/data/bornData_16_AIEarth.json';
export const WindLayerData = '/data/wind.json';

export const BoundaryData = '/data/EdgePoints.json';

export const WaterGateData = '/data/watergate.json';
