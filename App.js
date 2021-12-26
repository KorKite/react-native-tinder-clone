// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {Button, StyleSheet, Text, View, LogBox } from 'react-native';
LogBox.ignoreAllLogs();
import tw from "tailwind-rn"
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}
