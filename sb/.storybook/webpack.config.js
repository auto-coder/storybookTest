const path = require('path')

module.exports = async ({ config, mode }) => {
    config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../node_modules/'),
        options: {
            presets: [
                "@babel/env",
                "@babel/preset-react",
                "module:metro-react-native-babel-preset",
            ],
            plugins: [
                "react-native-web",
                "@babel/plugin-proposal-class-properties"
            ]
        }
    })

    config.module.rules.push({
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(__dirname, '../node_modules/react-native-vector-icons/MaterialCommunityIcons')
    })

    config.resolve.alias = {
        'react-native': 'react-native-web'
    }

    return config
}