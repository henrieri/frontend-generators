const Command = require('./Command');

const CommandConfig = {
    commandKey: 'laravel:react',
    aliases: [],
    description: 'Starts a laravel react project',
    options: [
        {
            option: '--help',
            description: 'List options of this command'
        }
    ]
};

class StartLaravelProjectWithCreateFrontend extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(arg, options) {

    }
}

module.exports = StartLaravelProjectWithCreateFrontend;