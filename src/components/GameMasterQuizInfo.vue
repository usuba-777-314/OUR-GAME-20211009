<template>
  <div class="game-master-quiz-info">
    <div class="row">
      <span class="label">問題:</span>
      <span class="text">{{ quiz.content }}</span>
    </div>

    <div v-for="choice in quiz.choices" :key="choice.number" class="row">
      <span class="label">{{ `選択肢${choice.number}:` }}</span>
      <span class="text">{{ choice.text }}</span>
    </div>

    <div class="row">
      <span class="label">正解:</span>
      <span class="text">{{ quiz.correct.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.row:not(:last-child) {
  margin-bottom: 24px;
}

.label {
  margin-right: 16px;
  font-weight: bold;
}

.text {
  white-space: pre-wrap;
}
</style>
