import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useChatOverlay } from "../components/ChatOverlay";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const { showOverlay } = useChatOverlay();

  return (
    <View style={styles.container}>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
      <Button title="Start Chat" onPress={showOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default SettingsScreen;
