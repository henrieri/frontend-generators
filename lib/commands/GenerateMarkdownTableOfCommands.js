const fs = require('fs');
const fse = require('fs-extra');

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

        let markdown = table(
            [
                ['Command', 'Aliases', 'Options', 'Description']

            ].concat(
                commandsTable.reverse()
            )
        );

        this.putContents('docs/02_COMMANDS.MD', markdown);

        const mergedContents = this.getMerged(this.filesInDirectory('docs'))

        this.success('Markdown created');

    }

    putContents(file, contents) {
        fse.outputFile(file, contents);
    }

    filesInDirectory(dir) {
        return fs.readdirSync(dir);
    }

    getMerged(files) {
        return files.reduce((a,c) => a + c, '');
    }

}


module.exports = GenerateMarkdownTableOfCommands;