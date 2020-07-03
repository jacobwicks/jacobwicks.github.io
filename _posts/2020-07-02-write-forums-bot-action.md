## Write A Custom Action for the Forums Posting Bot

Writing your own action for the forums posting bot is fairly simple. The bot uses [glob](https://www.npmjs.com/package/glob) to look through folders to find the actions, so you don't need to modify any other files. You just need to create a new folder for your action with the action code in index.ts.

# Folder Location
The action folders are in `/bot/services/actions`. Each folder contains the `index.ts` file. The `index.ts` file exports the action function, the array of triggers, and the name string. Each folder may also contain markdown instructions and/or examples.

# Optional Markdown
If you want to you can write instructions in a markdown file instructions.md. The instructions will be displayed on the instructions page for the bot when your action is active.

If your action is triggered by regular expressions you can write examples of how to trigger the regular expressions in a markdown file named example.md. 

## Example Action: Tayne
![](https://i.imgur.com/5oCbDFL.gif)

Tayne is a dancing character from a comedy sketch. This action posts a gif of his trademark 'hat wobble' move.

## Action Code
Here we have index.ts from the action `Tayne`. 

{% highlight ts linenos%}
blockName: postTayne
import makePost from '../../MakePost';
import log from '../../log';
import { RespondToPostProps } from '../../../../types';
import { sendLogEvent } from '../../../../services/Events';

const name = 'Tayne';

const triggers = ['tayne', /hat wobble/gi];

//the tayne hat wobble
const postTayne = async ({ postId, threadId }: RespondToPostProps) => {
    sendLogEvent('posting tayne!');

    //tayne hat wobble
    const hatWobble = 'https://i.imgur.com/5oCbDFL.gif';

    //generate the postcontent string by wrapping the hat wobble url in bbCode img tags
    const content = `[img]${hatWobble}[/img]`;

    try {
        await makePost({
            content,
            postId,
            threadId,
        });
    } catch (err) {
        //if something goes wrong, then log it!
        log('postTayne failed', { postId, threadId }, err);
        sendLogEvent({ error: 'Failed to post Tayne' });
    }
};

export { postTayne as action, name, triggers };
{% endhighlight %}

<div class='lineComment' id='{block: postTayne, line: 1 }'>
The `makePost` function takes the content and makes a post on the forums.
</div>

<div class='lineComment' id='{block: postTayne, line: 3 }'>
RespondToPostProps is a TypeScript interface. It lets us know that this response is to a specific post. So we'll have both a threadId (the id of the thread to respond to) and a postId (the id of the post that will be quoted in the response). 
</div>

<div class='lineComment' id='{block: postTayne, line: 4}'>
The `SendLogEvent` function generates a Server Sent Event (SSE) that will be sent to the control panel. The control panel displays the events in the Log Viewer on the controls tab.
</div>

<div class='lineComment' id='{block: postTayne, line: 6}'>
The name of the action. This is used for display purposes in the control panel.
</div>

<div class='lineComment' id='{block: postTayne, line: 8}'>
The array of Triggers. Each trigger is either a string or a regular expression. The bot finds posts with instructions by finding posts that start with the botName. The botName is chopped off, and the rest of the text is the instruction. If the instruction matches a regular expression trigger, then the corresponding action will be called. If the instruction matches a string trigger, then the corresponding action will be called.

The trigger 'tayne' is a string. 

The trigger /hat wobble/gi is a [Regular Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
</div>

<div class='lineComment' id='{block: postTayne, line: 11}'>
All actions are [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). The short explanation is it means that we can use the `await` keyword to call an action and wait for the result before we do anything else.

The postId is the id of the post that contained the instruction to do this action.

The threadId is the id of the thread that the post is in.
</div>

<div class='lineComment' id='{block: postTayne, line: 12 }'>
The Log Event text will be displayed in the control panel's log viewer.
</div>

<div class='lineComment' id='{block: postTayne, line: 15 }'>
The http address of the picture to post. Inside the action function is where you generate the post content. It can be as simple as a string, or doing something complicated like contacting an api. You make your function calls and use the `await` keyword to get the results back before you call the `makePost` function.
</div>

<div class='lineComment' id='{block: postTayne, line: 18 }'>
[bbCode](https://www.bbcode.org/reference.php) is one of the methods generally available for formatting forums posts. The forums use it, so we'll put the image in bbCode `img` tags so that it will display correctly. 
</div>

<div class='lineComment' id='{block: postTayne, line: 20}'>
When we call the `makePost` function, there is a risk that something goes wrong. [The try catch block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) will catch any exceptions, and deal with them without crashing the program. 
</div>

<div class='lineComment' id='{block: postTayne, line: 21 }'>
`makePost` takes the `content` string, the `threadId`, and optionally the `postId`. Because this action quotes the post that triggered it, we pass `postId` to `makePost`.

The `await` keyword makes the `postTayne` function wait for `makePost` to resolve before `postTayne` resolves.
</div>

<div class='lineComment' id='{block: postTayne, line: 33 }'>
The action file has 3 required exports: the action function, the name string, and the triggers array. 
`postTayne` is exported as `action`. `postTayne` will be called if any of the triggers are matched.
</div>

## Triggers
Triggers are how this action will get called. The bot reads each post in every thread that it has bookmarked. When it finds a post that starts with the botName, then it records that post as an instruction. 

Let's look at an example post.
```
Post: "botName, tayne!"
```
To get the instruction, the botName is removed. Any punctuation stuck on the botName is also removed. In this case, the comma is cut off. Then the whitespace is trimmed.
```
Instruction: "tayne!"
```
After the bot has scanned all the posts in a thread, it takes the array of instructions and compares each instruction to the triggers. After the bot finds a match it calls the corresponding action. The bot does not keep looking for another match. Only one action may be called per instruction.

# Matching Regular Expressions
First the bot looks at the regular expression triggers. If the instruction matches a regular expression trigger, then the bot calls the corresponding action. 

The regular expression /hat wobble/gi will match the words hat wobble **g**lobally, or anywhere in the text, and case **i**nsensitive. Take a look [here on RegExr](https://regexr.com/57pp8)

I like the site [RegExr](https://regexr.com/) for writing regular expressions. [RexEgg](http://rexegg.com/) is a good place to learn about how to write them.

# Matching String Triggers
If the bot doesn't find a match in the regular expression triggers then the bot searches the string triggers. If the bot finds a match, it calls the corresponding action.

The match with strings is case insensitive. The search is slightly relaxed. It searches the full instruction

Recall our example instruction from above:
```
Instruction: "tayne!"
```
The poster has matched the string, but they added an exclamation point. Let's take a look at how the code will handle that.

`processor` is an object with a key for each string trigger. The key returns the corresponding action function. It would look something like this:

```
const postBar = async (args) => { } //posts 'foo bar baz'

const postHelloWorld = async (args) => { } //posts 'hello world'

const processor = {
    foo: postBar,
    tayne: postTayne,
    hello: postHelloWorld
};
```

{% highlight javascript linenos%}
blockName: relaxedSearch 
    const relaxed = instruction.slice(0, -1);

    //exact match
    if (processor[instruction]) {
        const action = processor[instruction];

        await action(args);
    } // relaxed match
    else if (processor[relaxed]) {
        const action = processor[relaxed];
        
        await action(args);
    } 
{% endhighlight %}

<div class='lineComment' id='{block: relaxedSearch, line: 1}'>
Creates a new string by cutting off the last character of the instruction. So while `instruction === tayne!`, `relaxed === tayne`. 
</div>

<div class='lineComment' id='{block: relaxedSearch, line: 4 }'>
If the processor has a match for the instruction, then it will get the action and call it. 
`processor[tayne!]` does not exist, so we'll move on to the else if condition. 
</div>

<div class='lineComment' id='{block: relaxedSearch, line: 9 }'>
If the processor has a match for `relaxed`, then it will get the action and call it. `relaxed` has the last character of the instruction cut off, so the value of `relaxed` is `tayne`. `processor[tayne]` exists, so the action is called. The `postTayne` function is called with all the arguments passed to the processor.
</div>

# Instructions for strings
Instructions for matching strings are generated automatically by the instructions page.

# Example Instructions for Matching Regular Expressions
If an action has one or more regular expression triggers then the instructions page will attempt to display the example markdown. If no example markdown is then the instructions page will just display the raw regular expression.

{% include lineCommentsMobile.html %}
{% include formatting.html %}