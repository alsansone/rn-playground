import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const scale = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(scale.value, { damping: 10, stiffness: 100 }) },
      ],
      opacity: withSpring(scale.value),
    };
  });

  React.useEffect(() => {
    // Trigger the animation when the component mounts
    scale.value = 1;
  }, []);

  return (
    <Animated.View
      style={[
        styles.messageBubble,
        message.sender === "user" ? styles.userBubble : styles.botBubble,
        animatedStyle,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          message.sender === "bot" ? { color: "#000" } : null,
        ]}
      >
        {message.text}
      </Text>
    </Animated.View>
  );
};

const ChatBody: React.FC<ChatBodyProps> = ({ messages, isTyping }) => {
  const renderMessage = ({ item }: { item: Message }) => {
    return <MessageBubble message={item} />;
  };

  const footer = () => {
    if (isTyping) {
      return (
        <Text style={{ marginStart: 16, marginBottom: 16, color: "#000" }}>
          Typing...
        </Text>
      );
    }
    return null;
  };

  return (
    <Animated.FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderMessage}
      contentContainerStyle={{ padding: 16 }}
      style={{ flex: 1 }}
      itemLayoutAnimation={LinearTransition}
      initialNumToRender={30}
      ListFooterComponent={footer}
    />
  );
};

export default ChatBody;
