<template>
  <button class="game-master-operate-button" @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script>
import GameState from "../application/gameState";

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  computed: {
    text() {
      if (this.game.state === GameState.WAITING) return "ゲームを開始する";

      if (this.game.state === GameState.QUIZ_READING) return "解答モードに進む";

      if (this.game.state === GameState.QUIZ_ANSWERING)
        return "結果発表モードに進む";

      if (this.game.state === GameState.QUIZ_RESULT) {
        if (this.game.quiz.number < 4) return "次のクイズへ進む";
        return "最終結果へ進む";
      }

      if (this.game.state === GameState.QUIZ_FINAL_RESULT)
        return "ゲームを終了する";

      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.game-master-operate-button {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #cccccc;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  &::after {
    position: absolute;
    right: 16px;
    content: "";
    width: 5px;
    height: 5px;
    border-top: 3px solid #333333;
    border-right: 3px solid #333333;
    transform: rotate(45deg);
  }

  &:hover {
    background-color: #bbbbbb;
  }
}
</style>
