import React from 'react';
import { TEXT_COLOR_70 } from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';
import { Text } from 'react-native-paper';
import styles from "./LabelCss"

/**
 * Interface of Props
 * @enum Props
 */
export interface Props {
    children?: string,
    text?: string,
    ID?: string,
    style?: StyleMedia,
    fontColor?: string,
    hAlign?: "NotSet" | "Left" | "Center" | "Right" | "Justify",
    spacing?: {
        bottomSpacing?: boolean,
        topSpacing?: boolean
    },
    visibility?: boolean,
    wordWrap?: boolean
}

/**
 *  <LogoLabel/> is used for text input labels according to the design in Figma.
 * 
 * Usage: 
 * 
 *   ```html
 *       <LogoLabel>LogoLabel Here</LogoLabel>
 *    ```
 *  
 * @param {string} children The string value displays as label
 * @param {StyleMedia} style  The style of label
 * @param {string} text The string value displays as label alternative
 * @param {string} ID The component ID
 * @param {string} fontColor The font color of label
 * @param {string} hAlign the alignment of label can be "NotSet" , "Left" , "Center" , "Right" or "Justify". Default to "NotSet"
 * @param {object} spacing The top and bottom spacing of label. Default to { bottomSpacing: false, topSpacing: false }
 * @param {boolean} visibility The visibility of label. Default to true
 * @param {boolean} wordWrap The wrap of label. Default to false. 
 * @constructor
 * @link Props 
 */
const LogoLabel: React.FC<Props> = ({
    text,
    children = "",
    ID,
    style,
    fontColor,
    hAlign = "NotSet",
    spacing = { bottomSpacing: false, topSpacing: false },
    visibility = true,
    wordWrap = false
}) => {

    const color = fontColor || TEXT_COLOR_70;
    const textAlign = hAlign === "Right" ? "right"
        : hAlign === "Justify" || hAlign === "Center" ? "center"
            : "left"
    const marginBottom = spacing.bottomSpacing ? 8 : 0
    const marginTop = spacing.topSpacing ? 8 : 0
    const flexWrap = wordWrap ? "wrap" : "nowrap"
    const display = visibility ? "flex" : "none"

    return (
        <Text style={{
            ...styles.label,
            ...style,
            color,
            textAlign,
            marginBottom,
            marginTop,
            flexWrap,
            display
        }}
            numberOfLines={wordWrap ? 0 : 1}
            key={ID} >
            {text || children}
        </Text>
    );
};


export { LogoLabel };