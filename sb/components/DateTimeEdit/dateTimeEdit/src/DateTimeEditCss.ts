import { StyleSheet } from "react-native";
import { DANGER_COLOR, FULL_HEIGHT, FULL_WIDTH, GHOST_COLOR, TEXT_COLOR, TEXT_COLOR_50 } from "@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS";

const styles = StyleSheet.create({
    datepicker: {
        marginHorizontal: "1%",
    },
    datepickerButton: {
        height: 44,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginHorizontal: "2%",
        borderRadius: 4,
    },
    title: {
        color: TEXT_COLOR,
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: 14
    },
    placeholder: {
        color: TEXT_COLOR_50,
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: 14
    },
    captionText: {
        fontSize: 12,
        fontFamily: "Inter",
        fontWeight: "400",
        color: TEXT_COLOR_50
    },

    row: {
        display: "flex",
        flexDirection: "row",
        marginTop: 24,
    },
    modal: {
        width: FULL_WIDTH,
        height: FULL_HEIGHT,
        backgroundColor: GHOST_COLOR,
        justifyContent: "flex-start"
    },
    helperText: {
        fontFamily: "Inter",
        fontWeight: "400",
        fontSize: 12,
        color: DANGER_COLOR,
        marginBottom: 6,
        marginLeft: 8
    },

});

export default styles;