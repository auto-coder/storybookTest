import React, { ReactElement } from 'react';
import { View } from "react-native"
import styles from './DateTimeEditCss';
import { MODE } from './helper';


export interface ModalButtonsContainerProps {
    mode: string,
    dateEditButton: ReactElement,
    timeEditButton: ReactElement,
    dateEditButton2: ReactElement,
    timeEditButton2: ReactElement,
    selectRange: boolean
}

const ModalButtonsContainer: React.FC<ModalButtonsContainerProps> = ({
    dateEditButton,
    timeEditButton,
    dateEditButton2,
    timeEditButton2,
    mode,
    selectRange
}) => {
    const isDateAvailable = mode === MODE.DATEONLY || mode === MODE.DATETIME
    const isTimeAvailable = mode === MODE.TIMEONLY || mode === MODE.DATETIME
    const isDateOnly = mode === MODE.DATEONLY
    const isTimeOnly = mode === MODE.TIMEONLY
    const isRow = isDateAvailable && isTimeAvailable


    return (
        <View style={{ display: "flex", marginTop: 16, flexDirection: selectRange && (isDateOnly || isTimeOnly) ? 'row' : "column" }}>

            {isRow ?
                <View style={styles.row}>
                    {isDateAvailable && dateEditButton}
                    {isTimeAvailable && timeEditButton}
                </View>
                : <>
                    {isDateAvailable && dateEditButton}
                    {isTimeAvailable && timeEditButton}
                </>}
            {selectRange && (isRow ?
                <View style={styles.row}>
                    {isDateAvailable && dateEditButton2}
                    {isTimeAvailable && timeEditButton2}
                </View>
                : <>
                    {isDateAvailable && dateEditButton2}
                    {isTimeAvailable && timeEditButton2}
                </>)}
        </View>
    )
}

export { ModalButtonsContainer }