---
layout: post
title: 'Explain Instructions Setup'
date: 2020-07-07 1:00:00 -0800
---

# What Does the setupHostedInstructions Script Do?
The script sets up the bot instructions page to be pushed to the blank repo you just made. The page will be hosted on GitHub pages.

## Submodules
The `forumsBot` repo has two other repos inside it as Git submodules. When you clone `forumsBot` you also clone the submodules, the instructions and the controlPanel.

* **forumsBotControlPanel**
The [`forumsBotControlPanel`](https://github.com/jacobwicks/forumsBotControlPanel) is in the `controlPanel` folder in the `forumsBot` repo. The control panel shows instructions, the log viewer, and lets you control the actions of the bot and change its settings. It just runs locally.

* **forumsBotInstructions**
The [`forumsBotInstructions`](https://github.com/jacobwicks/forumsBotInstructions) duplicates the instructions display part of the control panel. It is designed to be public facing and cannot access any confidential information. The files for this submodule are in the `instructions` folder in the `forumsBot` repo. These files are put into your git repo and displayed on GitHub pages.

The `instructions` pull their information from a file called `instructions.json`. `instructions.json` is located in the `instructions/src` folder. `instructions.json` is generated from information from the `config.json` file in the root of `forumsBot` and also information pulled from the forums.

## GitHub Pages
The instructions setup script does the following steps:

1. It changes the `package.json` file in `instructions`. It changes the `homepage` property to the GitHub pages url of your repo.

2. It sets the remote origin url of `instructions` to your repo instead of the original `forumsBotInstructions` repo url. That means that when files are changed and the `instructions` submodule is pushed, the new files will be pushed to your repo.

3. It generates the instructions by reading the `config.json` file in the `forumsBot` root folder and by fetching information from the forums. It then saves the instructions as `instructions.json` in the `src` folder inside `instructions`. The instructions website will read from this `instructions.json` file and display the information.

4. It runs the npm `deploy` script in the `package.json` file in `instructions`. The `deploy` script is set to run a GitHub Pages command, `gh-pages -d build`. This command takes the files that make up the React project in `instructions` and turns them into static files that can be hosted on GitHub pages. Then it pushes the static files to a branch named `gh-pages` in your repo.

5. GitHub pages takes the files from the `gh-pages` branch of your repo and serves them as a website.

## Updating
The instructions on the GitHub pages website won't update automatically. But you can update them two ways.

* **Using the Control Panel**
Run the control panel. Click the 'save' icon in the TopBar of the controlPanel. This will update the `instructions.json` file in the `instructions` module and push the updates to the `gh-pages` branch of your repo. The changes will then be visible on the instructions website.

* **Using the Command Line**
Navigate to the root folder of the `forumsBot`. Run the npm script `uploadInstructions`.

```
$ npm run uploadInstructions
```
The script will update the `instructions.json` file in the `instructions` module and push the updates to the `gh-pages` branch of your repo. The changes will then be visible on the instructions website.
