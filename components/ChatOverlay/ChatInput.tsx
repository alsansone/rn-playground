import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./styles";

type ChatInputProps = {
  message: string;
  onChangeMessage: (text: string) => void;
  onSend: () => void;
};

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onChangeMessage,
  onSend,
}) => {
  return (
    <View style={[styles.chatInput]}>
      <TextInput
        style={styles.inputField}
        value={message}
        onChangeText={onChangeMessage}
        placeholder="Type a message..."
        placeholderTextColor="#aaa"
        multiline
      />
      <TouchableOpacity
        onPress={onSend}
        disabled={message.trim().length === 0}
        style={[
          styles.sendButton,
          message.trim().length === 0 && styles.sendButtonDisabled,
        ]}
      >
        <Ionicons
          name="send"
          size={24}
          color={message.trim().length === 0 ? "#ccc" : "#007AFF"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
