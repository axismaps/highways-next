import bbox from '@turf/bbox';
import { isArray } from 'lodash';
import { WebMercatorViewport, FlyToInterpolator } from 'react-map-gl';

const setStyleYear = (year, currentStyle) => {
  const style = { ...currentStyle };
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
  return style;
};

const fitBounds = (geom, mapViewport) => {
  const [minX, minY, maxX, maxY] = bbox(geom);
  const { longitude, latitude, zoom } = new WebMercatorViewport(mapViewport).fitBounds(
    [
      [minX, minY],
      [maxX, maxY],
    ],
    { padding: 100 }
  );
  return {
    ...mapViewport,
    longitude,
    latitude,
    zoom,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
  };
};

export { setStyleYear, fitBounds };
