import React from 'react';
import { View, Image } from 'react-native';
import { BaseButton, DISPLAY_MODE, SIZE } from "../../BaseButton"
import { Button, Text } from 'react-native-paper';
import { LogoIcon } from '../../logo-icon';
import styles from './ButtonCss';


/**
 * <LogoButtonPaper/> is an accessible and customizable button that allows users to perform actions.
 *
 *     Usage:
 *
 *     ```html
 *     <LogoButtonPaper
 *     text={“Press Me”}
 *     onClick={()=>console.log(“Pressed”)} />
 *     ```
 *
 * @param {boolean} enabled If false, button will be disabled. Default to true.
 * @param {StyleMedia} buttonStyle The style of button.
 * @param {string} displayMode The display mode can be "TextOnly", "ImageOnly", "ImageBeforeText" and "ImageAfterText" Default to TextOnly.
 * @param {boolean} fullWidth If true, the button width will be fullwidht of the screen. Default to false.
 * @param {string} iconClass The icon name of the button. Default to undefined.
 * @param {number} imageHeight The image height. Default to 44.
 * @param {number} imageWidth  The image width. Default to 44.
 * @param {string} imageUrl The image url of the button.
 * @param {boolean} outlined If true, the button will be outlined. Default to false.
 * @param {string} size The size can be "Default", "Small" and "Large". Default to SIZE.DEFAULT.
 * @param {Object} spacing The object for bottom and top spacing of the button. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {string} text The text of the button.
 * @param {Function} onClick Sets when button is clicked.
 * @param {boolean} visibility If false, button will not display. Default to true
 * @constructor
 * @link Props
 */

const LogoButtonPaper: React.FC<BaseButton> = ({
    enabled = true,
    buttonStyle = {},
    displayMode = DISPLAY_MODE.TEXT_ONLY,
    fullWidth = false,
    iconClass = undefined,
    imageHeight = 44,
    imageWidth = 44,
    imageUrl = "https://",
    outlined = false,
    size = SIZE.DEFAULT,
    spacing = { topSpacing: false, bottomSpacing: false },
    text = "",
    onClick = () => { },
    visibility = true
}) => {
    const mode = outlined ? "outlined" : "text"
    const display = visibility ? "flex" : "none"
    const width = fullWidth ? "100%" : 120
    const marginBottom = spacing.bottomSpacing ? 20 : 0
    const marginTop = spacing.topSpacing ? 20 : 0
    const height = size === SIZE.LARGE ? 66 : 44

    return (<View style={{ display, marginBottom, marginTop }}>
        <Button
            disabled={!enabled}
            mode={mode}
            style={{
                ...styles.buttonStyle,
                width,
                height,
                ...buttonStyle,
                paddingTop: size === SIZE.LARGE ? 18 : 4,
                opacity: enabled ? 1 : 0.5,
            }}
            onPress={() => onClick()}>
            <View style={styles.buttonContainer}>
                {(displayMode === DISPLAY_MODE.IMAGE_ONLY || displayMode === DISPLAY_MODE.IMAGE_BEFORE_TEXT) && (iconClass ?
                    <LogoIcon name={iconClass} style={styles.icon} size={18} /> :
                    <Image source={{ uri: imageUrl }} style={{ width: imageWidth, height: imageHeight }} />
                )}
                {displayMode !== DISPLAY_MODE.IMAGE_ONLY && <Text style={styles.text}>{text}</Text>}
                {displayMode === DISPLAY_MODE.IMAGE_AFTER_TEXT && (iconClass ?
                    <LogoIcon name={iconClass} style={styles.icon} size={18} /> :
                    <Image source={{ uri: imageUrl }} style={{ width: imageWidth, height: imageHeight }} />
                )}
            </View>

        </Button>

    </View>
    );
};

export { LogoButtonPaper };