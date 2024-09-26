import React from 'react';
import { Svg } from 'react-native-svg';

const MARGIN = 10;
const vWidth = 64 + MARGIN;
const vHeight = 64 + MARGIN;

function AnimatedCheckbox() {
  return (
    <Svg
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
    ></Svg>
  );
}

export default AnimatedCheckbox;
