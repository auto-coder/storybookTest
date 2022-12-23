// stories/MyButton.stories.tsx
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MyCheckbox } from './Checkbox';

export default {
  title: 'components/MyCheckbox',
  component: MyCheckbox,
} as ComponentMeta<typeof MyCheckbox>;

export const Basic: ComponentStory<typeof MyCheckbox> = args => (
  <MyCheckbox {...args} />
);

Basic.args = {
  fullWidth:false,
  allowIndeterminate:true,
  text:"Checkbox1"
};
