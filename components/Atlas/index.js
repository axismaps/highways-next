import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { flatten } from 'lodash';
import ReactMapGL, { Source, Layer, Marker, NavigationControl } from 'react-map-gl';
import { Box, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import DataProbe from './DataProbe';
import useDebounce from '../../utils/useDebounce';
import { setStyleYear, fitBounds, setActiveLayer } from './mapUtils';
import originalStyle from './style.json';
import config from '../../config';

const mapStyle = setStyleYear(config.startYear, originalStyle);

const fetcher = url => axios.get(url).then(({ data }) => data);

const Atlas = ({
  size,
  year,
  activeBasemap,
  opacity,
  basemapHandler,
  highlightedLayer,
  activeThematic,
  activeAnimation,
  animationFrame,
}) => {
  const mapRef = useRef(null);
  const debouncedYear = useDebounce(year, 500);
  const { data: documents } = useSWR(
    debouncedYear ? `${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=${debouncedYear}` : null,
    fetcher
  );

  const [mapViewport, setMapViewport] = useState({
    latitude: 29.74991,
    longitude: -95.36026,
    zoom: 11,
  });
  const [viewpoints, setViewpoints] = useState([]);
  const [viewcone, setViewcone] = useState(null);
  const [thematicLayer, setThematicLayer] = useState(null);
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const [probeData, setProbeData] = useState(null);

  useEffect(() => {
    const map = mapRef.current.getMap();
    if (map) {
      map.setStyle(setActiveLayer(setStyleYear(year, mapStyle), highlightedLayer));
    }
  }, [year, highlightedLayer]);

  useEffect(async () => {
    if (activeBasemap) {
      const {
        data: { features },
      } = await axios.get(`${process.env.NEXT_PUBLIC_SEARCH_API}/document/${activeBasemap}`);
      const [feature] = features;
      setMapViewport(fitBounds(feature.geometry, mapViewport));
      if (feature.properties.type.match(/view/gi)) {
        setViewcone(feature);
      }
    } else {
      setViewcone(null);
    }
  }, [activeBasemap]);

  useEffect(async () => {
    setThematicLayer(null);
    if (activeThematic) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SEARCH_API}/thematic/${activeThematic.id}?year=${year}`
      );
      setThematicLayer(data);
    }
  }, [activeThematic]);

  useEffect(() => {
    if (documents) {
      const views = documents.find(d => d.title.match(/view/gi));
      if (views && views.Documents) setViewpoints(views.Documents);
      else setViewpoints([]);
    }
  }, [documents]);

  useEffect(() => {
    setMapViewport({
      ...mapViewport,
      ...size,
    });
  }, [size]);

  const onViewportChange = nextViewport => {
    setMapViewport(nextViewport);
  };

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxApiAccessToken="pk.eyJ1IjoiYXhpc21hcHMiLCJhIjoieUlmVFRmRSJ9.CpIxovz1TUWe_ecNLFuHNg"
      mapStyle={mapStyle}
      onViewportChange={onViewportChange}
      interactiveLayerIds={thematicLayer ? ['thematic'] : null}
      onHover={e => {
        if (hoveredStateId !== null) {
          mapRef.current
            .getMap()
            .setFeatureState({ source: 'thematic', id: hoveredStateId }, { hover: false });
        }
        if (thematicLayer && e.features.length > 0) {
          mapRef.current
            .getMap()
            .setFeatureState({ source: 'thematic', id: e.features[0].id }, { hover: true });
          setHoveredStateId(e.features[0].id);
          setProbeData({
            ...e.features[0].properties,
            top: e.center.y - 100,
            left: e.center.x - 300,
          });
        } else {
          setHoveredStateId(null);
          setProbeData(null);
        }
      }}
      {...mapViewport}
    >
      {activeBasemap && !viewcone && (
        <Source
          key={activeBasemap}
          type="raster"
          tiles={[`${process.env.NEXT_PUBLIC_RASTER_URL}/${activeBasemap}/{z}/{x}/{y}.png`]}
          scheme="tms"
        >
          <Layer id="overlay" type="raster" paint={{ 'raster-opacity': opacity }} />
        </Source>
      )}
      {thematicLayer && activeThematic && (
        <Source id="thematic" key={thematicLayer.id} type="geojson" data={thematicLayer}>
          <Layer
            id="thematic"
            type="fill"
            paint={{
              'fill-color': [
                'step',
                ['get', 'value'],
                ...flatten(
                  activeThematic.colors.map((c, i) => [c, activeThematic.scale[i]]),
                  true
                ).filter(f => f),
              ],
              'fill-opacity': 0.5,
            }}
          />
          <Layer
            id="thematic-stroke"
            type="line"
            paint={{
              'line-color': 'black',
              'line-width': 2,
              'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0],
            }}
          />
        </Source>
      )}
      {activeAnimation && (
        <>
          {activeAnimation.frames.map((frame, i) => (
            <Source
              key={[activeAnimation.name, frame.label].join('-')}
              type="raster"
              tiles={[
                `${process.env.NEXT_PUBLIC_TILE_URL}/${activeAnimation.url}/${frame.directory}/{z}/{x}/{y}.png`,
              ]}
              scheme="tms"
              minzoom={activeAnimation.minzoom}
              maxzoom={activeAnimation.maxzoom}
            >
              <Layer
                id={[activeAnimation.name, frame.label].join('-')}
                type="raster"
                paint={{
                  'raster-opacity': animationFrame === i ? 0.75 : 0,
                  'raster-resampling': 'nearest',
                }}
              />
            </Source>
          ))}
        </>
      )}
      {viewcone && (
        <Source key={`view${activeBasemap}`} type="geojson" data={viewcone}>
          <Layer id="viewcone" type="fill" paint={{ 'fill-color': 'rgba(0,0,0,0.25)' }} />
        </Source>
      )}
      {viewpoints.map(v => (
        <Marker key={`marker${v.ssid}`} {...v} offsetLeft={-15} offsetTop={-15}>
          <IconButton
            icon={<FontAwesomeIcon icon={faCamera} />}
            as="div"
            w="30px"
            h="30px"
            minWidth="none"
            borderRadius="50%"
            backgroundColor="white"
            boxShadow="md"
            onClick={() => {
              if (v.ssid !== activeBasemap) basemapHandler(v.ssid);
            }}
          />
        </Marker>
      ))}
      <Box pos="absolute" left={['auto', '15px']} right={['40px', 'auto']} top="15px">
        <NavigationControl />
      </Box>
      {probeData && <DataProbe {...probeData} />}
    </ReactMapGL>
  );
};

Atlas.propTypes = {
  year: PropTypes.number.isRequired,
  activeBasemap: PropTypes.string,
  opacity: PropTypes.number,
  basemapHandler: PropTypes.func.isRequired,
  highlightedLayer: PropTypes.shape(),
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  activeThematic: PropTypes.shape(),
  activeAnimation: PropTypes.shape(),
  animationFrame: PropTypes.number,
};

Atlas.defaultProps = {
  activeBasemap: null,
  opacity: 0.75,
  size: {
    width: 800,
    height: 600,
  },
  highlightedLayer: null,
  activeThematic: null,
  activeAnimation: null,
  animationFrame: 0,
};

export default Atlas;
