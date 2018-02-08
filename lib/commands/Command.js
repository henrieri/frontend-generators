class Command {

    constructor() {

    }

    isTriggeredBy(command) {

        return this.commandKey === command || this.aliases.includes(command);

    }
}

module.exports = Command;

