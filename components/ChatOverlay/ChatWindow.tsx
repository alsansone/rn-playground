import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatBody from "./ChatBody";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sendMessage } from "../../store/messagesSlice";

type ChatWindowProps = {
  onPress: () => void;
  onClose: () => void;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ onPress, onClose }) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.messages.items);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const send = () => {
    if (!message.trim()) return;

    dispatch(sendMessage(message.trim(), "user"));
    setMessage("");

    // Show typing indicator
    setIsTyping(true);

    // Fake bot reply after delay
    setTimeout(() => {
      dispatch(sendMessage("I'm a bot 🤖", "bot"));
      setIsTyping(false);
    }, 1500);
  };

  return (
    <View style={styles.chatContent}>
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
            onSend={send}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ChatWindow;
