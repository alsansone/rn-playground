import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import { ChatOverlayProvider } from "./components/ChatOverlay";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ChatOverlay from "./screens/ChatOverlay";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <ChatOverlayProvider>
              <ChatOverlay />
              <MainNavigator />
            </ChatOverlayProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
