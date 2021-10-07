<template>
  <div class="player-welcome-message">
    {{ `ようこそ ${user.name} さん` }}
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.player-welcome-message {
  position: fixed;
  top: 8px;
  left: 8px;
  opacity: 1;
  height: 36px;
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  font-size: 16px;
  animation: player-welcome-message 8s linear 0s 1;
  animation-fill-mode: forwards;
}
@keyframes player-welcome-message {
  0% {
    opacity: 0;
    height: 36px;
    padding: 8px;
  }
  12% {
    opacity: 0;
    height: 36px;
    padding: 8px;
  }
  25% {
    opacity: 1;
    height: 36px;
    padding: 8px;
  }
  85% {
    opacity: 1;
    height: 36px;
    padding: 8px;
  }
  99% {
    opacity: 0;
    height: 36px;
    padding: 8px;
  }
  100% {
    opacity: 0;
    height: 0;
    padding: 0;
  }
}
</style>
