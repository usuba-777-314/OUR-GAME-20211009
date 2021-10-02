<template>
  <div class="player-quiz-result">
    <img class="result-image" :src="resultImage" />
    <div class="correct-text">{{ quiz.correct.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Object,
      required: true,
    },
    choiceNumber: {
      type: Number,
      required: false,
    },
  },

  computed: {
    resultImage() {
      switch (this.isCorrect) {
        case true:
          return "/assets/player_quiz_correct.png";
        case false:
          return "/assets/player_quiz_incorrect.png";
      }
    },

    isCorrect() {
      return this.quiz.correct.number === this.choiceNumber;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-quiz-result {
  padding: 24px;

  display: flex;
  justify-content: center;
  flex-flow: column;
}

.correct-text {
  height: 160px;
  line-height: 150%;

  padding: 16px 24px 16px 32px;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  color: black;
  font-size: 16px;
  font-weight: bold;

  background-image: url("/assets/player_quiz_correct_text_background.png");
  background-size: cover;
}
</style>
