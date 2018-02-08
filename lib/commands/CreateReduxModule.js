var Command = require('./Command');
var commands = require('../core/RegisterCommands');
var S = require('string');

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

        if (!params.endsWith('s')) {
            params += 's';
        }

        const camelCase = S(params).camelize();
        const singularCamelCase = camelCase.slice(0, -1);

        const replacements = {
            "%models%": S(camelCase).dasherize(),
            MODELS: camelCase.underscore().toUpperCase(),
            models: camelCase,
            Models: camelCase.slice(0, 1).capitalize() + camelCase.slice(1),
            MODEL: singularCamelCase.underscore().toUpperCase(),
            model: singularCamelCase,
            Model: singularCamelCase.slice(0, 1).capitalize() + camelCase.slice(1),
        };

        this.createTemplate('client/redux/modules/' + camelCase + '.js', 'redux-module.js', replacements);
    }

}

module.exports = ListAllCommands;