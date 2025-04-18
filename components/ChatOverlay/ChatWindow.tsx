import React, { useState } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { View } from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useKeyboardHeight from "./useKeyboardHeight";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatBody, { Message } from "./ChatBody";
import { useChatOverlay } from "./ChatOverlayProvider";

type ChatWindowProps = {
  contentOpacity: SharedValue<number>;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ contentOpacity }) => {
  const { minimize } = useChatOverlay();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const insets = useSafeAreaInsets();

  const keyboardHeight = useKeyboardHeight();

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [newMsg, ...prev]);
    setMessage("");

    setTimeout(() => {
      const reply: Message = {
        id: Date.now().toString() + "-bot",
        text: "I'm a bot 🤖",
        sender: "bot",
        timestamp: Date.now(),
      };
      setMessages((prev) => [reply, ...prev]);
    }, 1000);
  };

  return (
    <Animated.View
      style={[styles.chatContent, contentStyle, { paddingTop: insets.top }]}
    >
      <View style={{ flex: 1 }}>
        <ChatHeader onMinimize={minimize} />
        <ChatBody messages={messages} />
        <ChatInput
          message={message}
          onChangeMessage={setMessage}
          onSend={sendMessage}
          keyboardHeight={keyboardHeight}
        />
      </View>
    </Animated.View>
  );
};

export default ChatWindow;
