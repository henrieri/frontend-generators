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
    }

}

module.exports = ListAllCommands;