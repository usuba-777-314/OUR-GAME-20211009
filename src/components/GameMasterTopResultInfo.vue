<template>
  <div class="game-master-top-result-info">
    <div class="row">
      <span class="label">最多正解数:</span>
      <span class="text">{{ topResult.correctCount }}</span>
    </div>

    <div class="row">
      <span class="label">最多正解人数:</span>
      <span class="text">{{ topResult.users.length }}</span>
    </div>

    <div class="row">
      <span class="label">最多正解者:</span>
      <ul class="list">
        <li v-for="user in topResult.users" :key="user.id">{{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topResult: {
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

.list {
  list-style: none;
  margin: 0;
  padding: 0;

  > *::before {
    content: "・";
  }
}
</style>
