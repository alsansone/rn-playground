import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type ChatHeaderProps = {
  onMinimize: () => void;
  onClose: () => void;
  title?: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onMinimize,
  onClose,
  title = "Adam",
}) => {
  return (
    <View style={styles.chatHeaderContainer}>
      <TouchableOpacity onPress={onClose} style={styles.chatHeaderIcon}>
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.chatHeaderTitle}>{title}</Text>

      <TouchableOpacity onPress={onMinimize} style={styles.chatHeaderIcon}>
        <MaterialCommunityIcons name="arrow-collapse" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
