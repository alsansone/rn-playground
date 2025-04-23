import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const PrimaryButton = ({ label, disabled, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && { backgroundColor: "#a5d0f5" }]}
      onPress={onPress}
    >
      <Text style={[styles.text, disabled && { color: "#eee" }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#42a5f5",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 14,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default PrimaryButton;
