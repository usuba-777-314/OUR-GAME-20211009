<template>
  <PlayerPage :game="game" :user="user" />
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import PlayerPage from "@/components/PlayerPage.vue";
import store from "@/store";
import GameRepository from "../infrastructure/gameRepository";
import QuizRepository from "../infrastructure/quizRepository";

const { mapGetters } = createNamespacedHelpers("playerApp");

export default {
  components: {
    PlayerPage,
  },

  computed: {
    ...mapGetters(["game"]),
    user() {
      return {};
    },
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("playerApp/setRepositories", {
      gameRepository: new GameRepository(),
      quizRepository: new QuizRepository(),
    });

    store.dispatch("playerApp/setup");

    next();
  },
};
</script>
