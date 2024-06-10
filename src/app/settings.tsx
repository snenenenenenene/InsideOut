// app/settings.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import useStore from "../store";
import translations from "@/localisation/translations";
import themes from "@/themes";

const SettingsScreen = () => {
  const {
    theme,
    reduceAnimations,
    hapticsEnabled,
    setTheme,
    toggleAnimations,
    toggleHaptics,
  } = useStore();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("../../assets/fonts/OpenDyslexic3-Regular.ttf"),
  });

  const currentTheme = themes[theme];
  const themeOptions = Object.keys(themes);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <Text style={[styles.title, { color: currentTheme.title }]}>
        {translations.settings}
      </Text>
      <Text style={[styles.subtitle, { color: currentTheme.text }]}>
        {translations.theme}
      </Text>
      {themeOptions.map((t) => (
        <TouchableOpacity
          key={t}
          style={[
            styles.themeButton,
            {
              backgroundColor:
                theme === t ? currentTheme.buttonSecondary : "#D3D3D3",
            },
          ]}
          onPress={() => setTheme(t)}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  theme === t
                    ? currentTheme.buttonTextSecondary
                    : currentTheme.text,
              },
            ]}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={styles.switchContainer}>
        <Text style={[styles.subtitle, { color: currentTheme.text }]}>
          {translations.reduceAnimations}
        </Text>
        <Switch value={reduceAnimations} onValueChange={toggleAnimations} />
      </View>
      <View style={styles.switchContainer}>
        <Text style={[styles.subtitle, { color: currentTheme.text }]}>
          {translations.haptics}
        </Text>
        <Switch value={hapticsEnabled} onValueChange={toggleHaptics} />
      </View>
      <TouchableOpacity
        style={[styles.homeButton, { backgroundColor: currentTheme.button }]}
        onPress={() => router.push("/")}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          {translations.home}
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
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "OpenDyslexic",
  },
  themeButton: {
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
    fontSize: 18,
    fontFamily: "OpenDyslexic",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  homeButton: {
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
});

export default SettingsScreen;
