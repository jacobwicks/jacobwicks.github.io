---
layout: post
title: 'lineComments'
date: 2020-03-14 8:00:00 -0800
---

### What is lineComments?

lineComments is a project that lets you attach comments to a single line of code in codeBlocks in your Jekyll blog posts.

### Why make lineComments?

I like to give very specific explanations of what code does. I think going into detail about parts of the language that will be well known to experienced programmers is helpful for beginners. When starting out it can be very frustrating to try and grasp the main point of an article when it includes many other operations that advanced users are already familiar with, but doesn't explain what those are. The problem with explaining too much is that it can be hard to connect the explanation of a line or part of a block of code to the actual code. It is hard to connect the explanation to the code without losing context, cluttering the page, or making the article too long, which can distract from the main point. So I decided to make it possible to float comment boxes next to specific lines of code. That way the explanation is clearly visually connected to the code that is being explained. This helps the reader keep the ideas connected, while saving vertical screen space. The explanations are collapsed, keeping the page relatively free of clutter and allowing the reader to focus. lineComments also supports collapsing codeBlocks using the html details and summary elements.

### How can I use it in my Jekyll blog?

To use it, you

# Tag the code

Use Liquid tags to tag your code block.

```
{% raw %}
{% highlight javascript linenos %}
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}
{% endraw %}
```

# Optional: name the code blocks

The easiest way to keep track of the code blocks that you are adding comments to is to name each code block. To name a code block start the first line of the code with 'blockName' followed by the string that you want to name the block. When lineComments runs it will strip the blockName out, so the blockName will not be displayed to the reader.

```
{% raw %}
{% highlight javascript linenos %}
blockName hello world
const helloWorld = () => console.log('Hello World!');
{% endhighlight %}
{% endraw %}
```

You don't have to name code blocks to attach comments. If you don't name a code block, you can still attach comments to it by it's index (e.g. it's the third code block on the page, it's block index is 2). But that's harder than just naming the code block.

### Make the comment divs

A comment needs to be inside a div element. Give the div the class "lineComment". Give the div an id property that identifies the assigned block and the line number. Here's an example:

```
<div class = "lineComment" id='{
    block: hello world,
    line: 1
    }'>
Hello world is the best thing to say in a program
</div>
```

## Comment Ids

# in JSON format

# In String format

index or blockName will both work

```
<div class = "lineComment" id="block.2.line.17">
Like this
</div>;
```

# Refer to code blocks by index or name

# Collapsible code blocks

# Put the code inside of a details element

# Use a summary to name it

### To Install LineComments in your Jekyll blog

o Download LineComments from Github
o Put it in the folders
o Change your config file
o Include it at the bottom of the post
• Source Code

### How Does LineComments work?

## Jekyll generates HTML from markdown.

You write your blog entry using [Markdown](https://en.wikipedia.org/wiki/Markdown). Markdown lets you add tags to your text to format it for easy reading. [Jekyll](https://jekyllrb.com/) reads the markdown file and turns it into HTML. Jekyll can also read HTML inside the markdown files.

# Format Code Blocks Using Liquid Tags

When you include code blocks in your post, you can tell Jekyll to format them so they are easier for the user to read. You can tell Jekyll to format code blocks using [Liquid Tags](https://jekyllrb.com/docs/liquid/). Liquid Tags are inside curly braces and percent signs, like this:

```
{% raw %}
{% highlight javascript %}
This is a code block inside a Liquid Tag
Code goes here
{% endhighlight %}
{% endraw %}
```

# Add Line Numbers to Code Blocks

You can add line numbers to highlighted code blocks. To add line numbers, you add 'linenos' to the opening tag:

```
{% raw %}
{% highlight javascript linenos %}
{% endraw %}
```

When you do that, you get a code block with line numbers, like this:
{% highlight javascript linenos %}
This is a code block inside a Liquid Tag
Code goes here
{% endhighlight %}

# Name Your Code Blocks

To make it easy to assign comments to code blocks, LineComments lets you give each code block a name.

This block is named 'example codeBlock':

```
{% raw %}
{% highlight javascript %}
blockName example codeBlock
This is a code block inside a Liquid Tag
Code goes here
{% endhighlight %}
{% endraw %}
```

## JavaScript Finds the Line Numbers

LineComments uses JavaScript to find the line numbers on each code block. Each line number is put inside a div with a unique id. Then, when you assign a comment to a line of code in a code block, LineComments uses the position of the line number div to put the comment in the right place.

## Write Your Comments in a Div

You write your comments inside of an HTML div element. To tell LineComments that the div is a comment, assign the class "lineComment" to the div. To tell LineComments which block to attach the comment to, write a JSON object in the id property. The JSON object must have the key 'block' with the value of the name of the block the comment is assigned to. The JSON object must have the key 'line' with the number of the line that the comment is assigned to. The JSON object is inside a string. LineComments will parse 'relaxed formatting', which means you don't need to surround the keys and values inside the JSON object with quotes.

```
{% raw %}
<div class = "lineComment" id='{
    block: example codeBlock,
    line: 2
    }'>
    This is a comment on the code in line 2
</div>
{% endraw %}
```

## How Comments Look on Desktop

The comment is positioned to the left of the line number. When the user hovers the comment, it will expand to display its full text.

![desktop comment](/assets//images/lineCommentsgif.gif)

## How Comments Look on Mobile Devices

Line numbers that have comments are highlighted. When the reader clicks a line number with a comment, the comment will open. The box that contains the comment appears below the assigned line, and hovers in place. The reader can drag the screen around behind the comment. Clicking the comment or the assigned line number closes the comment.

![mobile comment](/assets//images/2020-03-14/mobileCommentsExample.gif)

## Collapsible Code Blocks

If you want to save space on the page, you can put your code block inside of an [HTML details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details). Details elements can expand and collapse to show or hide their contents. LineComments will use JavaScript to make the details element listen for the collapse event and will close any comments inside of it when it collapses.

![collapsible code block](/assets//images/2020-03-14/collapsibleCodeBlock.gif)

Put a code block inside a collapsible details element like this:

{% raw %}

```
<details><summary markdown="span">`whatever!`</summary>
{% highlight javascript linenos %}
blockName whatever
//Hey, this is block name whatever
const sayHello = () => console.log('Hello, world!');
{% endhighlight %}

</details>
```

{% endraw %}

And assign comments to it in the normal way:

{% raw %}

```
<div class = "lineComment" id='{
    block: whatever,
    line: 2
    }'>
Hello world is the best thing to say in a program
</div>
```

{% endraw %}

Which gives you this collapsible element:

<details><summary markdown="span">`This is the collapsed code block named 'whatever'`</summary>
{% highlight javascript linenos %}
blockName whatever
//Hey, this is block name whatever
const sayHello = () => console.log('Hello, world!');
{% endhighlight %}

</details>
<div class = "lineComment" id='{
    block: whatever,
    line: 2
    }'>
Hello world is the best thing to say in a program
</div>

### Development of lineComments

# First version

The first version of lineComments just implemented the ability to tag code block lines with comments. It worked on desktop, but didn't work at all on mobile- the comments didn't show up. Lesson learned! Always develop for mobile first.

# Mobile version

Making comments on lines in Jekyll Post CodeBlocks work on mobile

# Final Improvements

o Supporting Collapsible Code Blocks
o Naming codeBlocks with relaxed JSON

[anchor link](#how-the-code-works)

# How the Code Works

-   [When the page loads, lineComments gets the window width and checks to see if it's on a mobile device.](#when-the-page-loads)
-   Then it [finds all the comments](#finds-all-the-comments), all the [code blocks with line numbers](#finds-all-the-codeblocks), and all the [details elements](#finds-all-collapsible-details-elements).
-   lineComments then runs the [initial setup](#initial-setup)
-   it changes the size, position, and format of the comments
-   if it is running on mobile, the comments are hidden
-   on desktop, comments expand when the user mouses over them
-   on mobile, comments expand when the user clicks the line number

# When the Page Loads

# Gets the window width, checks to see if it’s on a mobile device

{% highlight javascript %}
const getWindowWidth = () =>
Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
{% endhighlight %}

# Finds all the comments

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

{% highlight javascript linenos %}
blockName findCodeblocks
//get the line number element for each code block
const codeBlocks = [...document.getElementsByClassName('lineno')];
{% endhighlight %}

<div class = "lineComment" id = '{block: findCodeblocks, line: 2}'>
Code blocks with line numbers have the class 'lineno'
</div>

# Finds all collapsible details elements

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

Calls positionAllComments function with setup = true # Add an event listener for page resize
On resize, call debounced positionAllComments # PositionAllComments
 Calculates the comment width
 Setup

# Parse comment ids

Users have the option of writing the comment div ids in two forms
 Block.index / block.blockName .line.lineNumber
 { block: index/blockName, line: lineNumber }
o Wanted to give the option of using a JSON object
 Writing a proper JSON object takes a lot of quote marks
 Parsing relaxed JSON is a complex problem! # Setup code blocks
o Find named code blocks
 That the user gave a name to
o Change the id of comments that were assigned to named blocks so they follow the normal block.index.line.number format
o Add line number divs to all blocks
 So we can find the height of a particular line number
o For each code block
 Find the comments assigned to that code block
 If the codeblock is inside a detail element, add an event listener to the detail to call positionAllComments on toggle # If the detail element is closed, it will hide all comments inside it
 Call setCommentContent to add the line label and content div inside the comment
o Identify invalid comment assignments
 Highlights them in red so the user can correct the mistake
o On mobile, close all comments

# For each codeBlock

-   Determine if the codeblock is inside a collapsed details element
-   Find all comments assigned to the codeblock
-   Calculate the left offset, which will be different desktop v. mobile

# Position each comment

-   If inside a collapsed code block, it’s hidden
-   Use offsets to find the position of a line number div on the page
-   Mobile: center the comment one lineHeight below the line number
-   Desktop- put the comment to the left of the line number

# Mobile Comments

# Designing Desired Behavior on Mobile

-   Starts hidden
     Move the Comments from the Side to the Center
     Comments are Hidden until the User Opens them
     Get Rid of the Arrow
     Hover is Not Convenient On Mobile Devices, Use Click Instead
    o Implementing the Mobile Design
     Detecting a Mobile Device

# Collapsible code blocks

    o Using HTML5 Details and Summary
     https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details

# Finding the details

# finding codeblocks that are inside the details

# setupCodeBlocks adds an event listener

    • when a detail that contains a codeblock toggles, call close comment

# Naming codeBlocks

 PositionAllComments
 Setup
 Setting the Position of the Comments
 Toggling the State of Comments

{% include lineCommentsMobile.html %}
{% include formatting.html %}
