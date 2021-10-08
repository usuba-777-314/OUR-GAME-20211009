<template>
  <GameMasterPage
    :game="game"
    :top-result="topResult"
    :is-processing="isProcessing"
    :is-game-master="isGameMaster"
    @next="nextGameState"
  />
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import GameMasterPage from "@/components/GameMasterPage.vue";
import store from "@/store";
import GameRepository from "../infrastructure/gameRepository";
import QuizRepository from "../infrastructure/quizRepository";
import UserRepository from "../infrastructure/userRepository";

const { mapGetters, mapActions } = createNamespacedHelpers("gameMasterApp");

export default {
  components: {
    GameMasterPage,
  },

  props: {
    isGameMaster: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["game", "topResult", "isProcessing"]),
  },

  async beforeRouteEnter(to, from, next) {
    store.dispatch("gameMasterApp/setRepositories", {
      gameRepository: new GameRepository(),
      quizRepository: new QuizRepository(),
      userRepository: new UserRepository(),
    });

    store.dispatch("gameMasterApp/setup");

    next();
  },

  methods: {
    ...mapActions(["nextGameState"]),
  },
};
</script>
