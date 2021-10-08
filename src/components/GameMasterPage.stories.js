import GameState from "../application/gameState";
import GameMasterPage from "./GameMasterPage";

export default {
  title: "Game Master Page",
  component: GameMasterPage,
  parameters: {
    actions: { argTypesRegex: ".*" },
    layout: "fullscreen",
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GameMasterPage },
  template: `<GameMasterPage v-bind="$props" @next="next" />`,
});

export const Waiting = Template.bind({});
Waiting.args = {
  game: {
    state: GameState.WAITING,
    quiz: null,
  },
  topResult: null,
  isProcessing: false,
  isGameMaster: true,
};

export const Reading = Template.bind({});
Reading.args = {
  game: {
    state: GameState.QUIZ_READING,
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
  },
  topResult: null,
  isProcessing: false,
  isGameMaster: true,
};

export const Answering = Template.bind({});
Answering.args = {
  game: {
    state: GameState.QUIZ_ANSWERING,
    remainingTime: 10,
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
  },
  topResult: null,
  isProcessing: false,
  isGameMaster: true,
};

export const Result = Template.bind({});
Result.args = {
  game: {
    state: GameState.QUIZ_RESULT,
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
  },
  topResult: null,
  isProcessing: false,
  isGameMaster: true,
};

export const FinalResult = Template.bind({});
FinalResult.args = {
  game: {
    state: GameState.QUIZ_FINAL_RESULT,
    quiz: {
      number: 4,
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
  },
  topResult: {
    correctCount: 4,
    users: [
      { id: "a", name: "user aaaa" },
      { id: "b", name: "user bbbbb" },
    ],
  },
  isProcessing: false,
  isGameMaster: true,
};

export const IsProcessing = Template.bind({});
IsProcessing.args = {
  game: {
    state: GameState.QUIZ_RESULT,
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
  },
  topResult: null,
  isProcessing: true,
  isGameMaster: true,
};
