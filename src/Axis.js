
import React, { useState, useRef, useLayoutEffect } from "react";
import Text from "./Text";

const Axis = ({
    start,
    end,
    nameMatrix,
    nameOffset,
    name,
    data,
    labelMatrix,
    labelAnchor,
    format,
    gapResolver
  }) => {
    const ref = useRef();
    const [gap, setGap] = useState(1);
    const dataRef = useRef(data);
    useLayoutEffect(() => {
      let g = gap;
      if (data !== dataRef.current) {
        g = 1;
      }
      const visibleNodes = [],
        { children } = ref.current;
      for (let i = 0; i < children.length; i++) {
        if (i % g === 0) {
          visibleNodes.push(children[i]);
        }
      }
      for (let i = 0; i < visibleNodes.length; i++) {
        const node = visibleNodes[i];
        const next = visibleNodes[i + 1];
        if (next) {
          const dim = node.getBoundingClientRect();
          const nextDim = next.getBoundingClientRect();
          if (gapResolver(dim, nextDim)) {
            g += 1;
            break;
          }
        }
      }
      if (g !== gap) {
        setGap(g);
      }
    });
    return (
      <>
        <path
          d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
          fill="none"
          stroke="#333"
          strokeWidth={1}
          paintOrder="fill"
          strokeOpacity={1}
          strokeDasharray
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeMiterlimit={10}
        />
        <Text matrix={nameMatrix} y={nameOffset} textAnchor="middle">
          {name}
        </Text>
        <g ref={ref}>
          {data.map((l, i) => (
            <Text
              matrix={labelMatrix(i)}
              textAnchor={labelAnchor}
              style={{ visibility: i % gap === 0 ? "visible" : "hidden" }}
            >
              {format(l)}
            </Text>
          ))}
        </g>
      </>
    );
  };
  
  export default Axis