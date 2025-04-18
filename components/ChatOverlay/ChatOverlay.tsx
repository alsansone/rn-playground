import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useChatOverlay } from "./ChatOverlayProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMorphAnimation } from "./useMorphAnimation";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const ChatOverlay: React.FC = () => {
  const { isExpanded, expand, minimize } = useChatOverlay();

  const insets = useSafeAreaInsets();

  const {
    translateX,
    translateY,
    bubbleWidth,
    bubbleHeight,
    bubbleRadius,
    contentOpacity,
  } = useMorphAnimation(isExpanded);

  const startX = useSharedValue(20);
  const startY = useSharedValue(height - 120);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const nextX = event.translationX + startX.value;
      const nextY = event.translationY + startY.value;
      translateX.value = clamp(nextX, 10, width - 70); // horizontal clamp
      translateY.value = clamp(nextY, insets.top + 10, height - 100); // vertical clamp, respect status bar
    })
    .onEnd(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    });

  const morphStyle = useAnimatedStyle(() => ({
    width: bubbleWidth.value,
    height: bubbleHeight.value,
    borderRadius: bubbleRadius.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={isExpanded ? Gesture.Pan() : panGesture}>
      <Animated.View style={[styles.morphContainer, morphStyle]}>
        {isExpanded ? (
          <ChatWindow contentOpacity={contentOpacity} />
        ) : (
          <ChatBubble onPress={expand} />
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default ChatOverlay;
