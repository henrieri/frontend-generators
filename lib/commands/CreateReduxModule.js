var Command = require('./Command');
var commands = require('../core/RegisterCommands');

const CommandConfig = {
    commandKey: 'redux',
    aliases: ['rdx'],
    description: 'Lists all commands'
};

class ListAllCommands extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(params) {

        const replacements = {
            "/models": '',
            MODELS: params.toUpperCase(),
            models: '',
            Models: '',
        };

        this.createTemplate('client/redux/modules/test.js', 'redux-module.js', replacements);
    }

}

module.exports = ListAllCommands;