import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { View } from "react-native";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useKeyboardHeight from "./useKeyboardHeight";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatBody, { Message } from "./ChatBody";

type ChatWindowProps = {
  onPress: () => void;
  onClose: () => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ onPress, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const insets = useSafeAreaInsets();

  const keyboardHeight = useKeyboardHeight();

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [userMsg, ...prev]);
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Fake bot reply after delay
    setTimeout(() => {
      const reply: Message = {
        id: Date.now().toString() + "-bot",
        text: "I'm a bot 🤖",
        sender: "bot",
        timestamp: Date.now(),
      };

      setMessages((prev) => [reply, ...prev]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Animated.View style={[styles.chatContent, { paddingTop: insets.top }]}>
      <View style={{ flex: 1 }}>
        <ChatHeader onMinimize={onPress} onClose={onClose} />
        <ChatBody messages={messages} isTyping={isTyping} />
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
