// app/group-questions.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import useStore from "../store";
import translations from "@/localisation/translations";
import themes from "@/themes";

const GroupQuestionsScreen = () => {
  const router = useRouter();
  const { theme } = useLocalSearchParams();
  const currentPlayer = useStore((state) => state.getCurrentPlayer);
  const nextPlayer = useStore((state) => state.nextPlayer);
  const previousPlayer = useStore((state) => state.previousPlayer);
  const getRandomQuestion = useStore((state) => state.getRandomQuestion);
  const resetAskedQuestions = useStore((state) => state.resetAskedQuestions);

  const appTheme = useStore((state) => state.theme);
  const hapticsEnabled = useStore((state) => state.hapticsEnabled);
  const currentTheme = themes[appTheme];

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    resetAskedQuestions(); // Reset asked questions when starting the screen
    setQuestion(getRandomQuestion(theme));
  }, [theme]);

  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("../../assets/fonts/OpenDyslexic3-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  const handleNext = () => {
    nextPlayer();
    const nextQuestion = getRandomQuestion(theme);
    setQuestion(nextQuestion);
    if (hapticsEnabled && nextQuestion) {
      Haptics.selectionAsync();
    }
  };

  const handlePrev = () => {
    previousPlayer();
    const prevQuestion = getRandomQuestion(theme);
    setQuestion(prevQuestion);
    if (hapticsEnabled && prevQuestion) {
      Haptics.selectionAsync();
    }
  };

  const handleQuit = () => {
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
    router.push("/");
  };

  const renderQuestion = (question) => {
    if (question === null) {
      return (
        <Text style={[styles.question, { color: currentTheme.text }]}>
          {translations.noMoreQuestions}
        </Text>
      );
    } else if (typeof question === "string") {
      return (
        <Text style={[styles.question, { color: currentTheme.text }]}>
          {question.replace("[Naam]", currentPlayer())}
        </Text>
      );
    } else if (typeof question === "object" && question.main && question.sub) {
      return (
        <View>
          <Text style={[styles.question, { color: currentTheme.text }]}>
            {question.main.replace("[Naam]", currentPlayer())}
          </Text>
          <Text style={[styles.subQuestion, { color: currentTheme.text }]}>
            {question.sub}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <View style={styles.questionContainer}>{renderQuestion(question)}</View>
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
        style={[styles.quitButton, { backgroundColor: "red" }]}
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
  questionContainer: {
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "OpenDyslexic",
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  subQuestion: {
    fontSize: 16,
    marginLeft: 20,
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

export default GroupQuestionsScreen;
