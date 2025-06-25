import React from "react";
import { Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  clamp,
  SlideOutDown,
  SlideInDown,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatBubble from "../components/ChatOverlay/ChatBubble";
import ChatWindow from "../components/ChatOverlay/ChatWindow";
import styles from "../components/ChatOverlay/styles";
import { useMorphAnimation } from "../components/ChatOverlay/useMorphAnimation";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { clearChat, toggleOverlay, toggleSize } from "../store/messagesSlice";

const ChatOverlay: React.FC = () => {
  const { width, height } = Dimensions.get("window");

  const showOverlay = useAppSelector((state) => state.messages.showOverlay);
  const isExpanded = useAppSelector((state) => state.messages.isExpanded);
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const { translateX, translateY, bubbleWidth, bubbleHeight, bubbleRadius } =
    useMorphAnimation(isExpanded);

  const startX = useSharedValue(20);
  const startY = useSharedValue(height - 120);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const nextX = event.translationX + startX.value;
      const nextY = event.translationY + startY.value;
      translateX.value = clamp(nextX, 10, width - 120);
      translateY.value = clamp(nextY, insets.top + 10, height - 200);
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

  const onClose = () => {
    dispatch(toggleOverlay());
    if (!isExpanded) {
      dispatch(toggleSize());
    }
    dispatch(clearChat());
  };

  if (!showOverlay) {
    return null;
  }

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      style={[styles.morphContainer, morphStyle]}
    >
      {isExpanded ? (
        <ChatWindow onPress={() => dispatch(toggleSize())} onClose={onClose} />
      ) : (
        <GestureDetector gesture={panGesture}>
          <ChatBubble
            onPress={() => dispatch(toggleSize())}
            onClose={onClose}
            statusText="Connecting to chat…"
          />
        </GestureDetector>
      )}
    </Animated.View>
  );
};

export default ChatOverlay;
