// app/solo-questions.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import useStore from "../store";
import translations from "@/localisation/translations";
import themes from "@/themes";

const SoloQuestionsScreen = () => {
  const router = useRouter();
  const { theme } = useLocalSearchParams();
  const questions = useStore((state) => state.getQuestions(theme));
  const setResponse = useStore((state) => state.setResponse);
  const getResponse = useStore((state) => state.getResponse);
  const hapticsEnabled = useStore((state) => state.hapticsEnabled);

  const appTheme = useStore((state) => state.theme);
  const currentTheme = themes[appTheme];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [response, setResponseText] = useState(
    getResponse(theme, currentQuestionIndex)
  );

  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("../../assets/fonts/OpenDyslexic3-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  const handleNext = () => {
    setResponse(theme, currentQuestionIndex, response);
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    setResponseText(
      getResponse(theme, (currentQuestionIndex + 1) % questions.length)
    );
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
  };

  const handlePrev = () => {
    setResponse(theme, currentQuestionIndex, response);
    setCurrentQuestionIndex(
      (prevIndex) => (prevIndex - 1 + questions.length) % questions.length
    );
    setResponseText(
      getResponse(
        theme,
        (currentQuestionIndex - 1 + questions.length) % questions.length
      )
    );
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
  };

  const handleQuit = () => {
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
    router.push("/");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <Text style={[styles.question, { color: currentTheme.text }]}>
        {questions[currentQuestionIndex]}
      </Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={[
          styles.input,
          { borderColor: currentTheme.text, color: currentTheme.text },
        ]}
        placeholder={translations.enterResponse}
        placeholderTextColor={currentTheme.text}
        value={response}
        onChangeText={setResponseText}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: currentTheme.button }]}
          onPress={handlePrev}
        >
          <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
            {translations.previous}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: currentTheme.button }]}
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
            {translations.next}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.quitButton, { backgroundColor: "#FF6861" }]}
        onPress={handleQuit}
      >
        <Text style={styles.buttonText}>{translations.quit}</Text>
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
  question: {
    fontSize: 18,
    width: "80%",
    marginVertical: 20,
    textAlign: "center",
    fontFamily: "OpenDyslexic",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  navButton: {
    padding: 16,
    borderRadius: 25,
    margin: 10,
    alignItems: "center",
    width: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  quitButton: {
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

export default SoloQuestionsScreen;
