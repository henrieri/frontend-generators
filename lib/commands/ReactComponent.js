var S = require('string');
var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');
var clc = require('cli-color');
const args = process.argv.slice(2);
const SUBTYPE = args[1];
const COMPONENT_NAME = args[2];
console.log(args);
    
const COMPONENTS_PATH = `./assets/styles/${SUBTYPE}/`;
const MAIN_FILE = './assets/styles/main.scss';
const NEW_FILE_LOCATION = `${COMPONENTS_PATH}_${COMPONENT_NAME}.scss`;

module.exports = {
    commandKey: 'react:component',

    handle: function (params) {

        const splittedPath = params.split('/');

        const component = {};

        const BASE_PATH = 'client/';

        component.name = splittedPath[splittedPath.length - 1]; // ComponentName

        component.camelized = component.name; // ComponentName

        component.dasherized = S(component.name).dasherize().s.replace('-', ''); // component-name

        component.sassFile = '_' + S(component.name).dasherize().s.replace('-', ''); // _component-name.scss

        // components-component-name
        component.className = splittedPath.slice(0, -1).reduce(function (acc, cv) {

            return acc + cv + '-';
        }, '').replace('-', '__') + component.dasherized;

        component.path = splittedPath.slice(0, -1).join('/');

        component.scssFile = BASE_PATH + 'scss/' + component.path + '/' + component.sassFile + '.scss'

        component.jsFile = BASE_PATH + 'js/' + component.path + '/' + component.camelized + '.js';

        component.sassImportLine = '@import \'' + component.path.replace('_', '') + '/' + component.sassFile.replace('_', '') + '\';'.replace('.scss', '');

        this.createReactComponent(component);

        this.createSassComponent(component);

        this.addSassToImports(component);

    },

    getLegacyNewLines: function(lines, component) {
        var startLineIndex = false;
        var endLineIndex = false;

        for (let index in lines) {

            const line = lines[index];


            if (startLineIndex) {

                if (line.includes('@import')) {

                    if (!line.includes('@import ' + component.path.split('/')[0])) {
                        endLineIndex = index;
                    }
                }
            }

            let include = '@import \'' + component.path.split('/')[0];

            if (line.includes(include) && !startLineIndex) {
                startLineIndex = index;
                endLineIndex = index;
            }
        }

        if (!startLineIndex) {
            lines.push(component.sassImportLine);

            fse.outputFile(sassEntryFile, lines.join('\n'));

            return;
        }

        startLineIndex++;
        endLineIndex++;


        let relevantLines = lines.slice(startLineIndex - 1, endLineIndex - 2);

        relevantLines.push(component.sassImportLine);

        relevantLines.sort(function (a, b) {
            if (a < b) return -1;
            else if (a > b) return 1;
            return 0;
        });

        relevantLines.push('');
        relevantLines.reverse();

        lines.splice(startLineIndex - 1, relevantLines.length - 1);

        relevantLines.forEach(function (line) {
            lines.splice(startLineIndex - 1, 0, line);
        });

        return lines;
    },

    getNewLines: function (lines, newLine) {
        let lastComponentIndex;

        // Loop through the lines backwards
        for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];

            // If the line is a valid component partial import
            if (line.includes(newLine.split('/').slice(0, newLine.split('/').length - 1).join('/'))) {
                // If our new line comes after the current one in the alphabet

                if (newLine > line) {
                        
                    return [].concat(lines.slice(0, i + 1), newLine, lines.slice(i + 1, lines.length));
                }
                lastComponentIndex = i;
            }
        }

        // If we didn't find any match that is alphabetically before our current one, but we found at least some valid import
        if (lastComponentIndex) {

            return [].concat(lines.slice(0, lastComponentIndex), newLine, lines.slice(lastComponentIndex, lines.length));
        }
        // If we found no valid imports, append the new line to the end

        return lines.concat([newLine, '']);
    },

    logRed(data) {
        console.log(clc.red(data));
    },

    createReactComponent: function (component) {

        this.insertTemplate(component.jsFile, 'ReactComponent.js', component);
    },

    createSassComponent: function (component) {

        this.insertTemplate(component.scssFile, '_sass-component.scss', component);
    },

    addSassToImports: function(component) {

        const self = this;

        const sassEntryFile = 'client/scss/entry.scss';

        fs.readFile(sassEntryFile, 'utf8', function (err, contents) {

            // lines = self.getLegacyNewLines(contents.split('\n'), component);

            var lines = self.getNewLines(contents.split('\n'), component.sassImportLine);

            fse.outputFile(sassEntryFile, lines.join('\n'));

        });

    },

    insertTemplate: function (filePath, template, component) {

        fs.readFile(path.resolve(__dirname, '../templates/' + template), 'utf8', function (err, contents) {

            for (var prop in component) {

                var replace = "%%" + prop + "%%";
                var re = new RegExp(replace, "g");

                contents = contents.replace(re, component[prop]);
            }

            fse.outputFile(filePath, contents, err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Created: ' + clc.green(filePath));
                }
            });

        });
    },
};