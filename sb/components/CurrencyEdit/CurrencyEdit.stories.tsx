import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LogoCurrencyEdit} from './CurrencyEdit';
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
  title: 'components/LogoCurrencyEdit',
  component: LogoCurrencyEdit,
} as ComponentMeta<typeof LogoCurrencyEdit>;

export const Default: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

Default.args = {
  watermarkText: 'Default',
  watermarkEnabled: true,
};

export const Align: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

Align.args = {
  watermarkText: 'Align Right',
  watermarkEnabled: true,
  align: 'Right',
};
export const allowGrouping: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

allowGrouping.args = {
  watermarkText: 'allowGrouping: false',
  watermarkEnabled: true,
  allowGrouping: false,
};
export const allowNegatives: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

allowNegatives.args = {
  watermarkText: 'allowNegatives: true',
  watermarkEnabled: true,
  allowNegatives: true,
};
export const allowNulls: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

allowNulls.args = {
  watermarkText: 'allowNulls: true',
  watermarkEnabled: true,
  allowNulls: true,
};
export const allowrounding: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

allowrounding.args = {
  watermarkText: 'allowrounding: false',
  watermarkEnabled: true,
  allowGrouping: false,
}; 
export const minValue: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

minValue.args = {
  watermarkText: 'minValue:5',
  watermarkEnabled: true,
  minValue: 5,
};
export const maxValue: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

maxValue.args = {
  watermarkText: 'maxValue:5',
  watermarkEnabled: true,
  maxValue: 5,
};

export const Enabled: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

Enabled.args = {
  enabled: false,
  watermarkText: 'Enabled',
  watermarkEnabled: true,
};
export const onChangeText: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

onChangeText.args = {
  onChangeText: () => console.log('text Changed'),
  watermarkText: 'onChangeText',
  watermarkEnabled: true,
};
export const readOnly: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

readOnly.args = {
  watermarkText: 'readOnly',
  watermarkEnabled: true,
  readOnly: true,
};
export const text: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

text.args = {
  watermarkText: 'text',
  watermarkEnabled: true,
};
export const visibility: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

visibility.args = {
  watermarkText: 'visibility:true',
  watermarkEnabled: true,
  visibility: true,
};
export const watermarkText: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

watermarkText.args = {
  watermarkText: 'watermarkText',
  watermarkEnabled: true,
};

export const buttons: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
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

export const MaskOptions: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

MaskOptions.args = {
  watermarkText: 'MaskOptions: phone',
  watermarkEnabled: true,
};

export const decimalDigits: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

decimalDigits.args = {
  watermarkText: 'decimalDigits: 5',
  watermarkEnabled: true,
  decimalDigits: 5,
};
export const maxLength: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

maxLength.args = {
  watermarkText: 'maxLength:5',
  watermarkEnabled: true,
  maxLength:5
};
export const formatOnEdit: ComponentStory<typeof LogoCurrencyEdit> = args => (
  <LogoCurrencyEdit {...args} />
);

formatOnEdit.args = {
  watermarkText: 'formatOnEdit:true',
  watermarkEnabled: true,
  formatOnEdit:true
};
