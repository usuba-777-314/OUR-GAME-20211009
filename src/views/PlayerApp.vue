<template>
  <PlayerPage :game="game" :user="user" />
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import PlayerPage from "@/components/PlayerPage.vue";
import store from "@/store";
import GameRepository from "../infrastructure/gameRepository";
import QuizRepository from "../infrastructure/quizRepository";
import UserRepository from "../infrastructure/userRepository";

const { mapGetters } = createNamespacedHelpers("playerApp");

export default {
  components: {
    PlayerPage,
  },

  computed: {
    ...mapGetters(["game", "user"]),
  },

  async beforeRouteEnter(to, from, next) {
    store.dispatch("playerApp/setRepositories", {
      gameRepository: new GameRepository(),
      quizRepository: new QuizRepository(),
      userRepository: new UserRepository(),
    });

    const { userId } = to.params;

    try {
      await store.dispatch("playerApp/setup", { userId });
    } catch (e) {
      console.error(e);
      next({ name: "NotFound" });
      return;
    }

    next();
  },
};
</script>
