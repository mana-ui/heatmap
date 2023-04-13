
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
    gapResolver: isOverlayying
  }) => {
    const ref = useRef();
    const [gap, setGap] = useState(1);
    const dataRef = useRef(data);

    useLayoutEffect(() => {
      let gap = 1
      const {children} = ref.current

      const isGapOK = (gap) => {
        for (let i = 0; i < children.length; i = i + gap) {
          const cur = children[i]
          const next = children[i + gap]
          if (next) {
            const curDim = cur.getBoundingClientRect()
            const nextDim = next.getBoundingClientRect()
            if (isOverlayying(curDim, nextDim)) {
              return false
            }
          }
        }      
        return true
      }

      while (!isGapOK(gap)) {
        gap += 1
      }

      setGap(gap)
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