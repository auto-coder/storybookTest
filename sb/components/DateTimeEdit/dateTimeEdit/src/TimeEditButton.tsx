
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, GestureResponderEvent } from 'react-native';
import { DANGER_BACKGROUND_COLOR, GHOST_COLOR, TEXT_COLOR_10, TEXT_COLOR_30, TEXT_COLOR_70 } from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';
import { LogoIcon } from '@logo-rn/logo-icon';
import { LogoMaskEdit } from '../../MaskEdit';
import { formatTime } from './helper';
import styles from "./DateTimeEditCss"

interface TimePickerButtonProps {
    showTimePicker: ((event: GestureResponderEvent) => void) | undefined,
    enabled: boolean
    autoshowOnFocus: boolean
    isReadOnly: boolean
    time: string | undefined
    watermarkEnabled?: boolean
    watermarkTimeText: string
    setTime: Function,
    hideIcon: boolean,
    format: string,
    helperTimeText: string,
    validation: boolean | undefined
}

const TimeEditButton: React.FC<TimePickerButtonProps> = ({
    showTimePicker,
    enabled,
    autoshowOnFocus,
    isReadOnly = false,
    time = "",
    watermarkEnabled,
    watermarkTimeText,
    setTime,
    hideIcon,
    format,
    helperTimeText = "",
    validation = false,
}) => {
    const [text, setText] = useState(time);
    React.useEffect(() => {
        setText(time)
    }, [setTime]);

    const TimeIcon = () => !hideIcon && (
        <TouchableOpacity onPress={showTimePicker}>
            <LogoIcon name='time_clock_circle_2' color={TEXT_COLOR_70} size={18} />
        </TouchableOpacity>
    )
    const conteinerStyle: StyleMedia = {
        ...styles.datepickerButton,
        backgroundColor: isReadOnly ? GHOST_COLOR : validation === false ? DANGER_BACKGROUND_COLOR : TEXT_COLOR_10,
        borderWidth: isReadOnly ? 1 : 0,
        borderColor: isReadOnly ? TEXT_COLOR_30 : "#FF3E51",
        borderStyle: isReadOnly ? 'dashed' : "solid"
    }
    return (<>
        {autoshowOnFocus ?
            <TouchableOpacity
                disabled={!enabled || isReadOnly}
                style={conteinerStyle}
                onPress={showTimePicker} >
                {text !== "" ?
                    <Text style={styles.title}>{formatTime(text, format)}</Text>
                    : watermarkEnabled ? <Text style={styles.placeholder} > {watermarkTimeText}</Text>
                        : <Text style={styles.title}></Text>}
                {TimeIcon()}
            </TouchableOpacity>
            : <View style={conteinerStyle}>
                <LogoMaskEdit id="date-time-edit-text-edit"
                    textEditWidth="95%"
                    text={formatTime(time, format)}
                    maskOptions={{
                        editMask: "[00]:[00]",
                        editTemplates: "Custom",
                    }}
                    onChangeText={setTime}
                    watermarkEnabled
                    watermarkText={watermarkTimeText} />

                {TimeIcon()}
            </View>
        }
        {validation === false && <Text style={styles.helperText}>{helperTimeText}</Text>}
    </>

    )
};

export { TimeEditButton }
