import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';

const Atlas = ({ year, geojson, activeBasemap, opacity }) => {
  const mapRef = useRef(null);

  const [mapViewport, setMapViewport] = useState({
    latitude: 29.74991,
    longitude: -95.36026,
    zoom: 11,
  });

  const setMapYear = () => {
    const map = mapRef.current.getMap();
    let style = null;
    try {
      style = map.getStyle();
    } catch (err) {
      style = null;
    } finally {
      if (style) {
        style.layers = style.layers.map(layer => {
          if (layer.source === 'composite') {
            const filter = layer.filter
              ? layer.filter.filter(f => isArray(f) && f[0] !== '<=' && f[0] !== '>=')
              : [];
            return {
              ...layer,
              filter: [
                'all',
                ['<=', ['get', 'firstyear'], year],
                ['>=', ['get', 'lastyear'], year],
                ...filter,
              ],
            };
          }
          return layer;
        });
        map.setStyle(style);
      }
    }
  };
  useEffect(setMapYear, [year]);

  const onViewportChange = nextViewport => {
    setMapViewport(nextViewport);
  };

  const onMapLoad = () => {
    setMapYear();
  };

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxApiAccessToken="pk.eyJ1IjoiYXhpc21hcHMiLCJhIjoieUlmVFRmRSJ9.CpIxovz1TUWe_ecNLFuHNg"
      mapStyle="/style.json"
      width="100%"
      height="100%"
      onLoad={onMapLoad}
      onViewportChange={onViewportChange}
      {...mapViewport}
    >
      {activeBasemap && (
        <Source
          type="raster"
          tiles={[
            `https://imaginerio-rasters.s3.us-east-1.amazonaws.com/${activeBasemap}/{z}/{x}/{y}.png`,
          ]}
          scheme="tms"
        >
          <Layer
            id="overlay"
            type="raster"
            paint={{ 'raster-opacity': opacity }}
            beforeId="expressway-label"
          />
        </Source>
      )}
      {geojson && !activeBasemap && (
        <Source type="geojson" data={geojson}>
          <Layer id="selected-fill" type="fill" paint={{ 'fill-color': 'rgba(0,0,0,0.25)' }} />
          <Layer
            id="selected-case"
            type="line"
            paint={{ 'line-width': 6, 'line-color': '#eeeeee' }}
          />
          <Layer
            id="selected-line"
            type="line"
            paint={{ 'line-width': 3, 'line-color': '#000000' }}
          />
        </Source>
      )}
      <div style={{ position: 'absolute', left: 15, top: 15 }}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
};

Atlas.propTypes = {
  year: PropTypes.number.isRequired,
  activeBasemap: PropTypes.string,
  geojson: PropTypes.shape(),
  opacity: PropTypes.number,
};

Atlas.defaultProps = {
  activeBasemap: null,
  opacity: 0.75,
  geojson: null,
};

export default Atlas;
