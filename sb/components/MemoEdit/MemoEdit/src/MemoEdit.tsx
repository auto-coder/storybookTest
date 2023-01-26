import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import type { BaseEdit } from '@logo-rn/shared-utils/utils/baseProps/BaseEdit';
import styles from './MemoEditCss';
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

export interface MemoEditProps extends BaseEdit {
  text: string;
  rows?: number;
}

enum BUTTON_TYPE {
  APPEND = 'Append',
  PREPEND = 'Prepend',
}

/**
 * <LogoMemoEdit/> allows user to enter and edit multiline text.
 *
 *     Usage:
 *
 *     ```html
 *  const [value, setvalue] = useState("");
 *  //...
 *  <LogoMemoEdit
 *      id="TextEdit"
 *      text={value}
 *      onChangeText={setvalue}
 *      rows={4}
 *   />
 *     ```
 *
 * @param {boolean} enabled If false, memoedit will be disabled. Default to true.
 * @param {Object} spacing The object for bottom and top spacing of the memoedit. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {string} text The text of the memoedit.
 * @param {boolean} visibility If false, memoedit will not display. Default to true
 * @param {string} id The id of memoedit
 * @param {number} maxLength The maximum length of text.
 * @param {number} rows Therow number of memoedit. Default to 3.
 * @param {string} align The alignment of text in memoedit. Options are  "NotSet", "Left", "Center", "Right" and "Justify". Default to "NotSet"
 * @param {boolean} readOnly If true, memoedit will be readOnly. Default to false.
 * @param {boolean} watermarkEnabled If true, the placeholder will be displayed. Default to false,
 * @param {string} watermarkText The placeholder of memoedit,
 * @param {Function} onChangeText Sets text prop. when text is changed.
 * @constructor
 * @link Props
 */
const LogoMemoEdit: React.FC<MemoEditProps> = ({
  id,
  enabled = true,
  buttons = [
    {
      key: '',
      buttonType: '',
      iconClass: '',
      onClick: () => {},
    },
  ],
  helperText,
  mode = 'flat',
  validation,
  maxLength,
  align = 'NotSet',
  readOnly = false,
  spacing = { bottomSpacing: false, topSpacing: false },
  visibility = true,
  watermarkEnabled = false,
  watermarkText = '',
  onChangeText = () => {},
  text,
  rows = 5,
}) => {
  const alignment =
    align === 'Right'
      ? 'right'
      : align === 'Justify' || align === 'Center'
      ? 'center'
      : 'left';

  const marginBottom = spacing.bottomSpacing ? 20 : 0;
  const marginTop = spacing.topSpacing ? 20 : 0;
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
        {buttons?.map((button: any) => {
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
            mode={mode}
            onChangeText={(value: string) => !readOnly && onChangeText(value)}
            style={{
              height: 120,
              textAlign: alignment,
              marginBottom,
              marginTop,
              fontSize: 14,
              width: buttons[0]?.key !== '' ? FULL_WIDTH : 280,
              opacity: enabled ? 1 : 0.6,
              backgroundColor,
              paddingLeft: prependButtonCount * 32,
              paddingRight: appendButtonCount * 40,
            }}
            multiline
            numberOfLines={rows}
            disabled={!enabled || readOnly}
            maxLength={maxLength}
            label={watermarkEnabled ? watermarkText : undefined}
          />
        )}
        {buttons?.map((button: any) => {
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

export { LogoMemoEdit };
