import { create } from 'zustand';
import { MAP_STYLE } from '@/config';

export type Coordinate = {
  lat: number;
  lng: number;
};

type MapState = {
  map: any;
  mapType: any;

  setMap: (payload: any) => void;
  setMapType: (payload: any) => void;
};

export const useMapStore = create<MapState>((set) => ({
  map: null,
  mapType: MAP_STYLE.Statellite,

  setMap: (payload: any) => set(() => ({ map: payload })),
  setMapType: (payload: any) => set(() => ({ mapType: payload })),
}));
