import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue, withTiming, withDelay } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ANIMATION_DURATION = 300;
const WIDTH_OFFSET = 80;
const HEIGHT_OFFSET = 160;
const BUBBLE_SIZE = 60;
const BUBBLE_RADIUS = 30;

export const useMorphAnimation = (isExpanded: boolean) => {
  const bubbleWidth = useSharedValue(BUBBLE_SIZE);
  const bubbleHeight = useSharedValue(BUBBLE_SIZE);
  const bubbleRadius = useSharedValue(BUBBLE_RADIUS);
  const translateX = useSharedValue(width - WIDTH_OFFSET);
  const translateY = useSharedValue(height - HEIGHT_OFFSET);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    if (isExpanded) {
      bubbleWidth.value = withTiming(width, { duration: ANIMATION_DURATION });
      bubbleHeight.value = withTiming(height, { duration: ANIMATION_DURATION });
      bubbleRadius.value = withTiming(0, { duration: ANIMATION_DURATION });
      translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
      translateY.value = withTiming(0, { duration: ANIMATION_DURATION });
      contentOpacity.value = withDelay(ANIMATION_DURATION, withTiming(1, { duration: 200 }));
    } else {
      contentOpacity.value = withTiming(0, { duration: 100 });
      bubbleWidth.value = withTiming(BUBBLE_SIZE, { duration: ANIMATION_DURATION });
      bubbleHeight.value = withTiming(BUBBLE_SIZE, { duration: ANIMATION_DURATION });
      bubbleRadius.value = withTiming(BUBBLE_RADIUS, { duration: ANIMATION_DURATION });
      translateX.value = withTiming(width - WIDTH_OFFSET, { duration: ANIMATION_DURATION });
      translateY.value = withTiming(height - HEIGHT_OFFSET, { duration: ANIMATION_DURATION });
    }
  }, [isExpanded]);

  return {
    bubbleWidth,
    bubbleHeight,
    bubbleRadius,
    translateX,
    translateY,
    contentOpacity,
  };
};
