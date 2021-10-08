<template>
  <div class="game-master-game-state">
    <template v-if="isWaiting">
      <span>参加待機中</span>
    </template>

    <template v-if="isQuizReading">
      <span>{{ `第${game.quiz.number}問` }}</span>
      <span>クイズ読み上げ中</span>
    </template>

    <template v-if="isQuizAnswering">
      <span>{{ `第${game.quiz.number}問` }}</span>
      <span>クイズ解答中</span>
      <span>{{ `残り${game.remainingTime}秒` }}</span>
    </template>

    <template v-if="isQuizResult">
      <span>{{ `第${game.quiz.number}問` }}</span>
      <span>クイズ結果発表中</span>
    </template>

    <template v-if="isQuizFinalResult">
      <span>クイズ最終結果</span>
    </template>
  </div>
</template>

<script>
import GameState from "../application/gameState";

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isWaiting() {
      return this.game.state === GameState.WAITING;
    },

    isQuizReading() {
      return this.game.state === GameState.QUIZ_READING;
    },

    isQuizAnswering() {
      return this.game.state === GameState.QUIZ_ANSWERING;
    },

    isQuizResult() {
      return this.game.state === GameState.QUIZ_RESULT;
    },

    isQuizFinalResult() {
      return this.game.state === GameState.QUIZ_FINAL_RESULT;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-master-game-state {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: #aa1bff;

  color: #ffffff;
  font-weight: bold;

  > * {
    padding: 8px;
  }
}
</style>
