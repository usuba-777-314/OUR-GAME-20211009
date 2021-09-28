<template>
  <section class="player-page">
    <PlayerWaitingScene class="scene" />
  </section>
</template>

<script lang="ts">
import PlayerWaitingScene from "./PlayerWaitingScene.vue";

export default {
  components: {
    PlayerWaitingScene,
  },
};
</script>

<style lang="scss" scoped>
.player-page {
  width: 100vw;
  height: 100vh;
  background-image: url("/assets/player_background.png");
  background-size: cover;
}

.scene {
  width: 100%;
  height: 100%;
}
</style>
