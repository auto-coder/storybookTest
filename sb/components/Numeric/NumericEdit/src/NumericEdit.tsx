import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import type { BaseEdit } from '@logo-rn/shared-utils/utils/baseProps/BaseEdit';
import styles from './NumericEditCss';
import { LogoIcon } from '@logo-rn/logo-icon';
import {
  DANGER_BACKGROUND_COLOR,
  DANGER_COLOR,
  FULL_WIDTH,
  GHOST_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR_10,
  TEXT_COLOR_60,
} from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';

export interface NumericEditProps extends BaseEdit {
  value?: string | undefined;
  maxValue?: number;
  minValue?: number;
  allowGrouping?: boolean;
  allowNegatives?: boolean;
  allowNulls?: boolean;
  allowRounding?: boolean;
  decimalDigits?: number;
  formatOnEdit?: boolean;
  style?: StyleMedia; //todo documentation
}

enum BUTTON_TYPE {
  APPEND = 'Append',
  PREPEND = 'Prepend',
}

/**
 * <LogoNumericEdit/> allows user to enter and edit text with type of numbers.
 *
 *     Usage:
 *
 *     ```html
 *  const [value, setvalue] = useState("");
 *  //...
 *  <LogoNumericEdit
 *      maxValue={100}
 *      id="NUMERIC_EDIT"
 *      value={value}
 *      onChangeText={setValue}
 *  />
 *     ```
 *
 * @param {boolean} enabled If false, numericedit will be disabled. Default to true.
 * @param {Object} spacing The object for bottom and top spacing of the numericedit. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {boolean} visibility If false, numericedit will not display. Default to true.
 * @param {string} id The id of numericedit.
 * @param {number} maxLength The maximum length of text.
 * @param {string} align The alignment of text in numericedit. Options are  "NotSet", "Left", "Center", "Right" and "Justify". Default to "NotSet"
 * @param {boolean} readOnly If true, numericedit will be readOnly. Default to false.
 * @param {boolean} watermarkEnabled If true, the placeholder will be displayed. Default to false.
 * @param {string} watermarkText The placeholder of numericedit.
 * @param {Function} onChangeText Sets text prop. when text is changed.
 * @param {number} maxValue The maximum value of numericedit.
 * @param {number} minValue The minimum value of numericedit.
 * @param {string} value The value of numericedit.
 * @param {boolean} allowGrouping If true, allows grouping with thousands separators. Default to true.
 * @param {boolean} allowNegatives Allows negative numbers. Default to false.
 * @param {boolean} allowNulls Allows null value. Default to false.
 * @param {boolean} allowRounding Allows rounding of decimal numbers. decimalDigits prop. has to be bigger than 0. Default to true.
 * @param {number} decimalDigits Number of decimal places. Default to 0.
 * @param {boolean} formatOnEdit If true, formats grouping and decimal formats on edit. Default to false
 * @constructor
 * @link Props
 */
const LogoNumericEdit: React.FC<NumericEditProps> = ({
  id,
  enabled = true,
  maxLength,
  helperText,
  buttons = [
    {
      key: '',
      buttonType: '',
      iconClass: '',
      onClick: () => {},
    },
  ],
  align = 'NotSet',
  readOnly = false,
  spacing = { bottomSpacing: false, topSpacing: false },
  visibility = true,
  watermarkEnabled = false,
  watermarkText = '',
  maxValue,
  minValue,
  validation,
  mode = 'flat',
  onChangeText = () => {},
  value = '',
  allowGrouping = true,
  allowNegatives = false,
  allowNulls = false,
  allowRounding = true,
  decimalDigits = 0,
  formatOnEdit = false,
  style,
}) => {
  const alignment =
    align === 'Right'
      ? 'right'
      : align === 'Justify' || align === 'Center'
      ? 'center'
      : 'left';

  const marginBottom = spacing.bottomSpacing ? 16 : 0;
  const marginTop = spacing.topSpacing ? 16 : 0;
  const display = visibility ? 'flex' : 'none';
  const activeColor = validation === false ? DANGER_COLOR : PRIMARY_COLOR;
  const backgroundColor =
    readOnly || mode === 'outlined'
      ? GHOST_COLOR
      : validation === false
      ? DANGER_BACKGROUND_COLOR
      : TEXT_COLOR_10;
  const buttonBackgroundColor =
    readOnly || mode === 'outlined'
      ? GHOST_COLOR
      : validation === false
      ? DANGER_BACKGROUND_COLOR
      : 'rgba(25, 59, 103, 0.01)';

  const [values, setValues] = useState(value);
  const appendButtonCount: number = buttons?.filter(
    (bt: any) => bt.buttonType === BUTTON_TYPE.APPEND
  ).length;
  const prependButtonCount: number = buttons?.filter(
    (bt: any) => bt.buttonType === BUTTON_TYPE.PREPEND
  ).length;

  useEffect(() => {
    const timer = setTimeout(() => {
      let parsedValue = values;
      if (isNaN(parseInt(parsedValue))) {
        if (allowNulls) {
          setValues('');
        } else {
          setValues('');
        }
        return;
      }

      if (!allowNegatives && parseInt(parsedValue) < 0) {
        setValues('');
        return;
      }

      while (
        parsedValue.charAt(0) === '0' &&
        parsedValue.length > 1 &&
        decimalDigits < 1
      ) {
        parsedValue = parsedValue.substring(1);
      }

      if (parseInt(parsedValue) !== 0) {
        if (minValue) {
          if (parseInt(parsedValue) < minValue) {
            setValues(minValue.toString());
          } else {
            setValues(parsedValue);
          }
        }
      }

      if (maxValue) {
        if (parseInt(parsedValue) > maxValue) {
          setValues(maxValue.toString());
        } else {
          setValues(parsedValue);
        }
      }

      if (formatOnEdit) setValues(numberFormatting(parsedValue));
    }, 1000);

    return () => clearTimeout(timer);
  }, [values]);

  const numberWithComma = (number: any) => {
    const numberPart = number.replace('.', '');
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, '.');
  };

  const numberFormatting = (number: any) => {
    if (allowGrouping) {
      number = numberWithComma(number);
    }
    if (decimalDigits > 0) {
      if (number.includes(',')) {
        const decimal = number.split(',');
        if (decimal[1].length === 0) {
          return number + '00';
        } else if (decimal[1].length === 1) {
          return number + '0';
        } else if (decimal[1].length === 2) {
          return number;
        } else if (decimal[1].length > 2) {
          console.log('burdaaa1');
          let rounedVal;
          if (allowRounding) {
            if (decimal[1][2] >= 5) {
              let tempRoundval = parseInt(decimal[1].substring(0, 2)) + 1;

              if (tempRoundval === 100) {
                rounedVal = parseInt(decimal[0]) + 1 + ',' + '00';
              } else {
                rounedVal = decimal[0] + ',' + tempRoundval;
              }
            } else {
              rounedVal = decimal[0] + ',' + decimal[1].substring(0, 2);
            }
          } else {
            rounedVal = decimal[0] + ',' + decimal[1].substring(0, 2);
          }
          return rounedVal;
        }
      }
      number = number + ',' + '0'.repeat(decimalDigits);
    }
    return number;
  };

  const setAfterEditting = () => {
    !formatOnEdit && setValues(numberFormatting(values));
  };

  const isMaxMin = (value: string) => {
    setValues(value);
    onChangeText(value);
  };
  const renderButton = (button: any, isPrepend: boolean, index: number) => {
    const prependStyle = {
      left: index * 40 + 1,
      top: 2,
      zIndex: mode === 'outlined' ? 3 : 1,
    };
    const appendStyle = { right: index * 40 + 1, top: 2 };
    const customStyle = isPrepend ? prependStyle : appendStyle;

    return (
      <TouchableOpacity
        onPress={button.onClick}
        style={{
          zIndex: 1,
          ...styles.buttonContainer,
          ...customStyle,
          marginTop: mode === 'outlined' ? 6 : 0,
          backgroundColor: buttonBackgroundColor,
        }}
      >
        <LogoIcon name={button.iconClass} size={18} color={TEXT_COLOR_60} />
      </TouchableOpacity>
    );
  };
  let prepCount = 0,
    appendCount = 0;
  const renderReadOnly = () => (
    <View
      style={{
        ...styles.readOnly,
        width: buttons[0]?.key !== '' ? FULL_WIDTH : 280,
        paddingLeft: prependButtonCount * 32,
        paddingRight: appendButtonCount * 40,
      }}
    >
      {watermarkEnabled && (
        <Text style={styles.placeholder}>{watermarkText}</Text>
      )}
      <Text style={{ ...styles.value, textAlign: alignment }}>{value}</Text>
    </View>
  );
  return (
    <View style={{ marginBottom, marginTop }}>
      <View style={{ ...styles.container, display }}>
        {buttons.map((button: any) => {
          if (button.buttonType === BUTTON_TYPE.PREPEND) {
            prepCount += 1;
            return renderButton(button, true, prepCount - 1);
          }
          return <></>;
        })}
        {readOnly ? (
          renderReadOnly()
        ) : (
          <TextInput
            mode={mode}
            testID={id}
            label={watermarkEnabled ? watermarkText : undefined}
            value={values}
            onChangeText={isMaxMin}
            right={
              maxLength && (
                <TextInput.Affix
                  textStyle={{
                    ...styles.maxLength,
                    right: appendButtonCount * 40,
                  }}
                  text={`${
                    value.length === 0 ? '' : value.length
                  }/${maxLength}`}
                />
              )
            }
            style={{
              fontSize: 14,
              height: 44,
              lineHeight: 22,
              width: buttons[0]?.key !== '' ? FULL_WIDTH : 280,
              textAlign: alignment,
              opacity: enabled ? 1 : 0.6,
              backgroundColor,
              paddingLeft: prependButtonCount * 32,
              paddingRight: appendButtonCount * 32,
            }}
            activeUnderlineColor={activeColor}
            activeOutlineColor={activeColor}
            onBlur={() => setAfterEditting()}
            disabled={!enabled || readOnly}
            maxLength={maxLength}
            keyboardType={
              Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'
            }
          />
        )}
        {buttons.map((button: any) => {
          if (button.buttonType === BUTTON_TYPE.APPEND) {
            appendCount += 1;
            return renderButton(button, false, appendCount - 1);
          }
          return <></>;
        })}
      </View>
      {helperText !== '' && (
        <Text
          style={{
            ...styles.helperText,
            color: activeColor,
            marginLeft: buttons[0]?.key !== '' ? 0 : (FULL_WIDTH - 280) / 2,
          }}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

export { LogoNumericEdit };
