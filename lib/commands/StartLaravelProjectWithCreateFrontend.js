const Command = require('./Command');
var e = require('child_process').execSync, child;

const CommandConfig = {
    commandKey: 'laravel:od',
    aliases: ['lr'],
    description: 'Starts a laravel project with OD presets',
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

        // composer global require "laravel/installer"
        e('laravel new ' + arg);
        e('composer require optimistdigital/laravel-create-frontend', {
            stdio: [0, 1, 2],
            cwd: process.cwd() + '/' + arg
        });

        e('create-frontend --force --overwrite', {
            stdio: [0, 1, 2],
            cwd: process.cwd() + '/' + arg
        });
    }
}

module.exports = StartLaravelProjectWithCreateFrontend;