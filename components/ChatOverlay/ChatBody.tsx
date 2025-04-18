import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styles from "./styles";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
};

type ChatBodyProps = {
  messages: Message[];
  isTyping: boolean;
};

const ChatBody: React.FC<ChatBodyProps> = ({ messages, isTyping }) => {
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "bot" ? { color: "#000" } : null,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 16 }}
        style={{ flex: 1 }}
        inverted
      />
      {isTyping && (
        <Text style={{ marginStart: 16, marginBottom: 16, color: "#000" }}>
          Typing...
        </Text>
      )}
    </>
  );
};

export default ChatBody;
