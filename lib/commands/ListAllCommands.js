var Command = require('./Command');
var commands = require('../core/RegisterCommands');
var Table = require('cli-table');

const CommandConfig = {
    commandKey: undefined,
    aliases: ['help', 'list'],
    description: 'Lists all commands'
};

class ListAllCommands extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }
    
    handle() {
        this.success('List of all commands');

        var table = new Table({
           head: ['Command', 'Aliases', 'Options', 'Description']
        });

        for(var i in commands) {
            const CLASS = require('../commands/' + commands[i]);
            const command = new CLASS;

            table.push([
                command.getKey(), command.aliases.join(','), command.options.reduce((a, c) => a + c.option, ''), command.description
            ]);

        }

        console.log(table.toString());
    }

}

module.exports = ListAllCommands;