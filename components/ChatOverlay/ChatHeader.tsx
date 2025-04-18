import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

type ChatHeaderProps = {
  onMinimize: () => void;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMinimize }) => {
  return (
    <View style={[styles.header]}>
      <Text style={styles.headerTitle}>Chat</Text>
      <TouchableOpacity onPress={onMinimize}>
        <Text style={styles.minimizeText}>Minimize</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
