<template>
  <div class="player-quiz-scene" :class="sceneState">
    <PlayerQuizReading class="reading-layer" :quiz="game.quiz" />

    <PlayerQuizAnswering
      v-if="showsAnsweringLayer"
      class="answering-layer"
      :quiz="game.quiz"
      :choiceNumber="user.choiceNumber"
      @choice="$emit('choice', $event)"
    />

    <PlayerQuizResult
      v-if="showsResultLayer"
      class="result-layer"
      :quiz="game.quiz"
      :choiceNumber="user.choiceNumber"
    />

    <PlayerQuizFinalResult
      v-if="showsFinalResultLayer"
      class="final-result-layer"
      :correctCount="user.correctCount"
    />

    <div class="overlay" />
  </div>
</template>

<script>
import GameState from "../application/gameState";
import PlayerQuizReading from "./PlayerQuizReading.vue";
import PlayerQuizAnswering from "./PlayerQuizAnswering.vue";
import PlayerQuizResult from "./PlayerQuizResult.vue";
import PlayerQuizFinalResult from "./PlayerQuizFinalResult.vue";

export default {
  components: {
    PlayerQuizReading,
    PlayerQuizAnswering,
    PlayerQuizResult,
    PlayerQuizFinalResult,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: false,
    },
  },

  computed: {
    sceneState() {
      switch (this.game.state) {
        case GameState.QUIZ_READING:
          return "player-quiz-scene--reading";
        case GameState.QUIZ_ANSWERING:
          return "player-quiz-scene--answering";
        case GameState.QUIZ_RESULT:
          return "player-quiz-scene--result";
        case GameState.QUIZ_FINAL_RESULT:
          return "player-quiz-scene--final-result";
        default:
          return "";
      }
    },

    showsAnsweringLayer() {
      return [
        GameState.QUIZ_ANSWERING,
        GameState.QUIZ_RESULT,
        GameState.QUIZ_FINAL_RESULT,
      ].includes(this.game.state);
    },

    showsResultLayer() {
      return [GameState.QUIZ_RESULT, GameState.QUIZ_FINAL_RESULT].includes(
        this.game.state
      );
    },

    showsFinalResultLayer() {
      return [GameState.QUIZ_FINAL_RESULT].includes(this.game.state);
    },
  },
};
</script>

<style lang="scss" scoped>
$READING_LAYER_Z_INDEX: 10;
$ANSWERING_LAYER_Z_INDEX: 20;
$RESULT_LAYER_Z_INDEX: 30;
$FINAL_RESULT_LAYER_Z_INDEX: 40;

.player-quiz-scene {
  position: relative;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.6);
  z-index: $READING_LAYER_Z_INDEX - 1;

  .player-quiz-scene--reading & {
    z-index: $READING_LAYER_Z_INDEX - 1;
  }

  .player-quiz-scene--answering & {
    z-index: $ANSWERING_LAYER_Z_INDEX - 1;
  }

  .player-quiz-scene--result & {
    z-index: $RESULT_LAYER_Z_INDEX - 1;
  }

  .player-quiz-scene--final-result & {
    z-index: $FINAL_RESULT_LAYER_Z_INDEX - 1;
  }
}

.reading-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $READING_LAYER_Z_INDEX;
}

.answering-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $ANSWERING_LAYER_Z_INDEX;
}

.result-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $RESULT_LAYER_Z_INDEX;
}

.final-result-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $FINAL_RESULT_LAYER_Z_INDEX;
}
</style>
