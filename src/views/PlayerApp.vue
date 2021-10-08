<template>
  <PlayerPage
    :game="game"
    :user="user"
    @choice="choiceAnswer({ choiceNumber: $event })"
  />
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import PlayerPage from "@/components/PlayerPage.vue";
import store from "@/store";
import GameRepository from "../infrastructure/gameRepository";
import QuizRepository from "../infrastructure/quizRepository";
import UserChoiceRepository from "../infrastructure/userChoiceRepository";
import UserRepository from "../infrastructure/userRepository";

const { mapGetters, mapActions } = createNamespacedHelpers("playerApp");

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
      userChoiceRepository: new UserChoiceRepository(),
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

  methods: {
    ...mapActions(["choiceAnswer"]),
  },
};
</script>
