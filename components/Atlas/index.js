import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import ReactMapGL, { Source, Layer, Marker, NavigationControl } from 'react-map-gl';
import { Box, IconButton } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import useDebounce from '../../utils/useDebounce';
import { setStyleYear, fitBounds, setActiveLayer } from './mapUtils';
import originalStyle from './style.json';
import config from '../../config';

const mapStyle = setStyleYear(config.startYear, originalStyle);

const fetcher = url => axios.get(url).then(({ data }) => data);

const Atlas = ({ size, year, activeBasemap, opacity, basemapHandler, highlightedLayer }) => {
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
};

Atlas.defaultProps = {
  activeBasemap: null,
  opacity: 0.75,
  size: {
    width: 800,
    height: 600,
  },
  highlightedLayer: null,
};

export default Atlas;
