import PlayerPage from "./PlayerPage";

export default {
  title: "Player Page",
  component: PlayerPage,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () => ({
  components: { PlayerPage },
  template: `<PlayerPage />`,
});

export const Waiting = Template.bind({});
