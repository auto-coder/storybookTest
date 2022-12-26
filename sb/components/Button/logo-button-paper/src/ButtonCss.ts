import { StyleSheet } from "react-native";
import { PRIMARY_BACKGROUND_COLOR, TEXT_COLOR_70 } from "@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS"

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        marginVertical: 2,
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

    },
    text: {
        color: TEXT_COLOR_70,
    },
    image: {
    },
    icon: {

    }
});

export default styles;