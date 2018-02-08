var Logger = require('../core/Logger');

class Command {

    constructor() {

        this.logger = new Logger();

        this.commandKey = 'base:command';
        this.aliases = ['bc'];
        this.description = 'Base command';
        this.options = [];

    }

    isTriggeredBy(command) {
        return this.commandKey === command || this.aliases.includes(command);
    }

    setConfig(config) {

        for (let key in config) {
            if (config.hasOwnProperty(key)) {
                this[key] = config[key];
            }
        }
    }

    success(msg) {
        this.logger.success(msg);
    }

    error(msg) {
        this.logger.error(msg);
    }

    warning(msg) {
        this.logger.warning(msg);
    }

    info(msg) {
        this.logger.info(msg);
    }

    blue(msg) {
        this.logger.blue(msg);
    }

    displayInfo() {
        this.blue('Run: fg ' + (typeof this.commandKey !== 'undefined' ? this.commandKey : ''));
        this.info('Description: ' + this.description);
        this.info('Aliases: ' + this.aliases.join(' - '));
    }

    getKey() {
        return (typeof this.commandKey !== 'undefined' ? this.commandKey : '');
    }
}

module.exports = Command;

