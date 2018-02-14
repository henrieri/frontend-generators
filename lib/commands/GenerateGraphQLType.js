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
            this.replacements('        \'User\' => \'App\\GraphQL\\Type\\UserType\',', variables),
            '\'types\' => [',
            1
        );

        this.writeNewLineAfter(
            'app/GraphQL/schema.php',
            this.replacements('        \'users\' => \'App\\GraphQL\\Query\\UsersQuery\',', {
                Users: variables.camelizedMultiple,
                User: variables.camelizedSingular,
                users: variables.dasherizedMultiple
            }),
            '\'query\' => [',
            1
        );

        this.createTemplate('app/GraphQL/Types' + variables.path + '/' + variables.camelizedSingular + '.php',
            'laravel/GraphQLType.stub',
            {
                Users: variables.camelizedMultiple,
                User: variables.camelizedSingular,
                users: variables.dasherizedMultiple
            });

        this.createTemplate('app/GraphQL/Query' + variables.path + '/' + variables.camelizedMultiple + '.php',
            'laravel/GraphQLQuery.stub',
            {
                Users: variables.camelizedMultiple,
                User: variables.camelizedSingular,
                users: variables.dasherizedMultiple
            });

        this.exec('frontend-generators react:redux ' + variables.dasherizedMultiple);

        console.log('executed');
    }
}


module.exports = GenerateGraphQLType;