---
layout: post
title: 'AutoIncorrect'
date: 2020-03-11 10:51:46 -0800
categories: javascript html css
---

![AutoIncorrect in Action](/assets//images/2020-03-11/AutoIncorrect.gif)

AutoIncorrect is a project that I made to practice using HTML, CSS, and JavaScript without any libraries like jQuery or React. It accepts an input string from the user and generates an output string that includes realistic typos. It models and displays a keyboard on the screen. It uses the keyboard model to create realistic typos based on the homerow keys, the error frequency and severity settings entered by the user, and the relative position and distance of keys from each other in the keyboard model. To give the feeling of working on an old computer it also animates through the input string, highlights keys on the keyboard display and shows a cursor highlight in both the input and output fields. And it uses the browser AudioContext to make beeping sounds.

<details><summary markdown="span">Let's see some code!</summary>
```python
print('Hello World!')
```
Of course, it has to be Hello World, right?
</details>
<br/>

<details><summary markdown="span">Collapsible Code Block</summary>
```javascript
console.log('Hello World!')
```
Of course, it has to be Hello World, right?
</details>
<br/>

<details><summary markdown="span">Collapsible Code Block</summary>
{% highlight javascript linenos %}
blockName collapsible
console.log('hello world')
{% endhighlight %}
Of course, it has to be Hello World, right?
</details>

<div class = "lineComment" id='{
    block: collapsible,
    line: 1
    }'>
Hello world is the best thing to say in a program
</div>

<br/>
## The Set Up
AutoIncorrect has one HTML file, index.html, one CSS file, style.CSS, and many javascript files that are contained in the folder called modules.

It makes use of [Google's Roboto font](https://fonts.google.com/specimen/Roboto).

# index.html

The index.html file is pretty simple. The keyboard buttons for the keyboard display are added using JavaScript, so the HTML is just responsible for the basic layout.

-   Import the Roboto font
-   Import the CSS stylesheet
-   Header with the title in it
-   Div that will contain settings checkboxes/sliders
-   The GO button
-   The keyboard div
-   The input container
-   The div behind the input container that will contain the cursor
-   The output container

# style.css

The css file uses [the outset border](https://www.w3schools.com/cssref/tryit.asp?filename=trycss_border-style8) to makes the keyboard keys look 3d. It sets the colors, including bright green for highlighting the current input and red to show when a typo has been made. It also has the custom styling for the slider and checkbox elements.

-   Keyboard keys with the 3d effect
-   Big output display keys
-   Cursor
-   Highlight and mistake colors
-   Backdrop element
-   Slider and Checkbox styling

# setup.js

setup.js is imported into index.html as a module so that it can import javascript from the other files in the modules folder. Setup does the following:

-   Get references to commonly used elements
-   Create the keyboard model
-   Set up the keyboard display
-   Use the typo functions to add typos to the header
-   Set initial Settings
-   Set up the settings div, where the user can change settings
-   Make the GO button work

## Settings and the Input Elements

-   Creating input elements
-   Checkboxes
-   Sliders
-   Controlling elements
-   Bind to settings

# How it Works

First, the program generates a model of a keyboard from strings that represent the uppercase and lowercase characters in each row. The model is an array of arrays, with each array representing a row of uppercase and lowercase characters. This model is used to generate the display and to generate typos by finding keys that are near the target key or on the path from the target key to the closest key in the [homerow](https://www.computerhope.com/jargon/h/hrk.htm).

There is also an array of offset values that determine how many key-widths the start of a row is offset from the left side. The offset values are used in both the display and when calculating the distance between keys.

The Settings box contains inputs for each of the settings: frequency, severity, transposition, missedCharacters, and extraCharacters. The Settings box also lets the user turn animation and sound on or off.

The user types an input string into the input field. When the user hits the GO! button, the program reads the input string, generates an array of input and output characters, then displays the output in the output div. If the user has animations or sound turned on, then the animations and/or sound will play as the output is displayed.

# Making a Typo

For each character in the input string, we first see if it is present in the keyboard model. The model just has the upper and lower case keys from my laptop keyboard, so it is possible that the user will enter a key that isn't in the model. If it isn't in the model string then we add the character to the output array without making a typo.

# Use the Settings to Decide if a Typo has Been Made

If the character is present in the keyboard model then we use the settings to see if we should generate a typo. If a randomly generated integer from 1-100 is less than frequency, a typo has been made. The typo function is called with the keyboard model and the settings, and it returns the mistake.

The typo function uses the model of the keyboard to figure out which key has been hit by mistake. Reacll that the model of the keyboard is an array of arrays. The typo function finds the index of the target key. Then it finds all the keys that are within 1 or 2 keys of the target key. It also finds all the keys on the path from the target key to the closest key in the homerow. The array of keys on the path is sorted from closest to the target to farthest.

Once it has found all the possibly typos from the target key, the typo function calls a weighted random number generator. The weighted random number generator may return the full range from min to max, but tends to pick numbers towards the min value. The higher the value of the 'severity' setting, the more likely the weighted random number generator is to return a higher value. The weighted number generator is used to determine if a key on the path or one of the surrounding keys is selected, and then used to select the key on the path. Using the weighted number generator to choose from the array of keys on the path makes it more likely that the typo will be a key close to the target key, which makes the typos more realistic.

# Displaying the Typos

If the user doesn't have animation turned on, then the result array is reduced to an output string and put into the output container on the screen.

If the user has animation turned on, then the animation function is called with the result array. For each character in the input string the animation function highlights the target key on the keyboard, puts a cursor in the input textarea, puts a cursor in the output div, and highlights the result in red on the keyboard if a mistake is made. The input and output characters are also displayed in the large boxes above the keyboard.

# Making Noise

If sound is turned on the web browser audioContext will be used to make a beeping noise for each input character. The tone of the beep corresponds to the row on the keyboard. If a tpyo is made then the tone changes to indicate a typo.

That's it!

### The Functions

## Settings

# The Settings Div

![settings div](/assets//images/2020-03-11/settings.png)

The settings div starts in the index.html file.

{% highlight html %}
{% raw %}

<div class="settings"></div>
{% endraw %}
{% endhighlight %}
Not much to it!

Then setup.js creates the settings object where the settings values are stored and calls the functions that add the input elements to the settings div.

Here is the default settings object:

{% highlight javascript %}
//the settings for the typos
const settings = {
//audioContext will store an AudioContext player after the createAudioContext function has been called
audioContext: undefined,

        //if animation is true, the animation of input to output will play
        //if false, output will be displayed instantly
        animation: true,

        //if beeps is true, you'll hear some excellent beeping noises
        beeps: true,

        //%chance to add an extra character on a typo
        extraCharacters: 20,

        //frequency is a number 0-100
        //it is the % chance that a typo will occur
        frequency: 20,

        //%chance to miss a character on a typo
        missedCharacters: 20,

        //severity is a number 1-4
        //it changes how likely it is that typos are more 'severe', or farther from the intended key
        //the higher the number, the more likely it is that a typo will select a key that is far from the intended key
        //the lower the number, the more likely a typo will select a key close to the intended key
        severity: 2,

        //the likelihood of transposing the current character with the next character
        transposition: 40,
    };

{% endhighlight %}

The makeCheckbox function returns a checkbox element.

{% highlight javascript linenos %}
blockName makeCheckbox
//makes a checkbox element with the provided label and name
const makeCheckbox = ({ label, checked, name }) => {
const checkbox = document.createElement('label');

    checkbox.setAttribute('class', 'checkbox__container');

    checkbox.innerHTML = `${label}<input type="checkbox" id="${name}CheckboxInput" ${
        checked ? "checked='checked'" : ''
    }/><span class="checkmark"></span>`;

    return checkbox;

};
{% endhighlight %}

controlCheckbox attaches a checkbox to the settings object.

{% highlight javascript %}
const controlCheckbox = (name, settings) => {
//find the checkbox
const checkbox = document.getElementById(`${name}CheckboxInput`);

    //when the value changes, check or uncheck the checkbox
    checkbox.addEventListener('change', ({ target }) =>
        target.checked ? (settings[name] = true) : (settings[name] = false)
    );

};
{% endhighlight %}

{% highlight javascript %}
//the controlCheckbox function bound to the settings object
const bindCheckbox = name => controlCheckbox.bind(null, name, settings)();
{% endhighlight %}

The makeSlider function returns a slider element.

{% highlight javascript linenos %}
blockName makeSlider
//makes a slider element with the given label and value
const makeSlider = ({ label, max = 100, min = 0, name, value }) => {

    const slider = document.createElement('div');

    slider.setAttribute('class', 'slider__container');

    slider.innerHTML = `${label}<span id="${name}Display">${value}</span><input type="range" min="${min}" max="${max}" value="${value}" class="slider" id="${name}Slider"/>`;

    return slider;

};
{% endhighlight %}

controlSlider attaches a slider to the settings object.

{% highlight javascript %}
//control slider accepts a name
//and hooks up the slider element to the value in the settings object
//and the value shown in the display element
const controlSlider = (name, settings) => {
//find the slider
const thisInput = document.getElementById(`${name}Slider`);

    // Update the current slider value (each time you drag the slider handle)
    thisInput.oninput = function() {
        const setting = this.value;
        const thisDisplay = document.getElementById(`${name}Display`);
        settings[name] = setting;
        thisDisplay.innerHTML = setting;
    };

};
{% endhighlight %}

{% highlight javascript %}
//the controlSlider function bound to the settings object
const bindSlider = name => controlSlider.bind(null, name, settings)();
{% endhighlight %}

## Random Numbers

Generating random numbers is an important part of deciding whether to make a typo for any given input character. Random numbers are also used to select the character that results from the typo. Here is the getRandomInt function. It can generate random integers between any requested values. By default it will generate a number between and including 1-100.

{% highlight javascript linenos %}
blockName getRandomInt
//returns a random integer
//if no min and max, 1-100
const getRandomInt = (min = 1, max = 100) => {
min = Math.ceil(min);

    max = Math.floor(max);

    max < min && (max = min + 1);

    return Math.floor(Math.random() * (max - min + 1)) + min;

};
{% endhighlight %}

<div class = "lineComment" id='{
    block: getRandomInt,
    line: 4
    }'>
[Math.ceil](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) rounds a number up to the nearest integer.  
</div>

<div class = "lineComment" id='{
    block: getRandomInt,
    line: 6
    }'>
[Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) rounds a number down to the nearest integer.  
</div>

<div class = "lineComment" id='{
    block: getRandomInt,
    line: 8
    }'>
If max was less than min, set it to min + 1.  
</div>

<div class = "lineComment" id='{
    block: getRandomInt,
    line: 10
    }'>
[Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) generates a decimal between 0 and 1. Multiply it by the result of max - min + 1. Then add min to the result to ensure that the minimum result is equal to the requested minimum value.
</div>

getRandomInt is used throughout the program wherever we need a random integer.

severityWeightedRandomNumber is another random number generating function. It will generate a random number inside the requested range, but is designed to be more likely to generate a lower number.

It is used to pick typos from the array of possible typos for a given input. The arrays are sorted from the most likely key to be struck to the least likely. So by picking from the low end of the range more often we generate the most likely typos more than the least likely.

Severity is a setting that the user can change. Severity makes the typos worse by making it more likely to pick keys that are farther away from the intended key on the keyboard. Increasing the value of severity will make severityWeightedRandomNumber more likely to pick a higher number.

{% highlight javascript linenos %}
blockName severityWeightedRandomNumber
//returns a random integer betweeen/including min and max
//weighted toward returning min
//the higher the value of severity, the more likely to return max
const severityWeightedRandomInt = (min, max, severity) => {
//increment min and max for rounded calculation
min++;
max++;

    //this generates a number that is weighted toward the min value
    //max divided by a random percentage of max plus min
    const rounded = Math.round(max / (Math.random() * max + min)) - 1;

    //value of severity may be 1-4
    //if severity is greater than a random int,
    if (getRandomInt(1, 3) < severity) {
        //decrement max back down to provided value
        max--;
        //add a random int up to the value of severity to the result
        const result = rounded + getRandomInt(0, severity);

        //if result is greater than max, return max
        return result > max ? max : result;
    } else return rounded;

};
{% endhighlight %}

### The Keyboard

This is how the keyboard is displayed on screen:
![keyboard](/assets//images/2020-03-11/keyboard.png)

The onscreen display is made using a model in the form of an array of arrays of objects that contain an uppercase value and a lowercase value. The typos are also generated by looking at the relationship of keys inside this model.

## Modeling the Keyboard

The getKeyBoard function creates the model of the keyboard. The model of the keyboard is created from these strings:

{% highlight javascript linenos %}
//string for the lowercase characters in row0
const row0Lower = '`1234567890-=';
//string for the uppercase characters in row0
const row0Upper = '~!@#\$%^&\*()\_+';

    const row1Lower = 'qwertyuiop[]';
    const row1Upper = 'QWERTYUIOP{}|';

    //double quotes because the single quote is in this row
    const row2Lower = "asdfghjkl;'";
    const row2Upper = 'ASDFGHJKL:"';

    const row3Lower = 'zxcvbnm,./';
    const row3Upper = 'ZXCVBNM<>?';

{% endhighlight %}

The makeRow function creates a keyboard row array from two strings.

{% highlight javascript linenos %}
//makeRow accepts two strings and returns an array of objects with lower and upper properties
//we'll use it to make row arrays for our keyboard model
const makeRow = (rowLowercase, rowUppercase) =>
Array.from(rowLowercase).map((lower, index) => ({
//the lowercase character
lower,
//the uppercase character
upper: rowUppercase.charAt(index),
}));
{% endhighlight %}

The getKeyboard function returns an array of arrays made using makeRow:

{% highlight javascript linenos %}
return [
makeRow(row0Lower, row0Upper),
makeRow(row1Lower, row1Upper),
makeRow(row2Lower, row2Upper),
makeRow(row3Lower, row3Upper),
row4,
];
{% endhighlight %}

The offset values determine how many key-widths the start of a row is offset from the left side:
{% highlight javascript %}
offsets: [0, 1, 1.5, 2, 4],
{% endhighlight %}

The offset values are used in both the display and when calculating the distance between keys.

## Displaying the keyboard on the screen

The array.forEach method is used to put the keys from each row on the screen.

{% highlight javascript linenos %}
//displays all the keys from the keyboard on the screen
//as span elements inside the keyboard div
const setupKeyboardDisplay = ({ keyboard, offsets }) => {
//use html api to select the keyboard div
//reference this variable to add keys to the keyboard
const keyboardDiv = document.querySelector('.keyboard');

    //add each key in keyboard to the keyboardDiv
    keyboard.forEach((row, rowIndex) => {
        //the div that represents this row
        const thisRowDiv = document.createElement('div');
        //we can find it again later by searching for id
        thisRowDiv.setAttribute('id', `row${rowIndex}`);
        //the css class for keyboard row
        thisRowDiv.setAttribute('class', 'keyboard__row');

        //if the keys are offset, make a blank key to put on the left
        if (!!offsets[rowIndex] && rowIndex < 4) {
            const blankKeySpan = document.createElement('span');

            //assign the css class
            blankKeySpan.setAttribute('class', 'keyboard__blank');

            //without a non breaking space the span will render with a height offset
            blankKeySpan.innerHTML = '&nbsp';

            //width of a key - 25 pixels - times the offset width
            blankKeySpan.style.width = `${Math.ceil(
                25 * offsets[rowIndex]
            ).toString()}px`;

            if (rowIndex === 3) {
                blankKeySpan.innerHTML = 'Shift';
                blankKeySpan.setAttribute('id', 'shiftKey');
            }

            //add the blank to the row
            thisRowDiv.appendChild(blankKeySpan);
        }

        if (rowIndex < 4) {
            row.forEach(key => {
                //the space breaks. the non-breaking space doesn't
                key.lower === ' ' && (key = '&nbsp');
                const thisKeySpan = document.createElement('span');
                thisKeySpan.setAttribute('id', `keyCharacter${key.lower}`);
                thisKeySpan.setAttribute('class', 'keyboard__key');
                thisKeySpan.innerHTML = key.lower;
                thisRowDiv.appendChild(thisKeySpan);
            });
        } else {
            //it's the spacebar, which gets special treatment
            //if you change the model, you may have to change this code
            const spacebarSpan = document.createElement('span');

            //keyCharacter followed by a space ' ';
            spacebarSpan.setAttribute('id', 'keyCharacter ');
            spacebarSpan.setAttribute('class', 'keyboard__spacebar');

            thisRowDiv.appendChild(spacebarSpan);
        }
        keyboardDiv.appendChild(thisRowDiv);
    });

};
{% endhighlight %}

## Navigating the Keyboard

To make realistic typographical errors, we first take the input character, locate the row and key index of the target character on the keyboard. Then we find the nearest key that is in the homerow. The keys on the path from the nearest homerow key to the target key are the most likely typos. To complete the set of possible typos we also find all keys within 1 key of the target key and all keys within 2 keys of the target key.

The keyboard navigation functions include

-   distanceFrom
-   getClosestHomeRow
-   getIndexOfCharacter
-   getKeysAround

# Getting the Index of a Character on the Keyboard

To get the index of a character in the keyboard, loop through each row. In each row, loop through each column. If the uppercase or lowercase item is the target character, return the row and column indexes. If the match for the target character is found in the uppercase, return isUppercase = _true_. If the target character is not found, return undefined.

{% highlight javascript linenos %}
//getIndexOfCharacter accepts a letter and finds it in the keyboard
//it will return an object with row, column, and isUppercase boolean
//if the character is not found, it will return undefined
const getIndexOfCharacter = (character, keyboard) => {
//if there's no keyboard or no character, we're not going to find an index
if (!keyboard || !character) return undefined;

    let returnIndex;

    //loop through each row
    for (let row = 0; row < keyboard.length; row++) {
        //the Array.findIndex method used below just returns a number, not an object
        //so create a variable to track if the character is uppercase out here
        let isUppercase = false;

        //pass a callback function to Array.findIndex
        //to examine each element in the array and return the index of the element that returns true
        const column = keyboard[row].findIndex(characters => {
            //if the character is not a space, and matches the upper case
            if (character !== ' ' && characters.upper === character) {
                //it's uppercase
                isUppercase = true;
            }

            //findIndex will return the index when this expression is true
            return (
                characters.upper === character || characters.lower === character
            );
        });

        //if no match is found, column will be -1
        //so if column > -1, a match has been found
        if (column > -1) {
            //set the values in returnIndex
            returnIndex = {
                row,
                column,
                isUppercase,
            };
            //and return it
            return returnIndex;
        }
    }

    return returnIndex;

};
{% endhighlight %}

# Finding the Distance from One Key to Another

Finding the distance from one key to another is an important part of simulating the most likely typographical errors. The `distanceFrom` function accepts two indexes and the `keyboardModel` object. If the optional argument `returnPath` is _true_ then the array of keys on the path from index1 to index2 will be returned in addition to the distance.

To find the distance from one key to another, we'll decide which index is the 'upper' index and which is the 'lower' index. The upper index is the index with the lowest row number. If both indexes have the same row number, then the upper index is the index with the lowest column. We start at the lower index and move up the keyboard one key at a time to the upper index.

A single move goes from one key in the model to another adjacent key. A single move can either

-   decrease the row number by one- a vertical move
-   decrease or increase the column number by one - a horizontal move
-   decrease the row number by one _and_ decrease or increase the column number by one - a diagonal move

We'll increment the distance every time we move. Once we reach the upper index, we have determined the distance and are ready to return a result.

An interesting part of solving this problem is how to deal with the offsets. Each row of keys is offset from the left side of the keyboard by some amount. The offsets in the model are the same as on my laptop keyboard. This is what the model looks like on the screen:

![keyboard](/assets//images/2020-03-11/keyboard.png)

The offsets make some keys inaccessible by a diagonal move. Consider the diagonal move from 's' to 'c'. Row 2, column 2 is 's'. Row 3, column 3 is 'c'. Without the offsets, you could make a single diagonal move up one row and over one column to move from 'c' to 's'. But if you look at the keyboard above, 's' is not adjacent to 'c'. The way we account for that in the model is whenever

{% highlight javascript linenos %}
//accepts two indexes, returns a number and
//if returnPath === true, also an array of keys on the path from index1 to index2
//the first index is the target key
const distanceFrom = ({ index1, index2, keyboardModel, returnPath }) => {
//keyboard is the array of arrays with elements containing upper and lowercase characters
//the offsets are how far each row is shifted relative to others
const { keyboard, offsets } = keyboardModel;

    let distance = 0;
    //if returnPath, make an array of each key on the path
    //the path is an array of the keys on the path from index1 to index2
    //not including index1, because index1 is the target key
    const keysOnPath = [keyboard[index2.row][index2.column]];

    //if they are the same key, return
    if (index1.row === index2.row && index1.column === index2.column)
        return returnPath
            ? {
                  distance,
                  path: [],
              }
            : distance;

    //the upper index is the character closer to the top left of the keyboard
    //if index 1 and 2 are on the same row,
    // upperIndex will be the character with the lower column
    const index1IsUpper =
        index1.row === index2.row
            ? index1.column < index2.column
            : //else, upperIndex will be the character with the lower row
              index1.row < index2.row;

    const upperIndex = index1IsUpper ? index1 : index2;

    const lowerIndex = index1IsUpper ? index2 : index1;

    //the column of the index closer to the bottom of the keyboard (higher row number)
    //is offset from the from the column of the index closer to the top (lower row number)
    //by offsets[higherRow] - offsets[lowerRow]
    let offset = offsets[lowerIndex.row] - offsets[upperIndex.row];

    //start the currentPosition at the lower index
    //we'll loop and move 1 key at a time until we reach the upperIndex
    let currentPosition = {
        row: lowerIndex.row,
        column: lowerIndex.column,
    };

    //use while loop to move from currentPosition to upperIndex
    while (
        currentPosition.row !== upperIndex.row ||
        currentPosition.column !== upperIndex.column
    ) {
        //rowDifference will always be 0 or positive number
        const rowDifference = !!(currentPosition.row - upperIndex.row);

        //columnDifference may be 0, or positive or negative
        const columnDifference = currentPosition.column - upperIndex.column;

        if (rowDifference && columnDifference) {
            //large offsets make diagonals more costly
            //if the offset is greater than 0.5 when making a diagonal move
            //distance increases by one
            //this lets you correctly model the distance between keys that are staggered on the keyboard
            if (offset > 0.5) {
                offset--;
                distance++;
            }

            //make a diagonal move by decrement row and adjust column + or - as needed
            //decrement row
            currentPosition.row--;
            //if columnDifference is positive, decrement. if negative, increment
            columnDifference > 0
                ? currentPosition.column--
                : currentPosition.column++;
        } else if (rowDifference && !columnDifference) {
            //rowDifference is the difference between the lowerIndex.row and upperIndex.row
            //because lowerIndex is by definition below the upperIndex or on the same row in the keyboard model
            //rowDifference will always be positive or 0, so only decrement
            currentPosition.row--;
        } else if (columnDifference && !rowDifference) {
            //columnDifference is the difference between the columns
            //it can be positive or negative or 0,
            //depending on if the lowerIndex column is to the left or right of the upperIndex column
            columnDifference > 0
                ? currentPosition.column--
                : currentPosition.column++;
        }
        //if currentPosition is not index1
        //add currentPosition to keysOnPath array
        if (
            currentPosition.row !== index1.row ||
            currentPosition.column !== index1.column
        ) {
            //we want the array keysOnPath to be in the order Closest to index1, furthest from index1
            //if index1 is the upper index
            //then we are approaching closer to index1 with each move => use Array.unshift
            //if index1 is the lower index
            //then we are moving further away from it with each move => use Array.push
            index1IsUpper
                ? keysOnPath.unshift(
                      keyboard[currentPosition.row][currentPosition.column]
                  )
                : keysOnPath.push(
                      keyboard[currentPosition.row][currentPosition.column]
                  );
        }

        //increment distance by 1
        distance++;
    }

    //if returnPath, then return the distance and the array of keys on the path
    return returnPath
        ? {
              distance,
              path: keysOnPath,
          }
        : //else just return distance
          distance;

};
{% endhighlight %}

## Adding Typos

o Using the settings to decide whether to generate a typo
o Generating a mistake

## Animating output

o Using setTimeout and recursion to iterate through the results array
o Making the cursor appear
 Making the cursor appear in the input field
 Making the cursor appear in the output field
o Showing the input and the output in the big fi

## Making noise

o Starting audioContext and keeping it available
o Generating beeps in various places
 Tone reflects row on keyboard

{% include lineCommentsMobile.html %}
