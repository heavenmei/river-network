import { WEB_DOMAIN, get, post } from './request';
import {
  HeatmapReqType,
  InfoType,
  SalientAreaResp,
  TemplateType,
} from './type';

export function getMeasures(req: any): Promise<InfoType> {
  const uri = `/pipeline/measures`;
  return get(uri, { question: req });
}

export const getHeatmapURL = `${WEB_DOMAIN}/pipeline/getHeatMap`;

export function getSalientAreas(payload: HeatmapReqType): Promise<any> {
  const uri = `/pipeline/salientArea`;
  return get(uri, payload);
}

export function getDistrictArea(payload: HeatmapReqType): Promise<any> {
  const uri = `/pipeline/districtArea`;
  return get(uri, payload);
}
export function getTimeStep(uid: string): Promise<TemplateType> {
  const uri = `/pipeline/getTimeStep`;
  return get(uri, { uid: uid });
}

export function getTreeStep(uid: string): Promise<TemplateType> {
  const uri = `/pipeline/getTreeStep`;
  return get(uri, { uid: uid });
}

export function postSelectCircle(req: any): Promise<any> {
  const uri = `/pipeline/selectCircle`;
  return post(uri, req);
}
