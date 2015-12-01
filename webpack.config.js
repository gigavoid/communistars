var path = require('path')

module.exports = { 
    devtool: 'source-map',
    entry: ['./game/app.js', 'file?name=index.html!jade-html!./game/index.jade'],
    output: {
        path: path.join(__dirname, 'out'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.png$/, loader: 'file' },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}
