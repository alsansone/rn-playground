import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useChatOverlay } from "./ChatOverlayProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const ChatOverlay: React.FC = () => {
  const { isExpanded, expand, minimize } = useChatOverlay();

  const insets = useSafeAreaInsets();

  // Shared values for the bubble position (when minimized)
  const translateX = useSharedValue(width - 80);
  const translateY = useSharedValue(height - 160);

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

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const [message, setMessage] = React.useState("");

  if (isExpanded) {
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.expandedContainer,
          { paddingTop: insets.top },
        ]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Chat</Text>
              <TouchableOpacity onPress={minimize}>
                <Text style={styles.minimizeText}>Minimize</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chatBody}>
              <Text>Messages go here</Text>
            </View>

            <View
              style={[styles.chatInput, { paddingBottom: insets.bottom || 16 }]}
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
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }

  // Minimized floating chat bubble
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.bubble, bubbleStyle]}>
        <TouchableOpacity onPress={expand} style={styles.bubbleTouch}>
          <Text style={styles.bubbleText}>Chat</Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
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
  bubbleTouch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Full-screen expanded chat
  expandedContainer: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    zIndex: 999,
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
    backgroundColor: "red",
  },
  inputField: {
    flex: 1,
    maxHeight: 60,
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 8,
    color: "#000",
    textAlignVertical: "top",
  },
});

export default ChatOverlay;
