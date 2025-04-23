import React, { forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps, View } from "react-native";

const InputField = forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <View>
      <TextInput
        ref={ref}
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 18,
    marginBottom: 16,
    paddingEnd: 48,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
});

InputField.displayName = "InputField";

export default InputField;
