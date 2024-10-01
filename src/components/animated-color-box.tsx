import { Box, useToken } from 'native-base';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import usePrevious from '../utils/use-previous';

const AnimatedBox = Animated.createAnimatedComponent(Box);

const AnimatedColorBox = ({ bg, ...props }: any) => {
  const hexBg = useToken('colors', bg);
  const prevHexBg = usePrevious(hexBg);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
  }, [hexBg]);

  const animatedStyles = useAnimatedStyle(() => {
    progress.value = withTiming(1, { duration: 200 });
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [prevHexBg || hexBg, hexBg],
      ),
    };
  }, [hexBg]);
  return <AnimatedBox {...props} style={animatedStyles} />;
};

export default AnimatedColorBox;
