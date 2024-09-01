import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Grid, Radio, Select, Slider } from '@arco-design/web-react';
import { IconCheckCircle, IconCopy } from '@arco-design/web-react/icon';

const RadioGroup = Radio.Group;
const Row = Grid.Row;
const Col = Grid.Col;
const Option = Select.Option;

const SideBar = () => {
  const [topK, setTopK] = useState<number | number[]>(3);
  const [category, setCategory] = useState<any>({});
  const [selectCat, setSelectCat] = useState<string>();

  return (
    <div className="sidebar-main mx-4">
      <div className="subtitle flex justify-between">Parameter setting</div>
    </div>
  );
};
export default SideBar;
