import React, { useEffect, useMemo, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { select } from 'd3-selection';
import { zoom, zoomIdentity } from 'd3-zoom';
import topo from './v22/india-states.topo.json';
import { translateRiver, translateState } from './telugu';

const shapes = feature(topo, topo.objects.states);
const projection = geoMercator().fitExtent([[20, 20], [480, 520]], shapes);
const geo = geoPath(projection);

const disputed = shapes.features.filter(f => !f.properties.State_LGD);
const states = shapes.features.filter(f => f.properties.State_LGD).map(f => {
  const code = f.properties.State_LGD;
  return {
    code,
    feature: f,
    name: f.properties.STATE_C || `State ${code}`,
    center: geo.centroid(f)
  };
});

export default function AtlasMap({
  lang = 'en',
  selectedState = null,
  onSelectState = () => {},
  items = [],
  activeItem = null,
  onSelectItem = () => {},
  themeColor = '#3b82f6',
  markerKind = 'circle'
}) {
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const [transform, setTransform] = useState(zoomIdentity);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [is3D, setIs3D] = useState(false);

  useEffect(() => {
    const behavior = zoom()
      .scaleExtent([1, 8])
      .wheelDelta(event => {
        // Significantly reduced zoom speed for smooth, controlled scrolling
        return -event.deltaY * 0.00065;
      })
      .on('zoom', e => setTransform(e.transform));
    zoomRef.current = behavior;
    const svg = select(svgRef.current);
    svg.call(behavior).on('dblclick.zoom', null);
    return () => svg.on('.zoom', null);
  }, []);

  const zoomIn = () => select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, 1.4);
  const zoomOut = () => select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, 1 / 1.4);
  const resetZoom = () => select(svgRef.current).transition().duration(200).call(zoomRef.current.transform, zoomIdentity);

  // Separate line features (rivers, waterways, highways) from point features
  const lineItems = useMemo(() => items.filter(it => it.wp && it.wp.length > 1), [items]);
  const pointItems = useMemo(() => items.filter(it => (it.lng != null && it.lat != null) || (it.olng != null && it.olat != null)), [items]);

  return (
    <div className={`atlas-map-container ${is3D ? 'view-3d' : ''}`}>
      <div className="atlas-map-controls">
        <button
          onClick={() => setIs3D(!is3D)}
          className={`control-3d-btn ${is3D ? 'active' : ''}`}
          title="Toggle 2D / 3D Isometric View"
        >
          {is3D ? '3D' : '2D'}
        </button>
        <button onClick={zoomIn} title="Zoom in" aria-label="Zoom in">+</button>
        <button onClick={zoomOut} title="Zoom out" aria-label="Zoom out">−</button>
        <button onClick={resetZoom} title="Reset zoom" aria-label="Reset zoom">↺</button>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 500 540"
        className="atlas-svg-canvas"
        aria-label="Interactive 2D-3D Atlas Map of India"
      >
        <defs>
          <filter id="atlas-depth-shadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
          </filter>
          <linearGradient id="atlas-state-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--atlas-state-top, #e2e8f0)" />
            <stop offset="100%" stopColor="var(--atlas-state-bot, #cbd5e1)" />
          </linearGradient>
        </defs>

        {/* Map Background with subtle ocean tone */}
        <rect width="500" height="540" className="atlas-ocean" />

        <g transform={transform.toString()}>
          {/* Base 3D Layer Outline Shadow */}
          <g filter="url(#atlas-depth-shadow)">
            {disputed.map((f, i) => (
              <path key={'disp-' + i} d={geo(f) || ''} className="atlas-disputed-shadow" />
            ))}
            {states.map(s => (
              <path key={'shadow-' + s.code} d={geo(s.feature) || ''} className="atlas-state-shadow" />
            ))}
          </g>

          {/* Actual States Layer */}
          <g className="atlas-states-group">
            {disputed.map((f, i) => (
              <path
                key={'disp-top-' + i}
                d={geo(f) || ''}
                className="atlas-disputed"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {states.map(s => {
              const isSelected = selectedState === s.code;
              return (
                <path
                  key={'state-' + s.code}
                  d={geo(s.feature) || ''}
                  className={`atlas-state ${isSelected ? 'state-selected' : ''}`}
                  onClick={() => onSelectState(isSelected ? null : s.code)}
                  vectorEffect="non-scaling-stroke"
                >
                  <title>{s.name}</title>
                </path>
              );
            })}
          </g>

          {/* Line Features (Rivers, Waterways, Highways) */}
          <g className="atlas-lines-group">
            {lineItems.map((line, idx) => {
              const isLineActive = Boolean(
                (activeItem && ((activeItem.n && line.n && activeItem.n === line.n) || (activeItem.id && line.id && activeItem.id === line.id))) ||
                (hoveredItem && ((hoveredItem.n && line.n && hoveredItem.n === line.n) || (hoveredItem.id && line.id && hoveredItem.id === line.id)))
              );
              const dStr = geo({ type: 'LineString', coordinates: line.wp });
              if (!dStr) return null;
              return (
                <g key={'line-' + idx} className="atlas-line-wrap" onClick={() => onSelectItem(line)} onMouseEnter={() => setHoveredItem(line)} onMouseLeave={() => setHoveredItem(null)}>
                  {/* Thick invisible hit area for touch/click */}
                  <path d={dStr} stroke="transparent" strokeWidth="12" fill="none" cursor="pointer" />
                  {/* Glow outline when active */}
                  {isLineActive && (
                    <path
                      d={dStr}
                      stroke="#ffffff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      opacity="0.9"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}
                  {/* Real visible line */}
                  <path
                    d={dStr}
                    stroke={isLineActive ? '#ef4444' : themeColor}
                    strokeWidth={isLineActive ? 3.5 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    cursor="pointer"
                    className="atlas-line-flow"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}
          </g>

          {/* Point Features (Power Plants, Temples, National Parks, Peaks, Cities) */}
          <g className="atlas-points-group">
            {pointItems.map((pt, idx) => {
              const lng = pt.lng != null ? pt.lng : pt.olng;
              const lat = pt.lat != null ? pt.lat : pt.olat;
              const coords = projection([lng, lat]);
              if (!coords) return null;
              const [cx, cy] = coords;

              const isPointHovered = Boolean(
                hoveredItem && ((hoveredItem.n && pt.n && hoveredItem.n === pt.n) || (hoveredItem.id && pt.id && hoveredItem.id === pt.id))
              );
              const isPointSelected = Boolean(
                activeItem && ((activeItem.n && pt.n && activeItem.n === pt.n) || (activeItem.id && pt.id && activeItem.id === pt.id))
              );
              const isPointActive = isPointHovered || isPointSelected;

              return (
                <g
                  key={'point-' + idx}
                  className={`atlas-marker ${isPointActive ? 'marker-active' : ''}`}
                  transform={`translate(${cx}, ${cy})`}
                  onClick={() => onSelectItem(pt)}
                  onMouseEnter={() => setHoveredItem(pt)}
                  onMouseLeave={() => setHoveredItem(null)}
                  cursor="pointer"
                >
                  {isPointActive && (
                    <circle r="12" fill={themeColor} opacity="0.3" className="marker-pulse" />
                  )}
                  <circle
                    r={isPointActive ? 7 : (pointItems.length > 50 ? 3.5 : 4.5)}
                    fill={isPointActive ? '#ffffff' : themeColor}
                    stroke={isPointActive ? themeColor : '#ffffff'}
                    strokeWidth={isPointActive ? 2.5 : 1.2}
                    opacity={isPointActive ? 1 : 0.88}
                  />
                  {/* Show clean tag ONLY for single hovered item */}
                  {isPointHovered && (
                    <g transform="translate(0, -12)" pointerEvents="none">
                      <rect
                        x="-60"
                        y="-16"
                        width="120"
                        height="20"
                        rx="4"
                        fill="rgba(15, 23, 42, 0.94)"
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeWidth="0.8"
                      />
                      <text
                        x="0"
                        y="-3"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9.5"
                        fontWeight="700"
                      >
                        {((lang === 'te' ? translateRiver(pt.n) : pt.n) || '').slice(0, 20)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Floating State or Item Inspector Pill */}
      {(hoveredItem || activeItem) && (
        <div className="atlas-floating-tooltip">
          <b>{lang === 'te' ? (translateRiver((hoveredItem || activeItem).n) || (hoveredItem || activeItem).n) : ((hoveredItem || activeItem).n)}</b>
          <small>
            {lang === 'te'
              ? translateState((hoveredItem || activeItem).st || (hoveredItem || activeItem).s)
              : ((hoveredItem || activeItem).st || (hoveredItem || activeItem).s || (hoveredItem || activeItem).org || (hoveredItem || activeItem).cat || '')}
          </small>
        </div>
      )}
    </div>
  );
}

