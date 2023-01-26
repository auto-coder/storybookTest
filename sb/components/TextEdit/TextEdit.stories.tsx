// stories/MyButton.stories.tsx
import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LogoTextEdit} from './TextEdit';
import {Alert} from 'react-native';
class EditButtonsProps {
  constructor(
    public key: string,
    public buttonType: 'Append' | 'Prepend' | '',
    public iconClass: string,
    public onClick: Function,
  ) {}
}
export default {
  title: 'components/LogoTextEdit',
  component: LogoTextEdit,
} as ComponentMeta<typeof LogoTextEdit>;

export const Default: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

Default.args = {
  watermarkText: 'Default',
  watermarkEnabled: true,
};

export const Mode: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

Mode.args = {
  watermarkText: 'Mode:"outlined"',
  watermarkEnabled: true,
  mode: 'outlined',
};

export const Align: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

Align.args = {
  watermarkText: 'Align Right',
  watermarkEnabled: true,
  align: 'Right',
};

export const Enabled: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

Enabled.args = {
  enabled: false,
  watermarkText: 'Enabled',
  watermarkEnabled: true,
};
export const onChangeText: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

onChangeText.args = {
  onChangeText: () => console.log('text Changed'),
  watermarkText: 'onChangeText',
  watermarkEnabled: true,
};
export const readOnly: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

readOnly.args = {
  watermarkText: 'readOnly',
  watermarkEnabled: true,
  readOnly: true,
};
export const text: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

text.args = {
  watermarkText: 'text',
  watermarkEnabled: true,
  text: 'This is Text:',
};
export const visibility: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

visibility.args = {
  watermarkText: 'visibility:true',
  watermarkEnabled: true,
  visibility: true,
};
export const watermarkText: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);

watermarkText.args = {
  watermarkText: 'watermarkText',
  watermarkEnabled: true,
};

export const buttons: ComponentStory<typeof LogoTextEdit> = args => (
  <LogoTextEdit {...args} />
);
let newButton1 = new EditButtonsProps('3', 'Prepend', 'user', () =>
  Alert.alert('Clicked'),
);
let newButton2 = new EditButtonsProps('1', "Append", 'alarm_bell_1', () =>
  Alert.alert('Clicked'),
);
let newButton3 = new EditButtonsProps('2', 'Append', 'attachment_1', () =>
  Alert.alert('Clicked'),
);

const buttons1 = [newButton1, newButton2, newButton3];
buttons.args = {
  watermarkText: 'buttons',
  watermarkEnabled: true,
  buttons: buttons1,
};

// export const maxLength: ComponentStory<typeof LogoTextEdit> = args => (
//   <LogoTextEdit {...args} />
// );

// maxLength.args = {
//   maxLength: 13,
//   watermarkText: 'WaterMarked:3',
//   watermarkEnabled: true,
// };
