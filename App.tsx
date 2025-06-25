import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ChatOverlay from "./screens/ChatOverlay";
import * as Linking from "expo-linking";

// Build your prefixes array:
const prefix = Linking.createURL("/");
const customScheme = "rnplayground://";
const urls = [prefix, customScheme];

const linking = {
  prefixes: urls,
  config: {
    screens: {
      Login: "login",
      SignUp: "signUp",
      Settings: "settings",
      Home: "home",
    },
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer linking={linking}>
            <ChatOverlay />
            <MainNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
