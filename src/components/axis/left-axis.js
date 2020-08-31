import React, {useMemo} from 'react';
import * as d3 from "d3";

export const LeftAxis = ({
    domain=[0, 100],
    range=[10, 290],
    pixelsPerTick=50,
    strokeWidth=2
  }) => {
    const ticks = useMemo(() => {
      const yScale = d3.scaleLinear()
        .domain(domain)
        .range(range)
      const height = Math.abs(range[1] - range[0])
      const numberOfTicksTarget = Math.max(
        1,
        Math.floor(
          height / pixelsPerTick
        )
      )
      return yScale.ticks(numberOfTicksTarget)
        .map(value => ({
          value,
          yOffset: Math.round(yScale(value))
        }))
    }, [
      domain,
      range,
      pixelsPerTick
    ])
    return (
      <g transform={`translate(-106, 0)`}>
        <svg>
          <g transform={`translate(100, 0)`}>
            <path
              d={[
                "M", 0, range[0],
                "H", 6,
                "V", range[1],
                "H", -6,
              ].join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
            />
            {ticks.map(({ value, yOffset: yOffset }) => (
              <g
                key={value}
                transform={`translate(0, ${yOffset})`}
              >
                <line
                  x1="0"
                  y1="0"
                  x2="6"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                />
                <text
                  key={value}
                  style={{
                    fontSize: "10px",
                    textAnchor: "end",
                    transform: "translate(-5px, 4px)"
                  }}>
                  { value }
                </text>
              </g>
            ))}
          </g>
        </svg>
      </g>
    )
  }