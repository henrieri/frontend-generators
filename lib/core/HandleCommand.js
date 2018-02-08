const arguments = process.argv;

const commandKey = arguments[2];

const commandParams = arguments[3];

const commandArgs = arguments.slice(4);

const commands = require('./RegisterCommands');

for ( let i in commands) {

    const CLASS = require('../commands/' + commands[i]);
    const command = new CLASS;

    if (command.isTriggeredBy(commandKey)) {
        command.handle(commandParams, commandArgs);

        return;
    }
}
