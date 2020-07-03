# Setting up SA Forums Posting Bot

1. Install Git
Install the version control software [Git](https://git-scm.com/downloads).

2. Install Node.js
Install [Node JavaScript](https://nodejs.org/en/download/).
The forums bot is written in JavaScript. Node is the program that lets you run it on your computer.
This will also install Node Package Manager (npm). NPM is used to download JavaScript software packages.

3. Clone the `forumsBot` repo
A "repo" (short for repository) is the address where files that make up a computer program are stored.
"Cloning" a repo is making a local copy of it on your computer.

The `forumsBot` repo is here: (https://github.com/jacobwicks/forumsBot)

Using the command line, clone it onto your computer.

```
$ git clone https://github.com/jacobwicks/forumsBot.git
```
This will create a new folder named `forumsBot`.

4. Run the "fullSetup" script
Go into the `forumsBot` folder and run the fullSetup script.

```
$ cd forumsBot
$ npm run fullSetup
```

5. Answer the setup prompts
Setup will prompt you for the SA Forums Account Username, SA Forums Account Password, the botName, and the local control panel password.

If you want the bot to work, you need to give it a working SA Forums Account Username and Password. If you don't care if it actually runs, you can skip these steps. You can change them later in the "Credentials" tab of the control panel.

If you want the bot to work, you need to give it a botName. The bot will look for posts that start with the botName in order to recognize when posters are giving the bot instructions. You can change the botName in the "Credentials" tab of the control panel.

The local control panel password is the password for the local control panel. The control panel is password protected. If you don't set a password you won't be able to login to the control panel.

After you answer these prompts, the setup script will start the bot and open the control panel in your web browser. 

6. Control panel will start automatically
When you aren't logged in the control panel will display instructions on how to use your bot. 
Click the 'cog' icon in the upper left and enter your control panel password to log in. 
Once you have logged in to the control panel you can edit the bot settings.

7. Use control panel to change settings and run the bot
The bot "watches" all threads that the SA account has bookmarked. 
Click 'Run Once' to scan all bookmarked threads.
The bot's activity will be displayed in the Log Viewer.

8. Enter Api Keys
The basic bot setup uses four different apis to take its actions.

 * catApi
 * deepai
 * Imgur
 * Twitter

Some actions depend on these apis. For example, the action that posts a picture of a cat won't work without the cat Api key. To get it working you'll have to sign up for the cat api and enter the key in the control panel. 

That's it! 


# Setting up instructions hosted on GitHub Pages
You'll need a GitHub account.

1. Go to [GitHub](www.github.com) and login.
2. Create a new repo.
    Don't initialize the repo with a Readme.
    Name the repo whatever you want. I suggest something like "instructions".
3. Using the command line, navigate to the folder where you installed the `forumsBot` repo.
4. Run the npm script "setupHostedInstructions". This is case sensitive.
```
$ npm run setupHostedInstructions
```

At the prompts, enter your github username and the repo name. The repo name is case sensitive. The script will run.

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

