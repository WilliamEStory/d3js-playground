import * as d3 from 'd3';
import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, width = 800, height = 400 }) => {
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand<string>()
    .domain(data.map((d) => d.label))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) || 0])
    .nice()
    .range([innerHeight, 0]);

  const yTicks = yScale.ticks(5);

  return (
    <svg width={width} height={height} role="img" aria-label="Bar chart">
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d) => {
          const x = xScale(d.label);
          if (x === undefined) return null;

          return (
            <rect
              key={d.label}
              className="bar"
              x={x}
              y={yScale(d.value)}
              width={xScale.bandwidth()}
              height={innerHeight - yScale(d.value)}
              fill="#4285f4"
            />
          );
        })}

        <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="currentColor" />
        {data.map((d) => {
          const x = xScale(d.label);
          if (x === undefined) return null;

          return (
            <g key={`x-tick-${d.label}`} transform={`translate(${x + xScale.bandwidth() / 2},${innerHeight})`}>
              <line y2={6} stroke="currentColor" />
              <text dy="0.71em" y={9} textAnchor="middle" fontSize={10}>
                {d.label}
              </text>
            </g>
          );
        })}

        <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="currentColor" />
        {yTicks.map((tick) => (
          <g key={`y-tick-${tick}`} transform={`translate(0,${yScale(tick)})`}>
            <line x2={-6} stroke="currentColor" />
            <text x={-9} dy="0.32em" textAnchor="end" fontSize={10}>
              {tick}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default BarChart;
