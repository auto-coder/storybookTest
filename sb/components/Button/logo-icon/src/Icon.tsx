import { TEXT_COLOR_70 } from "@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS";
import React from "react";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import IcomoonConfig from "./selection.json";
/** 
 * Interface of Props
 * @enum Props
 */
interface Props {
    size?: number,
    name: string,
    color?: string,
    style?: StyleMedia,
}

/**
 *  <LogoIcon/>  allows user to get the icon from the icon list in figma. 
 * 
 *   Usage: 
 * 
 *   ```html
 *     <LogoIcon name="three_dots_hor" />
 *  ```
 * 
 * @param {number} size  
 * @param {string} name 
 * @param {string} color 
 * @param {StyleMedia} style 
 * @constructor
 * @link Props
 */

const LogoIcon: React.FC<Props> = ({
    name,
    size = 14,
    color = TEXT_COLOR_70,
    style
}) => {
    const Icomoon = createIconSetFromIcoMoon(IcomoonConfig);
    return (
        <Icomoon color={color} size={size} name={name} style={style} />
    );
};

export { LogoIcon };
