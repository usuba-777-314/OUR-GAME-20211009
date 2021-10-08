<template>
  <div class="player-quiz-answering">
    <div class="quiz">{{ quiz.content }}</div>

    <PlayerQuizAnsweringChoiceButton
      v-for="choice in quiz.choices"
      :key="choice.number"
      :choice="choice"
      :choiced="choice.number === choiceNumber"
      @choice="$emit('choice', $event)"
    />
  </div>
</template>

<script>
import PlayerQuizAnsweringChoiceButton from "./PlayerQuizAnsweringChoiceButton.vue";

export default {
  components: {
    PlayerQuizAnsweringChoiceButton,
  },

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
};
</script>

<style lang="scss" scoped>
.player-quiz-answering {
  padding: 24px;

  display: flex;
  justify-content: center;
  flex-flow: column;
}

.quiz {
  height: 160px;
  line-height: 150%;

  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  align-items: center;

  color: white;
  font-size: 16px;
  font-weight: bold;

  background-image: url("/assets/player_quiz_background.png");
  background-size: cover;
}

.player-quiz-answering-choice-button {
  margin-top: 24px;
}
</style>
