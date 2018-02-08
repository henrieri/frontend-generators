const arguments = process.argv;

const commandArguments = arguments[2];

const commandKey = arguments[2];

const commandParams = arguments[3];

const commands = require('./RegisterCommands');

for ( var i in commands) {

    var command = commands[i];

    if (command.commandKey === commandKey) {
        command.handle(commandParams);
        return;
    }
}

console.error('This command does not exist');