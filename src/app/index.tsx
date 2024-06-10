// app/index.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import translations from "@/localisation/translations";
import useStore from "../store";
import themes from "@/themes";

const HomeScreen = () => {
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
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <TouchableOpacity
        style={[
          styles.button,
          styles.aloneButton,
          { backgroundColor: currentTheme.button },
        ]}
        onPress={() => handlePress("/solo-play")}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          {translations.playAlone}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.groupButton,
          { backgroundColor: currentTheme.buttonSecondary },
        ]}
        onPress={() => handlePress("/group-play")}
      >
        <Text
          style={[
            styles.buttonText,
            { color: currentTheme.buttonTextSecondary },
          ]}
        >
          {translations.playInGroup}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.settingsButton,
          { backgroundColor: currentTheme.buttonTertiary },
        ]}
        onPress={() => handlePress("/settings")}
      >
        <Text
          style={[
            styles.buttonText,
            { color: currentTheme.buttonTextTertiary },
          ]}
        >
          {translations.settings}
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
  logo: {
    width: 400,
    height: 300,
    marginBottom: 20,
  },
});

export default HomeScreen;
