import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { HelperText, Text, TextInput } from 'react-native-paper';
import type { BaseEdit } from '@logo-rn/shared-utils/utils/baseProps/BaseEdit';
import styles from './PercentEditCss';
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
export interface PercentEditProps extends BaseEdit {
  value?: string | undefined;
  maxValue?: number;
  minValue?: number;
  allowNulls?: boolean;
  decimalDigits?: number;
  formatOnEdit?: boolean;
}
enum BUTTON_TYPE {
  APPEND = 'Append',
  PREPEND = 'Prepend',
}

/**
 * <LogoPercentEdit/> allows user to enter and edit text with type of percentage.
 *
 *     Usage:
 *
 *     ```html
 *  const [value, setvalue] = useState("");
 *  //...
 *  <LogoPercentEdit
 *      id="PERCENTAGE_EDIT"
 *      value={value}
 *      onChangeText={setValue}
 *  />
 *     ```
 *
 * @param {boolean} enabled If false, currencyedit will be disabled. Default to true.
 * @param {Object} spacing The object for bottom and top spacing of the currencyedit. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {boolean} visibility If false, currencyedit will not display. Default to true.
 * @param {string} id The id of currencyedit.
 * @param {number} maxLength The maximum length of text.
 * @param {string} align The alignment of text in currencyedit. Options are  "NotSet", "Left", "Center", "Right" and "Justify". Default to "NotSet"
 * @param {boolean} readOnly If true, currencyedit will be readOnly. Default to false.
 * @param {boolean} watermarkEnabled If true, the placeholder will be displayed. Default to false.
 * @param {string} watermarkText The placeholder of currencyedit.
 * @param {Function} onChangeText Sets text prop. when text is changed.
 * @param {number} maxValue The maximum value of currencyedit.
 * @param {number} minValue The minimum value of currencyedit.
 * @param {string} value The value of currencyedit.
 * @param {boolean} allowNulls Allows null value. Default to false.
 * @param {number} decimalDigits Number of decimal places. Default to 0.
 * @param {boolean} formatOnEdit If true, formats grouping and decimal formats on edit. Default to false
 * @constructor
 * @link Props
 */
const LogoPercentEdit: React.FC<PercentEditProps> = ({
  id,
  enabled = true,
  maxLength,
  align = 'Right',
  helperText,
  buttons = [
    {
      key: '',
      buttonType: '',
      iconClass: '',
      onClick: () => {},
    },
  ],
  validation,
  mode = 'flat',
  readOnly = false,
  spacing = { bottomSpacing: false, topSpacing: false },
  visibility = true,
  watermarkEnabled = false,
  watermarkText = '',
  maxValue,
  minValue,
  onChangeText = () => {},
  value = '',
  allowNulls = false,
  decimalDigits = 0,
  formatOnEdit = false,
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

  const appendButtonCount: number = buttons?.filter(
    (bt: any) => bt.buttonType === BUTTON_TYPE.APPEND
  ).length;
  const prependButtonCount: number = buttons?.filter(
    (bt: any) => bt.buttonType === BUTTON_TYPE.PREPEND
  ).length;

  let [percentValue, setValues] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isNaN(parseInt(percentValue))) {
        if (allowNulls) {
          setValues('');
          return;
        }
      }

      if (percentValue.length > 0 && percentValue[0] === '%') {
        percentValue = percentValue.substring(1);
        percentValue = parseInt(percentValue).toString();
      }

      if (maxValue) {
        if (parseInt(percentValue) && parseInt(percentValue) > maxValue) {
          percentValue = maxValue.toString();
        }
      }

      if (minValue) {
        if (parseInt(percentValue) < minValue) {
          percentValue = minValue.toString();
        }
      }

      percentValue = percentValue.replace(/\D/g, '');
      percentValue = percentValue.replace(/^(\d{0})(\d)/g, '%$1$2');
      percentValue = percentValue.replace(/(?=(\d{3})+(\D))\B/g, '.');

      if (formatOnEdit) {
        setValues(numberFormatting(percentValue));
        return;
      }

      setValues(percentValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [percentValue]);

  const numberFormatting = (number: any) => {
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
          let val = decimal[0] + ',' + decimal[1].substring(0, 2);
          return val;
        }
      }
      number = number + ',' + '0'.repeat(decimalDigits);
    }
    return number;
  };

  const setAfterEditting = () => {
    !formatOnEdit && setValues(numberFormatting(percentValue));
  };

  const handleChange = (value: string) => {
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
            left={<TextInput.Affix text="%" />}
            mode={mode}
            testID={id}
            value={percentValue}
            onChangeText={handleChange}
            onBlur={() => setAfterEditting()}
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
            disabled={!enabled || readOnly}
            maxLength={maxLength}
            keyboardType={
              Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'
            }
            label={watermarkEnabled ? watermarkText : undefined}
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

export { LogoPercentEdit };
