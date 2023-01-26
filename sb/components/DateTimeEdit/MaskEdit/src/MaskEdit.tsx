import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { MaskedTextInput } from "react-native-mask-text"; 
import type { BaseEdit } from '@logo-rn/shared-utils/utils/baseProps/BaseEdit';
import styles from './MaskEditCss';
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

export interface MaskEditProps extends BaseEdit {
  text: string;
  maskOptions: MaskOptionsProps;
  returnMaskedValue?: boolean;
  textEditWidth?: string | number;
}

interface MaskOptionsProps {
  editMask?: string;
  editTemplates:
  | 'IPv6Address'
  | 'CreditCard'
  | 'Phone'
  | 'PhoneWithExtension'
  | 'Custom';
  placeHolder?: string;
}

enum BUTTON_TYPE {
  APPEND = 'Append',
  PREPEND = 'Prepend',
}

/**
 * <LogoMaskEdit/> allows user to enter and edit text with the given mask.
 *
 *     Usage:
 *
 *     ```html
 *  const [value, setvalue] = useState("");
 *  //...
 *   <LogoMaskEdit
 *      id="MASK_EDIT"
 *      text={value}
 *      onChangeText={setValue}
 *      maskOptions={{ editTemplates: "IPv6Address" }}
 *  />
 *     ```
 *
 * @param {boolean} enabled If false, memoedit will be disabled. Default to true.
 * @param {Object} spacing The object for bottom and top spacing of the memoedit. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {string} text The text of the memoedit.
 * @param {boolean} visibility If false, memoedit will not display. Default to true
 * @param {string} id The id of memoedit
 * @param {number} maxLength The maximum length of text.
 * @param {string} align The alignment of text in memoedit. Options are  "NotSet", "Left", "Center", "Right" and "Justify". Default to "NotSet"
 * @param {boolean} readOnly If true, memoedit will be readOnly. Default to false.
 * @param {boolean} watermarkEnabled If true, the placeholder will be displayed. Default to false,
 * @param {string} watermarkText The placeholder of memoedit,
 * @param {Function} onChangeText Sets text prop. when text is changed.
 * @param {Array<Object>} buttons Displays right and left buttons of memoedit. Object includes key, buttonType ("Append" or "Prepend"), iconClass and onClick keys.
 * @param {Object} maskOptions Sets mask options. Object includes  editMask, editTemplates and placeHolder keys. "editTemplates" can be "IPv6Address", "CreditCard", "Phone", "PhoneWithExtension" and "Custom". Default to PhoneWithExtension.
 * @param {boolean} returnMaskedValue If true, text prop will be set as masked value. Default to false.
 * @constructor
 * @link Props
 */
const LogoMaskEdit: React.FC<MaskEditProps> = ({
  id,
  enabled = true,
  maxLength,
  align = 'NotSet',
  readOnly = false,
  spacing = { bottomSpacing: false, topSpacing: false },
  visibility = true,
  watermarkEnabled = false,
  watermarkText = '',
  text,
  mode = 'flat',
  validation,
  helperText = '',
  // textEditWidth = '100%',
  onChangeText = () => { },
  buttons = [
    {
      key: '',
      buttonType: '',
      iconClass: '',
      onClick: () => { },
    },
  ],
  maskOptions = {
    editMask: '+[00] ([000]) [0000000]',
    editTemplates: 'PhoneWithExtension',
    placeHolder: '+  (   ) ',
  },
  returnMaskedValue = false,
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

  // const placeholder =
  //   maskOptions.editTemplates === 'IPv6Address'
  //     ? '----:----:----:----:----:----:----:----'
  //     : maskOptions.editTemplates === 'CreditCard'
  //     ? '---- ---- ---- ----'
  //     : maskOptions.editTemplates === 'Phone'
  //     ? '0 (---) --- -- -- '
  //     : maskOptions.editTemplates === 'PhoneWithExtension'
  //     ? '+-- (---) -------'
  //     : maskOptions.editMask;

  const mask =
    maskOptions.editTemplates === 'IPv6Address'
      ? '[AAAA]:[AAAA]:[AAAA]:[AAAA]:[AAAA]:[AAAA]:[AAAA]:[AAAA]'
      : maskOptions.editTemplates === 'CreditCard'
        ? '[0000] [0000] [0000] [0000]'
        : maskOptions.editTemplates === 'Phone'
          ? '0([000]) [000] [00] [00]'
          : maskOptions.editTemplates === 'PhoneWithExtension'
            ? '+[00] ([000]) [000] [00] [00]'
            : maskOptions.editMask;

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

  console.log(FULL_WIDTH);
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
            onChangeText={(value: string) => onChangeText(value)}
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
            activeUnderlineColor={activeColor}
            activeOutlineColor={activeColor}
            clearButtonMode={'always'}
            disabled={!enabled || readOnly}
            maxLength={maxLength}
            mode={readOnly ? 'flat' : mode}
            label={watermarkEnabled ? watermarkText : undefined}
            render={() => (
              <MaskedTextInput
                keyboardType={
                  maskOptions.editTemplates === 'IPv6Address'
                    ? 'default'
                    : 'numeric'
                }
                editable={enabled || readOnly}
                style={{
                  textAlign: alignment,
                  paddingLeft: prependButtonCount * 10 + 16,
                  marginTop: mode === 'flat' ? 8 : 0,
                  height: 44,
                  fontSize: 14,
                  lineHeight: 22,
                }}
                mask={mask}
                onChangeText={(formatted, extracted) => {
                  onChangeText(returnMaskedValue ? formatted : extracted);
                }}
              />
            )}
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

export {LogoMaskEdit} ;
