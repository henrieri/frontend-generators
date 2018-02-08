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

class GenerateNewCommand extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(arg, options) {

        const command = arg;

        this.createTemplate('lib/commands/' + command + '.js', 'GenerateNewCommand.js', {
           '%%ClassName%%': command
        });
    }
}

module.exports = GenerateNewCommand;