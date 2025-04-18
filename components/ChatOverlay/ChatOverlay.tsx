import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useChatOverlay } from "./ChatOverlayProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useKeyboardHeight } from "./useKeyboardHeight";

const { width, height } = Dimensions.get("window");

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const ChatOverlay: React.FC = () => {
  const { isExpanded, expand, minimize } = useChatOverlay();

  const insets = useSafeAreaInsets();

  const bubbleWidth = useSharedValue(60);
  const bubbleHeight = useSharedValue(60);
  const bubbleRadius = useSharedValue(30);
  const translateX = useSharedValue(width - 80);
  const translateY = useSharedValue(height - 160);
  const contentOpacity = useSharedValue(0); // Chat content fade-in

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

  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (isExpanded) {
      // Animate to full-screen
      bubbleWidth.value = withTiming(width, { duration: 300 });
      bubbleHeight.value = withTiming(height, { duration: 300 });
      bubbleRadius.value = withTiming(0, { duration: 300 });
      translateX.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });

      contentOpacity.value = withDelay(300, withTiming(1, { duration: 200 }));
    } else {
      // Animate back to bubble
      contentOpacity.value = withTiming(0, { duration: 100 });
      bubbleWidth.value = withTiming(60, { duration: 300 });
      bubbleHeight.value = withTiming(60, { duration: 300 });
      bubbleRadius.value = withTiming(30, { duration: 300 });
      translateX.value = withTiming(width - 80, { duration: 300 });
      translateY.value = withTiming(height - 160, { duration: 300 });
    }
  }, [isExpanded]);

  const keyboardHeight = useKeyboardHeight();

  const morphStyle = useAnimatedStyle(() => ({
    width: bubbleWidth.value,
    height: bubbleHeight.value,
    borderRadius: bubbleRadius.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <GestureDetector gesture={isExpanded ? Gesture.Pan() : panGesture}>
      <Animated.View style={[styles.morphContainer, morphStyle]}>
        {isExpanded ? (
          <Animated.View
            style={[
              styles.chatContent,
              contentStyle,
              { paddingTop: insets.top },
            ]}
          >
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
              <View style={[styles.header]}>
                <Text style={styles.headerTitle}>Chat</Text>
                <TouchableOpacity onPress={minimize}>
                  <Text style={styles.minimizeText}>Minimize</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.chatBody}>
                <Text>Messages go here</Text>
              </View>

              <View
                style={[
                  styles.chatInput,
                  {
                    paddingBottom: insets.bottom || 16,
                    marginBottom: keyboardHeight,
                  },
                ]}
              >
                <TextInput
                  style={styles.inputField}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Type a message..."
                  placeholderTextColor="#aaa"
                  multiline
                />
                <TouchableOpacity
                  onPress={() => {
                    if (message.trim()) {
                      console.log("Send:", message);
                      setMessage("");
                    }
                  }}
                >
                  <Ionicons name="send" size={24} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        ) : (
          <TouchableOpacity onPress={expand} style={styles.bubbleTouch}>
            <Text style={styles.bubbleText}>Chat</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  morphContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 999,
    overflow: "hidden",
    elevation: 12,
  },
  chatContent: {
    flex: 1,
  },
  bubbleTouch: {
    backgroundColor: "#007AFF",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  header: {
    height: 60,
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // Floating bubble
  bubble: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 10,
  },

  // Full-screen expanded chat
  expandedContainer: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 999,
  },
  minimizeText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  chatBody: {
    flex: 1,
    padding: 16,
  },
  chatInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f7f7f7",
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 8,
    color: "#000",
    textAlignVertical: "top",
  },
});

export default ChatOverlay;
