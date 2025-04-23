import React, { useRef, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { RootStackParamList } from "../navigation/MainNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FormCard from "../components/FormCard";
import PrimaryButton from "../components/PrimaryButton";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordRef = useRef<TextInput>(null);

  return (
    <FormCard>
      <Text style={styles.title}>Create Your Account</Text>
      <EmailInput
        value={email}
        onChangeText={setEmail}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <PasswordInput
        ref={passwordRef}
        value={password}
        onChangeText={setPassword}
      />
      <PrimaryButton
        label="Sign Up"
        onPress={() => {
          console.log("Sign up", email, password);
          navigation.goBack();
        }}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>
          Already have an account? <Text style={styles.linkBold}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </FormCard>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#1565c0",
  },
  link: {
    textAlign: "center",
    color: "#555",
    fontSize: 14,
  },
  linkBold: {
    color: "#1565c0",
    fontWeight: "600",
  },
});

export default SignUpScreen;
