const path = require("path");
let commands = [];

if (false) {

    commands = [
        'ListAllCommands',
        'ReactComponent',
        'CreateReduxModule',
        'GenerateNewCommand'
    ];
}
else {
    var fs = require('fs');
    var files = fs.readdirSync(path.resolve(__dirname, '../commands'));

    commands = files.map(file => file.replace('.js', ''));
}

module.exports = commands;