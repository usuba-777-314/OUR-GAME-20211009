<template>
  <div class="player-quiz-answering">
    <img class="reamining-time" :src="remainingTimeImage" />
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
    quiz() {
      return this.game.quiz;
    },
    remainingTimeImage() {
      if (this.game.remainingTime == null)
        return `/assets/player_quiz_remaining_time_10.png`;

      return `/assets/player_quiz_remaining_time_${this.game.remainingTime}.png`;
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

.reamining-time {
  align-self: center;
  margin-bottom: 1px;
}

.quiz {
  height: 120px;
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
