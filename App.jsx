import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./src/screens/LoginScreen";
import SplashScreen from "./src/screens/SplashScreen";
import UserTypeSelectionScreen from "./src/screens/UserTypeSelectionScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* <Stack.Screen name="UserSelection" component={UserTypeSelectionScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}