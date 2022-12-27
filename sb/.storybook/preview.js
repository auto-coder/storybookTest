export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


// ==
import MaterialCommunityIcons from '../node_modules/react-native-vector-icons/MaterialCommunityIcons'
import iconFont from '../node_modules/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'

const iconFontStyle = `
  @font-face {
    src: url(${iconFont});
    font-family: MaterialCommunityIcons;
  }
`

const style = document.createElement('style')
style.type = 'text/css'
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyle
} else {
  style.appendChild(document.createTextNode(iconFontStyle))
}
document.head.appendChild(style)
//