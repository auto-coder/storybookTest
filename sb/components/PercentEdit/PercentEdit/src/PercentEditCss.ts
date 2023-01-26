import { StyleSheet } from "react-native";
import { DANGER_COLOR, GHOST_COLOR, TEXT_COLOR_50, TEXT_COLOR_60 } from "@logo-rn/shared-utils/utils/constants/CSS_CONSTANTS";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6
},
helperText: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    color: DANGER_COLOR,
    marginBottom: 6
},
maxLength: {
    color: TEXT_COLOR_50,
    fontSize: 14,
    fontWeight: "500"
},
buttonContainer: {
    position: "absolute",
    marginTop: 36,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
},
readOnly: {
    backgroundColor: GHOST_COLOR,
        borderStyle: 'dashed',
        height: 44,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: TEXT_COLOR_60,
},
placeholder: {
    backgroundColor: GHOST_COLOR,
    position: "absolute",
    top: -8,
    color: TEXT_COLOR_60,
    fontSize: 13,
    fontFamily: "Inter",
    fontWeight: "500",
    left: 6,
    width: "auto",
    paddingHorizontal: 4
},
value: {
    fontSize: 14,
    margin: 8,
}

});

export default styles;