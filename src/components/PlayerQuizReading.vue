<template>
  <div class="player-quiz-reading">
    <img :src="quizNumberImage" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },

  computed: {
    quizNumberImage(): string {
      return `/assets/player_quiz_number_${this.quiz.number}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-quiz-reading {
  min-width: 320px;
  min-height: 336px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
