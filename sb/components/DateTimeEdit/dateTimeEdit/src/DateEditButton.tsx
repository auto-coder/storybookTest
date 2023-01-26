import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from "react-native"
import { DANGER_BACKGROUND_COLOR, GHOST_COLOR, TEXT_COLOR_10, TEXT_COLOR_30, TEXT_COLOR_70 } from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';
import { Text } from 'react-native-paper';
import { LogoIcon } from '@logo-rn/logo-icon';
import { formatDate } from './helper';
import styles from './DateTimeEditCss';


export interface DateEditButtonProps {
    isReadOnly: boolean,
    enabled: boolean,
    date: Date | undefined,
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    watermarkEnabled: boolean,
    watermarkText: string,
    format: string,
    formattedDateTime?: string,
    hideIcon?: boolean,
    validation?: boolean | undefined,
    helperText?: string
}

const DateEditButton: React.FC<DateEditButtonProps> = ({
    isReadOnly = false,
    enabled = true,
    date,
    onPress,
    watermarkEnabled = true,
    formattedDateTime = "",
    watermarkText,
    format,
    hideIcon = false,
    validation,
    helperText
}) => {
    const CalendarIcon = () => !hideIcon && (
        <LogoIcon name='calendar' color={TEXT_COLOR_70} size={18} />
    )

    return (
        <>
            <TouchableOpacity
                disabled={!enabled || isReadOnly}
                style={{
                    ...styles.datepickerButton,
                    backgroundColor: isReadOnly ? GHOST_COLOR : validation === false ? DANGER_BACKGROUND_COLOR : TEXT_COLOR_10,
                    borderWidth: isReadOnly ? 1 : 0,
                    borderColor: isReadOnly ? TEXT_COLOR_30 : "#FF3E51",
                    borderStyle: isReadOnly ? 'dashed' : "solid"
                }} onPress={onPress}>
                {formattedDateTime !== "" || date ?
                    <Text style={styles.title}>{formattedDateTime || formatDate(date, format)}</Text>
                    : watermarkEnabled ? <Text style={styles.placeholder}> {watermarkText}</Text>
                        : <Text style={styles.title}> </Text>}
                {CalendarIcon()}
            </TouchableOpacity >
            {validation === false && <Text style={styles.helperText}>{helperText}</Text>}
        </>

    )
}

export { DateEditButton }