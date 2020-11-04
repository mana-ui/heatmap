import React, { useContext } from "react";
import Context from "./Context";
import Axis from './Axis'

export default function YAxis({ name, data = [], format }) {
  let {
    rect: [ox, oy, _, height],
    h,
  } = useContext(Context);
 
  return (
    <Axis
      start={{ x: ox - 0.5, y: oy }}
      end={{x: ox - 0.5, y: oy - height}}
      nameMatrix="6.123234262925839e-17,-1,1,6.123234262925839e-17,80,266.5"
      nameOffset={-6}
      name={name}
      data={data}
      labelMatrix={i => `1,2.4492937051703357e-16,-2.4492937051703357e-16,1,122,${oy - h / 2 - h * i}`}
      labelAnchor="end"
      format={format}
      gapResolver={(dim, nextDim) => dim.y - (nextDim.y + nextDim.height) < 5}
    />
  );
}
