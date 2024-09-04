import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Grid, Radio, Select, Slider } from '@arco-design/web-react';
import { MAP_STYLE, MapType } from '@/config';
import { useMapStore } from '@/models/useMapStore';

const RadioGroup = Radio.Group;
const SideBar = () => {
  const [category, setCategory] = useState<any>({});
  const [selectCat, setSelectCat] = useState<string>();
  const { mapType, setMapType } = useMapStore();

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
    </>
  );
};
export default SideBar;
