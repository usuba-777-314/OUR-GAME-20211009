<template>
  <GameMasterPage
    :game="game"
    :top-result="topResult"
    :is-processing="isProcessing"
  />
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import GameMasterPage from "@/components/GameMasterPage.vue";
import store from "@/store";
import GameRepository from "../infrastructure/gameRepository";
import QuizRepository from "../infrastructure/quizRepository";

const { mapGetters } = createNamespacedHelpers("gameMasterApp");

export default {
  components: {
    GameMasterPage,
  },

  computed: {
    ...mapGetters(["game"]),
    topResult() {
      return null;
    },
    isProcessing() {
      return false;
    },
  },

  async beforeRouteEnter(to, from, next) {
    store.dispatch("gameMasterApp/setRepositories", {
      gameRepository: new GameRepository(),
      quizRepository: new QuizRepository(),
    });

    store.dispatch("gameMasterApp/setup");

    next();
  },
};
</script>
