<template>
  <section class="game-master-page">
    <GameMasterGameState :game="game" />
  </section>
</template>

<script>
import GameMasterGameState from "./GameMasterGameState.vue";

export default {
  components: {
    GameMasterGameState,
  },

  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.game-master-page {
  padding: 16px;
}
</style>
