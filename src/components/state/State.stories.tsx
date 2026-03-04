import type { Meta, StoryObj } from '@storybook/react-vite';
import geoStates from '../../data/united-states-geo-json/geoStates500Kb.json';
import { State } from "./State";

const stateOptions = [...new Set(geoStates.features.map((feature) => feature.properties.NAME))].sort((a, b) =>
  a.localeCompare(b)
);

export default {
  title: "State",
  component: State,
  argTypes: {
    state: {
      control: { type: 'select' },
      options: stateOptions,
    },
  },
} satisfies Meta<typeof State>;

type Story = StoryObj<typeof State>;

export const Default: Story = {
  args: {
    state: stateOptions[0],
    width: 400,
    height: 300,
    showLabel: true,
  }
};

export const California: Story = {
  args: {
    state: "California",
  }
};

export const ByFipsCode: Story = {
  args: {
    state: "48",
  }
};

export const WithLabel: Story = {
  args: {
    state: "Washington",
    showLabel: true,
  }
};
