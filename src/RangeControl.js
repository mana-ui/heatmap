import React, { useRef, useImperativeHandle, forwardRef } from "react";
import useControl from "./useControl";

const matrix = (y) => `matrix(1,0,0,-1,25,${y})`;

const Handle = forwardRef(({ end, fill, init, update }, ref) => {
  const handleRef = useRef();
  const blockRef = useRef();
  useImperativeHandle(ref, () => ({
    elem: handleRef.current,
    move(pos) {
      handleRef.current.setAttributeNS(null, "transform", matrix(pos));
      update(blockRef.current, pos);
    },
  }));
  return (
    <>
      <path
        ref={handleRef}
        d={`M 0 0 L 12 0 L 12 ${end} Z`}
        fill={fill}
        transform={matrix(init)}
        style={{ cursor: "ns-resize" }}
      />
      <rect
        ref={blockRef}
        x={0}
        y={0}
        width={20}
        height={0}
        fill="#aaaaaa"
        transform={`matrix(1,0,0,-1,5,${init})`}
      />
    </>
  );
});

const RangeControl = () => {
  const minRef = useRef();
  const maxRef = useRef();
  useControl({
    minRef,
    maxRef,
    max: 354,
    min: 214,
  });
  return (
    <>
      <Handle
        end={12}
        fill="rgba(165,0,38,1)"
        init={214}
        ref={maxRef}
        update={(elem, pos) => {
          const h = pos - 214;
          elem.setAttributeNS(null, "height", h);
          elem.setAttributeNS(null, "y", -h);
        }}
      />
      <Handle
        end={-12}
        fill="rgba(49,54,149,1)"
        init={354}
        ref={minRef}
        update={(elem, pos) => {
          const h = 354 - pos;
          elem.setAttributeNS(null, "height", h);
        }}
      />
    </>
  );
};

export default RangeControl;
