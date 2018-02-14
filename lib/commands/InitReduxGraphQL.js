var Command = require('./Command');
var S = require('string');

const CommandConfig = {
    commandKey: 'full-stack:graphql',
    aliases: ['graphql'],
    description: 'Installs GraphQL for Laravel. ApolloClient for redux'
};

class ListAllCommands extends Command {

    constructor() {
        super();

        this.setConfig(CommandConfig);
    }

    handle(params) {


        this.exec('composer require folklore/graphql');

        this.exec('npm install apollo-client-preset react-apollo graphql-tag graphql --save');

        this.info('Add <ApolloProvider client={client}> as a wrapper to your App component');

        this.info('Read usage of Apollo Client here https://github.com/apollographql/react-apollo');

        this.createTemplate('client/js/core/ApolloClient.js', 'setups/react/apollo/ApolloClient.stub');

        this.exec('php artisan vendor:publish --provider="Folklore\\GraphQL\\ServiceProvider"');

        this.writeNewLineAfter(
            'config/app.php',
            '        Folklore\\GraphQL\\ServiceProvider::class,',
            'Package Service Providers',
            2
        );

        this.writeNewLineAfter(
            'config/app.php',
            '        \'GraphQL\' => Folklore\\GraphQL\\Support\\Facades\\GraphQL::class,',
            '    \'aliases\' => [',
            2
        );

        this.writeNewLineAfter(
            'config/app.php',
            '        \'GraphQL\' => Folklore\\GraphQL\\Support\\Facades\\GraphQL::class,',
            '    \'aliases\' => [',
            2
        );

        this.createTemplate('app/GraphQL/schema.php', 'setups/react/apollo/GraphQL.stub');

        this.writeNewLineAfter(
            'app/Providers/AppServiceProvider.php',
            '        require base_path(\'app/GraphQL/schema.php\');',
            'boot()',
            2
        );
    }

}

module.exports = ListAllCommands;