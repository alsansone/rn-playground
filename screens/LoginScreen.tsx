import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import { RootStackParamList } from "../navigation/MainNavigator";
import FormCard from "../components/FormCard";
import PrimaryButton from "../components/PrimaryButton";
import PasswordInput from "../components/PasswordInput";
import EmailInput from "../components/EmailInput";
import { isValidEmail } from "../utils/validation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordRef = useRef<TextInput>(null);

  const isEmailValid = isValidEmail(email);

  const isFormValid = isEmailValid && password.length > 0;

  const tryAutoFillCredential = async (
    setEmail: (v: string) => void,
    setPassword: (v: string) => void
  ) => {
    if (Platform.OS === "web" && "credentials" in navigator) {
      try {
        const cred = await navigator.credentials.get({
          // @ts-ignore
          password: true,
          mediation: "optional",
        });

        if (cred) {
          setEmail(cred.id);
          // @ts-ignore
          setPassword(cred.password);
        }
      } catch (err) {
        console.error("❌ Failed to get credentials:", err);
      }
    }
  };

  useEffect(() => {
    tryAutoFillCredential(setEmail, setPassword);
  }, []);

  const handleLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <FormCard>
      <Text style={styles.title}>Welcome Back 👋</Text>
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
      <PrimaryButton
        label="Login"
        disabled={!isFormValid}
        onPress={handleLogin}
      />
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>
          Don’t have an account? <Text style={styles.linkBold}>Sign up</Text>
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

export default LoginScreen;
