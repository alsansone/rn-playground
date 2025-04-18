import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

type ChatBubbleProps = {
  onPress: () => void;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.bubbleTouch}>
    <Text style={styles.bubbleText}>Chat</Text>
  </TouchableOpacity>
);

export default ChatBubble;
