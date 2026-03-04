
import * as d3 from 'd3';
import type { FC } from 'react';
import stateData from '../../data/united-states-geo-json/geoStates500Kb.json';

interface StateProperties {
  NAME: string;
  STATE: string;
}

interface StateFeature {
  type: 'Feature';
  properties: StateProperties;
  geometry: d3.GeoGeometryObjects;
}

interface StateFeatureCollection {
  type: 'FeatureCollection';
  features: StateFeature[];
}

interface StateProps {
  state?: typeof stateData.features[number]['properties']['NAME'];
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  showLabel?: boolean;
}

const featureCollection = stateData as StateFeatureCollection;

export const State: FC<StateProps> = ({
  state = 'Maine',
  width = 400,
  height = 300,
  fill = '#4285f4',
  stroke = 'currentColor',
  showLabel = false
}) => {
  const targetState = state.trim().toLowerCase();
  const targetStateCode = state.trim().padStart(2, '0');
  const selectedFeature = featureCollection.features.find((feature) => {
    const stateName = feature.properties.NAME.toLowerCase();
    const stateCode = feature.properties.STATE;
    return stateName === targetState || stateCode === targetStateCode;
  }) as StateFeature | undefined;

  const margin = 16;
  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;
  const labelHeight = showLabel ? 24 : 0;
  const mapHeight = Math.max(innerHeight - labelHeight, 1);

  const pathData = selectedFeature
    ? d3.geoPath(
        d3.geoMercator().fitSize([Math.max(innerWidth, 1), mapHeight], selectedFeature)
      )(selectedFeature)
    : null;

  return (
    <svg width={width} height={height} role="img" aria-label={`US state: ${state}`}>
      <g transform={`translate(${margin},${margin})`}>
        {pathData ? (
          <>
            <path d={pathData} fill={fill} stroke={stroke} strokeWidth={1} />
            {showLabel ? (
              <text x={innerWidth / 2} y={innerHeight - 4} textAnchor="middle" fontSize={14}>
                {selectedFeature?.properties.NAME}
              </text>
            ) : null}
          </>
        ) : (
          <text x={0} y={20} fontSize={14}>
            State not found: {state}
          </text>
        )}
      </g>
    </svg>
  );
};