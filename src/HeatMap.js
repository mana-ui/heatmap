import React, { useRef } from "react";
import Context from "./Context";
import RangeControl from "./RangeControl";
import { interpolateRgbBasis } from "d3-interpolate";
import observer from "./Observer";
import Cell from "./Cell";
import Container from "./Container";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

const width = 550,
  height = 523;

export default function HeatMap({
  className,
  data,
  colors,
  tooltip: tooltipFormatter,
  xAxis,
  yAxis,
  onDrawRect,
  rects,
  tools,
}) {
  const svgContainer = useRef();
  const min = Math.min.apply(null, data);
  const max = Math.max.apply(null, data);
  const columns = xAxis.data.length,
    rows = yAxis.data.length;
  const w = width / columns,
    h = height / rows;
  const value = {
    rect: [130, 528, width, height],
    min,
    max,
    w,
    h,
    rows,
  };
  const block = max - min;
  const interpolator = interpolateRgbBasis(colors);
  const mapDataToColor = (d) => {
    const offset = d - min;
    return interpolator(offset / block);
  };
  const eventHandler = (evt) => {
    observer.emit("event", evt);
  };
  const getX = (current) => xAxis.data[Math.floor(current / rows)];
  const getY = (current) => yAxis.data[current % rows];
  return (
    <Context.Provider value={value}>
      <div style={{ position: "relative" }} ref={svgContainer}>
        <svg
          version="1.1"
          baseProfile="full"
          width="680"
          height="568"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          viewBox="0 0 680 568"
          onMouseDown={eventHandler}
          onMouseMove={eventHandler}
          onMouseUp={eventHandler}
          onMouseLeave={eventHandler}
        >
          <XAxis {...xAxis} />
          <YAxis {...yAxis} />
          <Container
            svgContainer={svgContainer.current}
            content={(current) =>
              tooltipFormatter({
                xLabel: xAxis.label,
                yLabel: yAxis.label,
                x: getX(current),
                y: getY(current),
                index: current,
              })
            }
            onDrawRect={(start, end, rectDim) =>
              onDrawRect({
                data: [
                  [getX(start), getY(start)],
                  [getX(end), getY(end)],
                ],
                rectDim,
              })
            }
            tools={tools}
            rects={rects}
          >
            {data.map((d, i) => (
              <Cell d={d} i={i} mapDataToColor={mapDataToColor} />
            ))}
          </Container>
          <path
            d="M 0 0 L 20 0 L 20 140 L 0 140 Z"
            transform="matrix(1,0,0,-1,5,354)"
            fill="url(#zr6750-gradient-3)"
          />
          <RangeControl />
          <defs>
            <linearGradient
              id="zr6750-gradient-3"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="#313695" stopOpacity="1"></stop>
              <stop offset="1%" stopColor="#333c98" stopOpacity="1"></stop>
              <stop offset="2%" stopColor="#35439b" stopOpacity="1"></stop>
              <stop offset="3%" stopColor="#37499e" stopOpacity="1"></stop>
              <stop offset="4%" stopColor="#394fa1" stopOpacity="1"></stop>
              <stop offset="5%" stopColor="#3b56a5" stopOpacity="1"></stop>
              <stop offset="6%" stopColor="#3d5ca8" stopOpacity="1"></stop>
              <stop
                offset="7.000000000000001%"
                stopColor="#3f62ab"
                stopOpacity="1"
              ></stop>
              <stop offset="8%" stopColor="#4168ae" stopOpacity="1"></stop>
              <stop offset="9%" stopColor="#436fb1" stopOpacity="1"></stop>
              <stop offset="10%" stopColor="#4575b4" stopOpacity="1"></stop>
              <stop offset="11%" stopColor="#4a7bb7" stopOpacity="1"></stop>
              <stop offset="12%" stopColor="#4e80ba" stopOpacity="1"></stop>
              <stop offset="13%" stopColor="#5386bd" stopOpacity="1"></stop>
              <stop
                offset="14.000000000000002%"
                stopColor="#588bc0"
                stopOpacity="1"
              ></stop>
              <stop offset="15%" stopColor="#5d91c3" stopOpacity="1"></stop>
              <stop offset="16%" stopColor="#6197c5" stopOpacity="1"></stop>
              <stop offset="17%" stopColor="#669cc8" stopOpacity="1"></stop>
              <stop offset="18%" stopColor="#6ba2cb" stopOpacity="1"></stop>
              <stop offset="19%" stopColor="#6fa7ce" stopOpacity="1"></stop>
              <stop offset="20%" stopColor="#74add1" stopOpacity="1"></stop>
              <stop offset="21%" stopColor="#7ab1d3" stopOpacity="1"></stop>
              <stop offset="22%" stopColor="#7fb6d6" stopOpacity="1"></stop>
              <stop offset="23%" stopColor="#85bad8" stopOpacity="1"></stop>
              <stop offset="24%" stopColor="#8abfdb" stopOpacity="1"></stop>
              <stop offset="25%" stopColor="#90c3dd" stopOpacity="1"></stop>
              <stop offset="26%" stopColor="#95c7df" stopOpacity="1"></stop>
              <stop offset="27%" stopColor="#9bcce2" stopOpacity="1"></stop>
              <stop
                offset="28.000000000000004%"
                stopColor="#a0d0e4"
                stopOpacity="1"
              ></stop>
              <stop
                offset="28.999999999999996%"
                stopColor="#a6d5e7"
                stopOpacity="1"
              ></stop>
              <stop offset="30%" stopColor="#abd9e9" stopOpacity="1"></stop>
              <stop offset="31%" stopColor="#b0dceb" stopOpacity="1"></stop>
              <stop offset="32%" stopColor="#b6deec" stopOpacity="1"></stop>
              <stop offset="33%" stopColor="#bbe1ee" stopOpacity="1"></stop>
              <stop offset="34%" stopColor="#c0e3ef" stopOpacity="1"></stop>
              <stop offset="35%" stopColor="#c6e6f1" stopOpacity="1"></stop>
              <stop offset="36%" stopColor="#cbe9f2" stopOpacity="1"></stop>
              <stop offset="37%" stopColor="#d0ebf4" stopOpacity="1"></stop>
              <stop offset="38%" stopColor="#d5eef5" stopOpacity="1"></stop>
              <stop offset="39%" stopColor="#dbf0f7" stopOpacity="1"></stop>
              <stop offset="40%" stopColor="#e0f3f8" stopOpacity="1"></stop>
              <stop offset="41%" stopColor="#e3f4f2" stopOpacity="1"></stop>
              <stop offset="42%" stopColor="#e6f5ed" stopOpacity="1"></stop>
              <stop offset="43%" stopColor="#e9f7e7" stopOpacity="1"></stop>
              <stop offset="44%" stopColor="#ecf8e1" stopOpacity="1"></stop>
              <stop offset="45%" stopColor="#f0f9dc" stopOpacity="1"></stop>
              <stop offset="46%" stopColor="#f3fad6" stopOpacity="1"></stop>
              <stop offset="47%" stopColor="#f6fbd0" stopOpacity="1"></stop>
              <stop offset="48%" stopColor="#f9fdca" stopOpacity="1"></stop>
              <stop offset="49%" stopColor="#fcfec5" stopOpacity="1"></stop>
              <stop offset="50%" stopColor="#ffffbf" stopOpacity="1"></stop>
              <stop offset="51%" stopColor="#fffcba" stopOpacity="1"></stop>
              <stop offset="52%" stopColor="#fff9b6" stopOpacity="1"></stop>
              <stop offset="53%" stopColor="#fff6b1" stopOpacity="1"></stop>
              <stop offset="54%" stopColor="#fff3ac" stopOpacity="1"></stop>
              <stop
                offset="55.00000000000001%"
                stopColor="#fff0a8"
                stopOpacity="1"
              ></stop>
              <stop
                offset="56.00000000000001%"
                stopColor="#feeca3"
                stopOpacity="1"
              ></stop>
              <stop
                offset="56.99999999999999%"
                stopColor="#fee99e"
                stopOpacity="1"
              ></stop>
              <stop
                offset="57.99999999999999%"
                stopColor="#fee699"
                stopOpacity="1"
              ></stop>
              <stop offset="59%" stopColor="#fee395" stopOpacity="1"></stop>
              <stop offset="60%" stopColor="#fee090" stopOpacity="1"></stop>
              <stop offset="61%" stopColor="#fedb8b" stopOpacity="1"></stop>
              <stop offset="62%" stopColor="#fed687" stopOpacity="1"></stop>
              <stop offset="63%" stopColor="#fed182" stopOpacity="1"></stop>
              <stop offset="64%" stopColor="#fecc7d" stopOpacity="1"></stop>
              <stop offset="65%" stopColor="#fec779" stopOpacity="1"></stop>
              <stop offset="66%" stopColor="#fdc274" stopOpacity="1"></stop>
              <stop offset="67%" stopColor="#fdbd6f" stopOpacity="1"></stop>
              <stop offset="68%" stopColor="#fdb86a" stopOpacity="1"></stop>
              <stop offset="69%" stopColor="#fdb366" stopOpacity="1"></stop>
              <stop offset="70%" stopColor="#fdae61" stopOpacity="1"></stop>
              <stop offset="71%" stopColor="#fca85e" stopOpacity="1"></stop>
              <stop offset="72%" stopColor="#fba15b" stopOpacity="1"></stop>
              <stop offset="73%" stopColor="#fa9a58" stopOpacity="1"></stop>
              <stop offset="74%" stopColor="#f99455" stopOpacity="1"></stop>
              <stop offset="75%" stopColor="#f98e52" stopOpacity="1"></stop>
              <stop offset="76%" stopColor="#f8874f" stopOpacity="1"></stop>
              <stop offset="77%" stopColor="#f7804c" stopOpacity="1"></stop>
              <stop offset="78%" stopColor="#f67a49" stopOpacity="1"></stop>
              <stop offset="79%" stopColor="#f57346" stopOpacity="1"></stop>
              <stop offset="80%" stopColor="#f46d43" stopOpacity="1"></stop>
              <stop offset="81%" stopColor="#f16740" stopOpacity="1"></stop>
              <stop offset="82%" stopColor="#ee613d" stopOpacity="1"></stop>
              <stop offset="83%" stopColor="#eb5b3b" stopOpacity="1"></stop>
              <stop offset="84%" stopColor="#e85538" stopOpacity="1"></stop>
              <stop offset="85%" stopColor="#e64f35" stopOpacity="1"></stop>
              <stop offset="86%" stopColor="#e34832" stopOpacity="1"></stop>
              <stop offset="87%" stopColor="#e0422f" stopOpacity="1"></stop>
              <stop offset="88%" stopColor="#dd3c2d" stopOpacity="1"></stop>
              <stop offset="89%" stopColor="#da362a" stopOpacity="1"></stop>
              <stop offset="90%" stopColor="#d73027" stopOpacity="1"></stop>
              <stop offset="91%" stopColor="#d22b27" stopOpacity="1"></stop>
              <stop offset="92%" stopColor="#cd2627" stopOpacity="1"></stop>
              <stop offset="93%" stopColor="#c82227" stopOpacity="1"></stop>
              <stop offset="94%" stopColor="#c31d27" stopOpacity="1"></stop>
              <stop offset="95%" stopColor="#be1827" stopOpacity="1"></stop>
              <stop offset="96%" stopColor="#b91326" stopOpacity="1"></stop>
              <stop offset="97%" stopColor="#b40e26" stopOpacity="1"></stop>
              <stop offset="98%" stopColor="#af0a26" stopOpacity="1"></stop>
              <stop offset="99%" stopColor="#aa0526" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#a50026" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </Context.Provider>
  );
}
