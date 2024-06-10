// app/index.js
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import useStore from "../store";
import { TransitionPresets } from "@react-navigation/stack";

const App = () => {
  const checkReduceMotion = useStore((state) => state.checkReduceMotion);
  const reduceAnimations = useStore((state) => state.reduceAnimations);

  useEffect(() => {
    checkReduceMotion();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        ...(reduceAnimations && { ...TransitionPresets.DefaultTransition }),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="solo-play" options={{ headerShown: false }} />
      <Stack.Screen name="group-play" options={{ headerShown: false }} />
      <Stack.Screen name="questions" options={{ headerShown: false }} />
      <Stack.Screen name="group-questions" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default App;
