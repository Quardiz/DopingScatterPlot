import React, {useMemo} from 'react';
import * as d3 from "d3";

export const BottomAxis = ({
    domain=[0, 100],
    range=[10, 290],
    pixelsPerTick=50,
    strokeWidth=2
  }) => {
    const ticks = useMemo(() => {
      const xScale = d3.scaleLinear()
        .domain(domain)
        .range(range)
      const width = Math.abs(range[1] - range[0])
    //   const pixelsPerTick = 30
      const numberOfTicksTarget = Math.max(
        1,
        Math.floor(
          width / pixelsPerTick
        )
      )
      return xScale.ticks(numberOfTicksTarget)
        .map(value => ({
          value,
          xOffset: Math.round(xScale(value))
        }))
    }, [
      domain,
      range,
      pixelsPerTick
    ])
    return (
      <svg>
        <path
          d={[
            "M", range[0], 6,
            "v", -6,
            "H", range[1],
            "v", 6,
          ].join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        {ticks.map(({ value, xOffset }) => (
          <g
            key={value}
            transform={`translate(${xOffset}, 0)`}
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            <text
              key={value}
              style={{
                fontSize: "10px",
                textAnchor: "middle",
                transform: "translateY(20px)"
              }}>
              { value }
            </text>
          </g>
        ))}
      </svg>
    )
  }