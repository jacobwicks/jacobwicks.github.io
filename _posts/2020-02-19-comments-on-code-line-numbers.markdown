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
We use JavaScript to find the line numbers for each code block. Each line number is put inside a div and assigned an id. When the user writes a lineNumber comment in their post, they put the lineNumber comment inside of a div. The user assigns the lineNumber comment a code block number and a line number using the div id property. We set the Jekyll config to render markdown inside of HTML elements, so the user can write their comment using markdown syntax even though it is inside of a div.

When the page is rendered we run a JavaScript function to find each code block and each lineNumber comment. For every code block we run a JavaScript function to find the assigned lineNumber comments. For every lineNumber comment in a block we find the assigned line number, reposition the comment to the left of the assigned line number, and apply classes to the comment. We use CSS to make the comment look right. 

Finally, we use JavaScript to listen for the page resize event. When the page resizes, we run the code to position each comment again. That way the comments will appear to stay in the correct position as the user resizes the page.

# Liquid Tags
When you type a code snippet in a Jekyll post, you can tell Jekyll to highlight the code snipped using [Liquid Tags](https://jekyllrb.com/docs/liquid/tags/). Liquid Tags are inside curly brackets and percent signs. The starting and ending Liquid Tags for highlighting JavaScript look like this:

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

# Use JavaScript to Add Ids so You Can Find the Line Numbers
Changed! Changed again!

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

<div class = "lineComment" id="block.3.line.10">
+= is the [addition assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Addition_assignment) operator. Adds to a variable and assigns the result as the new value.
</div>

<div class = "lineComment" id="block.3.line.14">
The [HTMLElement.offsetParent](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent) property of an element returns a reference to the nearest parent element.
</div>

{% include lineComments.html %}
