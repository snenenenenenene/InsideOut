// app/group-play.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as Haptics from "expo-haptics";
import useStore from "../store";
import translations from "@/localisation/translations";
import themes from "@/themes";

const GroupPlayScreen = () => {
  const router = useRouter();
  const [currentName, setCurrentName] = useState("");
  const groupPlayers = useStore((state) => state.groupPlayers);
  const addGroupPlayer = useStore((state) => state.addGroupPlayer);
  const removeGroupPlayer = useStore((state) => state.removeGroupPlayer);
  const resetGroupPlayers = useStore((state) => state.resetGroupPlayers);
  const resetAskedQuestions = useStore((state) => state.resetAskedQuestions);

  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("../../assets/fonts/OpenDyslexic3-Regular.ttf"),
  });

  const theme = useStore((state) => state.theme);
  const hapticsEnabled = useStore((state) => state.hapticsEnabled);
  const currentTheme = themes[theme];

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  const handleAddPlayer = () => {
    if (currentName.trim()) {
      addGroupPlayer(currentName.trim());
      setCurrentName("");
      if (hapticsEnabled) {
        Haptics.selectionAsync();
      }
    }
  };

  const handleRemovePlayer = (name) => {
    removeGroupPlayer(name);
    if (hapticsEnabled) {
      Haptics.selectionAsync();
    }
  };

  const handleStart = () => {
    if (groupPlayers.length > 0) {
      resetAskedQuestions(); // Reset asked questions when starting a new game
      if (hapticsEnabled) {
        Haptics.selectionAsync();
      }
      router.push("/group-questions?theme=Samen denken");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.background }]}
    >
      <Text style={[styles.title, { color: currentTheme.title }]}>
        {translations.enterPlayerNames}
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: currentTheme.text, color: currentTheme.text },
        ]}
        placeholder={translations.enterPlayerNames}
        placeholderTextColor={currentTheme.text}
        value={currentName}
        onChangeText={setCurrentName}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentTheme.button }]}
        onPress={handleAddPlayer}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          {translations.addPlayer}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={groupPlayers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.nameContainer}>
            <Text style={[styles.nameText, { color: currentTheme.text }]}>
              {item}
            </Text>
            <TouchableOpacity onPress={() => handleRemovePlayer(item)}>
              <Text
                style={[styles.removeText, { color: currentTheme.buttonText }]}
              >
                x
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentTheme.button }]}
        onPress={handleStart}
      >
        <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
          {translations.startGame}
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
  input: {
    borderWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
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
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "80%",
  },
  nameText: {
    fontSize: 18,
    fontFamily: "OpenDyslexic",
  },
  removeText: {
    fontSize: 16,
    fontFamily: "OpenDyslexic",
  },
});

export default GroupPlayScreen;
