---
layout: post
title: 'Line Comments Mobile'
date: 2020-02-21 8:00:00 -0800
---

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

<div class = "lineComment" id="block.0.line.7">
This is the code inside the while loop. It will execute as long as the variable `element` returns a truthy value. += is the addition assignment operator. Here, it is adding the value of the offSetTop property of the current element to the value of the variable named offsetTop.
</div>

## How it Works

When the user writes a Jekyll post, they can use Liquid Tags to highlight their code blocks. If they want to, they can tell Jekyll to add line numbers to the code block.

We use JavaScript to find the line numbers for each code block. Each line number is put inside a div and assigned an id. When the user writes a lineComment in their post, they put the lineComment inside of a div. The user assigns the lineComment a code block number and a line number using the div id property. We set the Jekyll config to render markdown inside of HTML elements, so the user can write their comment using markdown syntax even though it is inside of a div.

When the page is rendered we run a JavaScript function to find each code block and each lineComment. For every code block we run a JavaScript function to find the assigned lineComments. For every lineComment in a block we find the assigned line number, reposition the comment to the left of the assigned line number, and use CSS to apply styling to the comment.

Finally, we use JavaScript to listen for the page resize event. When the page resizes, we run the code to position each comment again. That way the comments will stay in the correct position if the user resizes the page.

## How it Works

When the user writes a Jekyll post, they can use Liquid Tags to highlight their code blocks. If they want to, they can tell Jekyll to add line numbers to the code block.

We use JavaScript to find the line numbers for each code block. Each line number is put inside a div and assigned an id. When the user writes a lineComment in their post, they put the lineComment inside of a div. The user assigns the lineComment a code block number and a line number using the div id property. We set the Jekyll config to render markdown inside of HTML elements, so the user can write their comment using markdown syntax even though it is inside of a div.

When the page is rendered we run a JavaScript function to find each code block and each lineComment. For every code block we run a JavaScript function to find the assigned lineComments. For every lineComment in a block we find the assigned line number, reposition the comment to the left of the assigned line number, and use CSS to apply styling to the comment.

Finally, we use JavaScript to listen for the page resize event. When the page resizes, we run the code to position each comment again. That way the comments will stay in the correct position if the user resizes the page.

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

<div class = "lineComment" id="block.1.line.2">
Use [getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) to find each element with the class 'lineno.'

Weirdly, getElementsByClassName does not return a JavaScript array. It returns an 'array-like' item. But the return value does not have any of the JavaScript Array methods available.

We want to use the Array methods, so use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) and a pair of brackets to turn the result into an actual Array.

</div>

<div class = "lineComment" id="block.1.line.8">
Use [getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) to find each element with the class 'lineno.'

Weirdly, getElementsByClassName does not return a JavaScript array. It returns an 'array-like' item. But the return value does not have any of the JavaScript Array methods available.

We want to use the Array methods, so use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) and a pair of brackets to turn the result into an actual Array.

</div>

{% include lineCommentsMobile.html %}
