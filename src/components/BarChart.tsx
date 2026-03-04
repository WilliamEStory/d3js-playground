import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

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
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .range([innerHeight, 0]);

    // Select SVG and clear it
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main group
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create bars
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label) || 0)
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.value))
      .attr('fill', '#4285f4');

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);
  }, [data, width, height]);

  return <svg ref={svgRef} />;
};

export default BarChart;
