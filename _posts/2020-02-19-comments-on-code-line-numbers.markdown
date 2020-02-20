---
layout: post
title:  "Comments on Code Line Numbers in Jekyll"
date:   2020-02-19 12:00:00 -0800
---

When I write a blog post about my code, I want to write information that is detailed enough that beginners won't get lost. Because a single line or block of code can include many different operations, it can be difficult to present the whole function, the specific code you are talking about, and the explanation for what the code is doing. So I decided to make it possible to float comment boxes next to specific lines of code. That way the explanation is clearly visually connected to the code that is being explained. 

Here's a block of code with line numbers and a comment pointing to line 7:

{% highlight javascript linenos %}
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

<div class = "lineComment" id="block.0.line.9">
This is the code inside the while loop. It will execute as long as the variable `element` returns a truthy value. += is the addition assignment operator. Here, it is adding the value of the offSetTop property of the current element to the value of the variable named offsetTop.
</div>

Excellent, right? Want to know how it works?

## How it Works
When the user writes a Jekyll post, they can use Liquid Tags to highlight their code blocks. If they want to, they can tell Jekyll to add line numbers to the code block.

We use JavaScript to find the line numbers for each code block. Each line number is put inside a div and assigned an id. When the user writes a lineComment in their post, they put the lineComment inside of a div. The user assigns the lineComment a code block number and a line number using the div id property. We set the Jekyll config to render markdown inside of HTML elements, so the user can write their comment using markdown syntax even though it is inside of a div.

When the page is rendered we run a JavaScript function to find each code block and each lineComment. For every code block we run a JavaScript function to find the assigned lineComments. For every lineComment in a block we find the assigned line number, reposition the comment to the left of the assigned line number, and use CSS to apply styling to the comment.

Finally, we use JavaScript to listen for the page resize event. When the page resizes, we run the code to position each comment again. That way the comments will stay in the correct position if the user resizes the page.

# Liquid Tags
When you type a code block in a Jekyll post, you can tell Jekyll to highlight the code block using [Liquid Tags](https://jekyllrb.com/docs/liquid/tags/). Liquid Tags are inside curly brackets and percent signs. The starting and ending Liquid Tags for highlighting JavaScript look like this:

{% raw %} 
{% highlight javascript %} <br/>
const helloWorld = () => console.log('Hello World!'); <br/>
{% endhighlight %}
{% endraw %}

That will render on the page as this:
{% highlight javascript %} const helloWorld = () => console.log('Hello World!'); 
{% endhighlight %}

To add line numbers, you add 'linenos' to the opening tag:
{% raw %} 
{% highlight javascript linenos %}
{% endraw %}

That will render on the page as this:
{% highlight javascript linenos %} const helloWorld = () => console.log('Hello World!'); 
{% endhighlight %}

If you inspect the page, you can see the line numbers sitting inside of a &lt;pre&gt; element:<br/><br/>
![inspecting the lineno element](/assets//images/lineno.png)

And here's what it would look like if we had 9 lines of code instead of just 1:
![multiple line numbers](/assets//images/multipleLineNumbers.png)

These line numbers are what we want the comment boxes to line up with.

## The JavaScript
We use JavaScript and CSS to create the comment boxes. First let's look at the JavaScript. After that, I'll explain how the CSS works.

# Use JavaScript to Add Ids so You Can Find the Line Numbers
This code finds each element that has the 'lineno' class. Then it adds a div with an id to each line number inside each 'lineno' element.
{% highlight javascript linenos %}
    //get the line number element for each code block
    const codeBlocks = [...document.getElementsByClassName('lineno')];

    //for each code block line number element
    //turn each line number into a div with an id
    codeBlocks.forEach((codeBlock, blockIndex) => {
        let lineNumbers = codeBlock.innerHTML
            .split('\n')
            .map(
                lineNumber =>
                    `<div id='block.${blockIndex}.line.${
                        lineNumber ? lineNumber : 'last'
                    }'>${lineNumber}</div>`
            )
            .join('');
        //set the innerHTML of the codeblock linenumber container
        codeBlock.innerHTML = lineNumbers;
    }
{% endhighlight %}

<div class = "lineComment" id="block.2.line.2">
Use [getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) to find each element with the class 'lineno.' 

Weirdly, getElementsByClassName does not return a JavaScript array. It returns an 'array-like' item. But the return value does not have any of the JavaScript Array methods available.

We want to use the Array methods, so use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) and a pair of brackets to turn the result into an actual Array.
</div>

<div class = "lineComment" id="block.2.line.8">
The innerHTML of the codeBlock element is a string with all the line numbers and newline characters.

Use [String.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) to turn the string into an array, with one element for each line number.  
</div>
<div class = "lineComment" id="block.2.line.9">
Use [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to make a new array out of the array of line numbers. 

The fat arrow '=>' signifies an anonymous function. The anonymous function returns a [Template Liteal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). We can put the value of variables into a string literal using ${value}. 

This function will return a valid HTML string with a div in it. The content of the div will be a line number. The div will have an id in the format of "block.1.line.7". We'll use the HTML api method [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) to find the div later, if a comment has been attached to it.
</div>

<div class = "lineComment" id="block.2.line.15">
Use [Array.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) to make the array of strings that we created on line 9 into one single string.
</div>

<div class = "lineComment" id="block.2.line.17">
Once we set the innerHTML of the codeBlock element, it will be full of divs with ids that we can search for when we need to find lines of code.
</div>

Now the line numbers element will look like this:<br/><br/>
![line numbers with divs and ids](/assets//images/lineNumbersWithDivsAndIds.png)

Each line number can be found by using [document.getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById). Once we have found a div, we can find its position on the page.

# Writing a lineComment
Jekyll posts may contain HTML tags. They will render on the page normally. To write a lineComment the user has to write a div, assign the div the class "lineComment", and give the div an id. The id will contain the block number and the line number, separated by periods. We'll use JavaScript to find lineComments, and split the id property to find the assigned block number and line number.

&lt;div class = "lineComment" id="block.2.line.17"&gt; <br/>
Comment content goes here. It can be *formatted* using **markdown** `even though it's inside a div`. <br/>
&lt;/div&gt;

# Make Jekyll Render Markdown Inside of HMTL
HTML in Jekyll may contain markdown. To tell Jekyll to render markdown inside HTML elements, add the following lines to the _config.yml file:
```
markdown: kramdown
kramdown:
    parse_block_html: true
```

[kramdown](https://kramdown.gettalong.org/) is what Jekyll uses to parse markdown.
[parse_block_html](https://kramdown.gettalong.org/parser/kramdown.html#options) tells kramdown to parse markdown in block HTML tags.

# Find Each Code BLock That Has Line Numbers
To assign the comments to the correct blocks and line numbers, we first need to find each code block that has line numbers.

{% highlight javascript %}
    const codeBlocks = [...document.getElementsByClassName('lineno')];
{% endhighlight %}

[document.getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) finds all elements on the page with the given class name. It returns an 'array-like' object. You can find elements in the array-like object by index, but the JavaScript Array methods are not available on it.

Use the [spread operator ...](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) inside of a pair of angle brackets to make the array-like object into a JavaScript array.

Now we have an array that contains a reference to the 'lineno' element from each code block with line numbers. Inside those elements are the divs with line numbers that we created earlier.

# Find Each lineComment div
Finding all the lineComment divs the user created is similar to finding all the code blocks with line numbers.

{% highlight javascript %}
    const comments = [...document.getElementsByClassName('lineComment')];
{% endhighlight %}

`comments` is an array that contains all the lineComments in the post. We'll filter the `comments` array to find all the comments assigned to a particular code block.

# For Every Code Block, Find All the Assigned Comments
We'll find all the comments assigned to a particular block and put them in an array named `blockComments`. Once we have `blockComments`, we can add styling to each comment inside `blockComments`. We will also set the position.

{% highlight javascript linenos %}
        //get the highest line number from the codeBlock
        const highestLineNumber = parseInt(
            [...codeBlock.childNodes][codeBlock.childNodes.length - 2].innerHTML
        );

        //filter to find the comments that are supposed to go in this block
        const blockComments = comments
            .filter(comment => getBlockNumber(comment) === blockIndex)
            //sort the comments by lineNumber, lowest to highest
            .sort((a, b) => getLineNumber(a) - getLineNumber(b))
            //remove comments with a lineNumber higher than the number of lineNumbers in the code block
            .filter(comment => {
                const lineNumber = getLineNumber(comment);
                const validLinenumber =
                    lineNumber > -1 && lineNumber <= highestLineNumber;
                //if the line number is not valid, add the invalid line number class
                //this will draw the users attention to their attempt to assign a lineNumber comment to an invalid line number
                !validLinenumber && invalidCommentAssignment(comment);

                return validLinenumber;
            });
{% endhighlight %}

<div class="lineComment" id="block.3.line.2">
highestLineNumber is the number inside the last line number div. We can use it to determine if a comment assigned to this block has been given an invalid line number. 
</div>

<div class="lineComment" id="block.3.line.8">
Use [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to return an array with only the comments assigned to this code block. 

All of this code is inside of a call to codeBlocks.forEach, which is where we assign the value of the blockIndex variable.
</div>

<div class="lineComment" id="block.3.line.18">
The invalidCommentAssignment function takes a function, adds a label with the assigned block and line numbers, and gives it a css class that turns it bright red. That way the user can see that they have assigned the comment an invalid block and/or line number. 
</div>

# Position Each Comment
We have the array `blockComments` that contains every comment assigned to this block. This code puts each comment in the correct position. 

{% highlight javascript linenos %}
blockComments.forEach((comment, commentIndex) => {
            //get the assigned line number
            const lineNumber = getLineNumber(comment);

            //generate the id of the target comment
            const commentId = `block.${blockIndex}.line.${lineNumber}`;

            //use getElementById to find the div that contains the line number
            const targetLine = document.getElementById(commentId);

            //find the vertical position of the line number
            const topOffset = getOffsetTop(targetLine);

            //this element gets the comment container style applied
            comment.classList.add('line_comment_container');

            //set the position of the comment
            comment.style.width = `${commentWidth}px`;
            comment.style.top = `${topOffset}px`;
            comment.style.left = `${leftOffset - commentWidth - 48}px`;
{% endhighlight %}

<div class="lineComment" id="block.4.line.3">
The `getLineNumber` function takes a comment and returns the lineNumber from the comment's id property.
</div>

<div class="lineComment" id="block.4.line.9">
`targetLine` is a reference to the element that contains the line number. By finding the position of `targetLine` on the page we can get the numbers we need to set the position of this comment.
</div>

<div class="lineComment" id="block.4.line.12">
The `getOffsetTop` function finds how far the element is from the top of the page. The code for `getOffsetTop` is shown below.
</div>

<div class="lineComment" id="block.4.line.18">
`commentWidth` is calculated earlier based on the width of the wrapper element created by Jekyll. `commentWidth` will be reduced if the screen is very narrow. 
</div>

<div class="lineComment" id="block.4.line.20">
`leftOffset` is calculated earlier. `leftOffset` is calculated using a function that works like the `getOffSetTop` function shown below. 
</div>

# Using Offsets To Find a div On the Page

To line the comments up with a div, we need to know where the top of that div is. Here's the function that takes an element and returns the top offset, which is how far in pixels the top of the element is from the top page. Because the offsetTop property of each element tells us what its top offset is relative to the parent of that element, we have to add the offset of all the parent elements together to get the correct number. Use a while loop to loop through each parent of the element.

{% highlight javascript linenos %}
//takes an element and returns the top offset property
//the distance from the top of the screen in pixels
//calculates by recursively adding the top offset of each parent element
const getOffsetTop = element => {
    let offsetTop = 0;

    //while element evaluates to true
    while (element) {
        //add the offset of the element to offsetTop
        offsetTop += element.offsetTop;

        //set element to offsetParent
        //offsetParent will eventually be undefined
        element = element.offsetParent;
    }
    
    return offsetTop;
};
{% endhighlight %}

<div class = "lineComment" id="block.5.line.10">
+= is the [addition assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Addition_assignment) operator. Adds to a variable and assigns the result as the new value.
</div>

<div class = "lineComment" id="block.5.line.14">
The [HTMLElement.offsetParent](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent) property of an element returns a reference to the nearest parent element.
</div>

There's a similar function that finds the leftOffset, which is how far from the left side of the screen an element is.

## The CSS

{% include lineComments.html %}
