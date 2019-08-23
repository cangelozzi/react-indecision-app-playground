// path node modue to join diectories paths
const path = require('path');

// entry point for the app (app.js) ---> Output (bundle.js)
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    }
};