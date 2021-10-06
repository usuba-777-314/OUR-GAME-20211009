<template>
  <PlayerPage :game="game" :user="user" />
</template>

<script>
import PlayerPage from "@/components/PlayerPage.vue";

export default {
  components: {
    PlayerPage,
  },

  computed: {
    game() {
      return {
        state: 4,
        quiz: {
          number: 1,
          content:
            "どこかの研究員から謎の写真が届いた。これはどのステージの一部だろうか？",
          choices: [
            {
              number: 1,
              text: "Bバスパーク",
            },
            {
              number: 2,
              text: "Bバスパーク",
            },
            {
              number: 3,
              text: "Bバスパーク",
            },
            {
              number: 4,
              text: "Bバスパーク",
            },
          ],
          correct: {
            number: 1,
            text: "スプラスコープが答えだ。大雑把なイカたちだが、部屋はきれいに片付けていることが多いそうだ。しかし、その理由は・・・「モテたい」から？",
          },
        },
      };
    },
    user() {
      return {};
    },
  },
};
</script>
