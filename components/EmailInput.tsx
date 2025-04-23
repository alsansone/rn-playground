import React, { forwardRef } from "react";
import { TextInput } from "react-native";
import InputField from "./InputField";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  returnKeyType?: "next" | "done";
};

const EmailInput = forwardRef<TextInput, Props>(
  ({ value, onChangeText, onSubmitEditing, returnKeyType = "next" }, ref) => {
    return (
      <InputField
        ref={ref}
        placeholder="Email"
        value={value}
        onChangeText={onChangeText}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        importantForAutofill="yes"
        accessibilityLabel="Email"
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    );
  }
);

EmailInput.displayName = "EmailInput";

export default EmailInput;
