---
layout: post
title: 'Line Comments Mobile'
date: 2020-02-21 8:00:00 -0800
---

## Making Comments on Lines in Jekyll Post CodeBlocks Work on Mobile

In my [last post]({% post_url 2020-02-19-comments-on-code-line-numbers %}), I used JavaScript and CSS to make it possible to attach comments to the line numbers in blocks of code in Jekyll posts. I called this project "lineComments."

Here's a block of code with line numbers and a comment pointing to line 7:

{% highlight javascript linenos %}
blockName my first block
//takes an element and returns the top offset property
//the distance from the top of the screen in pixels
//calculates by recursively adding the top offset of each parent element
const getOffsetTop = element => {
let offsetTop = 0;
while (element) {
offsetTop += element.offsetTop;
element = element.offsetParent;
}
return offsetTop;
};
{% endhighlight %}

<div class = "lineComment" id='{
    block:my first block,
    line: 7
    }'>
This is the code inside the while loop. It will execute as long as the variable `element` returns a truthy value. += is the addition assignment operator. Here, it is adding the value of the offSetTop property of the current element to the value of the variable named offsetTop.
</div>

This is what it looked like on desktop browsers:

![comments worked on desktop](/assets//images/2020-02-21/old-comments-on-desktop.png)

It worked on the desktop, but didn't work on mobile. The comments were designed to float to the left of the code blocks. But when viewed on a mobile device, the main column of the Jekyll blog post takes up the entire width of the screen. There was no space to the left of the code blocks, so the comments got squashed down to nothing.

![comments didn't work on mobile](/assets//images/2020-02-21/old-comments-on-mobile.png){: .center-image }

Well, that's what happens when you don't design for mobile from the start! Because this is a blog to show off my development skills, I decided to make it work on mobile too.

## Designing Desired Behavior on Mobile

Here's what the new mobile comments look like:

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

# PositionAllComments

The main function in `lineComments` is called `positionAllComments`. It finds each `lineComment` on the page and sets the size and position. `positionAllComments` also gets called when the user resizes the page, so that the comments stay in the correct position.

`positionAllComments` takes two arguments, `isMobile` and `setup`. Both are boolean values.

The value of `isMobile` determines if the mobile code or desktop code runs.

When `setup` is _true_, the code that sets up the lineNumber divs and spots invalidly assigned comments will run. `positionAllComments` is invoked with `setup` _true_ when the page loads. After that, `setup` is undefined so the setup code doesn't run again.

<!-- prettier-ignore -->
{% highlight javascript linenos %}
//first time through
if (setup) {
        //set up the code blocks- add divs and ids to the line numbers
        setupCodeBlocks({ codeBlocks, comments, isMobile });

        //find all comments assigned to invalid block numbers
        identifyInvalidCommentAssignments({ codeBlocks, comments });

        //if it's mobile, all the comments start out closed
        isMobile && closeAllComments();
    }

{% endhighlight %}

<div class = "lineComment" id="block.1.line.4">
`setupCodeBlocks` does a lot of the intial setup work.
</div>

<div class = "lineComment" id="block.1.line.7">
`identifyInvalidCommentAssignments` is a function that identifies and highlights all comments that are assigned to an invalid block index or invalid line number.
</div>

# Setup

The initial setup involves several functions. `setupCodeBlocks` calls `addLineNumberDivsToAllBlocks` to add a div to each line number in every code block in the document. Then it calls `setCommentContent` for each comment to format the comment.

<!-- prettier-ignore -->
{% highlight javascript linenos %}
//sets up each code block in the document
export const setupCodeBlocks = ({ codeBlocks, comments, isMobile }) => {
    //if it's the first time through
    //turn each line number into a div with an id
    addLineNumberDivsToAllBlocks({
        codeBlocks,
        comments,
        isMobile,
    });

    codeBlocks.forEach((codeBlock, blockIndex) => {
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
        });

        //add the line label and content div inside the comment
        blockComments.forEach((comment, commentIndex) =>
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

<div class = "lineComment" id="block.2.line.5">
`addLineNumberDivsToAllBlocks` adds a div element with an id to each line number. That makes it so that we can find the line number elements in order to position assigned comments.
</div>

<div class = "lineComment" id="block.2.line.11">
`getBlockComments` returns an array of all comments assigned to the `blockIndex`
</div>

<div class = "lineComment" id="block.2.line.20">
`setCommentContent` puts the content of the comment inside of a container div and applies the appropriate CSS classes. This makes it possible to expand, collapse, hide and show comments when the user views them.
</div>

`addLineNumberDivsToAllBlocks` calls the function `addLineNumberDivsToBlock` for each code block with line numbers in the document. `addLineNumberDivsToBlock` adds divs with ids around the the line numbers, so that the line numbers can be found when the assigned comment is positioned. If `isMobile` is true, it highlights line numbers that have an assigned comment and adds an event listener that will open and close the assigned comment when the line number is clicked.

<details><summary markdown="span">`addLineNumberDivsToBlock`</summary>
<!-- prettier-ignore -->
{% highlight javascript linenos %}
//adds a div to each line number in the block
const addLineNumberDivsToBlock = ({
    blockComments,
    blockIndex,
    codeBlock,
    isMobile,
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

};
{% endhighlight %}

</details>
<br/>
<div class = "lineComment" id="block.3.line.5">
`codeBlock` is a reference to the element created by Jekyll that contains the line numbers for a codeblock.
</div>

<div class = "lineComment" id="block.3.line.41">
`toggleComment` will open and close a mobile comment block. The 'click' event listener lets the user open and close comments by clicking on the assigned number div.
</div>

After the line number divs have been added, setup will flag all invalidly assigned comments.
Here's an example of a comment with an invalid assignment:

<div class = "lineComment" id="block.70.line.5">
It is bright red and labeled with the blockIndex and lineNumber so the user may correct their mistake.
</div>

If it's running on mobile setup will call `closeAllComments`, which hides all the comments by setting the display property to 'none'.

# Setting the Position of the Comments

# Toggling the State of Comments

The function `toggleMobileComment` toggles the state of a mobile comment. If the target comment is currently closed, it will be opened, and if it is currently open, it will be closed.

<!-- prettier-ignore -->
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

<!-- prettier-ignore -->
{% highlight javascript linenos %}
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

<!-- prettier-ignore -->
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

<div class="lineComment" id='{block :animatedCloseComment, line:  7  }'>
here it is
</div>

{% include lineCommentsMobile.html %}
{% include formatting.html %}
