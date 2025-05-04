import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { KeyboardAvoidingView, Platform } from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
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

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
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

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Animated.View style={styles.chatContent}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ChatHeader onMinimize={onPress} onClose={onClose} />
          <ChatBody messages={messages} isTyping={isTyping} />
          <ChatInput
            message={message}
            onChangeMessage={setMessage}
            onSend={sendMessage}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Animated.View>
  );
};

export default ChatWindow;
