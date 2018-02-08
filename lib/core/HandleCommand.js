const arguments = process.argv;

const commandKey = arguments[2];

const commandParams = arguments[3];

const commandArgs = arguments.slice(4);

const commands = require('./RegisterCommands');


for ( var i in commands) {

    var command = commands[i];

    if (command.commandKey === commandKey) {
        command.handle(commandParams, commandArgs);
        return;
    }
}

console.error('This command does not exist');