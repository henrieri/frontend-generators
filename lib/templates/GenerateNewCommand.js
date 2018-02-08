const Command = require('./Command');

const CommandConfig = {
    commandKey: 'cmd',
    aliases: [],
    description: 'This is description',
    options: [
        {
            option: '--help',
            description: 'List options of this command'
        }
    ]
};

class %%ClassName%% extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(arg, options) {

    }
}


module.exports = %%ClassName%%;