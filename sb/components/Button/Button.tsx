import { LogoButtonPaper } from './logo-button-paper';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BaseButton } from './BaseButton';

const styles = StyleSheet.create({
  button: {
    width: 55,
    backgroundColor: 'purple',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {},
});

export const MyButton = (props: BaseButton) => (
  <LogoButtonPaper {...props} />
);
