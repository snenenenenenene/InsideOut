// app/solo-play.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import translations from "@/localisation/translations";
import useStore from "../store";
import themes from "@/themes";

const SoloPlayScreen = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("../../assets/fonts/OpenDyslexic3-Regular.ttf"),
  });

  const theme = useStore((state) => state.theme);
  const hapticsEnabled = useStore((state) => state.hapticsEnabled);
  const currentTheme = themes[theme];

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  const handlePress = (route) => {
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
    router.push(route);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <Text style={[styles.title, { color: currentTheme.title }]}>
        {translations.chooseTheme}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          styles.zenButton,
          { backgroundColor: currentTheme.button },
        ]}
        onPress={() => handlePress("/questions?theme=Zen")}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          {translations.themes.zen}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.depthButton,
          { backgroundColor: currentTheme.buttonSecondary },
        ]}
        onPress={() => handlePress("/questions?theme=In de diepte")}
      >
        <Text
          style={[
            styles.buttonText,
            { color: currentTheme.buttonTextSecondary },
          ]}
        >
          {translations.themes.inTheDepths}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.exploreButton,
          { backgroundColor: currentTheme.buttonTertiary },
        ]}
        onPress={() => handlePress("/questions?theme=ExplorASSie")}
      >
        <Text
          style={[
            styles.buttonText,
            { color: currentTheme.buttonTextTertiary },
          ]}
        >
          {translations.themes.explorASSie}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "OpenDyslexic",
    marginBottom: 20,
  },
  button: {
    padding: 16,
    borderRadius: 25,
    margin: 10,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "OpenDyslexic",
    fontSize: 18,
  },
});

export default SoloPlayScreen;
