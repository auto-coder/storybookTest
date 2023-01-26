import React, { useState } from 'react';
import { View } from 'react-native';
import { PRIMARY_COLOR, TEXT_COLOR_70 } from '@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS';
import { LogoLabel } from '../../../Checkbox/label';
import { DateTimeEditModal } from './DateTimeEditModal';
import { TimeEditButton } from './TimeEditButton';
import { TimeEditModal } from './TimeEditModal';
import { DateEditButton } from './DateEditButton';
import { FORMAT, formatDate, formatTime, MODE } from './helper';

/**
 * Interface of Props
 * @enum Props
 */
export interface DateTimeEditProps {
  label?: string,
  setDate: Function,
  setTime?: Function,
  isReadOnly?: boolean,
  lang?: string
  enabled?: boolean,
  visibility?: boolean,
  watermarkEnabled?: boolean,
  watermarkText?: string,
  watermarkTimeText?: string,
  id: string,
  format?: "LongDateTime" | "ShortDateTime" | "ShortDate" | "LongDate" | "ShortTime" | "LongTime",
  mode: "DateOnly" | "DateTime" | "TimeOnly",
  autoshowOnFocus?: boolean,
  hideIcon?: boolean,
  keepInvalid?: boolean,
  keepOpen?: boolean,
  showClear?: boolean,
  showClose?: boolean,
  showToday?: boolean,
  spacing?: {
    bottomSpacing: boolean;
    topSpacing: boolean;
  },
  viewMode?: "Decades" | "Years" | "Months" | "Days" | "Times",
  disabledDays?: Array<Date>,
  disabledHours?: Array<Date>,
  maxDate?: Date,
  minDate?: Date,
  dateTime?: any,
  time?: any,
  selectRange?: boolean,
  style?: StyleMedia,
  helperText?: string,
  helperTimeText?: string,
  validation?: { date: boolean | undefined, time: boolean | undefined }
}

/** 
 * <LogoDateTimeEdit/> allows user to select the date and time.
 *
 *       Usage:
 * 
 *       ```html
 *     const [date, setDate] = React.useState(null);
 *     const [time, setTime] = React.useState(null);
 *     <LogoDateTimeEdit
 *        id="datetime"
 *        time={time}
 *        setTime={setTime}
 *        mode="DateTime"
 *        lang={lang}
 *        dateTime={date}
 *        setDate={(date: any) => setDate(date)}
 * />
 *       ```
 *
 * @param {Date} dateTime  The date value of datetimeedit.
 * @param {Date} time  The time value of datetimeedit.
 * @param {Function} setDate Sets the date when the date value is changed.
 * @param {Function} setTime Sets the time when the time value is changed.
 * @param {Date} minDate The minimum valid date value of datetimeedit
 * @param {Date} maxDate  The maximum valid date value of datetimeedit
 * @param {String} lang  The language of datetimeedit. Default to "tr"
 * @param {boolean} watermarkEnabled  If true, the placeholder will display.
 * @param {string} watermarkText  The placeholder of date.
 * @param {string} watermarkTimeText  The placeholder of time.
 * @param {string} label The label of datepicker.
 * @param {StyleMedia} style  The style of datetimeedit
 * @param {boolean} isReadOnly  If true, datetimeedit will be only read. Default to false.
 * @param {boolean} enabled  If true, datetimeedit will be enabled. Default to true. 
 * @param {boolean} errorOnTop  If true, the helper text will be on top of datetimeedit. Default to false.
 * @param {boolean} visibility If true, datetimeedit will be visible. Default to true. 
 * @param {string} id: The id of datetimeedit
 * @param {string} format The format of datetimeedit. It can be "LongDateTime", "ShortDateTime", "ShortDate", "LongDate", "ShortTime" or "LongTime". Default to "LongDateTime"
 * @param {string} mode The mode of Datetime. It can be "DateOnly", "DateTime" or "TimeOnly". Default to "DateOnly".
 * @param {boolean} autoshowOnFocus If true, the timeeditbutton will be maskedit to enter the hour. Default to false. 
 * @param {boolean} hideIcon If true, the calender icon will be invisible. Default to false. 
 * @param {boolean} showClear If true, "Temizle" button will visible on the datetimeedit modal. Default to true. 
 * @param {boolean} showClose If true, "Tamam" button will visible on the datetimeedit modal. Default to true. 
 * @param {boolean} showToday If true, "Bugünü Seç" button will visible on the datetimeedit modal. Default to true. 
 * @param {Object} spacing The object for bottom and top spacing of the datetimeedit. Default to { topSpacing: false. bottomSpacing: false }.
 * @param {Array<Date>} disabledDays Array of days to disabled days at calender. 
 * @param {boolean} selectRange If true, the range of dates can be selected at calender. Default to false
 * @constructor
 */
const LogoDateTimeEdit: React.FC<DateTimeEditProps> = ({
  label = "",
  dateTime,
  time,
  setDate,
  setTime = () => { },
  isReadOnly = false,
  lang = "tr",
  enabled = true,
  visibility = true,
  watermarkEnabled = true,
  watermarkText = "",
  watermarkTimeText = "",
  helperText = "",
  helperTimeText = "",
  validation = { date: true, time: true },
  id,
  mode = MODE.DATEONLY,
  autoshowOnFocus = false,
  hideIcon = false,
  showClear = true,
  showToday = true,
  disabledDays,
  showClose = true,
  maxDate,
  minDate,
  selectRange = false,
  format = FORMAT.LONGDATETIME,
  spacing = { bottomSpacing: undefined, topSpacing: undefined },
  style
  // keepInvalid = false,
  // keepOpen = false,
  // viewMode = "Days",
  // disabledHours,
}) => {

  const [formattedDateTime, setFormattedDateTime] = useState("")
  const [openTime, setOpenTime] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const display = visibility ? "flex" : "none"
  const marginBottom = spacing.bottomSpacing ? 24 : 8;
  const marginTop = spacing.topSpacing ? 24 : 0;


  React.useEffect(() => {
    if (selectRange) {
      if (!dateTime && mode !== MODE.TIMEONLY) {
        setFormattedDateTime("")
        return;
      }
      if (!time && mode !== MODE.DATEONLY) {
        setFormattedDateTime("")
        return;
      }
      mode === MODE.DATEONLY ? setFormattedDateTime(formatDate(dateTime?.startDate, format) + " -> " + formatDate(dateTime?.endDate, format))
        : mode === MODE.TIMEONLY ? setFormattedDateTime(formatTime(time?.startTime, format) + " -> " + formatTime(time?.startTime, format))
          : setFormattedDateTime(formatDate(dateTime?.startDate, format) + " " + formatTime(time?.startTime, format) + " -> " + formatDate(dateTime?.endDate, format) + " " + formatTime(time?.endTime, format))
    } else {
      const formattedDate = formatDate(dateTime, format)
      const formattedTime = formatTime(time, format)
      mode === MODE.DATEONLY ? setFormattedDateTime(formattedDate)
        : mode === MODE.TIMEONLY ? setFormattedDateTime(formattedTime)
          : setFormattedDateTime(formattedDate + " " + formattedTime)
    }

  }, [dateTime, time]);


  function showDatePicker() {
    if (!(isReadOnly || !enabled)) {
      setOpen(!open);
    }
  };


  const onConfirm = () => {
    setOpen(false)
  }


  const renderLabel = () => {
    return label !== "" && (
      <View style={{ opacity: !enabled ? 0.6 : 1, marginBottom: 4 }}>
        <LogoLabel style={{ color: !(isReadOnly || !enabled) ? PRIMARY_COLOR : TEXT_COLOR_70, fontWeight: "500" }}>{label}</LogoLabel>
      </View>
    )
  }
  const showTimePicker = () => {
    if (!(isReadOnly || !enabled))
      setOpenTime(!openTime);
  };

  const renderButton = () => {
    return mode === MODE.TIMEONLY ?
      <TimeEditButton
        showTimePicker={showTimePicker}
        format={format}
        enabled={enabled}
        autoshowOnFocus={autoshowOnFocus}
        isReadOnly={isReadOnly}
        time={time}
        hideIcon={hideIcon}
        watermarkEnabled={watermarkEnabled}
        watermarkTimeText={watermarkTimeText}
        setTime={(time: any) => setTime(time)} helperTimeText={helperTimeText} validation={validation.time} />
      :
      <DateEditButton
        watermarkEnabled={watermarkEnabled}
        formattedDateTime={formattedDateTime}
        watermarkText={watermarkText}
        hideIcon={hideIcon}
        onPress={showDatePicker}
        isReadOnly={isReadOnly}
        enabled={enabled}
        date={dateTime}
        format={format}
      />
  }

  return (
    <View key={id} style={{ opacity: !enabled ? 0.6 : 1, width: "100%", display, marginBottom, marginTop, ...style }}>
      {renderLabel()}
      {renderButton()}
      <DateTimeEditModal
        dateTime={dateTime}
        lang={lang}
        minDate={minDate}
        showClear={showClear}
        showToday={showToday}
        maxDate={maxDate}
        watermarkEnabled={watermarkEnabled}
        watermarkText={watermarkText}
        label={label}
        format={format}
        showClose={showClose}
        isReadOnly={isReadOnly}
        watermarkTimeText={watermarkTimeText}
        disabledDays={disabledDays}
        autoshowOnFocus={autoshowOnFocus}
        visible={open}
        selectRange={selectRange}
        close={() => setOpen(false)}
        mode={mode}
        setDate={(date: any) => setDate(date.date)}
        setTime={(time: string) => setTime(time)}
        id={'dateTimeModal'}
        onConfirm={onConfirm}
        helperText={helperText}
        helperTimeText={helperTimeText}
        validation={validation} />
      <TimeEditModal
        visible={openTime}
        lang={lang}
        close={() => setOpenTime(false)}
        setTime={setTime} />
    </View>
  );
};

export { LogoDateTimeEdit };
