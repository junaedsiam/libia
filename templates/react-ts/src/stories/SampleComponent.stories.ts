import type { Meta, StoryObj } from "@storybook/react";

import { SampleComponent } from "components";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/SampleComponent",
  component: SampleComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof SampleComponent>;

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
    label: "SampleComponent",
  },
};

export const Warning: Story = {
  args: {
    primary: true,
    label: "Delete now",
    backgroundColor: "red",
  },
};
