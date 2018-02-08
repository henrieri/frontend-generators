const Command = require('./Command');
var table = require('markdown-table');

const CommandConfig = {
    commandKey: 'markdown',
    aliases: [],
    description: 'This is description',
    options: [
        {
            option: '--help',
            description: 'List options of this command'
        }
    ]
};

class GenerateMarkdownTableOfCommands extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(arg, options) {
        this.success('List of all commands');

        const commands = require('../core/RegisterCommands');

        const commandsTable = commands.map(commandName => {

            const CLASS = new require('./' + commandName);

            const command = new CLASS;

            return [
                command.getKey(), command.aliases.join(','), command.options.reduce((a, c) => a + c.option, ''), command.description
            ]
        });

        console.log(
            commandsTable);

        console.log(table(
            [
                ['Command', 'Aliases', 'Options', 'Description']

            ].concat(
                commandsTable.reverse()
            )
        ));

        this.success('Markdown created');

    }
}


module.exports = GenerateMarkdownTableOfCommands;