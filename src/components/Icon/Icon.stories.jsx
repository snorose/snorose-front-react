import Icon from './Icon.jsx';
import { ICON_ID_LIST } from '@/constants';

export default {
  title: 'components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component: `Primary UI component for user interaction`,
      },
    },
  },
  argTypes: {
    id: {
      table: {
        type: { summary: 'string' },
        order: 1,
      },
      control: 'select',
      options: Object.values(ICON_ID_LIST),
    },
    width: {
      control: {
        type: 'number',
        min: 10,
        max: 500,
        step: 1,
      },
    },
    height: {
      control: {
        type: 'number',
        min: 10,
        max: 500,
        step: 1,
      },
    },
    fill: {
      table: {
        defaultValue: { summary: 'none' },
      },
      control: {
        type: 'color',
      },
    },
    stroke: {
      table: {
        defaultValue: { summary: 'none' },
      },
      control: {
        type: 'color',
      },
    },
  },
};

export const IconComponent = {
  args: {
    id: 'cloud',
    width: 100,
    height: 100,
    fill: 'none',
    stroke: 'none',
  },
};
