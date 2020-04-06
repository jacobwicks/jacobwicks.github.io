---
layout: post
title: 'Use JavaScript to Find the First Line of Text in an Element'
date: 2020-02-26 8:00:00 -0800
---

Sometimes you want to find the first line of text. If you want to apply styling to it, you can use the [CSS first-line selector](https://css-tricks.com/almanac/selectors/f/first-line/). That's pretty simple, if it works for what you want to do. But first-line is a CSS ['psuedo-selector'](https://css-tricks.com/pseudo-class-selectors/). Pseudo-selectors are not technically part of the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), and because they are not part of the DOM they can't be manipulated by JavaScript.

So here's how to find the first line of text inside an element if you need to manipulate it using JavaScript.

* Find the height of a single line of text
* Split the text of the element into an array
* Loop through the array of text from the element
* Add the current chunk of text to all the text so far
* Compare the height of an element containing the current text to the single line height
* If the element is not taller than the single line height, store the current text as 'previous text' and loop again
* If the element is taller than the single line height, the 'previous text' is the first line

{% highlight javascript linenos %}
blockName: findFirst
const getFirstLine = el => {
    const text = el.innerHTML;

    //set the innerHTML to a character
    el.innerHTML = 'a';
    //get the offsetheight of the single character
    const singleLineHeight = el.offsetHeight;

    //split all innerHTML on spaces
    let arr = text.split(' ');

    //cur is the current value of the text we are testing to see if
    //it exceeds the singleLineHeight when set as innerHTML
    //prev is the previously tested string that did not exceed the singleLineHeight
    //cur and prev start as empty strings
    let cur = '';
    let prev = '';

    //loop through, up to array length
    for (let i = 0; i < arr.length; i++) {
        //examine the rest of text that is not already in previous string
        let restOfText = text.substring(prev.length, text.length);

        //the next space that is not at index 0
        const nextIndex =
            restOfText.indexOf(' ') === 0
                ? restOfText.substring(1, restOfText.length).indexOf(' ') + 1
                : restOfText.indexOf(' ');

        //the next part of the rest of the text
        cur += restOfText.substring(0, nextIndex);

        //set the innerHTML to the current text
        el.innerHTML = cur;

        //now we can check its offsetHeight
        if (el.offsetHeight > singleLineHeight) {
            //once offsetHeight of cur exceeds singleLineHeight
            //previous is the first line of text
            //set innerHTML = prev so
            el.innerHTML = prev;
            //we can grab the innertext
            let firstLine = el.innerText;
            let indexOfSecondLine = prev.lastIndexOf('<');

            //reset el
            el.innerHTML = text;

            return firstLine;
        }

        //offsetheight did not exceed singleLineHeight
        //so set previous = cur and loop again
        //prev = cur + ' ';
        prev += cur.substring(prev.length, cur.length);
    }
};

{% endhighlight %}

<div class='lineComment' id='{block: findFirst, line: 2 }'>
Get the innerHTML of the element.
</div>


<div class='lineComment' id='{block: findFirst, line: 7 }'>
We need to know how tall a single row of text is. `singleLineHeight` is the height of a single row. We'll keep adding chunks of text to our element until it exceeds the height of a single row. 
</div>

<div class='lineComment' id='{block: findFirst, line: 10 }'>
[`String.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) will split a string into an array on the given separator characters. We split the innerText on the space character because the space character is where web browsers will start a new line of text.
</div>

<div class='lineComment' id='{block: findFirst, line: 16 }'>
`cur` and `prev` will store the text we are currently comparing to `singleLineHeight` and the previous text. Once the height of `cur` exceeds `singleLineHeight`, then we know that `prev` was the first line of text. 
</div>

<div class='lineComment' id='{block: findFirst, line: 20 }'>
The [for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement). We loop through all the chunks of text in the array. 
</div>

<div class='lineComment' id='{block: findFirst, line: 22 }'>
The rest of the text following all the text that we've previously looked at. Use the [String.substring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring) method to get part of a string.
</div>

<div class='lineComment' id='{block: findFirst, line: 25 }'>
Find the next space character that is not at index 0 of the rest of the text. We'll use this index to create the current string that we'll compare to the `singleLineHeight`. 
</div>

<div class='lineComment' id='{block: findFirst, line: 26 }'>
The [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) evaluates the first statement. It returns the value after the '?' if it is true, the value after the ':' if it is false.  
</div>

<div class='lineComment' id='{block: findFirst, line: 26 }'>
Add the next chunk of text to `cur`.
</div>

<div class='lineComment' id='{block: findFirst, line: 31 }'>
[`+=` is the addition assignment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Addition_assignment). Also known as concatenation. Adds the value on the right to the value on the left.
</div>

<div class='lineComment' id='{block: findFirst, line: 37 }'>
The content of the element `el` is set to the current text `cur`. So we can compare the height of `el` to the `singleLineHeight` and see if it is taller.
</div>

<div class='lineComment' id='{block: findFirst, line: 43 }'>
Get the text of the first line.
</div>


<div class='lineComment' id='{block: findFirst, line: 49 }'>
Return the first line of text.
</div>

{% include lineCommentsMobile.html %}