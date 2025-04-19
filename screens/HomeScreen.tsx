import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useChatOverlay } from "../components/ChatOverlay";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { showOverlay } = useChatOverlay();

  return (
    <View style={styles.container}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings" as never)}
      />
      <Button title="Start Chat" onPress={showOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default HomeScreen;
