var Command = require('./Command');
var S = require('string');
var e = require('child_process').execSync, child;

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
        e('composer require folklore/graphql');

        e('npm install apollo-client-preset react-apollo graphql-tag graphql --save');

        console.log('Add <ApolloProvider client={client}> as a wrapper to your App component');

        console.log('Read usage of Apollo Client here https://github.com/apollographql/react-apollo');

        this.insertTemplate('client/js/core/ApolloClient.js', reactTemplate, component);
    }

}

module.exports = ListAllCommands;