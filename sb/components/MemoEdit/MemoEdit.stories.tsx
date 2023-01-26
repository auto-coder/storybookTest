import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LogoMemoEdit} from './MemoEdit';
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
  title: 'components/LogoMemoEdit',
  component: LogoMemoEdit,
} as ComponentMeta<typeof LogoMemoEdit>;

export const Default: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

Default.args = {
  text:"Logo Mask Edit",
};

export const Align: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

Align.args = {
  watermarkText: 'Align Right',
  watermarkEnabled: true,
  align: 'Right',
};

export const Enabled: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

Enabled.args = {
  enabled: false,
  watermarkText: 'Enabled',
  watermarkEnabled: true,
};
export const onChangeText: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

onChangeText.args = {
  onChangeText: () => console.log('text Changed'),
  watermarkText: 'onChangeText',
  watermarkEnabled: true,
};
export const readOnly: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

readOnly.args = {
  watermarkText: 'readOnly',
  watermarkEnabled: true,
  readOnly: true,
};
export const text: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

text.args = {
  watermarkText: 'text',
  watermarkEnabled: true,
  text: 'This is Text:',
};
export const visibility: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

visibility.args = {
  watermarkText: 'visibility:true',
  watermarkEnabled: true,
  visibility: true,
};
export const watermarkText: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

watermarkText.args = {
  watermarkText: 'watermarkText',
  watermarkEnabled: true,
};
export const buttons: ComponentStory<typeof LogoMemoEdit> = args => (
    <LogoMemoEdit {...args} />
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


export const rows: ComponentStory<typeof LogoMemoEdit> = args => (
  <LogoMemoEdit {...args} />
);

rows.args = {
  watermarkText: 'watermarkText',
  watermarkEnabled: true,
  rows:3
};