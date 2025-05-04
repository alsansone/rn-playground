import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  clamp,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatBubble from "../components/ChatOverlay/ChatBubble";
import ChatWindow from "../components/ChatOverlay/ChatWindow";
import styles from "../components/ChatOverlay/styles";
import { useMorphAnimation } from "../components/ChatOverlay/useMorphAnimation";
import { useChatOverlay } from "../components/ChatOverlay";

const ChatOverlay: React.FC = () => {
  const { width, height } = Dimensions.get("window");

  const { isExpanded, toggleSize, visible, hideOverlay } = useChatOverlay();

  const insets = useSafeAreaInsets();

  const { translateX, translateY, bubbleWidth, bubbleHeight, bubbleRadius } =
    useMorphAnimation(isExpanded);

  const startX = useSharedValue(20);
  const startY = useSharedValue(height - 120);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const nextX = event.translationX + startX.value;
      const nextY = event.translationY + startY.value;
      translateX.value = clamp(nextX, 10, width - 120); // horizontal clamp
      translateY.value = clamp(nextY, insets.top + 10, height - 200); // vertical clamp, respect status bar
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

  if (!visible) {
    return null;
  }

  return (
    <GestureDetector gesture={isExpanded ? Gesture.Pan() : panGesture}>
      <Animated.View style={[styles.morphContainer, morphStyle]}>
        {isExpanded ? (
          <ChatWindow onPress={toggleSize} onClose={hideOverlay} />
        ) : (
          <ChatBubble
            onPress={toggleSize}
            onClose={hideOverlay}
            statusText="Connecting to chat…"
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default ChatOverlay;
