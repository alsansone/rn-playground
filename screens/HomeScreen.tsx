import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../hooks/hooks";
import { logout } from "../store/authSlice";

const HomeScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
      <Button
        title="Logout"
        onPress={() => {
          dispatch(logout());
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
  },
});

export default HomeScreen;
