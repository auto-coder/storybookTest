import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { TEXT_COLOR_70 } from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';

/**
 * Interface of Props
 * @enum Props
 */
export interface SwitchPaperProps {
    enabled?: boolean;
    checked?: boolean;
    value?: string;
    valueChecked?: string;
    valueUnchecked?: string;
    fontColor?: string;
    fullWidth?: boolean;
    hideText?: boolean;
    text: string;
    visibility?: boolean;
    spacing?: {
        bottomSpacing: boolean;
        topSpacing: boolean;
    };
    id?: string;
    onPress?: Function,  //todo add doc
    changedChecked?: boolean | null //todo add doc,
}
/**
 *  <LogoSwitchPaper/> is used for switch components to the design in Figma.
 * 
 * Usage: 
 * 
 *   ```html
 *    <LogoSwitchPaper
 *      id="switch" 
 *      text="SwitchPaper"  />
 *    ```
 *  
 * @param {boolean} enabled If false, switchPaper will be disabled. Default to true.
 * @param {boolean} checked The value of switchPaper. Default to false. 
 * @param {string} value The init value of switch
 * @param {string} valueChecked The "true" value of switch
 * @param {string} valueUnchecked The "false" value of switch
 * @param {string} fontColor Font color of text.
 * @param {boolean} fullWidth If true, the button width will be fullwidht of the screen. Default to true.
 * @param {boolean} hideText If true, the text will be hidden. Default to false. 
 * @param {string} text  The text of the switchPaper.
 * @param {boolean} visibility If false, switchPaper will not display. Default to true
 * @param {Object} spacing The object for bottom and top spacing of the switchPaper. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {string} id The id of switchPaper.
 * @constructor
 * @link Props
 */
const LogoSwitchPaper: React.FC<SwitchPaperProps> = ({
    enabled = true,
    checked = false,
    valueChecked = '',
    valueUnchecked = '',
    value = '',
    fontColor,
    fullWidth = true,
    hideText = false,
    text,
    id,
    spacing = { bottomSpacing: false, topSpacing: false },
    visibility = true,
    onPress = () => { },
    changedChecked = null,
}) => {
    const marginBottom = spacing.bottomSpacing ? 20 : 0;
    const marginTop = spacing.topSpacing ? 20 : 0;
    const width = fullWidth ? '100%' : 120;
    const color = fontColor || TEXT_COLOR_70;
    const display = visibility ? 'flex' : 'none';

    const [check, setCheck] = useState(checked);
    const [values, setvalues] = useState(value);

    useEffect(() => {
        if (changedChecked) {
            setCheck(checked);
            setvalues(value)
        }
    }, [changedChecked]);

    const checkControl = () => {
        if (value && valueChecked && valueUnchecked) {
            if (values == valueChecked) {
                setvalues(valueUnchecked);
                onPress(valueUnchecked)
            }
            if (values == valueUnchecked) {
                setvalues(valueChecked);
                onPress(valueChecked)
            }
        } else {
            setCheck(!check);
            onPress(!check)
        }
    };

    return (
        <View style={{ display, marginBottom, marginTop }}>
            {!hideText ?
                <Text style={{ color }}>{text}</Text> : null
            }
            <Switch
                style={{ width }}
                key={id}
                disabled={!enabled}
                value={check}
                onValueChange={checkControl}
            />
        </View>
    );
};

export { LogoSwitchPaper };
