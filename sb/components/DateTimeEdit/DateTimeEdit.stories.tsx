// stories/DateTimeEdit.stories.tsx
import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {LogoDateTimeEdit} from './dateTimeEdit';
import {Provider} from 'react-native-paper';

export default {
  title: 'components/LogoDateTimeEdit',
  component: LogoDateTimeEdit,
} as ComponentMeta<typeof LogoDateTimeEdit>;

export const DateOnly: ComponentStory<typeof LogoDateTimeEdit> = args => (
  <Provider>
    <LogoDateTimeEdit {...args} />
  </Provider>
);

DateOnly.args = {
  id: 'datetime',
  mode: 'DateOnly',
  watermarkText: 'i18n',
  watermarkTimeText: 'i18n',
  lang: 'en',
  autoshowOnFocus: true,
  label: 'i18n',
  watermarkEnabled: true,
};

export const DateTime: ComponentStory<typeof LogoDateTimeEdit> = args => (
  <Provider>
    <LogoDateTimeEdit {...args} />
  </Provider>
);
DateTime.args = {
  id: 'datetime',
  mode: 'DateTime',
  watermarkText: 'i18n',
  watermarkTimeText: 'i18n',
  lang: 'en',
  autoshowOnFocus: true,
  label: 'i18n',
  watermarkEnabled: true,
};

export const TimeOnly: ComponentStory<typeof LogoDateTimeEdit> = args => (
  <Provider>
    <LogoDateTimeEdit {...args} />
  </Provider>
);
TimeOnly.args = {
  id: 'datetime',
  mode: 'TimeOnly',
  watermarkText: 'i18n',
  watermarkTimeText: 'i18n',
  lang: 'en',
  autoshowOnFocus: true,
  label: 'i18n',
  watermarkEnabled: true,
};
