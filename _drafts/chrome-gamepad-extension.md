---
layout: post
title: 'A Browser Extension for using reddit with a gamepad'
---

Goal of the project is to make a browser extension for chrome that lets the user surf reddit with a gamepad.
It should

-   navigate between posts
-   enter and exit subreddits
-   upvote and downvote posts
-   go to post comments
-   upvote and downvote post comments
-   reply to posts
-   reply to comments
-   display an animated video game character
-   read gamepad inputs into a buffer like a fighting game
-   have a config popup that lets you customize inputs and combos with actions
-   let you select between 3 characters

*   code should be comprehensively tested

The parts of this project

-   the coding environment
    https://dev.to/room_js/another-typescript-starter-for-chrome-extensions-2g3p
    https://github.com/room-js/chrome-extension-ts-starter

-   testing
    jest
    cypress

-   reddit interactions
    navigating posts
    navigating comments
    interacting with posts - upvote, downvote, reply, open link
    interacting with comments - upvote, downvote, reply

-   the animated character
    https://github.com/Tatayecorp/demo_mugenJS
    http://www.elecbyte.com/mugendocs-11b1/mugen.html
    Fighter factory

-   the input loop

-   the control panel

{% include lineCommentsMobile.html %}

{% include formatting.html %}
