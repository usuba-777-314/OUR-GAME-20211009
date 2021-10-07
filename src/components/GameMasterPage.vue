<template>
  <section class="game-master-page">
    <GameMasterGameState :game="game" />
    <GameMasterQuizInfo v-if="showsQuizInfo" :quiz="game.quiz" />
  </section>
</template>

<script>
import GameState from "../application/gameState";
import GameMasterGameState from "./GameMasterGameState.vue";
import GameMasterQuizInfo from "./GameMasterQuizInfo.vue";

export default {
  components: {
    GameMasterGameState,
    GameMasterQuizInfo,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  computed: {
    showsQuizInfo() {
      return [
        GameState.QUIZ_READING,
        GameState.QUIZ_ANSWERING,
        GameState.QUIZ_RESULT,
      ].includes(this.game.state);
    },
  },
};
</script>

<style lang="scss" scoped>
.game-master-page {
  padding: 16px;
}

.game-master-quiz-info {
  margin-top: 16px;
}
</style>
