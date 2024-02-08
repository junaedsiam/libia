import type { Meta, StoryObj } from "@storybook/svelte";

import { SampleComponent } from "../lib";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/SampleComponent",
  component: SampleComponent,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<SampleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "SampleComponent",
  },
};

export const Secondary: Story = {
  args: {
    label: "SampleComponent",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "SampleComponent",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
