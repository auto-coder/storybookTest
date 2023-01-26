import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import { LogoNumericEdit }from './NumericEdit';
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
  title: 'components/LogoNumericEdit',
  component: LogoNumericEdit,
} as ComponentMeta<typeof LogoNumericEdit>;

export const Default: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

Default.args = {
  watermarkText:"Default",
  watermarkEnabled:true,
};

export const Align: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

Align.args = {
  watermarkText: 'Align Right',
  watermarkEnabled: true,
  align: 'Right',
};
export const allowGrouping: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

allowGrouping.args = {
  watermarkText: 'allowGrouping: false',
  watermarkEnabled: true,
  allowGrouping: false,
};
export const allowNegatives: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

allowNegatives.args = {
  watermarkText: 'allowNegatives: true',
  watermarkEnabled: true,
  allowNegatives: true,
};
export const allowNulls: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

allowNulls.args = {
  watermarkText: 'allowNulls: true',
  watermarkEnabled: true,
  allowNulls: true,
};
export const allowrounding: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

allowrounding.args = {
  watermarkText: 'allowrounding: false',
  watermarkEnabled: true,
  allowRounding: false,
};
export const decimalDigits: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

decimalDigits.args = {
  watermarkText: 'decimalDigits: 3',
  watermarkEnabled: true,
  decimalDigits: 3,
};
export const formatOnEdit: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

formatOnEdit.args = {
  watermarkText: 'formatOnEdit: true',
  watermarkEnabled: true,
  formatOnEdit: true,
};
export const minValue: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

minValue.args = {
  watermarkText: 'minValue:5',
  watermarkEnabled: true,
  minValue: 5,
};
export const maxValue: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

maxValue.args = {
  watermarkText: 'maxValue:5',
  watermarkEnabled: true,
  maxValue: 5,
};

export const Enabled: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

Enabled.args = {
  enabled: false,
  watermarkText: 'Enabled',
  watermarkEnabled: true,
};
export const onChangeText: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

onChangeText.args = {
  onChangeText: () => console.log('text Changed'),
  watermarkText: 'onChangeText',
  watermarkEnabled: true,
};
export const readOnly: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

readOnly.args = {
  watermarkText: 'readOnly',
  watermarkEnabled: true,
  readOnly: true,
};
export const text: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

text.args = {
  watermarkText: 'text',
  watermarkEnabled: true,
  
};
export const visibility: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

visibility.args = {
  watermarkText: 'visibility:true',
  watermarkEnabled: true,
  visibility: true,
};
export const watermarkText: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

watermarkText.args = {
  watermarkText: 'watermarkText',
  watermarkEnabled: true,
};

export const buttons: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
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

export const MaskOptions: ComponentStory<typeof LogoNumericEdit> = args => (
  <LogoNumericEdit {...args} />
);

MaskOptions.args = {
    watermarkText:"MaskOptions: phone",
    watermarkEnabled: true,
     
};
