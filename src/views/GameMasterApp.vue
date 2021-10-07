<template>
  <GameMasterPage
    :game="game"
    :top-result="topResult"
    :is-processing="isProcessing"
  />
</template>

<script>
import GameMasterPage from "@/components/GameMasterPage.vue";
import GameState from "../application/gameState";

export default {
  components: {
    GameMasterPage,
  },

  computed: {
    game() {
      return { state: GameState.WAITING, quiz: null };
    },
    topResult() {
      return null;
    },
    isProcessing() {
      return false;
    },
  },
};
</script>
