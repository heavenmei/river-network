import { create } from 'zustand';
import { MAP_STYLE, MapType } from '@/config';

export type Coordinate = {
  lat: number;
  lng: number;
};

type MapState = {
  map: any;
  mapType: any;
  waterFlow: boolean;

  setMap: (payload: any) => void;
  setMapType: (payload: any) => void;
  setWaterFlow: (payload: any) => void;
};

export const useMapStore = create<MapState>((set) => ({
  map: null,
  mapType: MapType[MAP_STYLE.Statellite],
  waterFlow: false,

  setMap: (payload: any) => set(() => ({ map: payload })),
  setMapType: (payload: any) => set(() => ({ mapType: payload })),
  setWaterFlow: (payload: any) => set(() => ({ waterFlow: payload })),
}));
