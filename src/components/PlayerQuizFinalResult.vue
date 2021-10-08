<template>
  <div class="player-quiz-final-result">
    <img class="result-image" :src="resultImage" />
  </div>
</template>

<script>
export default {
  props: {
    correctCount: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  computed: {
    resultImage() {
      switch (this.correctCount) {
        case 0:
          return "/assets/player_quiz_final_result_0.png";
        case 1:
          return "/assets/player_quiz_final_result_1.png";
        case 2:
          return "/assets/player_quiz_final_result_2.png";
        case 3:
          return "/assets/player_quiz_final_result_3.png";
        case 4:
          return "/assets/player_quiz_final_result_4.png";
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.player-quiz-final-result {
  padding: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
