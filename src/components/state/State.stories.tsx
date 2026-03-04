import type { Meta, StoryObj } from '@storybook/react-vite';
import { State } from "./State";

export default {
  title: "State",
  component: State,
} satisfies Meta<typeof State>;

export const Default: StoryObj<typeof State> = {
  args: {
    state: "Washington",
    width: 400,
    height: 300,
    showLabel: true,
  }
};

export const California = () => <State state="California" />;

export const ByFipsCode = () => <State state="48" />;

export const WithLabel = () => <State state="Washington" showLabel />;
