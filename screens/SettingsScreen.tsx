import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../hooks/hooks";
import { toggleOverlay } from "../store/messagesSlice";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
      <Button title="Start Chat" onPress={() => dispatch(toggleOverlay())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default SettingsScreen;
