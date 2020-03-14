---
layout: post
title: 'Line Comments Mobile'
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
    block: hellow world,
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

### To Install it in your Jekyll blog

o Download it
o Put it in the folders
o Change your config file
o Include it at the bottom of the post
• Source Code
• How does it work?
o Pseudo code explanation
 Jekyll generates HTML from markdown.
• You can highlight code blocks using liquid tags.
• You can add line numbers to highlighted code blocks
 Javascript finds the line numbers
• Each line number is put inside a div
 In markdown, user adds their comments as divs. In the id of the div, the user indicates which block and which line in the block the comment is attached to
 On the desktop version, the comment is positioned to the left of the line number
• When the user hovers the comment, it will expand to display its full text
 On mobile devices, line numbers that have comments are highlighted
• When the user clicks a line number with a comment, the comment will open
• If the code block is inside a details element, the details element listens for the collapse event and will close any comments inside of it when it collapses
• First version
o Just line Comments
o
• Improvements
o Supporting Collapsible Code Blocks
o Naming codeBlocks with relaxed JSON
o Making comments on lines in Jekyll Post CodeBlocks work on mobile
• Code
o When the page loads
 Gets the window width, checks to see if it’s on a mobile device
 Finds all the comments
 Finds all the codeblocks
 Finds all collapsible details elementscode blocks
 Then calls positionAllComments function with setup = true
 Add an event listener for page resize
• On resize, call debounced positionAllComments
o PositionAllComments
 Calculates the comment width
 Setup
• Parse comment ids
o Users have the option of writing the comment div ids in two forms
 Block.index / block.blockName .line.lineNumber
 { block: index/blockName, line: lineNumber }
o Wanted to give the option of using a JSON object
 Writing a proper JSON object takes a lot of quote marks
 Parsing relaxed JSON is a complex problem!
• Setup code blocks
o Find named code blocks
 That the user gave a name to
o Change the id of comments that were assigned to named blocks so they follow the normal block.index.line.number format
o Add line number divs to all blocks
 So we can find the height of a particular line number
o For each code block
 Find the comments assigned to that code block
 If the codeblock is inside a detail element, add an event listener to the detail to call positionAllComments on toggle
• If the detail element is closed, it will hide all comments inside it
 Call setCommentContent to add the line label and content div inside the comment
o Identify invalid comment assignments
 Highlights them in red so the user can correct the mistake
o On mobile, close all comments

 For each codeBlock
• Determine if the codeblock is inside a collapsed details element
• Find all comments assigned to the codeblock
• Calculate the left offset, which will be different desktop v. mobile
• Position each comment
o If inside a collapsed code block, it’s hidden
 Use offsets to find the position of a line number div on the page
 Mobile: center the comment one lineHeight below the line number
 Desktop- put the comment to the left of the line number

 Mobile
• Starts hidden
• Collapsible code blocks
o Using HTML5 Details and Summary
 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
 Finding the details, finding codeblocks that are inside the details
 setupCodeBlocks adds an event listener
• when a detail that contains a codeblock toggles, call close comment
• Naming codeBlocks
o Let users name codeblocks instead of keeping track of the index
 Allows copy and paste
• Mobile
o Designing Desired Behavior on Mobile
 Move the Comments from the Side to the Center
 Comments are Hidden until the User Opens them
 Get Rid of the Arrow
 Hover is Not Convenient On Mobile Devices, Use Click Instead
o Implementing the Mobile Design
 Detecting a Mobile Device
 PositionAllComments
 Setup
 Setting the Position of the Comments
 Toggling the State of Comments

{% include lineCommentsMobile.html %}
{% include formatting.html %}
