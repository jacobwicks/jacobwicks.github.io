---
layout: post
title: 'Setting up the SA Forums Posting Bot'
date: 2020-07-01 12:00:00 -0800
---
To set up the SA Forums posting bot you will need to install Git, install Node.js, clone the forumsBot repo, then run one of the forumsBot setup scripts. You can run a setup script that will automatically host instructions for your bot on a GitHub pages website, or you can run a setup script that will just set your bot up on your local machine.

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

Now you have a copy of the bot code on your computer. But you still need to install the software packages and provide some information to make it work.

# Option 1: Set up the bot and **automatically host a copy of your bot's instructions** on publically viewable github pages website
<details>
<summary markdown='span'>Setup the bot and host instructions on GitHub Pages</summary>

This will set up your bot locally and automatically set up a copy of your bots instructions on GitHub pages. Your bot can link to these instructions every time it posts, so people will know how to use your bot.

You'll need a GitHub account.

1. Go to [GitHub](www.github.com) and login.

2. Create a new repo.

    Don't initialize the repo with a Readme.

    Name the repo whatever you want. 
    
    I suggest something like "instructions".

3. Using the command line, navigate to the root folder of the `forumsBot` repo.

    You will need 6 pieces of information to get the bot fully running
    * SA Forums Account Username
    * SA Forums Account Password
    * The botName: the name you want people to call the bot when they give it instructions
    * A password for your locally running bot control panel
    * Your GitHub Username
    * The name of the repo you just created to host the instructions 
<br/>
<br/>
4. Run the npm script `fullSetupWithHostedInstructions`. This is case sensitive.

    ```
    $ npm run fullSetupWithHostedInstructions
    ```
5. Answer the forumsBot setup prompts

    Setup will prompt you for the SA Forums Account Username, SA Forums Account Password, the botName, and the local control panel password.

    * **SA Account Username and Password**

    If you want the bot to work, you need to give it a working SA Forums Account Username and Password. If you don't care if it actually runs, you can skip these steps. You can change them later in the "Credentials" tab of the control panel.

    * **botName**

    If you want the bot to work, you need to give it a botName. The bot will look for posts that start with the botName in order to recognize when posters are giving the bot instructions. You can change the botName in the "Credentials" tab of the control panel.

    * **Control Panel Password** *required*

    The local control panel password is the password for the local control panel. The control panel is password protected. If you don't set a password you won't be able to login to the control panel.

6. Answer the Instructions setup prompts

    At the prompts, enter your github username and the repo name. 
    Enter just the repo name, not the full repo url. 
    The repo name is case sensitive. 
    
    After you have answered the prompts, the instructions setup script will run.

    The instructions setup will generate an instructions website based on the settings of your bot. This website will be hosted on GitHub pages using the repo that you created. When you make changes to how your bot works, you can use the control panel or the command line to update the instructions website.  

    [Curious about how the instructions script works?]({% post_url 2020-07-07-forums-bot-explain-instructions-setup-script %})

7. Control Panel Will Start Automatically

    After the script has finished installing, it will start the bot and the control panel running. The control panel will open automatically in a web browser.
    
    When you aren't logged in the control panel will display instructions on how to use your bot. 

8. Login to Control Panel

    Click the 'cog' icon in the upper left and enter your control panel password to log in. 

    Once you have logged in to the control panel you can use the bot controls and edit the bot settings.

9. Use control panel to change settings and run the bot

    The bot "watches" all threads that the SA account has bookmarked. 

    Click 'Run Once' to scan all bookmarked threads.
    
    The bot's activity will be displayed in the Log Viewer.

## Updating Instructions
The instructions on the GitHub pages website won't update automatically. But you can update them two ways.

* **Using the Control Panel**

Run the control panel. Click the 'save' icon in the TopBar of the controlPanel. This will update the `instructions.json` file in the `instructions` module and push the updates to the `gh-pages` branch of your repo. The changes will then be visible on the instructions website.

* **Using the Command Line**

Navigate to the root folder of the `forumsBot`. Run the npm script `uploadInstructions`.

```
$ npm run uploadInstructions
```
The script will update the `instructions.json` file in the `instructions` module and push the updates to the `gh-pages` branch of your repo. The changes will then be visible on the instructions website.

# You're (mostly) Done

That's it! Kind of.

The bot is now up and running, but a lot of the actions the bot can take won't work until you **add the API keys** that they depend on. 

For example, your bot can't post a tweet until you add the Twitter API key. 

Your bot also can't host images on Imgur until you add the Imgur API Key. 

[How to add API Keys to your bot]({% post_url 2020-07-07-forums-bot-api-keys %})

</details>
<br/>

# Option 2: Just get the bot working and **don't bother hosting instructions online**. 
<details>
<summary markdown='span'>Setup Bot (No Online Instructions)</summary>

You will need 4 pieces of information to get the bot fully running
* SA Forums Account Username
* SA Forums Account Password
* The botName: the name you want people to call the bot when they give it instructions
* A password for your locally running bot control panel

1. Run the `fullSetup` script

    Go into the `forumsBot` folder and run the fullSetup script.

    ```
    $ cd forumsBot
    $ npm run fullSetup
    ```

2. Answer the setup prompts

    Setup will prompt you for the SA Forums Account Username, SA Forums Account Password, the botName, and the local control panel password.

    * **SA Account Username and Password**

    If you want the bot to work, you need to give it a working SA Forums Account Username and Password. If you don't care if it actually runs, you can skip these steps. You can change them later in the "Credentials" tab of the control panel.

    * **botName**

    If you want the bot to work, you need to give it a botName. The bot will look for posts that start with the botName in order to recognize when posters are giving the bot instructions. You can change the botName in the "Credentials" tab of the control panel.

    * **Control Panel Password** *required*

    The local control panel password is the password for the local control panel. The control panel is password protected. If you don't set a password you won't be able to login to the control panel.

    After you answer these prompts, the setup script will start the bot and open the control panel in your web browser. 

3. Control Panel Will Start Automatically

    After the script has finished installing, it will start the bot and the control panel running. The control panel will open automatically in a web browser.
    
    When you aren't logged in the control panel will display instructions on how to use your bot. 

4. Login to Control Panel

    Click the 'cog' icon in the upper left and enter your control panel password to log in. 

    Once you have logged in to the control panel you can use the bot controls and edit the bot settings.

5. Use control panel to change settings and run the bot

    The bot "watches" all threads that the SA account has bookmarked. 

    Click 'Run Once' to scan all bookmarked threads.
    
    The bot's activity will be displayed in the Log Viewer.

# You're (mostly) Done

That's it! Kind of.

The bot is now up and running, but a lot of the actions the bot can take won't work until you **add the API keys** that they depend on. 

For example, your bot can't post a tweet until you add the Twitter API key. 

Your bot also can't host images on Imgur until you add the Imgur API Key. 

[How to add API Keys to your bot]({% post_url 2020-07-07-forums-bot-api-keys %})

</details>
<br/>
<br/>
<br/>

# Important Bot Commands

While the bot is running, hit `ctrl+c` in the command line window to stop it.

```
$ npm run bot
```
This command starts a script that uses concurrently to run both the bot API server and the control panel at the same time.

```
$ ts-node-dev server
```
This command runs just the bot API server.

```
$ cd controlPanel
$ npm start
```
These two commands will start the control panel running on its own. If the bot API server is running, it will display information about the bot. If the bot API server is not running it will be mostly blank.

```
$ cd instructions
$ npm start
```
These two commands will start a local copy of the hosted instructions webpage running.

```
$ npm run uploadInstructions
```
This command will deploy the current version of the instructions to the GitHub pages website.
