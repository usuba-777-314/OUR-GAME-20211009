<template>
  <section class="game-master-page">
    <GameMasterGameState :game="game" />
    <GameMasterQuizInfo v-if="showsQuizInfo" :quiz="game.quiz" />
    <GameMasterTopResultInfo
      v-if="showsTopResultInfo"
      :top-result="topResult"
    />
  </section>
</template>

<script>
import GameState from "../application/gameState";
import GameMasterGameState from "./GameMasterGameState.vue";
import GameMasterQuizInfo from "./GameMasterQuizInfo.vue";
import GameMasterTopResultInfo from "./GameMasterTopResultInfo.vue";

export default {
  components: {
    GameMasterGameState,
    GameMasterQuizInfo,
    GameMasterTopResultInfo,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
    topResult: {
      type: Object,
      required: false,
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

    showsTopResultInfo() {
      return this.game.state === GameState.QUIZ_FINAL_RESULT;
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

.game-master-top-result-info {
  margin-top: 16px;
}
</style>
