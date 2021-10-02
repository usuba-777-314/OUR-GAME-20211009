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
  </section>
</template>

<script>
import PlayerWaitingScene from "./PlayerWaitingScene.vue";
import PlayerQuizScene from "./PlayerQuizScene.vue";

export default {
  components: {
    PlayerWaitingScene,
    PlayerQuizScene,
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
      return this.game.state === 1;
    },

    /**
     * ゲーム中か
     */
    isGaming() {
      return [2, 3, 4].includes(this.game.state);
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
