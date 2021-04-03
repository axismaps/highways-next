import { last, findLast } from 'lodash';
import { rgb } from 'd3';
import Line from './Line.svg';
import style from '../Atlas/style.json';

const getLayerStyle = (layer, type) => {
  let layerStyle = style.layers.filter(
    l =>
      l.filter &&
      l['source-layer'] === layer.name &&
      l.filter.find(f => Array.isArray(f) && f[2] && f[2][0] === type)
  );
  if (!layerStyle.length) layerStyle = style.layers.filter(l => l['source-layer'] === layer.name);
  return layerStyle;
};

const getColor = (layer, type) => {
  const layerStyle = getLayerStyle(layer, type);
  if (!layerStyle.length) return { backgroundColor: 'white' };
  if (layerStyle[0].paint['fill-color']) {
    let backgroundColor = layerStyle[0].paint['fill-color'];
    let borderColor = layerStyle[0].paint['fill-outline-color'];
    if (!borderColor)
      borderColor = layerStyle[1]
        ? layerStyle[1].paint['fill-color']
        : layerStyle[0].paint['fill-color'];

    [backgroundColor, borderColor] = [backgroundColor, borderColor].map(bColor => {
      if (!bColor) return null;
      let color = bColor;
      if (Array.isArray(color)) color = last(color);
      if (color.match(/^hsl/gi)) color = rgb(color).formatHex();
      return color;
    });
    return {
      borderColor,
      backgroundColor,
      borderWidth: 2,
      m: 1,
    };
  }
  if (layerStyle[0].paint['line-color']) {
    return {
      as: Line,
      color: findLast(layerStyle, lStyle => lStyle.paint['line-color']).paint['line-color'],
      w: '35px',
      ml: '5px',
    };
  }
  return { backgroundColor: 'white' };
};

export default getColor;
