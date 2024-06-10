// @/localisation/translations.js
import * as Localization from "expo-localization";

const en = {
  playAlone: "Play Alone",
  playInGroup: "Play in Group",
  settings: "Settings",
  chooseTheme: "Choose a Theme",
  startGame: "Start Game",
  enterPlayerNames: "Enter Player Names",
  addPlayer: "Add Player",
  quit: "Quit",
  questionsTitle: "{theme} Questions",
  questionForYou: "{player}, this question is for you: ",
  previous: "Previous",
  next: "Next",
  theme: "Theme",
  reduceAnimations: "Reduce Animations",
  haptics: "Enable Haptics",
  home: "Home",
  noMoreQuestions: "No more questions available for this theme.",
  themes: {
    zen: "Zen",
    inTheDepths: "In de diepte",
    explorASSie: "ExplorASSie",
    thinkingTogether: "Samen denken",
  },
};

const nl = {
  playAlone: "Alleen spelen",
  playInGroup: "In groep spelen",
  settings: "Instellingen",
  chooseTheme: "Kies een thema",
  startGame: "Spel starten",
  enterPlayerNames: "Voer spelersnamen in",
  addPlayer: "Speler toevoegen",
  quit: "Stoppen",
  questionsTitle: "{theme} Vragen",
  questionForYou: "{player}, deze vraag is voor jou: ",
  previous: "Vorige",
  next: "Volgende",
  theme: "Thema",
  reduceAnimations: "Verminder animaties",
  haptics: "Schakel haptische feedback in",
  home: "Home",
  noMoreQuestions: "Geen vragen meer beschikbaar voor dit thema.",
  themes: {
    zen: "Zen",
    inTheDepths: "In de diepte",
    explorASSie: "ExplorASSie",
    thinkingTogether: "Samen denken",
  },
};

const translations = Localization.locale.startsWith("nl") ? nl : en;

export default translations;
