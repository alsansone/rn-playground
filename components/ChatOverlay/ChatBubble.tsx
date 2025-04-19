import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Animated from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

type ChatBubbleProps = {
  onPress: () => void;
  onClose: () => void;
  statusText?: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
  onPress,
  onClose,
  statusText = "Connecting to chat…",
}) => {
  return (
    <Animated.View style={[styles.chatMiniContainer]}>
      <TouchableOpacity onPress={onClose} style={styles.chatMiniTop}>
        <Ionicons name="close" size={28} color="#000" />
      </TouchableOpacity>

      <View style={styles.chatMiniDivider} />

      <TouchableOpacity onPress={onPress} style={styles.chatMiniBottom}>
        <View style={styles.chatMiniIcon}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#666" />
        </View>
        <View style={styles.chatMiniTextWrap}>
          <Text style={styles.chatMiniText}>{statusText}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ChatBubble;
