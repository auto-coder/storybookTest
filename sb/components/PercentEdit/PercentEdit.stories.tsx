import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LogoPercentEdit} from './PercentEdit';
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
  title: 'components/LogoPercentEdit',
  component: LogoPercentEdit,
} as ComponentMeta<typeof LogoPercentEdit>;

export const Default: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

Default.args = {
  watermarkText: 'Default',
  watermarkEnabled: true,
};

export const Align: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

Align.args = {
  watermarkText: 'Align Right',
  watermarkEnabled: true,
  align: 'Right',
};
 
 
export const allowNulls: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

allowNulls.args = {
  watermarkText: 'allowNulls: true',
  watermarkEnabled: true,
  allowNulls: true,
};
 
export const decimalDigits: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

decimalDigits.args = {
  watermarkText: 'decimalDigits: 3',
  watermarkEnabled: true,
  decimalDigits: 3,
};
export const formatOnEdit: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

formatOnEdit.args = {
  watermarkText: 'formatOnEdit: true',
  watermarkEnabled: true,
  formatOnEdit: true,
};
export const minValue: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

minValue.args = {
  watermarkText: 'minValue:5',
  watermarkEnabled: true,
  minValue: 5,
};
export const maxValue: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

maxValue.args = {
  watermarkText: 'maxValue:5',
  watermarkEnabled: true,
  maxValue: 5,
};

export const Enabled: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

Enabled.args = {
  enabled: false,
  watermarkText: 'Enabled',
  watermarkEnabled: true,
};
export const onChangeText: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

onChangeText.args = {
  onChangeText: () => console.log('text Changed'),
  watermarkText: 'onChangeText',
  watermarkEnabled: true,
};
export const readOnly: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

readOnly.args = {
  watermarkText: 'readOnly',
  watermarkEnabled: true,
  readOnly: true,
};
export const text: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

text.args = {
  watermarkText: 'text',
  watermarkEnabled: true,
};
export const visibility: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

visibility.args = {
  watermarkText: 'visibility:true',
  watermarkEnabled: true,
  visibility: true,
};
export const watermarkText: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

watermarkText.args = {
  watermarkText: 'watermarkText',
  watermarkEnabled: true,
};

export const buttons: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);
let newButton1 = new EditButtonsProps('3', 'Prepend', 'user', () =>
  Alert.alert('Clicked'),
);
let newButton2 = new EditButtonsProps('1', 'Append', 'alarm_bell_1', () =>
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

export const MaskOptions: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

MaskOptions.args = {
  watermarkText: 'MaskOptions: phone',
  watermarkEnabled: true,
}; 
export const maxLength: ComponentStory<typeof LogoPercentEdit> = args => (
  <LogoPercentEdit {...args} />
);

maxLength.args = {
  watermarkText: 'maxLength:5',
  watermarkEnabled: true,
  maxLength:5
}; 