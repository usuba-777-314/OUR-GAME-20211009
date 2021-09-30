<template>
  <button
    class="player-quiz-answering-choice-button"
    :class="buttonClass"
    v-text="`${choice.number}. ${choice.text}`"
    @click="$emit('choice', choice.number)"
  />
</template>

<script>
export default {
  props: {
    choice: {
      type: Object,
      required: true,
    },
    choiced: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    buttonClass() {
      const classes = {
        choiced: this.choiced,
      };

      classes[
        `player-quiz-answering-choice-button-${this.choice.number}`
      ] = true;

      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
.player-quiz-answering-choice-button {
  height: 48px;

  border-radius: 24px;
  padding: 0 16px;

  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: left;

  &.player-quiz-answering-choice-button-1 {
    background-color: #761aff;
  }

  &.player-quiz-answering-choice-button-2 {
    background-color: #f215ff;
  }

  &.player-quiz-answering-choice-button-3 {
    background-color: #ffb530;
  }

  &.player-quiz-answering-choice-button-4 {
    background-color: #03cf07;
  }

  &.choiced {
    position: relative;

    &::after {
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(90px, -90px);

      width: 223px;
      height: 223px;

      background-image: url("/assets/player_quiz_answering_choiced.png");
      background-size: cover;

      pointer-events: none;
    }
  }
}
</style>
