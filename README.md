

# frontend-generators

## Installing

```npm i -g github:henrieri/frontend-generators```

## Example

Example of usage - In your project root dir where 'client' is subfolder run:

```frontend-generators react:component components/ThisIsMyNewComponent```

To write as less as possible, paste this to your terminal: 

```echo "alias fg='frontend-generators'" >>~/.bash_profile && . ~/.bash_profile```

Or if you are on linux 

```echo "alias fg='frontend-generators'" >>~/.bashrc && . ~/.bashrc```

## Commands

You can view all commands by running
```frontend-generators```

| Command             | Aliases      | Options | Description                                                                   |
| ------------------- | ------------ | ------- | ----------------------------------------------------------------------------- |
|                     | help,list    |         | Lists all commands                                                            |
| laravel:od          | lr           | --help  | Starts a laravel project with OD presets                                      |
| react:component     | rc           | --redux | Creates a react, scss component and adds scss to scss entry file as an import |
| cmd                 |              | --help  | This is description                                                           |
| full-stack:graphql  | graphql:init |         | Installs GraphQL for Laravel. ApolloClient for redux                          |
| cmd                 |              | --help  | Generates a new command                                                       |
| markdown            |              | --help  | Generates markdown docs                                                       |
| graphql:make:object |              |         | Creates everything for a graphql object                                       |
| react:redux         | rdx          |         | Lists all commands                                                            |
| base:command        | bc           |         | Base command                                                                  |