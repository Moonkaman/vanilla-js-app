const path = require("path");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './public/'),
        port: 9000
    }
}