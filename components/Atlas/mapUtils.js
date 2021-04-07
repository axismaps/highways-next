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

const getOpacityKey = layer => {
  if (layer.type === 'line') return ['line-opacity'];
  if (layer.type === 'symbol') return ['text-opacity', 'icon-opacity'];
  return ['fill-opacity'];
};

const updateOpacity = (layer, keys, opacity) => {
  const newLayer = { ...layer };
  keys.forEach(key => {
    newLayer.paint[key] = opacity;
  });
  return newLayer;
};

const setActiveLayer = (currentStyle, highlightedLayer) => {
  const style = { ...currentStyle };
  style.layers = style.layers.map(mapLayer => {
    let newLayer = { ...mapLayer };
    const opacityKey = getOpacityKey(newLayer);
    if (newLayer.type === 'background') {
      newLayer.paint['background-color'] = highlightedLayer ? '#eee' : 'hsl(20, 18%, 90%)';
      return newLayer;
    }
    if (highlightedLayer) {
      const { layer, type } = highlightedLayer;
      const layerType = newLayer.filter.find(l => l[1][1] === 'type')[2][0];
      newLayer = updateOpacity(
        newLayer,
        opacityKey,
        newLayer['source-layer'] === layer && layerType === type ? 1 : 0.2
      );
    } else {
      newLayer = updateOpacity(newLayer, opacityKey, 1);
    }
    return newLayer;
  });
  return style;
};

export { setStyleYear, fitBounds, setActiveLayer };
