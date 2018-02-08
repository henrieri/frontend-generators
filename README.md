

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

| Command         | Aliases   | Options | Description                                                                   |
| --------------- | --------- | ------- | ----------------------------------------------------------------------------- |
|                 | help,list |         | Lists all commands                                                            |
| laravel:react   |           | --help  | Starts a laravel react project                                                |
| react:component | rc        | --redux | Creates a react, scss component and adds scss to scss entry file as an import |
| cmd             |           | --help  | Generates a new command                                                       |
| markdown        |           | --help  | Generates markdown docs                                                       |
| react:redux     | rdx       |         | Lists all commands                                                            |
| base:command    | bc        |         | Base command                                                                  |