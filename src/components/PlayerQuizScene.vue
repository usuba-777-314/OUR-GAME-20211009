<template>
  <div class="quiz-number-scene" :class="quizNumberSceneState">
    <PlayerQuizReading class="reading-layer" :quiz="game.currentQuiz" />

    <PlayerQuizAnswering
      v-if="showsAnsweringLayer"
      class="answering-layer"
      :quiz="game.currentQuiz"
      :choiceNumber="choiceNumber"
      @choice="$emit('choice', $event)"
    />

    <div class="overlay" />
  </div>
</template>

<script>
import PlayerQuizReading from "./PlayerQuizReading.vue";
import PlayerQuizAnswering from "./PlayerQuizAnswering.vue";

export default {
  components: {
    PlayerQuizReading,
    PlayerQuizAnswering,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
    choiceNumber: {
      type: Number,
      required: false,
    },
  },

  computed: {
    quizNumberSceneState() {
      switch (this.game.state) {
        case 2:
          return "quiz-number-scene--reading";
        case 3:
          return "quiz-number-scene--answering";
        default:
          return "";
      }
    },

    showsAnsweringLayer() {
      return this.game.state === 3;
    },
  },
};
</script>

<style lang="scss" scoped>
$READING_LAYER_Z_INDEX: 10;
$ANSWERING_LAYER_Z_INDEX: 20;

.quiz-number-scene {
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

  .quiz-number-scene--reading & {
    z-index: $READING_LAYER_Z_INDEX - 1;
  }

  .quiz-number-scene--answering & {
    z-index: $ANSWERING_LAYER_Z_INDEX - 1;
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
</style>
