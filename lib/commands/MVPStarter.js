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

class MVPStarter extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(arg, options) {

        this.exec('frontend-generators laravel:od ' + arg);

        this.exec('cd ' + arg + ' && graphql:init');
    }
}


module.exports = MVPStarter;