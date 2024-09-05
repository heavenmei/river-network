import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Grid,
  Radio,
  Select,
  Slider,
  Switch,
} from '@arco-design/web-react';
import { MAP_STYLE, MapType } from '@/config';
import { useMapStore } from '@/models/useMapStore';

const RadioGroup = Radio.Group;
const SideBar = () => {
  const { mapType, waterFlow, setMapType, setWaterFlow } = useMapStore();

  return (
    <>
      <div className="subtitle flex justify-between">参数设置</div>
      <div>
        <RadioGroup
          type="button"
          size="mini"
          value={mapType}
          onChange={(value) => setMapType(value)}
        >
          {Object.entries(MapType).map((item) => {
            return (
              <Radio value={item[1]} key={item[0]}>
                {item[0]}
              </Radio>
            );
          })}
        </RadioGroup>
      </div>

      <div className="subtitle flex justify-between">开启水域流线</div>
      <div>
        <Switch checked={waterFlow} onChange={(value) => setWaterFlow(value)} />
      </div>
    </>
  );
};
export default SideBar;
