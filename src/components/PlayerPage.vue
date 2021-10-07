<template>
  <section class="player-page">
    <PlayerWaitingScene v-if="isWaiting" class="scene" />

    <PlayerQuizScene
      v-if="isGaming"
      class="scene"
      :game="game"
      :user="user"
      @choice="$emit('choice', $event)"
    />

    <PlayerWelcomeMessage :user="user" />
  </section>
</template>

<script>
import GameState from "../application/gameState";
import PlayerWaitingScene from "./PlayerWaitingScene.vue";
import PlayerQuizScene from "./PlayerQuizScene.vue";
import PlayerWelcomeMessage from "./PlayerWelcomeMessage.vue";

export default {
  components: {
    PlayerWaitingScene,
    PlayerQuizScene,
    PlayerWelcomeMessage,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    /**
     * 待機中か
     */
    isWaiting() {
      return this.game.state === GameState.WAITING;
    },

    /**
     * ゲーム中か
     */
    isGaming() {
      return [
        GameState.QUIZ_READING,
        GameState.QUIZ_ANSWERING,
        GameState.QUIZ_RESULT,
        GameState.QUIZ_FINAL_RESULT,
      ].includes(this.game.state);
    },
  },
};
</script>

<style lang="scss" scoped>
.player-page {
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/player_background.png");
  background-size: cover;
  overflow: hidden;
}

.scene {
  width: 100%;
  height: 100%;
}
</style>
