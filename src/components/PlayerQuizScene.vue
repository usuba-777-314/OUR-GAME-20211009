<template>
  <div class="player-quiz-scene">
    <PlayerQuizReading class="reading-layer" :quiz="game.quiz" />
    <div class="overlay" />
  </div>
</template>

<script>
import PlayerQuizReading from "./PlayerQuizReading.vue";

export default {
  components: {
    PlayerQuizReading,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$READING_LAYER_Z_INDEX: 10;

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
}

.reading-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $READING_LAYER_Z_INDEX;
}
</style>
