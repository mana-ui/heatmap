import React, { useContext } from "react";
import Context from "./Context";
import Axis from './Axis'

export default function XAxis({ name, data = [], format }) {
  let {
    rect: [ox, oy, width],w,
  } = useContext(Context);
  
  const end = {};
    oy += 0.5;
    end.x = ox + width;
    end.y = oy;
  
  return (
    <Axis
      start={{ x: ox, y: oy }}
      end={{x: end.x, y: oy}}
      nameMatrix="1,0,0,1,434,553"
      nameOffset={6}
      name={name}
      data={data}
      labelMatrix={i => `1,0,0,1,${ox + w / 2 + w * i},542`}
      labelAnchor="middle"
      format={format}
      gapResolver={(dim, nextDim) => dim.x + dim.width > nextDim.x}
    />
  )
}
