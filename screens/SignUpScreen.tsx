import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { RootStackParamList } from "../navigation/MainNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FormCard from "../components/FormCard";
import PrimaryButton from "../components/PrimaryButton";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import { getPasswordStrength, isValidEmail } from "../utils/validation";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const SignUpScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordRef = useRef<TextInput>(null);

  const isEmailValid = isValidEmail(email);
  const passwordStrength = getPasswordStrength(password);

  const isFormValid = isEmailValid && password.length > 0;

  const saveCredential = async (email: string, password: string) => {
    if (Platform.OS === "web" && "credentials" in navigator) {
      try {
        // @ts-ignore
        const cred = new window.PasswordCredential({
          id: email,
          password,
        });
        await navigator.credentials.store(cred);
      } catch (err) {
        console.error("❌ Failed to save credential:", err);
      }
    }
  };

  return (
    <FormCard>
      <Text style={styles.title}>Create Your Account</Text>
      <EmailInput
        value={email}
        onChangeText={setEmail}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      {!isEmailValid && email.length > 0 && (
        <Text style={styles.error}>Enter a valid email address</Text>
      )}
      <PasswordInput
        ref={passwordRef}
        value={password}
        onChangeText={setPassword}
      />
      {password.length > 0 && (
        <Text
          style={[
            styles.strength,
            passwordStrength === "Strong" && { color: "green" },
            passwordStrength === "Moderate" && { color: "orange" },
            passwordStrength === "Weak" && { color: "crimson" },
          ]}
        >
          Password strength: {passwordStrength}
        </Text>
      )}
      <PrimaryButton
        label="Sign Up"
        disabled={!isFormValid}
        onPress={async () => {
          await saveCredential(email, password);
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
  error: {
    color: "crimson",
    marginBottom: 8,
    marginStart: 4,
    fontSize: 13,
  },
  strength: {
    fontSize: 13,
    marginBottom: 16,
    marginStart: 4,
  },
});

export default SignUpScreen;
