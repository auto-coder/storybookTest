import { LogoCheckBoxPaper,CheckBoxPaperProps } from './logo-checkbox-paper';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


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

export const MyCheckbox = (props:CheckBoxPaperProps) => (
  <LogoCheckBoxPaper {...props} />
);
