import { useRef, useEffect, useContext } from "react";
import observer from "./Observer";
import Context from "./Context";
import { interpolateNumber } from "d3-interpolate";
import throttle from "lodash.throttle";

export default function useControl({ minRef, max, maxRef, min }) {
  const minPosRef = useRef(max);
  const maxPosRef = useRef(min);
  const draggingRef = useRef(null);
  const { min: minValue, max: maxValue } = useContext(Context);
  useEffect(() => {
    minRef.current.move(max);
    maxRef.current.move(min);
    rangeRef.current = [minValue, maxValue];
    minPosRef.current = max;
    maxPosRef.current = min;
  }, [minValue, maxValue]);
  const rangeRef = useRef([minValue, maxValue]);
  const interpolate = interpolateNumber(minValue, maxValue);
  const dragEnd = () => {
    if (draggingRef.current) {
      draggingRef.current.posRef.current = draggingRef.current.pos;
      draggingRef.current = null;
    }
  };
  const emit = throttle(() => {
    observer.emit("change", rangeRef.current);
  }, 10);

  const handlers = {
    mousedown({ target, clientY }) {
      if (target === minRef.current.elem) {
        draggingRef.current = {
          y: clientY,
          pos: minPosRef.current,
          posRef: minPosRef,
          ref: minRef,
          idx: 0,
        };
      } else if (target === maxRef.current.elem) {
        draggingRef.current = {
          y: clientY,
          pos: maxPosRef.current,
          posRef: maxPosRef,
          ref: maxRef,
          idx: 1,
        };
      }
    },
    mousemove(evt) {
      evt.preventDefault();
      if (draggingRef.current) {
        const delta = evt.clientY - draggingRef.current.y;
        const pos = Math.max(
          Math.min(delta + draggingRef.current.posRef.current, max),
          min
        );
        draggingRef.current.pos = pos;
        draggingRef.current.ref.current.move(pos);
        const d = (max - pos) / (max - min);
        rangeRef.current[draggingRef.current.idx] = interpolate(d);
        emit();
      }
    },
    mouseup: dragEnd,
    mouseleave: dragEnd,
  };
  useEffect(() =>
    observer.listen("event", (event) => {
      const { type } = event;
      if (typeof handlers[type] === "function") {
        handlers[type](event);
      }
    })
  );
}
