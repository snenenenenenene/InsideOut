// store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AccessibilityInfo } from "react-native";

const useStore = create(
  persist(
    (set, get) => ({
      theme: "pastel", // default theme
      reduceAnimations: false,
      hapticsEnabled: true, // default haptics setting
      setTheme: (theme) => set({ theme }),
      toggleAnimations: () =>
        set((state) => ({ reduceAnimations: !state.reduceAnimations })),
      toggleHaptics: () =>
        set((state) => ({ hapticsEnabled: !state.hapticsEnabled })),
      checkReduceMotion: async () => {
        const isReduceMotionEnabled =
          await AccessibilityInfo.isReduceMotionEnabled();
        set({ reduceAnimations: isReduceMotionEnabled });
      },
      questions: {
        Zen: [
          "Welke technieken helpen mij om te kalmeren als ik me onrustig voel?",
          "Wat geeft mij zelfvertrouwen?",
          "Waar ben ik goed in?",
          "Wat is mijn droomjob?",
          "Wat is een plek waar ik tot rust kan komen?",
          "Wat is mijn favoriete vakantiebestemming?",
          "Welke activiteiten geven mij energie en vreugde?",
          "Welke film link ik aan rust",
          "Welke hobby die ik nu nog niet doe, zou ik wel nog graag ooit uitproberen?",
          "Wat is mijn favoriete herinnering die ik meemaakte bij Actio vzw?",
          "Wat is je favoriete vakantieherinnering?",
          "Wat is je favoriete film? Waarom is dit je favoriete film?",
          "Als je een dag iemand anders zou kunnen zijn, wie zou je dan willen zijn?",
        ],
        "In de diepte": [
          "Wat helpt mij om contact te leggen met een ander persoon?",
          "Welke doelen wil ik nog bereiken in mijn leven?",
          "Hoe ervaar ik vriendschappen? Wat zijn de positieve aspecten en wat zijn de moeilijkheden?",
          "Hoe ga ik om met teleurstellingen?",
          "Hoe zie ik mijn toekomst?",
          "Hoe ziet mijn ideale wereld eruit?",
          "Waar ben ik bang voor? Waarom ben ik hier bang voor?",
          "Welk voorwerp dat je bezit is het belangrijkst voor jou? Waarom?",
          "Als je één boodschap zou mogen geven aan de hele wereld, welke zou dit zijn?",
          "Welke gewoonte zou je liever niet meer hebben?",
        ],
        ExplorASSie: [
          "Hoe kan ik beter voor mezelf zorgen om mijn emotionele welzijn te verbeteren?",
          "Hoe kan ik beter communiceren met mijn vrienden en familie over mijn behoeften en grenzen?",
          "Wat zijn mijn grootste uitdagingen op het gebied van communicatie en hoe kan ik hieraan werken?",
          "Hoe ervaar ik het deelnemen aan groepsactiviteiten? Wat helpt mij om me hier meer op mijn gemak te voelen?",
          "Hoe beïnvloedt ASS mijn dagelijks leven?",
          "In welke sociale situaties voel ik mij ongemakkelijk?",
          "Welk woord link ik met ‘autismespectrumstoornis’?",
          "Hoe ervaar ik mijn eigen diagnose ASS? Wat betekent dit voor mij?",
          "Welke prikkels vind ik moeilijk om te verwerken? (Bijvoorbeeld licht, geluid, bepaalde situaties…)",
          "Hoe kan ik mezelf helpen wanneer ik overprikkeld ben?",
        ],
        "Samen denken": [
          {
            main: "Van deze vijf eigenschappen, welke past het beste bij [Naam] en waarom?",
            subs: [
              "eerlijk, behulpzaam, rustig, enthousiast of creatief",
              "verantwoordelijk, enthousiast, betrouwbaar, expressief of fier",
              "rustig, levendig, luisterend, ordelijk of slim",
              "verantwoordelijk, fier, zorgzaam, zorgelijk of sportief",
              "grappig, behulpzaam, nieuwsgierig, creatief of rustig",
              "trots, optimistisch, nauwkeurig, eerlijk of grappig",
              "slim, verantwoordelijk, fier, moedig of sociaal",
              "sociaal, vrolijk, slim, expressief of enthousiast",
              "vriendelijk, zachtaardig, speels, betrouwbaar of leerzaam",
              "zorgzaam, trots, speels, leerzaam of fantasierijk",
              "nieuwsgierig, vriendelijk, sportief, grappig en moedig",
            ],
          },
          "Aan welke kenmerken kan je zien dat [Naam] gelukkig is?",
          "Op welke momenten heb je [Naam] al gelukkig gezien?",
          "Aan welke kenmerken kan je zien dat [Naam] een slechte dag heeft?",
          "Elke speler noemt een kenmerk op, van hoe je kan zien wanneer iemand zich slecht voelt.",
          "Wat is een wens van jou?",
          "Wat is het leukste dat je ooit met [Naam] hebt meegemaakt?",
          "Als je [Naam] een cadeau zou moeten geven, welk cadeau zou je dan geven en waarom?",
          "Welke activiteit kan je samen met vrienden uitvoeren?",
          "Welke activiteit kan je samen met familie uitvoeren?",
          "Kan elke persoon één van zijn hobby's/interesses opnoemen.",
          "Welke kleur ziet iedereen als je aan bloemen denkt?",
          "Welke kleur ziet iedereen als je aan rust denkt?",
          "welke kleur bloemen past bij [Naam]?",
          "Welke film past het beste bij [Naam]?",
        ],
      },
      responses: {},
      groupPlayers: [],
      currentPlayerIndex: 0,
      askedQuestions: {}, // Track asked questions for each player
      getQuestions: (theme) => get().questions[theme] || [],
      setResponse: (theme, index, response) => {
        const currentResponses = get().responses[theme] || [];
        currentResponses[index] = response;
        set((state) => ({
          responses: {
            ...state.responses,
            [theme]: currentResponses,
          },
        }));
      },
      getResponse: (theme, index) =>
        (get().responses[theme] || [])[index] || "",
      addGroupPlayer: (name) =>
        set((state) => ({ groupPlayers: [...state.groupPlayers, name] })),
      removeGroupPlayer: (name) =>
        set((state) => ({
          groupPlayers: state.groupPlayers.filter((player) => player !== name),
        })),
      resetGroupPlayers: () => set({ groupPlayers: [] }),
      resetAskedQuestions: () =>
        set({
          askedQuestions: get().groupPlayers.reduce((acc, player) => {
            acc[player] = [];
            return acc;
          }, {}),
        }),
      nextPlayer: () =>
        set((state) => ({
          currentPlayerIndex:
            (state.currentPlayerIndex + 1) % state.groupPlayers.length,
        })),
      previousPlayer: () =>
        set((state) => ({
          currentPlayerIndex:
            (state.currentPlayerIndex - 1 + state.groupPlayers.length) %
            state.groupPlayers.length,
        })),
      getCurrentPlayer: () => {
        const players = get().groupPlayers;
        return players.length > 0 ? players[get().currentPlayerIndex] : null;
      },
      getRandomQuestion: (theme) => {
        const player = get().getCurrentPlayer();
        const questionsForTheme = get().questions[theme] || [];
        const askedQuestions = get().askedQuestions[player] || [];
        const remainingQuestions = questionsForTheme.filter((q) => {
          if (typeof q === "string") {
            return !askedQuestions.includes(q);
          } else if (q.main && q.subs) {
            return q.subs.some(
              (sub) => !askedQuestions.includes(`${q.main} ${sub}`)
            );
          }
          return false;
        });

        if (remainingQuestions.length === 0) {
          return null;
        }

        const randomQuestion =
          remainingQuestions[
            Math.floor(Math.random() * remainingQuestions.length)
          ];
        if (typeof randomQuestion === "string") {
          set((state) => ({
            askedQuestions: {
              ...state.askedQuestions,
              [player]: [...askedQuestions, randomQuestion],
            },
          }));
          return randomQuestion;
        } else if (randomQuestion.main && randomQuestion.subs) {
          const remainingSubs = randomQuestion.subs.filter(
            (sub) => !askedQuestions.includes(`${randomQuestion.main} ${sub}`)
          );
          const randomSub =
            remainingSubs[Math.floor(Math.random() * remainingSubs.length)];
          const combinedQuestion = `${randomQuestion.main} ${randomSub}`;
          set((state) => ({
            askedQuestions: {
              ...state.askedQuestions,
              [player]: [...askedQuestions, combinedQuestion],
            },
          }));
          return {
            main: randomQuestion.main,
            sub: randomSub,
          };
        }
        return null;
      },
    }),
    {
      name: "binnenstebuiten-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // switch to localStorage
    }
  )
);

export default useStore;
