import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import styles from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useKeyboardHeight from "./useKeyboardHeight";

type ChatWindowProps = {
  contentOpacity: SharedValue<number>;
  onPress: () => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ contentOpacity, onPress }) => {
  const [message, setMessage] = React.useState("");

  const insets = useSafeAreaInsets();

  const keyboardHeight = useKeyboardHeight();

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <Animated.View
      style={[styles.chatContent, contentStyle, { paddingTop: insets.top }]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.header]}>
          <Text style={styles.headerTitle}>Chat</Text>
          <TouchableOpacity onPress={onPress}>
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
  );
};

export default ChatWindow;
