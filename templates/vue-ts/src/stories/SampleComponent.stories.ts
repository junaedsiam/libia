import type { Meta, StoryObj } from "@storybook/vue3";

import { SampleComponent } from "../components";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "Example/SampleComponent",
  component: SampleComponent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    backgroundColor: { control: "color" },
    onClick: { action: "clicked" },
  },
  args: { primary: false }, // default value
} satisfies Meta<typeof SampleComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    primary: true,
    label: "SampleComponent",
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: "SampleComponent",
  },
};

export const Large: Story = {
  args: {
    label: "SampleComponent",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    label: "SampleComponent",
    size: "small",
  },
};
