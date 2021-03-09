import React, { useRef, useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import throttle from "lodash.throttle";
import observer from "./Observer";

const Container = ({
  children,
  content,
  onDrawRect,
  rects,
  svgContainer,
  tools,
}) => {
  const svgRef = useRef();
  const container = useRef();
  const tooltipRef = useRef();
  const [pos, setPos] = useState(null);
  const [current, setCurrent] = useState(0);
  const rs = useMemo(
    () =>
      rects.map((rect, index) => (
        <div
          style={{
            position: "absolute",
            top: rect.rectDim.y,
            left: rect.rectDim.x,
          }}
        >
          {tools(rect, index)}
        </div>
      )),
    [rects]
  );

  const moveTooltip = throttle((evt) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.left = evt.clientX + "px";
      tooltipRef.current.style.top = evt.clientY + "px";
    }
  }, 100);
  useEffect(() => {
    const unlisten = observer.listen("enter", setCurrent);
    const elem = document.createElement("div");
    container.current = elem;
    document.body.appendChild(elem);
    return () => {
      document.body.removeChild(elem);
      unlisten();
    };
  }, []);
  const pathRef = useRef(null);
  const transformCood = ({ clientX, clientY }) => {
    const clientRect = svgRef.current.getBoundingClientRect();
    const bBox = svgRef.current.getBBox();
    return {
      x: clientX - clientRect.x + bBox.x,
      y: clientY - clientRect.y + bBox.y,
    };
  };

  const createShape = (type) => {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", type);
    shape.setAttributeNS(null, "stroke", "#00ff48");
    shape.setAttributeNS(null, "fill", "none");
    shape.style["pointer-events"] = "none";
    svgRef.current.appendChild(shape);
    return shape;
  };
  const drawRect = (evt) => {
    const path = createShape("path");
    const start = transformCood(evt);
    const { target } = evt;
    const startShape = {
      x: target.x.baseVal.value,
      y: target.y.baseVal.value,
      width: target.width.baseVal.value,
      height: target.height.baseVal.value,
    };
    pathRef.current = {
      elem: path,
      start,
      index: Array.prototype.indexOf.call(target.parentNode.children, target),
      startShape,
    };
  };

  return (
    <>
      <g
        ref={svgRef}
        onMouseEnter={() => setPos({})}
        onMouseLeave={() => {
          setPos(null);
          if (pathRef.current) {
            svgRef.current.removeChild(pathRef.current.elem);
            pathRef.current = null;
          }
        }}
        onMouseDown={drawRect}
        onMouseMove={(evt) => {
          const { clientX, clientY } = evt;
          moveTooltip({ clientX, clientY });
          if (pathRef.current) {
            const { elem, start } = pathRef.current;
            const end = transformCood(evt);
            elem.setAttributeNS(
              null,
              "d",
              `M ${start.x},${start.y} L ${end.x},${start.y} L ${end.x},${end.y}, L ${start.x},${end.y} Z`
            );
          }
        }}
        onMouseUp={(evt) => {
          if (pathRef.current) {
            const { target } = evt;
            const startShape = pathRef.current.startShape;
            const end = {
              x: target.x.baseVal.value,
              y: target.y.baseVal.value,
            };
            const rectDim = {
              x: Math.min(startShape.x, end.x),
              y: Math.min(startShape.y, end.y),
              width: Math.abs(end.x - startShape.x) + startShape.width,
              height: Math.abs(end.y - startShape.y) + startShape.height,
            };
            svgRef.current.removeChild(pathRef.current.elem);
            onDrawRect(
              pathRef.current.index,
              Array.prototype.indexOf.call(target.parentNode.children, target),
              rectDim
            );
            pathRef.current = null;
          }
        }}
      >
        {children}
        {rects.map(({ rectDim }) => (
          <rect
            {...rectDim}
            style={{ pointerEvents: "none" }}
            stroke="#00ff48"
            fill="none"
          />
        ))}
      </g>
      {svgContainer && createPortal(rs, svgContainer)}
      {pos &&
        createPortal(
          <div
            ref={tooltipRef}
            style={{
              position: "absolute",
              borderStyle: "solid",
              whiteSpace: "nowrap",
              zIndex: 9999999,
              transition:
                "left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s",
              backgroundColor: "rgba(50,50,50, .7)",
              borderWidth: 0,
              borderColor: "rgb(51,51,51)",
              borderRadius: 4,
              color: "#fff",
              font: "14px / 21px sans-serif",
              padding: 5,
              pointerEvents: "none",
              top: pos.top,
              left: pos.left,
              transform: "translateY(-110%)",
            }}
          >
            {content(current)}
          </div>,
          container.current
        )}
    </>
  );
};

export default Container;
