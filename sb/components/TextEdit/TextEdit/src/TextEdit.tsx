import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import type { BaseEdit } from '@logo-rn/shared-utils/utils/baseProps/BaseEdit';
import {
  DANGER_BACKGROUND_COLOR,
  DANGER_COLOR,
  FULL_WIDTH,
  GHOST_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR_10,
  TEXT_COLOR_60,
} from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';
import { LogoIcon } from '@logo-rn/logo-icon';
import styles from './TextEditCss';
export interface TextEditProps extends BaseEdit {
  text: string;
}

enum BUTTON_TYPE {
  APPEND = 'Append',
  PREPEND = 'Prepend',
}

/**
 * <LogoTextEdit/> allows user to enter and edit text.
 *
 *     Usage:
 *
 *     ```html
 *  const [value, setvalue] = useState("");
 *  //...
 *  <LogoTextEdit
 *      id="TextEdit"
 *      text={value}
 *      onChangeText={setvalue}
 *      watermarkText={"placeholder"} watermarkEnabled
 *   />
 *     ```
 *
 * @param {boolean} enabled If false, textedit will be disabled. Default to true.
 * @param {Object} spacing The object for bottom and top spacing of the textedit. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {string} text The text of the textedit.
 * @param {boolean} visibility If false, textedit will not display. Default to true
 * @param {string} id The id of textedit
 * @param {number} maxLength The maximum length of text.
 * @param {string} align The alignment of text in textedit. Options are  "NotSet", "Left", "Center", "Right" and "Justify". Default to "NotSet"
 * @param {boolean} readOnly If true, textedit will be readOnly. Default to false.
 * @param {boolean} watermarkEnabled If true, the placeholder will be displayed. Default to false,
 * @param {string} watermarkText The placeholder of textedit,
 * @param {Function} onChangeText Sets text prop. when text is changed.
 * @param {Array<Object>} buttons Displays right and left buttons of textedit. Object includes key, buttonType ("Append" or "Prepend"), iconClass and onClick keys.
 * @constructor
 * @link Props
 */
const LogoTextEdit: React.FC<TextEditProps> = ({
  id,
  enabled = true,
  maxLength,
  align = 'NotSet',
  readOnly = false,
  spacing = { bottomSpacing: false, topSpacing: false },
  visibility = true,
  watermarkEnabled = false,
  watermarkText = '',
  mode = 'flat',
  text,
  validation,
  helperText = '',
  onChangeText = () => {},
  buttons = [
    {
      key: '',
      buttonType: '',
      iconClass: '',
      onClick: () => {},
    },
  ],
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
    mode === 'outlined'
      ? GHOST_COLOR
      : validation === false
      ? DANGER_BACKGROUND_COLOR
      : TEXT_COLOR_10;
  const buttonBackgroundColor =
    mode === 'outlined'
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
      <Text style={{ ...styles.value, textAlign: alignment }}>{text}</Text>
    </View>
  );

  let prepCount = 0,
    appendCount = 0;
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
            testID={id}
            value={text}
            label={watermarkEnabled ? watermarkText : undefined}
            onChangeText={(value: string) => !readOnly && onChangeText(value)}
            style={{
              fontSize: 14,
              height: 44,
              lineHeight: 22,
              width: buttons[0]?.key !== '' ? FULL_WIDTH : 280,
              textAlign: alignment,
              backgroundColor,
              paddingLeft: prependButtonCount * 32,
              paddingRight: appendButtonCount * 40,
            }}
            mode={readOnly ? 'flat' : mode}
            activeUnderlineColor={activeColor}
            activeOutlineColor={activeColor}
            clearButtonMode={'never'}
            disabled={!enabled}
            maxLength={maxLength}
          />
        )}
        {buttons.map((button: any) => {
          if (button.buttonType === BUTTON_TYPE.APPEND) {
            appendCount += 1;
            return renderButton(button, false, appendCount - 1);
          }
          return <></>;
        })}
        {maxLength && (
          <Text
            style={{ ...styles.maxLength, right: appendButtonCount * 40 + 30 }}
          >
            {text.length === 0 ? '' : text.length}/{maxLength}
          </Text>
        )}
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

export { LogoTextEdit };
