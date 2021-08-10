## Inroduction
Welcome to Central, automating daily developer workflow. These docs will cover in detail how to use Central's CLI and web search querying tools.

## What is central?
Central is a CLI tool that aims at automating daily developer workflow by bringing the power of the browser to your terminal. It simplifies the daily workflow of projects by automating tasks that are repetitive such as git workflows and searching.

## How does it work?
Central comes packaged as an NPM module that can be installed globally and will help in automating workflows in the current project directory. Our robust commands cuts down a lot of repetitive git actions like committing, setting up remotes, initializing preset gitignores, simplifying repetitive searches, etc.

## Installation
Walkthrough of the installation procedure.

### Pre-requisites
- NodeJS installation (v12.0 or above).
    
-   GitHub account.


### Installation

    npm i -g cntrl@latest
   
   To verify your installation:
   

    cntrl --version     or     cntrl -V
   
   To get a list of all the available commands:
   

    cntrl --help    or     cntrl -h

## Usage
This is a comprehensive list of all the supported commands

### init

    cntrl init

Initialises a repo locally, creates a corresponding repo n GitHub, sets the remote of the current repo to the SSH URL of the repository on GitHub, and pushes an initial commit.

Executing this command throws the terminal into a REPL, where the user is prompted with a couple of questions regarding the repository.


#### Pre-requisites:
-   A one-time GitHub access token of the user.



### ignore

    cntrl ig

Generates a preset git-ignore for a language or modifies an existing one.

Upon executing this command, the user is given a choice of language (viz. dart, go, python, etc.) for which the CLI will generate a preset git-ignore file and add it to the root directory of the current project folder.

### fast-commit

    cntrl fci <message>

Performs a fast commit with a message.

Fast commit will help the user by adding all the files outside the git-ignore and the user will be able to give a message.

### rem-commit

    cntrl rc <branch-name>

Check the commits that need to be pushed on the current branch to another branch.

Check all the commits that are committed locally but are not pushed to GitHub on the current working branch.

### fast-push

    cntrl fp <message>

Perform a fast commit and a push on your current branch.

This will perform a fast-commit and then push the code to the current working branch.

### search
```
cntrl s
```

Search various forums with a single line query.

With this command, the user will be able to get search results from YouTube, StackOverflow, and google in the terminal. The user can then click on the link and get redirected to the specific result without having to skim through different browser tabs.

### StackOverflow

    cntrl st

Search on StackOverflow.

The user can specifically search for answers on StackOverflow.

### YouTube

    cntrl yt

Search on YouTube.

The user can specifically search for answers on YouTube.

### Google

    cntrl g

Search Google.

The user can specifically search for answers on Google.
