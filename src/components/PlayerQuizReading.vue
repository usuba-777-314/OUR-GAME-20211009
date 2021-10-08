<template>
  <div class="player-quiz-reading">
    <img :src="quizNumberImage" />
  </div>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },

  computed: {
    quizNumberImage() {
      return `/assets/player_quiz_number_${this.quiz.number}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-quiz-reading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
