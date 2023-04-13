import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import XAxis from "./XAxis";
import Context from "./Context";
import React, { useState, useLayoutEffect, useEffect } from "react";

describe("Axis", () => {
  test("ticks not overlapping on 1.data reference changes every render, 2.setState in useEffect in the same render", async () => {
    const indexOf = (element) => {
      let i = 0;
      while ((element = element.previousElementSibling)) i++;
      return i;
    };
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      const index = indexOf(this);
      return {
        x: index * 10,
        y: 0,
        width: 21,
        height: 100,
        top: 0,
        right: 100,
        bottom: 100,
        left: 0,
      };
    };
    const HeatMap = () => {
      const [count, setCount] = useState(0);
      const data = [1.0001, 2.0002, 3.0003, 4.0004, 5.0005, 6.0006, 7.0007];
      useEffect(() => {
        setCount(count + 1);
      }, []);
      return (
        <Context.Provider value={{ rect: [0, 0, 100], w: 10 }}>
          <XAxis name="foo" data={[...data]} format={(value) => value} />
          <div>count{count}</div>
        </Context.Provider>
      );
    };
    const { rerender } = render(<HeatMap />);
    expect(await screen.findByText("count1")).toBeVisible();
    expect(await screen.findByText("1.0001")).toBeVisible();
    expect(await screen.findByText("2.0002")).not.toBeVisible();
    expect(await screen.findByText("3.0003")).not.toBeVisible();
    expect(await screen.findByText("4.0004")).toBeVisible();
  });
});
