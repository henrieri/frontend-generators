const Command = require('./Command');

const CommandConfig = {
    commandKey: 'graphql:make:object',
    aliases: [],
    description: 'Creates everything for a graphql object',
    options: [

    ]
};

class GenerateGraphQLType extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(arg, options) {

        const variables = this.createVariables(arg);

        this.writeNewLineAfter(
            'app/GraphQL/schema.php',
            '        \'User\' => \'App\\GraphQL\\Type\\UserType\''.replace('User', variables.camelized),
            '\'types\' => [',
            1
        );
    }
}


module.exports = GenerateGraphQLType;