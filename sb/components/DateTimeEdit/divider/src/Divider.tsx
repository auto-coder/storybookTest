import React from 'react';
import { View } from 'react-native';
import { ALIGN_SELF } from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';
import styles from "./DividerCss"

/**
 * Interface of Props
 * @enum Props
 */
interface Props {
    width?: string | number,
    style?: StyleMedia,
    alignment?: string
}

/**
 *  <LogoDivider/> is a thin line that groups content in lists and layouts.
 * 
 * Usage: 
 * 
 *   ```html
 *  <LogoDivider width="90%" />
 *    ``` 
 *  
 * @param {string} width  The width of divider
 * @param {StyleMedia} style The style of label
 * @param {string} alignment Alignment of divider. Default center.
 * @constructor
 * @link Props
 */
const LogoDivider: React.FC<Props> = ({
    width = "100%",
    style,
    alignment = "center"
}) => {
    const alignSelf = alignment === ALIGN_SELF.flexStart ? ALIGN_SELF.flexStart
        : alignment === ALIGN_SELF.flexEnd ? ALIGN_SELF.flexEnd
            : ALIGN_SELF.center

    return (
        <View style={{
            ...styles.divider,
            width: width,
            alignSelf: alignSelf,
            ...style as any,
        }}></View>
    );
};



export { LogoDivider };