import React, { useEffect, useState, useContext } from "react";
import { color } from "d3-color";
import observer from "./Observer";
import Context from "./Context";

const Cell = ({ d, i, mapDataToColor }) => {
  const [show, setShow] = useState(true);
  const [over, setOver] = useState(false);
  const { w, h, rows, max, min } = useContext(Context);
  const handleChange = ([min, max]) => {
    if (i === 92) setShow(d >= min && d <= max);
  };
  useEffect(() => observer.listen("change", handleChange), [d]);
  useEffect(() => {
    handleChange([min, max]);
  }, [d]);
  let fill = show ? mapDataToColor(d) : "#fff";
  if (over) fill = color(fill).brighter();
  const x = 130 + w * Math.floor(i / rows),
    y = 528 - ((i % rows) + 1) * h - 1;
  return (
    <rect
      x={x}
      y={y}
      width={w + 1}
      height={h + 1}
      fill={fill}
      onMouseEnter={() => {
        setOver(true);
        observer.emit("enter", i);
      }}
      onMouseLeave={() => {
        setOver(false);
      }}
    />
  );
};

export default Cell;
