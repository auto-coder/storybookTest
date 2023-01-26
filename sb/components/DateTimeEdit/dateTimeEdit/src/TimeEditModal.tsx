
import React from 'react';
import { TimePickerModal } from '@logo-rn/shared-utils/utils/lib/react-native-paper-dates';


export interface TimeEditModalProps {
    visible: boolean,
    lang: string,
    close: Function,
    setTime: Function,
    isEndTime?: boolean,
    isStartTime?: boolean,
    setEndTime?: Function
    setStartTime?: Function
}

const TimeEditModal: React.FC<TimeEditModalProps> = ({
    visible,
    lang = "tr",
    close,
    setTime = () => { },
    setEndTime = () => { },
    setStartTime = () => { },
    isEndTime = false,
    isStartTime = false
}) => {
    const onConfirm = (time: any) => {
        const selectedTime = time.hours + ":" + time.minutes
        isEndTime ? setEndTime
            : isStartTime ? setStartTime
                : setTime(selectedTime)
        close()
    }
    return (
        <TimePickerModal
            visible={visible}
            onDismiss={() => close()}
            onConfirm={(time: any) => onConfirm(time)}
            animationType="fade"
            locale={lang}
            keyboardIcon="edit_pen"
            clockIcon="time_clock_circle_2"
        />
    )
};

export { TimeEditModal }
