---
layout: post
title: 'lineComments'
date: 2020-03-14 8:00:00 -0800
---

`lineComments` lets you attach comments to a single line of code in codeBlocks in your Jekyll blog posts.

{% highlight javascript linenos %}
blockName: firstExample
//heres some really complicated code
{% endhighlight %}

<div class='lineComment' id='{block: firstExample, line: 1}'>
This is an explanation of what's going on in line 1.
</div>

## How Comments Look on Desktop

The comment is positioned to the left of the line number. When the user hovers the comment, it will expand to display its full text.

![desktop comment](/assets//images/lineCommentsgif.gif)

## How Comments Look on Mobile Devices

Line numbers that have comments are highlighted. When the reader clicks a line number with a comment, the comment will open. The box that contains the comment appears below the assigned line, and hovers in place. The reader can drag the screen around behind the comment. Clicking the comment or the assigned line number closes the comment.

![mobile comment](/assets//images/2020-03-14/mobileCommentsExample.gif)

# Jump to:

-   [Install lineComments in Your Jekyll Blog](#how-to-install-linecomments-in-your-jekyll-blog)

-   [Use lineComments](#how-to-use-linecomments)

-   [How the Code Works](#javascript-finds-the-line-numbers)

### Why make lineComments?

I like to give very specific explanations of what code does. I think going into detail about parts of the language that will be well known to experienced programmers is helpful for beginners. For people starting out it can be very frustrating to try and grasp the main point of an article when the article includes many other operations that advanced users are already familiar with, but doesn't explain what those other operations are.

The problem with explaining too much is that it can be hard to connect the explanation of a line or part of a block of code to the actual code. It is hard to connect the explanation to the code without losing context, cluttering the page, or making the article too long. Too much on the screen can distract from the main point.

So I decided to make it possible to float comment boxes next to specific lines of code. That way the explanation is clearly visually connected to the code that is being explained. This helps the reader keep the ideas connected, while saving vertical screen space. The explanations are collapsed, keeping the page relatively free of clutter and allowing the reader to focus.

`lineComments` works on any Jekyll blog, including the ones hosted on GitHub pages. `lineComments` works on desktop and mobile, and also supports collapsing code blocks using the HTML details and summary elements.

## How to Install lineComments in Your Jekyll Blog

# Download the Files from Github

First, download the lineComments files from the [git repo](https://github.com/jacobwicks/lineCommentsMobile).

# Put the Files in Your Blog Folders

In your blog folder, you probably already have an folder named 'assets' a folder named '\_includes'. If you don't have these folders, then create them.

-   Put lineCommentsMobile.html in the '\_includes' folder.
-   Inside the 'assets' folder, create a new folder named 'lineCommentsMobile'.
-   Put lineComments.css into the lineCommentsMobile folder.
-   Put lineComments.js into the lineCommentsMobile folder.
-   Put the 'modules' folder in the lineCommentsMobile folder.

# Change the Config File

Your Jekyll blog probably has a config file. This file is named '\_config.yml' and is usually found in the root directory of your blog. If you do not have this file, then create it.

Add these settings to your config file:

<!-- prettier-ignore -->
{% highlight markdown %}
markdown: kramdown
kramdown:
    parse_block_html: true
    parse_span_html: true
{% endhighlight %}

These settings tell Jekyll to use [kramdown](https://kramdown.gettalong.org/) to process markdown. They tell kramdown to parse markdown that it finds inside of html elements. That makes it so you can use markdown inside your `lineComments`. Your `lineComments` will be inside of divs, which are html elements.

## How to Use lineComments

-   [Include lineCommentsMobile.html in the post](#include-linecommentsmobile.html-in-the-post)
-   [Tag the code blocks](#tag-the-code-blocks)
-   [Name the code blocks](#name-the-code-blocks)
-   [Write your comments inside a div](#make-the-comment-divs)
-   [Optional: put your code blocks inside a collapsible details element](#collapsible-code-blocks)

# Include lineCommentsMobile.html in the Post

Add this Liquid tag at the bottom of each blog post where you want to use lineComments. [Liquid Tags](https://jekyllrb.com/docs/liquid/) are inside curly braces `{` and percent signs `%`.

```
{% raw %}
{% include lineCommentsMobile.html %}
{% endraw %}
```

This tells Jekyll to use the code that it finds in the lineCommentsMobile.html file. This will make it use the JavaScript and CSS to find, format, and position the comments correctly.

# Tag the Code Blocks

When you include code blocks in your post, you can tell Jekyll to format them so they are easier for the user to read. You can tell Jekyll to format code blocks using [Liquid Tags](https://jekyllrb.com/docs/liquid/).

**highlight** tells Jekyll to highlight the code.

**javascript** is the desired language. You can highlight other languages instead.

**linenos** tells Jekyll to add line numbers to the code block.

```
{% raw %}
{% highlight javascript linenos %}
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}
{% endraw %}
```

This gives you a block of code that looks like this:

{% highlight javascript linenos %}
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}

# Name the Code Blocks

Name the code block that you want to assign comments to. You will assign comments to the code block by including the name of the code block in the comments' id property.

To name a code block start the first line of the code with 'blockName:' followed by the string that you want to name the block. When `lineComments` runs it will strip the blockName out, so the blockName will not be displayed to the reader.

```
{% raw %}
{% highlight javascript linenos %}
blockName: hello world
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}
{% endraw %}
```

# Make the Comment Divs

You write your comments inside of an HTML div element.

To tell `lineComments` that the div is a comment, assign the class "lineComment" to the div.

To tell `lineComments` which code block to attach the comment to, write a JSON object in the id property.

The id must have the key 'block' with the value of the name of the block the comment is assigned to.

The id must have the key 'line' with the number of the line that the comment is assigned to.

The id is a string. LineComments will parse 'relaxed formatting', which means you don't need to surround the keys and values inside the id with quotes.

You can use markdown to format text inside the comment. Here's an example:

```
<div class = "lineComment" id='{
    block: hello world,
    line: 1
    }'>
*Hello world* is the best thing to say **in a [program](https://en.wikipedia.org/wiki/Computer_program)**
</div>
```

That comment will show up on line 1 of the code block named 'hello world.' Like this:

{% highlight javascript linenos %}
blockName: hello world
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}

<div class = "lineComment" id='{
    block: hello world,
    line: 1
    }'>
*Hello world* is the best thing to say **in a [program](https://en.wikipedia.org/wiki/Computer_program)**
</div>

# Watch Out!

The div content **MUST** not start on the same as the div opening tag. You have to have a linebreak. If you start typing the content on the same line as the div opening tag Jekyll won't parse it correctly.

Bad:

```
<div class = "lineComment" id="{block:hello world, line:1"> This won't work!
</div>
```

Good:

```
<div class = "lineComment" id="{block:hello world, line:1">
This will work!
</div>
```

# Collapsible code blocks

If you want to save space on the page, you can put your code block inside of an [HTML details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details). Details elements can expand and collapse to show or hide their contents. Comments assigned to the block will be hidden while the details element is collapsed.

![collapsible code block](/assets//images/2020-03-14/collapsibleCodeBlock.gif)

The summary element is optional. If you want the summary element to look right with markdown, you have to assign it `markdown='span'`. You also have to have it on the same line as the details opening tag. I think this is something to do with how Jekyll treats HTML.

```
{% raw %}
<details><summary markdown='span'>Write your summary here</summary>
{% highlight javascript linenos %}
blockName collapsibleHelloWorld
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}
</details><br/>
{% endraw %}
```

I like to follow the details closing tag with a break tag, otherwise there won't be a space before the next line of text. The break tag is optional.

Putting the code block in a details element gives you this:

<details><summary markdown='span'>Write your summary here</summary>
{% highlight javascript linenos %}
blockName collapsibleHelloWorld
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}
</details><br/>

<div class='lineComment' id='{block: collapsibleHelloWorld, line: 1}'>
This comment doesn't show up until you open the details element.
</div>

## That's it!

You are ready to use `lineComments` in your Jekyll blog. If you want to see how the code works, you can read about it below.
<br/>
<br/>

## How Does LineComments work?

-   You write your post in markdown.
-   You tag your code blocks and assign your `lineComments` to the code blocks.
-   Jekyll generates HTML from markdown.
-   [When the page loads, lineComments gets the window width and checks to see if it's on a mobile device.](#when-the-page-loads)
-   Then it [finds all the comments](#finds-all-the-comments), all the [code blocks with line numbers](#finds-all-the-codeblocks), and all the [details elements](#finds-all-collapsible-details-elements).
-   lineComments then runs the [initial setup](#initial-setup)
-   Each comment is formatted and positioned on the screen next to the assigned line number.
-   on desktop, comments expand when the user mouses over them
-   on mobile, comments are hidden. Comments expand when the user clicks the line number
-   CSS classes control the look and animation of the comments.

# Jekyll generates HTML from markdown.

You write your blog entry using [Markdown](https://en.wikipedia.org/wiki/Markdown). Markdown lets you add tags to your text to format it for easy reading. [Jekyll](https://jekyllrb.com/) reads the markdown file and turns it into HTML. Jekyll can also read HTML inside the markdown files.

# Gets the window width, checks to see if it’s on a mobile device

<!-- prettier-ignore -->
{% highlight javascript %}
const getWindowWidth = () =>
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
{% endhighlight %}

# Finds all the comments

Use [`getElementsByClassName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) to find all the lineComment divs that the user created.

{% highlight javascript linenos %}
blockName getAllComments
const comments = [...document.getElementsByClassName('lineComment')];
{% endhighlight %}

<div class = "lineComment" id='{
    block: getAllComments,
    line: 1
    }'>
getElementsByClassName returns an HTMLCollection. <br/>
HTMLCollection is array-like, but is NOT a JavaScript Array. <br/>
Use the spread operator to make it an array.
</div>

# Finds all the codeblocks

Use [`getElementsByClassName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) to find all the code blocks with line numbers.
{% highlight javascript linenos %}
blockName findCodeblocks
//get the line number element for each code block
const codeBlocks = [...document.getElementsByClassName('lineno')];
{% endhighlight %}

<div class = "lineComment" id = '{block: findCodeblocks, line: 2}'>
Code blocks with line numbers have the class 'lineno'
</div>

# Finds all collapsible details elements

Use [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to find all the details elements.
{% highlight javascript linenos %}
blockName findDetails
const details = [...document.querySelectorAll('details')];
{% endhighlight %}

<div class="lineComment" id='{block: findDetails, line: 1}'>
querySelectorAll returns an HTMLCollection of all elements with the given class. <br/>
Details are collapsible elements.<br/>
Codeblocks may be inside details elements, hiding them from view until the reader opens them.
</div>

# Initial Setup

Once we have found the codeBlocks, comments, and details, we are ready to do the initial setup of all the elements. We have one function that takes care of this, `positionAllComments`. We'll call it with the `setup` flag set to _true_.

<!-- prettier-ignore -->
<details><summary markdown='span'>Calling `positionAllComments`</summary>
{% highlight javascript linenos %}
 //set the initial position and format of all comments
    positionAllComments({
        codeBlocks,
        comments,
        details,
        isMobile,
        setup: true,
    });
{% endhighlight %}
</details>
<br/>

After that, we add an event listener to call a [debounced](https://css-tricks.com/debouncing-throttling-explained-examples/) version of `positionAllComments` every time the page is resized.

<details><summary markdown="span">`Adding the page resize event listener`</summary>
{% highlight javascript linenos %}
blockName eventListener
    //listen for resize
    window.addEventListener('resize', () => {
        const currentWindowWidth = getWindowWidth();

        //the check for a change in window width
        if (currentWindowWidth !== prevWindowWidth) {
            //store the current window width
            prevWindowWidth = currentWindowWidth;

            //call the debounced version of positionAllComments
            debouncedPositionAllComments({
                codeBlocks,
                comments,
                details,
                isMobile,
            });
        }
    });

{% endhighlight %}

</details>

<div class = 'lineComment' id='{block: eventListener, line: 6}'>
In the mobile chrome browser, [all scroll events fire a resize](https://developers.google.com/web/updates/2016/12/url-bar-resizing). <br/> To be sure that the window actually was resized, we need to check if the current window width is in fact different from the previous window width.<br/> 
Without this check, the mobile comments disappear when you scroll up.
</div>

### positionAllComments

`positionAllComments` first calculates the comment width.

<!-- prettier ignore -->
<details><summary markdown="span">Calculating width of comments</summary>
{% highlight javascript linenos %}
blockName commentWidth
    //wrapper is an element added by Jekyll
    const wrapper = document.getElementsByClassName('wrapper')[0];
    //we use the width of wrapper as the basis for calculating how wide to make the comments
    const halfWrapperWidth = Math.floor(wrapper.offsetWidth * 0.5);
    //get the distance between the left side of the wrapper and the edge of the screen
    const wrapperLeft = getOffsetLeft(wrapper);

    //calculate commentWidth
    // prettier-ignore
    let commentWidth = isMobile
    //on mobile, it's as wide as the post element created by jekyll
    ? document.querySelector('.post-content, .e-content').offsetWidth
    //on desktop, it's the greater of 1/2 the wrapper width or the whole left offset of the wrapper
    //this will be reduced later if the screen width is very narrow
    : halfWrapperWidth > wrapperLeft
            ? wrapperLeft
            : halfWrapperWidth;

{% endhighlight %}

</details>

<div class="lineComment" id="{block: commentWidth, line: 10}">
Width is calculated differently on desktop and mobile. <br/>
</div>

<div class="lineComment" id="{block: commentWidth, line: 12}">
On mobile, we look at the `offsetWidth` property of the post content wrapper.  
</div>

<div class="lineComment" id="{block: commentWidth, line: 15}">
On desktop, we look at the size of the space between the left side of the screen and the left edge of the content.
</div>

## Setup

When the setup flag is _true_ `positionAllComments` will call three or four other functions.

-   [`parseCommentIds`](#parse-comment-ids) converts all the ids of the comments to a standard form so that they can be properly assigned.
-   [`setupCodeBlocks`](#setup-code-blocks) calls all the necessary functions to properly set up the code blocks, including formatting the comments.
-   [`identifyInvalidCommentAssignments`](#identify-invalid-comment-assignments) applies a red highlight to any comments that are assigned to an invalid block or line number, so the writer can see and fix them.

If it is being run on mobile then it will also call `closeAllComments` to hide all comments from view.

<!-- prettier ignore -->
<details><summary markdown="span">Calling setup functions</summary>
{% highlight javascript linenos %}
blockName setup
    if (setup) {
        //parse the comment ids from JSON to block.#.line.# format
        parseCommentIds(comments);

        //set up the code blocks- translate named blocks,
        //add divs and ids to the line numbers
        //add event listeners to collapsible details elements that contain codeBlocks
        setupCodeBlocks({ codeBlocks, comments, details, isMobile });

        //find all comments assigned to invalid block numbers
        identifyInvalidCommentAssignments({ codeBlocks, comments });

        //if it's mobile, all the comments start out closed
        isMobile && closeAllComments();
    }

{% endhighlight %}

</details>

# Parse Comment Ids

Users have the option of writing the comment div ids in two forms. The `parseCommentIds` function changes all the comment ids to the standard form, which is the form used by `lineComments` functions to manipulate comments while it runs.

-   Standard Form

    The standard form is 'block.blockIndex.line.lineNumber'. `lineComments` will parse this string and assign the comment to the block at the indicated index and line number.

```
block.2.line.7
```

Block indexes start at 0, so in this example, the comment would be assigned to the third code block on the page. The comment would appear next to the seventh line of code in the block.

-   JSON Form

    It's much easier to name the code blocks and assign comments to the name than it is to keep track of the block index. The Json form is '{ block: index/blockName, line: lineNumber }'. It is expected that the user will assign comments to blocks using the JSON form of the id.

```
{
    block: My Example Block,
    line: 8
}
```

This will assign the comment to the block named 'My Example Block'. The comment will be assigned to line number 8.

Writing a properly formatted string that will parse to a JSON object using [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) takes a lot of quote marks. `parseCommentIds` uses [JSON5](https://json5.org/) a library that allows it to parse relaxed JSON. This means the user does not have to use any quotes to write the JSON form of the id.

# Setup Code Blocks

`setupCodeBlocks` first finds the named code blocks- the code blocks that the user gave a name to. It changes the ids of the comments that were assigned to named blocks so the id is in the standard block.index.line.number format.

# Add line number divs to all blocks

If you inspect a code block with line numbers, you can see the line numbers sitting inside of a &lt;pre&gt; element. You can inspect the page using your browser's console, or on some browsers there is an 'inspect element' item in the right click menu.<br/><br/>
![inspecting the lineno element](/assets//images/lineno.png)

And here's what it would look like if we had 9 lines of code instead of just 1:
![multiple line numbers](/assets//images/multipleLineNumbers.png)

These line numbers are what we want the comment boxes to line up with.

<details><summary markdown='span'>Adding divs to each line number in a code block</summary>
<!-- prettier-ignore -->
{% highlight javascript linenos %}
blockName addLineNumberDivsToBlock
const addLineNumberDivsToBlock = ({
    blockComments,
    blockIndex,
    codeBlock,
    isMobile,
    removeLastNumber,
}) => {
    //get the innerHTML of the code block
    const innerHTML = codeBlock.innerHTML;
    //then set the innerHTML to blank, we'll replace by generating and appending divs
    codeBlock.innerHTML = null;

    //make an array by splitting on the newline character
    //then generate and append a div for each element in the array
    innerHTML.split('\n').forEach(lineNumber => {
        //generate the id of the line number div
        const id = `block.${blockIndex}.line.${
            lineNumber ? lineNumber : 'last'
        }.lineNumber`;

        //all the divs have an id so they can be found with getElementById
        const lineNumberDiv = document.createElement('div');
        lineNumberDiv.id = id;
        lineNumberDiv.innerHTML = lineNumber;

        //on mobile devices the divs get a class and an event listener
        if (isMobile) {
            //find out if the line number has a comment
            const hasComment = blockComments.find(
                comment => getLineNumber(comment) === parseInt(lineNumber)
            );

            //if it has a comment, give it the class and event listener
            if (hasComment) {
                //highlights the line number,
                //indicating to the user there is a comment assigned
                lineNumberDiv.classList.add('line_number_mobile');

                //clicking the line number div opens and closes the comment
                lineNumberDiv.addEventListener('click', () =>
                    toggleMobileComment(hasComment)
                );
            }
        }
        //add the div to the codeBlock
        codeBlock.appendChild(lineNumberDiv);
    });

    //removeLastNumber is true when the block is named
    //when the block is named, there's an extra line of code containing the block name
    //the block name gets removed, so we also need to remove a lineNumber
    if (removeLastNumber) {
        const lineNumberToRemove =
            codeBlock.children[codeBlock.children.length - 2];
        codeBlock.removeChild(lineNumberToRemove);
    }

};
{% endhighlight %}

</details>

<div class = 'lineComment' id = '{block: addLineNumberDivsToBlock, line: 17}'>
The id of the div is in the 'standard' form. Throughout the program we'll find divs by searching for this id.
</div>

<div class = 'lineComment' id = '{block: addLineNumberDivsToBlock, line: 29}'>
`hasComment` is a reference to the div element that holds the comment assigned to this lineNumber.
</div>

<div class = 'lineComment' id = '{block: addLineNumberDivsToBlock, line: 40}'>
Activating effects on hover doesn't work well for mobile devices. Replace it with a click event listener. 
</div>

<div class = 'lineComment' id = '{block: addLineNumberDivsToBlock, line: 41}'>
Clicking the line number will call `toggleMobileComment` on the comment assigned to this line number. It will toggle the comment between open and closed. 
</div>
After adding a div to each line number in each code block, we can then position comments relative to that line number by finding the position of the div.

# Set up Each Code Block

For each code block on the page, the `setupCodeBlocks` function will

-   Find the comments assigned to that code block
-   If the codeblock is inside a detail element, add an event listener to the detail that will call `positionAllComments` when the detail element is toggled
-   Call setCommentContent to add the line label and content div inside the comment

<!-- prettier-ignore -->
<details><summary markdown='span'>`setupCodeBlocks`</summary>
{% highlight javascript linenos %}
//sets up each code block in the document
export const setupCodeBlocks = ({
    codeBlocks,
    comments,
    details,
    isMobile,
}) => {
    //get the codeBlocks that the user assigned a name to
    const namedCodeBlocks = getNamedCodeBlocks();

    //change the ids of comments from block names to blockIndex
    assignCommentsToNamedBlocks({
        comments,
        namedCodeBlocks,
    });

    //turn each line number into a div with an id
    addLineNumberDivsToAllBlocks({
        codeBlocks,
        comments,
        isMobile,
        namedCodeBlocks,
    });

    codeBlocks.forEach((codeBlock, blockIndex) => {
        //get the comments assigned to this block
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
        });

        //if the code block is inside a collapsible details element
        //add an event listener to the details element
        //so we can show and hide the comments
        if (details.some(detail => detail.contains(codeBlock))) {
            //find all the details that contain the codeblock
            const ancestors = details.filter(detail =>
                detail.contains(codeBlock)
            );

            //when the details element toggles between open and closed, call positionAllComments
            //this will hide or reveal the comments on the collapsible code block
            ancestors.forEach(ancestor =>
                ancestor.addEventListener('toggle', () =>
                    positionAllComments({
                        codeBlocks,
                        comments,
                        details,
                        isMobile,
                    })
                )
            );
        }

        blockComments.forEach((comment, commentIndex) =>
            //add the line label and content div inside the comment
            setCommentContent({
                blockComments,
                comment,
                commentIndex,
                isMobile,
            })
        );
    });

};

{% endhighlight %}

</details>

# Set Comment Content

`setCommentContent` adds the line label and content div inside the comment.

<!-- prettier-ignore -->
<details><summary markdown='span'>`setCommentContent`</summary>
{% highlight javascript linenos %}
blockName setCommentContent
export const setCommentContent = ({
    blockComments,
    comment,
    commentIndex,
    isMobile,
}) => {
    const lineNumber = getLineNumber(comment);
    //this comment gets the comment container style applied
    comment.classList.add('line_comment_container');

    //comment.innerHTML contains the markup generated by jekyll
    //usually, the content is inside a paragraph element <p>
    //but if the user tabbed the content over, Jekyll will highlight it in a code block
    //and it won't be in a <p> element
    const isParagraph =
        comment.children && comment.children[0].nodeName === 'P';

    //trim the whitespace
    const trimmed = comment.innerHTML.trim();
    //cut the <p> and </p> tags off the content
    const content = isParagraph
        ? ` ${trimmed.slice(3, trimmed.length - 4)}`
        : trimmed;
    //clear comment element
    comment.textContent = null;

    //create the content div
    const contentDiv = document.createElement('div');
    //the class is line_comment_content
    //which is max_height of 3 lines when collapsed
    contentDiv.classList.add('line_comment_content');

    contentDiv.innerHTML = content;

    //add a label span to the content
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('line_label');
    labelSpan.innerText = `Line: ${lineNumber}`;

    //add the label span before the text content
    contentDiv.prepend(labelSpan);

    //calculate the line number of the next comment
    const nextCommentLineNumber =
        blockComments[commentIndex + 1] &&
        getLineNumber(blockComments[commentIndex + 1]);

    if (isMobile) {
        //comment background color is lighter
        comment.classList.add('mobile');

        //labelSpan gets different highlighting
        labelSpan.classList.add('mobile');

        //add event listener to close the comment on click of the comment content label
        labelSpan.addEventListener('click', () =>
            animatedCloseComment(comment)
        );

        const postWidth = document.querySelector('.post-content, .e-content')
            .offsetWidth;
        //set the content width smaller
        contentDiv.style.width = `${postWidth - 20}px`;
    } else if (
        //if not on mobile, multiple comments display at once and may overlap
        nextCommentLineNumber !== undefined &&
        nextCommentLineNumber - lineNumber < 4
    ) {
        //make the comment container single height
        comment.classList.add('single_height');
        //content classList also has single height
        contentDiv.classList.add('single_height');
    }

    comment.appendChild(contentDiv);

};
{% endhighlight %}

</details>

<div class='lineComment' id='{block: setCommentContent, line: 44}'>
If the line number of the next comment is within 3 of this comment, then they'll overlap on the desktop display. We prevent this by applying a 'single_height' css class to the comment later on.
</div>
# Identify invalid comment assignments
`identifyInvalidCommentAssignments` finds comments that are assigned to an invalid blockIndex and/or lineNumber. It calls `invalidCommentAssignment` to apply a css class to highlight the invalidly assigned comments in red so the user can see them and correct the mistake.

Here's an example of a comment with an invalid assignment:

<div class = "lineComment" id='{block: nonExistent blockName, line: 5}'>
It is bright red and labeled with the blockIndex and lineNumber so the user may correct their mistake.
</div>

<!-- prettier-ignore -->
<details><summary markdown='span'>`identifyInvalidCommentAssignments`</summary>
{% highlight javascript linenos %}
blockName identifyInvalidCommentAssignments
//assigns the invalid comment class to each comment that
//has an invalid blockIndex or
//has a line number that does not exist in the assigned block
export const identifyInvalidCommentAssignments = ({ codeBlocks, comments }) => {
    const highestblockIndex = codeBlocks.length - 1;

    //cover all comments that aren't assigned to a valid codeblock index
    comments.forEach(comment => {
        //the blockIndex of the comment
        const blockIndex = getBlockIndex(comment);

        //if it's not a number, lower than 0, or higher than the highest block number
        //it's invalid!
        if (
            isNaN(blockIndex) ||
            blockIndex < 0 ||
            blockIndex > highestblockIndex
        )
            //call invalid comment assignment to label and highlight the comment
            invalidCommentAssignment(comment);
    });

    //cover all the comments that are assigned to valid codeblock index
    codeBlocks.forEach((codeBlock, blockIndex) => {
        //get the highest line number in this code block
        const highestLineNumber = parseInt(
            //it's the second to last element in the array split by newlines
            codeBlock.innerHTML.split('\n').splice(-2, 1)
        );

        comments
            .filter(comment => getBlockIndex(comment) === blockIndex)
            .forEach(comment => {
                const lineNumber = getLineNumber(comment);
                //if the line number isn't valid
                if (
                    isNaN(lineNumber) ||
                    lineNumber < 0 ||
                    lineNumber > highestLineNumber
                )
                    //call invalid comment assignment to label and highlight the comment
                    invalidCommentAssignment(comment);
            });
    });

};
{% endhighlight %}

</details>

<div class='lineComment' id='{block: identifyInvalidCommentAssignments, line: 32 }'>
Filter all comments to get the comments assigned to this block.
</div>

## Positioning the Comments

To put all the comments in the right place, for each codeBlock

-   [Determine if the codeblock is inside a collapsed details element](#is-the-code-block-in-a-details-element)
-   [Find all comments assigned to the codeblock](#find-all-comments-assigned-to-the-code-block)
-   [Calculate the left offset of the line numbers](#calculate-left-offset-of-the-code-block)

Then [position each comment](#positioncomment)

-   If inside a collapsed code block, it’s hidden
-   Use offsets to find the position of a line number div on the page
-   Mobile: center the comment one lineHeight below the line number
-   Desktop- put the comment to the left of the line number

# Is the Code Block In a Details Element?

We can use the [`contains()`](https://www.w3schools.com/jsref/met_node_contains.asp) method to tell us if a code block is a 'descendant of,' which means inside of, a details element.

<!-- prettier-ignore -->
<details><summary markdown='span'>Determine if the code block is hidden</summary>
{% highlight javascript linenos %}
blockName inDetails
    let hidden;

    //depending on whether the detail element is open or closed
    if (details.some(detail => detail.contains(codeBlock))) {
        //ancestors is an array of the detail element(s) that the codeBlock is in
        const ancestors = details.filter(detail =>
            detail.contains(codeBlock)
        );

        //if any details elements that contain the codeblock are closed,
        //then the codeblock is hidden
        hidden = ancestors.some(ancestor => !ancestor.open);
    }

{% endhighlight %}

</details>
<br/>

<div class='lineComment' id='{block: inDetails, line: 4}'>
`details` is an array that contains every details element found in the document. <br/>
The [`contains()`](https://www.w3schools.com/jsref/met_node_contains.asp) method tells you if an HTML node is a descendant of another node.
</div>

<div class='lineComment' id='{block: inDetails, line: 6}'>
Use `.filter()` to find all details that contain the code block. Details elements can be nested, so the code block could be inside of multiple details elements if the user decides to do that. 
</div>

# Find All Comments Assigned to the Code Block

`positionAllComments` calls the `getBlockComments` function to find all comments assigned to a code block. `getBlockComments` filters the array of all comments to find the comments with a block index that matches the target code block.

<details><summary markdown='span'>`getBlockComments`</summary> 
{% highlight javascript linenos %}
blockName getBlockComments
//returns an array of the comments assigned to the block
export const getBlockComments = ({
    blockIndex,
    codeBlock,
    comments,
    setup,
}) => {
    // get the highest line number from the codeBlock
    // to identify comments with invalid line assignments
    const highestLineNumber = setup
        ? //first time through, innerHTML is a string of text and newlines
          parseInt(codeBlock.innerHTML.split('\n').splice(-2, 1))
        : //when repositioning, innerHTML contains many divs
          parseInt(
              [...codeBlock.childNodes][codeBlock.childNodes.length - 2]
                  .innerHTML
          );

    return (
        comments
            .filter(comment => getBlockIndex(comment) === blockIndex)

            //sort the comments by lineNumber, lowest to highest
            .sort((a, b) => getLineNumber(a) - getLineNumber(b))

            //remove comments with a lineNumber higher than the number of lineNumbers in the code block
            .filter(comment => {
                const lineNumber = getLineNumber(comment);

                //if the line number is less than 0 or greater than the highestLinenumber it's invalid
                return lineNumber > -1 && lineNumber <= highestLineNumber;
            })
    );

};
{% endhighlight %}

</details><br/>

<div class='lineComment' id='{block: getBlockComments, line: 21}'>
`getBlockIndex` takes a comment element and returns the block index from the id.
</div>

<div class='lineComment' id='{block: getBlockComments, line: 24}'>
Use the [`.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method to sort the comments by line number. This is important because when each comment is positioned and formatted, it looks at the position of the next comment. If the next comment is too close, the current comment will have a css class applied to it that restricts its height. This prevents comments from hiding other comments.
</div>

<div class='lineComment' id='{block: getBlockComments, line: 27}'>
Filter out comments with invalid assignments.
</div>

# Calculate Left Offset of the Code Block

To figure out where to locate comments on desktop, we need to calculate the left offset of a code block. To find the left offset of an element, use a while loop to add its left offset to each of its parent elements.

<details><summary markdown='span'>`getOffsetLeft`</summary>
{% highlight javascript linenos %}
export const getOffsetLeft = element => {
    let offsetLeft = 0;
    //calculates by recursively adding the left offset of each parent element
    while (element) {
        offsetLeft += element.offsetLeft;
        element = element.offsetParent;
    }
    return offsetLeft;
};
{% endhighlight %}
</details><br/>

Top offset is calculated basically the same way.

# positionComment

The `positionComment` function puts the comment in the correct position on the screen. Use the left offset of the code block and the top offset of the line number div to find the correct position on the page. On desktop, put the comment to the left of the line number. If the comment is inside a details element, hide it. On mobile, center the comment one lineHeight below the line number.

<details><summary markdown='span'>`positionComment`</summary>
{% highlight javascript linenos %}
//puts a comment in the correct position relative to its assigned codeBlock and lineNumber
export const positionComment = ({
    blockIndex,
    comment,
    commentWidth,
    hidden,
    isMobile,
    leftOffset,
    lineHeight,
}) => {
    //get the assigned line number
    const lineNumber = getLineNumber(comment);

    //generate the id of the assigned lineNumber div
    const id = `block.${blockIndex}.line.${lineNumber}.lineNumber`;

    //use getElementById to find the div that contains the line number
    const targetLine = document.getElementById(id);

    //find the vertical position of the line number
    const topOffset = getOffsetTop(targetLine);

    //set the position of the comment
    //mobile first
    if (isMobile) {
        //post width is the width of the post element created by jekyll
        //it is calculated in the position all comments function
        comment.style.width = `${commentWidth - 10}px`;

        //comment appears one lineHeight below the assigned lineNumber
        //so the lineNumber code is visible
        comment.style.top = `${topOffset + lineHeight}px`;

        //change the width of the content div
        comment.childNodes[0].style.width = `${commentWidth - 20}px`;

        //hidden is true if comment is in a collapsible code block that is collapsed
        //close the comment
        hidden && closeComment(comment);
    } else {
        //desktop
        if (hidden) {
            comment.setAttribute('hidden', true);
        } else {
            comment.removeAttribute('hidden');

            //desktop layout
            comment.style.width = `${commentWidth}px`;

            //top aligns with lineNumber div
            comment.style.top = `${topOffset}px`;

            //floats to the left
            comment.style.left = `${leftOffset - commentWidth - 48}px`;
        }
    }

};
{% endhighlight %}

</details><br/>

# Mobile Comments

Here's what the mobile comments look like:

![new comments on mobile](/assets//images/2020-02-21/new-comments-on-mobile.png){: .center-image }

To start the process of making the lineComments work on mobile devices, I first decided how the mobile lineComments should behave. I knew that I wanted the comments to basically look the same as the desktop version. This will give a more consistent user experience.

# Move the Comments from the Side to the Center

![comments in center](/assets//images/2020-02-21/move-comments-to-center.png)
There's no empty space on the sides of the blog posts when viewed on mobile, so the comments can't go on the sides. The comments have to go in the center of the screen. That's where the code block and the text of the blog post is. So the comments can't be visible the entire time.

# Comments are Hidden Until the User Opens Them

On the desktop, every comment is always visible. If the contents of the comment is long, then the comment is collapsed until the user hovers over it. Because the comments will share the center of the screen with the code and the rest of the post, the comments can't be visible all the time. They would hide other content if they were. So the comments will start out hidden. When the user indicates that they want to view a comment, that comment will open.

# Get Rid of the Arrow

![get rid of the arrow](/assets//images/2020-02-21/get-rid-of-arrow.png)
The desktop version uses CSS pseudo elements to make an arrow that points from the body of the comment to the line number it is assigned to. This visual signal connecting a comment to a line is useful when there are multiple comments on screen at once. In the mobile version, there will only be one comment open at a time. Also, the comments will be in the middle of the screen, on top of the code block. The arrow doesn't do anything useful, so let's get rid of it.

# Highlight the Line Number to Show that a Comment is Assigned to it

![highlighted line number](/assets//images/2020-02-21/line-7-has-a-comment.png)

Because the comments are hidden, there needs to be some indication that a line has a comment assigned to it. lineComments already adds a div to each line number, so we can just add a class to highlight the div for any line number that has a comment assigned to it.

# Hover is Not Convenient On Mobile Devices, Use Click Instead

The desktop version of lineComments relied on the CSS hover detection to expand and collapse the comments. I used hover because it's convenient to move the mouse over the comment you want to read. Also, CSS can accomplish hover effects with very few lines of code. So it was an efficient solution that was easy to implement.

However, hover does not work well on mobile devices. This is because the input on mobile devices is usually the touchscreen. There is no meaningful sense of where a mouse cursor is hovering, because there is only touch input when the user is touching the screen and pressing or doing a drag. Some mobile devices allow the user to give a hover input by doing a long press, but this is not something that is intuitive to do, many people aren't aware that it is possible, and it does not work on all devices.

So it's fine for the desktop to keep using hover. But using a click input to open and close the comments on the mobile version will be a lot better.

## Implement the Mobile Design

# Detecting a Mobile Device

To detect a mobile device, you essentially check some information about the browser against a very long regex list. The open source regex is maintained at [detect mobile broswers](http://detectmobilebrowsers.com/). [This stackoverflow answer](https://stackoverflow.com/a/11381730) gives a JavaScript implementation of the function. I named my version of the function `mobileCheck`. `mobileCheck` returns _true_ if the device is a mobile device, and _false_ if not.

In the setup function I call `mobileCheck` and assign the result to the variable `isMobile`. Throughout the code, if `isMobile` is _true_ then the code to implement mobile behavior will run. Otherwise, the desktop code will run.

# Toggling the State of Comments

The function `toggleMobileComment` toggles the state of a mobile comment. If the target comment is currently closed, it will be opened, and if it is currently open, it will be closed.

<!-- prettier-ignore -->
<details><summary markdown='span'>`toggleMobileComment`</summary>
{% highlight javascript linenos %}
//toggles a mobile comment between open/visible and closed/hidden states
export const toggleMobileComment = comment => {
    //all other comments should be closed
    closeAllCommentsExcept(comment);

    //style === 'none' means the comment is currently closed
    //if the comment is closed, then it should Open
    const shouldOpen = comment.style.display === 'none';

    //open or close the target comment
    shouldOpen ? openComment(comment) : animatedCloseComment(comment);

};
{% endhighlight %}

</details><br/>

<!-- prettier-ignore -->
<details><summary markdown='span'>`openComment`</summary>
{% highlight javascript linenos %}
blockName openComment
const openComment = comment => {
    const lineNumberDiv = getLineNumberDivFromComment(comment);
    lineNumberDiv.classList.add('selected');
    //get the height of a single line in the document
    const lineHeight = getCSSLineHeight();

    //find the vertical position of the line number that the comment is assigned to
    const topOffset = getOffsetTop(lineNumberDiv);

    //set the position to absolute,
    //so that the comment will appear in a particular vertical spot in the document
    comment.style.position = 'absolute';

    //put the top of the comment 1 line height below the target line
    //but subtract the scrollY value, which is how far the user has scrolled
    comment.style.top = `${topOffset - window.scrollY + lineHeight}px`;

    //switch position to 'fixed' so the comment will stay in one place
    //this lets the user scroll the code behind the comment
    comment.style.position = 'fixed';

    const content = comment.children[0];

    content.style.maxHeight = '0';
    comment.style.maxHeight = '0';

    comment.style.display = 'block';

    setTimeout(() => {
        content.style.maxHeight = '100vh';
        comment.style.maxHeight = '100vh';
    }, 1);

};
{% endhighlight %}

</details><br/>
<div class='lineComment' id='{block: openComment, line: 29 }'>
It can be jarring if the comment snaps open instantly. Setting a timeout on the change in height gives the CSS animation time to work. This makes a more comfortable experience for the reader.
</div>

<!-- prettier-ignore -->
<details><summary markdown='span'>`animatedCloseComment`</summary>
{% highlight javascript linenos %}
blockName animatedCloseComment
export const animatedCloseComment = comment => {
    const lineNumberDiv = getLineNumberDivFromComment(comment);
    lineNumberDiv.classList.remove('selected');

    const content = comment.children[0];

    content.style.maxHeight = '0';
    comment.style.maxHeight = '0';
    setTimeout(() => {
        comment.style.display = 'none';
    }, 1000);

};
{% endhighlight %}

</details><br/>

<div class='lineComment' id='{block: animatedCloseComment, line: 9 }'>
It can be jarring if the comment closes instantly. Setting a timeout on the CSS class change gives the animation time to work. This makes a more comfortable experience for the reader.
</div>

# Listen for Page Resize

Running `positionAllComments` when the page loads will put the comments in the right place when the page loads for the first time. But to make the comments stay in the right place when the user resizes the page, we need to listen for the resize event. Use [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to listen for the resize event happening on the window.

{% highlight javascript linenos %}
//listen for resize
//on mobile chrome, all scroll events fire a resize
//https://developers.google.com/web/updates/2016/12/url-bar-resizing
//so check width difference
//without this check, the mobile comments disappear when you scroll up
window.addEventListener('resize', () => {
const currentWindowWidth = getWindowWidth();

        //the check for a change in window width
        if (currentWindowWidth !== prevWindowWidth) {
            //store the current window width
            prevWindowWidth = currentWindowWidth;

            //call the debounced version of positionAllComments
            debouncedPositionAllComments({
                codeBlocks,
                comments,
                details,
                isMobile,
            });
        }
    });

{% endhighlight %}

Resizing the page can fire the event listener many times very quickly. Running complicated code many times in a row can cause the page to slow down or not work right. So the event listener isn't calling `positionAllComments`. It is calling the variable `debouncedPositionAllComments`. This is a 'debounced' version of the `positionAllComments` function.

[Debouncing](https://www.geeksforgeeks.org/debouncing-in-javascript/) is when you make sure that repeated, quick calls to a function only end up calling that function a single time. By passing a debounced version of `positionAllComments` to the event listener, we make sure that `positionAllComments` only gets called once when the user resizes the window. If we didn't debounce it, `positionAllComments` might get called hundreds of times a second, which would cause the page to slow down. In the full source code you can see the `debounce` function that we call to create the debounced version of `positionAllComments`.

When the `eventListener` calls `debouncedPositionAllComments`, it automatically passes the event object as an argument to `debouncedPositionAllComments`. `debouncePositionAllComments` calls `positionAllComments`. `positionAllComments` will read the event object as its parameter `reposition`, so `reposition` will have a truthy value. That will stop the code that is only supposed to execute when `reposition` is falsy from executing.

## The CSS

We use CSS to accomplish several things. We use CSS to set the background color of the comment, create the shaft and head of the arrow pointing the line number, and collapse and expand the comments when the user hovers over them.

[This article on CSS-Tricks.com](https://css-tricks.com/using-css-transitions-auto-dimensions/) explains the different ways of using CSS to animate changes in the height of an element where the height is automatically determined based on the size of the element's content. Each method has some benefits and some drawbacks. I chose to use `max-height` because it works well enough for this application and involves very few lines of code.

# The Line Height Variable

<!-- prettier-ignore -->
{% highlight css %}
/_ declaring a variable lh as 1.4rem, or 1.4 times the height of a single line of text
line-height is equal to the value of the variable lh _/
html {
    --lh: 1.4rem;
    line-height: var(--lh);
}
{% endhighlight %}

Here we declare a [CSS variable](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) `lh`. By declaring `lh` as a CSS variable, we can refer back to it throughout the CSS. We can use `lh` in calculations.

`lh` is equal to 1.4 `rem`. The [CSS unit `rem`](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units) is the font size of the root element of the document. This basically means it's how tall in pixels the font characters will be. Multiplying `rem` by 1.4 gives us a height value that accounds for one character in height plus white space above and below it.

We'll use `lh` later to set the collapsed height of the comments to either 3 lines or 1 line, depending on if there are other comments close by.

# Line Comment Container, Before and After

This section of CSS specifies the properties for the `line_comment_container` class. We use the `before` pseudo element to make the shaft of the arrow that points at the assigned line number. We use the `after` pseudo element to make the point of the arrow that points at the assigned line number.

<!-- prettier-ignore -->
<details><summary markdown='span'>CSS for the Line Comment Container</summary>
{% highlight css linenos %}
blockName cssLineCommentContainer
/_ the before element of the line_comment_container
creates the shaft of the arrow pointing at the line number _/
.line_comment_container::before {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid;
    border-bottom: 10px solid;
    border-left: 25px solid;
    border-right: 20px solid;
    border-color: gray;
    position: absolute;
    right: -20px;
    top: 0px;
}

/_ the line comment container holds the contents
and displays the background color
its default state is collapsed, displaying a maximum of 3 lines of text
max-height is set to 3 _ the lh variable*/
.line_comment_container {
border-top: medium solid white;
position: absolute;
background-color: gray;
text-align: left;
border-radius: 6px;
padding: 5px;
max-height: calc(var(--lh) * 3);
transition: max-height 1s ease-out;
}

/_ the after element of the line_comment_container
creates the point of the arrow pointing at the line number _/
.line_comment_container::after {
content: '';
width: 0;
height: 0;
border-top: 20px solid transparent;
border-bottom: 20px solid transparent;
border-left: 30px solid gray;
position: absolute;
right: -50px;
top: -10px;
}
{% endhighlight %}

</details><br/>

<div class = "lineComment" id="block.cssLineCommentContainer.line.7">
Setting each of the border properties forms a rectangle. 
</div>

<div class = "lineComment" id="block.cssLineCommentContainer.line.13">
The body of the arrow is placed 20 pixels back from the right side of the comment. 
</div>

<div class = "lineComment" id="block.cssLineCommentContainer.line.22">
Setting the border-top to white makes the separation between comments visible when they overlap. Overlap will occur if there is a comment on the line after another comment.
</div>

<div class = "lineComment" id="block.cssLineCommentContainer.line.28">
The [CSS calc() function](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) lets you perform calculations inside CSS property values. `max-height` is set to three times the value of the `lh` variable, or 3 lines of text plus whitespace.
</div>

<div class = "lineComment" id="block.cssLineCommentContainer.line.29">
The [transition property](https://developer.mozilla.org/en-US/docs/Web/CSS/transition) allows you to control how an element will change appearance when a property of the element changes. This line says that when the `max-height` property changes, it should take 1 second to change, and `ease-out` is an animation that starts slow and ends slow, moving faster in the middle.  
</div>

<div class = "lineComment" id="block.cssLineCommentContainer.line.38">
Setting `border-left` to gray and `border-top` and `border-bottom` to transparent creates a triangle pointing right.
</div>

<div class = "lineComment" id="block.cssLineCommentContainer.line.42">
The head of the arrow is position to the right of the `line_comment_container`.
</div>

# Hover Effects

When the user hovers the mouse over a comment, comment expands to the height of its content, the background gets lighter, and the arrow turns green. These hover effects are only used on the desktop.

<details><summary markdown='span'>CSS Hover</summary>
{% highlight css linenos %}
blockName: cssHover
/_ when the user hovers over the line_comment_container
max-height is set to 100% of the viewport height_/
.line_comment_container:hover {
background-color: lightgray;
max-height: 100vh;
z-index: 99;
}

/_ the point of the arrow turns green _/
.line_comment_container:hover:after {
border-left: 30px solid green;
}

/_ the body of the arrow turns green _/
.line_comment_container:hover:before {
border-color: green;
}
{% endhighlight %}

</details><br/>

<div class = "lineComment" id="block.cssHover.line.6">
Setting the z-index puts the hovered comment on top of any other comments it may overlap.
</div>

# The Comment Content

The `line_comment_content` class controls the max-height of the content of the comment. We need to have this separate class for the content of the comment because we use `overflow: hidden` to hide any text that goes past the `max-height`. If we set `overflow: hidden` on the `line_comment_container`, then the `before` and `after` pseudo elements wouldn't show up because we render them outside of the body of the `line_comment_container` to create the pointing arrow effect.

<details><summary markdown='span'>CSS Content</summary>
{% highlight css linenos %}
blockName: cssContent
/_ the content of the comment
max-height starts at three lines collapsed _/
.line_comment_content {
position: relative;
max-height: calc(var(--lh) \* 3);
transition: max-height 1s ease-out;
overflow: hidden;
padding-right: 1rem;
}

/_ when hovered, max height becomes 100% of the viewport height _/
.line_comment_content:hover {
max-height: 100vh;
}
{% endhighlight %}

</details><br/>

<div class = "lineComment" id="block.cssContent.line.13">
On `hover` `max-height` is set to `100vh`, or 100% of the height of the viewport. The CSS `vh` unit is equal to 1% of the height of the viewport. The viewport is the browser window size.
</div>

And that's how `lineComments` works on a Jekyll blog. I hope you find it useful.

## Extra: Snippets for VSCode

If you use `lineComments` you'll probably end up making some sort of macro to insert codeblocks and comment divs. Here's snippets that you can install in VSCode.

```
	"lineComment codeBlock": {
		"prefix": [
			"cb"
		],
		"body": [
			"{% highlight javascript linenos%}\nblockName: \n{% endhighlight %}"
		]
	},
	"lineComment collapsible codeBlock": {
		"prefix": [
			"db"
		],
		"body": [
			"<details><summary markdown='span'>Summary</summary>\n{% highlight javascript linenos%}\nblockName: \n{% endhighlight %}\n</details><br/>"
		]
	},
	"lineComment": {
		"prefix": [
			"lc"
		],
		"body": [
			"<div class='lineComment' id='{block: , line: }'>\n\n</div>"
		]
	}
```

[Create your own VSCode snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets)
After you create snippets, you can access snippets with ctrl+space.

{% include lineCommentsMobile.html %}
{% include formatting.html %}
