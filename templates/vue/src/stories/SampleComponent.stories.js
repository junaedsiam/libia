import {SampleComponent} from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/SampleComponent',
  component: SampleComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    onClick: {},
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'SampleComponent',
  },
};

export const Secondary = {
  args: {
    label: 'SampleComponent',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'SampleComponent',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'SampleComponent',
  },
};
