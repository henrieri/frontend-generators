const Logger = require('../core/Logger');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const Config = require('../core/Config');
const clc = require('cli-color');
const Table = require('cli-table');
const e = require('child_process').execSync;
const S = require('string');

class Command {

    constructor() {

        this.config = new Config().getConfig();
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

    hasOption(opt) {
        if (typeof this.options === 'undefined') {
            return false;
        }

        return this.options.map(o => o.option).includes(opt);
    }

    run(...args) {

        this.userCommand = args[0];
        this.userOptions = args[1];

        if (this.hasOption('--help') && this.userOptions.includes('--help')) {
            const table = new Table({
                head: ['Option', 'Description']
            });

            const options = this.options.forEach(o => {
                table.push([o.option, o.description]);
            });


            console.log(table.toString());

            return;
        }

        this.handle(...args);

    }

    handle(...args) {
        this.warn('Please implement handle function for this command');
    }

    exec(cmd) {
        return e(cmd, {
            stdio: [0, 1, 2],
            cwd: process.cwd()
        })
    }

    writeNewLineAfter(path, content, line, linesAfter = 1) {

        const fileLines = fs.readFileSync(path, {
            encoding: 'utf-8'
        }).split('\n');

        const matchingLineIndex = fileLines.findIndex(fileLine => fileLine.includes(line));

        fileLines.splice(matchingLineIndex + linesAfter, 0, content);

        fs.writeFileSync(path, fileLines.join('\n'));
    }

    createVariables(arg) {

        const splittedPath = arg.split('/');

        const component = {};

        component.name = splittedPath[splittedPath.length - 1]; // ComponentName

        component.camelized = component.name; // ComponentName

        component.camelizedSingular = component.name;

        component.camelizedMultiple = component.name + 's';

        component.dasherized = S(component.name).dasherize().s.replace('-', ''); // component-name

        component.dasherizedMultiple = component.dasherized + 's';

        component.sassFile = '_' + S(component.name).dasherize().s.replace('-', '');

        component.path = splittedPath.slice(0, -1).join('/');

        return component;
    }

    replacements(contents, component) {

        for (let prop in component) {

            const re = new RegExp(prop, "g");

            contents = contents.replace(re, component[prop]);
        }
        return contents;
    }
}

module.exports = Command;

