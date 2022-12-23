import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { LogoLabel } from '../../label';
import { LogoSwitchPaper } from '../../logo-switch-paper';

/**
 * Interface of Props
 * @enum Props
 */
export interface CheckBoxPaperProps {
  value?: string;
  enabled?: boolean;
  allowIndeterminate?: boolean;
  checked?: boolean;
  cycleIndeterminate?: boolean;
  valueChecked?: string;
  valueIndeterminate?: string;
  valueUnchecked?: string;
  fontColor?: string;
  useAsSwitch?: boolean;
  fullWidth?: boolean;
  hideText?: boolean;
  text: string;
  visibility?: boolean;
  spacing?: {
    bottomSpacing: boolean;
    topSpacing: boolean;
  };
  id?: string;
  position?: 'Right' | 'Left';
  onPress?: Function; //todo add doc
  changedChecked?: boolean | null; //todo add doc,
}

/**
 *  <LogoCheckBoxPaper/> is a component to check items via checkbox.
 *
 * Usage:
 *
 *   ```html
 *     <LogoCheckBoxPaper id="check-box" />
 *    ```
 *
 * @param {boolean} enabled If false, checkbox will be disabled. Default to true.
 * @param {boolean} checked The value of checkbox. Default to false.
 * @param {string} value The init value of checkbox
 * @param {string} valueChecked The "true" value of checkbox
 * @param {string} valueUnchecked The "false" value of checkbox
 * @param {string} fontColor Font color of text.
 * @param {boolean} fullWidth If true, the button width will be fullwidht of the screen. Default to true.
 * @param {boolean} hideText If true, the text will be hidden. Default to false.
 * @param {string} text  The text of the checkbox.
 * @param {boolean} visibility If false, checkbox will not display. Default to true
 * @param {Object} spacing The object for bottom and top spacing of the checkbox. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {string} id The id of checkbox.
 * @param {boolean} allowIndeterminate If true, indeterminate value will be allowed. Default to false.
 * @param {boolean} cycleIndeterminate If true, indeterminate, true and false values will be cycle. Default to false.
 * @param {string} valueIndeterminate  The "indeterminate" value of checkbox
 * @param {boolean} useAsSwitch
 * @constructor
 * @link Props
 */
const LogoCheckBoxPaper: React.FC<CheckBoxPaperProps> = ({
  enabled = true,
  allowIndeterminate = false,
  checked = false,
  cycleIndeterminate = false,
  valueChecked = '',
  valueIndeterminate = '',
  valueUnchecked = '',
  fontColor = 'rgba(24, 39, 58, 0.94)',
  useAsSwitch = false,
  fullWidth = true,
  hideText = false,
  text = '',
  value = '',
  position = 'Right',
  onPress = () => { },
  changedChecked = null,
  id,
  spacing = { bottomSpacing: false, topSpacing: false },
  visibility = true,
}) => {
  const marginBottom = spacing.bottomSpacing ? 20 : 0;
  const marginTop = spacing.topSpacing ? 20 : 0;
  const width = fullWidth ? '100%' : 75;
  // const color = fontColor || TEXT_COLOR_70;
  const display = visibility ? 'flex' : 'none';
  const [check, setCheck] = useState(checked);
  const [values, setvalues] = useState(value);
  const [status, setStatus] = useState(getStartStatus());

  useEffect(() => {
    if (changedChecked) {
      setCheck(!checked);
      setStatus(getStartStatus(checked));
    }
  }, [changedChecked]);

  const checkControl = () => {
    if (value && valueChecked && valueUnchecked && valueIndeterminate) {
      if (values == valueChecked) {
        setvalues(valueUnchecked);
        setStatus('unchecked');
        onPress('unchecked');
      }
      if (values == valueUnchecked) {
        setvalues(valueChecked);
        setStatus('checked');
        onPress('checked');
      }
    } else {
      check ? setStatus('unchecked') : setStatus('checked');
      onPress(check ? 'unchecked' : 'checked');
      setCheck(!check);
    }
    if (cycleIndeterminate) {
      if (status == 'checked') {
        onPress('indeterminate');
        setStatus('indeterminate');
      } else if (status == 'indeterminate') {
        onPress('unchecked');
        setStatus('unchecked');
      } else if (status == 'unchecked') {
        onPress('checked');
        setStatus('checked');
      }
    }
  };

  function getStartStatus(checkVal = check) {
    let stat = 'checked';
    if (value && valueChecked && valueUnchecked && valueIndeterminate) {
      if (value == valueChecked) {
        stat = 'checked';
      } else if (value == valueUnchecked) {
        stat = 'unchecked';
      } else if (value == valueIndeterminate) {
        stat = 'indeterminate';
      }
    } else if (allowIndeterminate == true) {
      stat = 'indeterminate';
    } else {
      stat = checkVal ? 'checked' : 'unchecked';
    }
    return stat;
  }

  return !useAsSwitch ? (
    <View
      style={{
        width,
        display,
        marginBottom,
        marginTop,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: fullWidth ? 'space-between' : 'flex-start',
      }}
    >
      {!hideText && position == 'Right' && (
        <LogoLabel
          text={text}
          style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: "400" }}
          fontColor={!enabled ? '#1C375A29' : fontColor}
        />
      )}
      <Checkbox.Android
        style={{ width, height: 48 }}
        color="rgba(18, 96, 240, 1)"
        uncheckedColor="rgba(18, 96, 240, 1)"
        testID={id}
        disabled={!enabled}
        status={
          status === 'checked'
            ? 'checked'
            : status === 'indeterminate'
              ? 'indeterminate'
              : 'unchecked'
        }
        onPress={() => checkControl()}
      />
      {!hideText && position == 'Left' && (
        <LogoLabel
          text={text}
          style={{ fontSize: 14, fontFamily: 'Inter', fontWeight: '400' }}
          fontColor={!enabled ? '#1C375A29' : fontColor}
        />
      )}
    </View>
  ) : (
    <View style={{ width, display, marginBottom, marginTop }}>
      <LogoSwitchPaper
        id="switch"
        text={!hideText ? text : ''}
        fontColor={fontColor}
        checked={checked}
        onPress={() => checkControl()}
        fullWidth={false}
        changedChecked={changedChecked}
        enabled={enabled}
      />
    </View>
  );
};

export { LogoCheckBoxPaper };
