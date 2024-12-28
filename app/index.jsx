import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </SafeAreaView>
  );
}