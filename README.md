# JunkOS CLI

## Description

Ever wanted a self contained CLI, that could allow you to create your own OS?
JunkOS CLI is for you!
It contains the minimal amount of commands to get started, and... WRITE YOUR OWN COMMANDS!

How is it possible? Well, you can edit modules, and reload them into the server, in order to reuse them.

Insane? Not quite. Clever? Yep. Junky? Completely.

## Installation

```sh
npm install
node server.js
```

Head to localhost:3000, and enjoy the JunkOS CLI!

## How to use

When the page loads, if you are connected, you will see an input.
This is your console. From there, type:

```
ls
```

And press enter. You will see the available commands.
As this is a minimalistic and Junk CLI, you will have to make your own help module!

Here is a description of the commands provided:

* ls -> lists all the commands
* touch <command> -> creates a new command
* edit <command> -> switches to edit mode for the command. Once you are done, type "save" or press Ctrl-S to save
* save -> In editor mode, saves the file
* reload -> checks and reloads all the commands into the CLI. Required to update the environment

From there, you are on your own. You can start by programming a new command, or by editing existing ones. Good luck!

