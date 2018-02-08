var Logger = require('../core/Logger');
var S = require('string');
var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');
var clc = require('cli-color');

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

    createTemplate(filePath, template, replacements) {

        fs.readFile(path.resolve(__dirname, '../templates/' + template), 'utf8', function (err, contents) {

            for (var prop in replacements) {

                var replace = prop;
                var re = new RegExp(replace, "g");

                contents = contents.replace(re, replacements[prop]);
            }

            fse.outputFile(filePath, contents, err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Created: ' + clc.green(filePath));
                }
            });

        });
    };
}

module.exports = Command;

