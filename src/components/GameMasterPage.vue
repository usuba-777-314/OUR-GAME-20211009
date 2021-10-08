<template>
  <section class="game-master-page">
    <GameMasterGameState :game="game" />
    <GameMasterQuizInfo v-if="showsQuizInfo" :quiz="game.quiz" />
    <GameMasterTopResultInfo
      v-if="showsTopResultInfo"
      :top-result="topResult"
    />
    <GameMasterOperateButton :game="game" @click="$emit('next')" />
    <div v-if="isProcessing" class="overlay">処理中です...</div>
  </section>
</template>

<script>
import GameState from "../application/gameState";
import GameMasterGameState from "./GameMasterGameState.vue";
import GameMasterQuizInfo from "./GameMasterQuizInfo.vue";
import GameMasterTopResultInfo from "./GameMasterTopResultInfo.vue";
import GameMasterOperateButton from "./GameMasterOperateButton.vue";

export default {
  components: {
    GameMasterGameState,
    GameMasterQuizInfo,
    GameMasterTopResultInfo,
    GameMasterOperateButton,
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
    isProcessing: {
      type: Boolean,
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

    showsTopResultInfo() {
      return this.game.state === GameState.QUIZ_FINAL_RESULT;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-master-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.game-master-quiz-info {
  margin-top: 16px;
  flex-grow: 1;
}

.game-master-top-result-info {
  margin-top: 16px;
  flex-grow: 1;
}

.game-master-operate-button {
  margin-top: 16px;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
}
</style>
