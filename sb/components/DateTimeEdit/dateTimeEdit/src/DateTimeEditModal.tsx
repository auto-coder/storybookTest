
import React from 'react';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { GHOST_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';
import { Calendar, en, registerTranslation } from '@logo-rn/shared-utils/utils/lib/react-native-paper-dates';
import { Modal, Portal } from 'react-native-paper';
import { LogoDivider } from '../../divider';
import styles from "./DateTimeEditCss" 
import type { DateTimeEditProps } from './DateTimeEdit';
import { TimeEditButton } from './TimeEditButton';
import { TimeEditModal } from './TimeEditModal';
import { DateEditButton } from './DateEditButton';
import { ModalButtonsContainer } from './ModalButtonsContaner';

registerTranslation('en', en)
registerTranslation("tr", {
    save: 'Kaydet',
    selectSingle: 'Tarih seçiniz',
    selectMultiple: 'Tarihleri seçiniz',
    selectRange: 'Tarih aralığını seçiniz',
    notAccordingToDateFormat: (inputFormat:any) =>
        `Tarih formatı ${inputFormat} şeklinde olmalıdır.`,
    mustBeHigherThan: (date) => `${date} tarihinden sonra olmalıdır.`,
    mustBeLowerThan: (date) => `${date} tarihinden önce olmalıdır.`,
    mustBeBetween: (startDate, endDate) =>
        `${startDate} - ${endDate} tarihleri arasında olmalıdır.`,
    dateIsDisabled: 'Günlere izin verilmiyor',
    previous: 'Önce',
    next: 'Sonra',
    typeInDate: 'Tarih tipi',
    pickDateFromCalendar: 'Takvinden tarih seçiniz',
    close: 'Kapat',
})


enum MODE {
    DATEONLY = "DateOnly",
    DATETIME = "DateTime",
    TIMEONLY = "TimeOnly"
}

export interface DateTimeEditModalProps extends DateTimeEditProps {
    visible: boolean,
    close: Function,
    onConfirm: Function
}

const DateTimeEditModal: React.FC<DateTimeEditModalProps> = ({
    visible,
    close,
    label = "",
    dateTime,
    time,
    setDate,
    setTime,
    mode = MODE.DATETIME,
    isReadOnly = false,
    lang = "tr",
    enabled = true,
    watermarkEnabled = true,
    watermarkText = "",
    watermarkTimeText = "",
    autoshowOnFocus = false,
    onConfirm,
    format = "",
    showClear = true,
    showClose = true,
    showToday = true,
    disabledDays,
    maxDate,
    minDate,
    selectRange = false,
    helperText = "",
    helperTimeText = "",
    validation = { date: undefined, time: undefined },
}) => {
    const [openTime, setOpenTime] = React.useState(false);
    const [isEndTime, setisEndTime] = React.useState(false);
    const [timeText, setTimeText] = React.useState(time)
    const [rangeDate, setRangeDate] = React.useState<{
        startDate: Date | undefined;
        endDate: Date | undefined;
    }>({ startDate: undefined, endDate: undefined });
    const [rangeTime, setRangeTime] = React.useState<{
        startTime: Date | undefined;
        endTime: Date | undefined;
    }>({ startTime: undefined, endTime: undefined });
    const onChangeDate = (date: any) => {
        setDate(date);
        !showClose && close()
    }

    const onChangeRangeDate = ({ startDate, endDate }: any) => {
        setRangeDate({ startDate, endDate });
        setDate({ startDate, endDate })
        !showClose && startDate && endDate && rangeTime.startTime && rangeTime.endTime && close()
    }

    const onChangeRangeTime = (startTime: any, endTime: any) => {
        setRangeTime({ startTime, endTime });
        setTime && setTime({ startTime, endTime })
        !showClose && startTime && endTime && startTime && endTime && close()
    }

    const changeTime = (time: string) => {
        setTime && setTime(time);
        setTimeText(time)
    }

    const onChangeTime = (time: string) => {
        !selectRange ? changeTime(time)
            : isEndTime ? onChangeRangeTime(rangeTime.startTime, time)
                : onChangeRangeTime(time, rangeTime.endTime)
        setisEndTime(false)
    }

    const showTimePicker = (isEnd: boolean) => {
        if (!(isReadOnly || !enabled))
            setOpenTime(!openTime);
        isEnd && setisEndTime(true)
    };

    const clearSelected = () => {
        setTime && setTime("")
        setTimeText("")
        setDate({ date: null })
        setRangeDate({ startDate: undefined, endDate: undefined })
    }

    const selectToday = () => {
        selectRange ?
            setRangeDate({ startDate: new Date(), endDate: undefined })
            : setDate({ date: new Date() })

    }

    const buttonContainerStyle = {
        ...styles.datepicker,
        opacity: !enabled ? 0.6 : 1,
        width: mode === MODE.DATETIME || (selectRange && (mode === MODE.TIMEONLY || mode === MODE.DATEONLY)) ? "48%" : "98%"
    }
    const renderTimePickerButton = (time: any, isEndTime: boolean = false) => {
        return (
            <View style={buttonContainerStyle}>
                <TimeEditButton
                    format={format}
                    showTimePicker={() => showTimePicker(isEndTime)}
                    enabled={enabled}
                    autoshowOnFocus={autoshowOnFocus}
                    isReadOnly={isReadOnly}
                    time={selectRange && isEndTime ? rangeTime.endTime : selectRange ? rangeTime.startTime : time}
                    watermarkEnabled={watermarkEnabled}
                    watermarkTimeText={watermarkTimeText}
                    setTime={(time: string) => onChangeTime(time)}
                    hideIcon={false}
                    helperTimeText={helperTimeText}
                    validation={validation.time}
                />
            </View>
        )
    }
    const renderDatePickerButton = (date: any) => {
        return (
            <View style={buttonContainerStyle}>
                <DateEditButton
                    format={format}
                    onPress={() => { }}
                    watermarkEnabled={watermarkEnabled}
                    watermarkText={watermarkText}
                    isReadOnly={isReadOnly}
                    enabled={enabled}
                    date={date}
                    helperText={helperText}
                    validation={validation.time} />
            </View>

        )
    }

    const renderTopNavigation = () => {
        return (
            <>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    height: 80,
                    padding: 12,
                    alignItems: "flex-end",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontFamily: "Inter",
                        fontSize: 18,
                        fontWeight: "600",
                        color: TEXT_COLOR
                    }}>{label}</Text>
                    {showClose && <TouchableOpacity style={{
                        position: "absolute",
                        right: 16,
                        bottom: 8
                    }}
                        onPress={() => onConfirm()}>
                        <Text style={{
                            fontFamily: "Inter",
                            fontSize: 16,
                            fontWeight: "600",
                            color: PRIMARY_COLOR
                        }}>Tamam</Text>
                    </TouchableOpacity>}
                </View>
                <LogoDivider />
            </>
        )
    }

    const renderButtons = () => {
        return (
            <ModalButtonsContainer
                mode={mode}
                dateEditButton={renderDatePickerButton(selectRange ? rangeDate.startDate : dateTime)}
                dateEditButton2={renderDatePickerButton(rangeDate.endDate)}
                timeEditButton={renderTimePickerButton(selectRange ? rangeTime.startTime : timeText)}
                timeEditButton2={renderTimePickerButton(rangeTime.endTime, true)}
                selectRange={selectRange} />
        )
    }

    const renderHelperButtons = () => (
        <>
            {showToday && <TouchableOpacity
                style={{ padding: 14 }}
                onPress={() => selectToday()}>
                <Text style={{
                    fontFamily: "Inter",
                    fontSize: 14,
                    fontWeight: "400",
                    color: TEXT_COLOR
                }}>Bugünü Seç</Text>
            </TouchableOpacity>}
            {showClear && showToday && <LogoDivider />}
            {showClear && <TouchableOpacity
                style={{ padding: 14 }}
                onPress={() => clearSelected()}>
                <Text style={{
                    fontFamily: "Inter",
                    fontSize: 14,
                    fontWeight: "400",
                    color: TEXT_COLOR
                }}>Temizle</Text>
            </TouchableOpacity>}
        </>
    )


    const renderCalendar = () => {
        return (
            <SafeAreaView style={{
                width: "100%",
                height: 540,
                backgroundColor: GHOST_COLOR,
                justifyContent: "space-between"
            }}>
                {selectRange ?
                    <Calendar
                        locale={lang}
                        validRange={{
                            startDate: minDate,
                            endDate: maxDate,
                            disabledDates: disabledDays
                        }}
                        startDate={rangeDate.startDate}
                        endDate={rangeDate.endDate}
                        mode="range"
                        onChange={onChangeRangeDate}
                    />
                    :
                    <Calendar
                        locale={lang}
                        validRange={{
                            startDate: minDate,
                            endDate: maxDate,
                            disabledDates: disabledDays
                        }}
                        mode="single"
                        date={dateTime}
                        onChange={onChangeDate}
                    />
                }

                {renderHelperButtons()}
            </SafeAreaView>
        )
    }

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => close()}
                contentContainerStyle={styles.modal}>
                <View style={{
                    justifyContent: "space-between"
                }}>
                    {renderTopNavigation()}
                    {renderButtons()}
                    {renderCalendar()}
                    <TimeEditModal
                        visible={openTime}
                        lang={lang}
                        close={() => setOpenTime(false)}
                        setTime={(time: string) => onChangeTime(time)}
                    />
                </View>
            </Modal>
        </Portal>
    )
};

export { DateTimeEditModal }
