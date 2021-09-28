import PlayerPage from "./PlayerPage";

export default {
  title: "Player Page",
  component: PlayerPage,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PlayerPage },
  template: `<PlayerPage v-bind="$props" />`,
});

export const Waiting = Template.bind({});
Waiting.args = {
  game: {
    state: 1,
  },
};

export const Reading = Template.bind({});
Reading.args = {
  game: {
    state: 2,
    currentQuiz: {
      number: 1,
    },
  },
};
