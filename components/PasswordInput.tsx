import React, { forwardRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

const PasswordInput = forwardRef<TextInput, Props>(
  ({ value, onChangeText }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <View style={styles.wrapper}>
        <InputField
          ref={ref}
          placeholder={"Password"}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          textContentType="password"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          importantForAutofill="yes"
          accessibilityLabel="Password"
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setVisible((prev) => !prev)}
        >
          <Ionicons name={visible ? "eye-off" : "eye"} size={20} color="#888" />
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    right: 16,
    top: 14,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
