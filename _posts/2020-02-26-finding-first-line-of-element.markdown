---
layout: post
title: 'Use JavaScript to Finding the First Line of Text in an Element'
date: 2020-02-26 8:00:00 -0800
---
// const getFirstLine = el => {
//     const text = el.innerHTML;

//     //set the innerHTML to a character
//     el.innerHTML = 'a';
//     //get the offsetheight of the single character
//     let initial = el.offsetHeight;

//     //split all innerHTML on spaces
//     let arr = text.split(' ');

//     //cur is the current value of the text we are testing to see if
//     //it exceeds the initial offsetHeight when set as innerHTML
//     //prev is the previously tested string that did not exceed the offset height
//     //cur and prev start as empty strings
//     let cur = '';
//     let prev = '';

//     //loop through, up to array length
//     for (let i = 0; i < arr.length; i++) {
//         //examine the rest of text that is not already in previous string
//         // let restOfText =
//         //     i > 0 ? text.substring(prev.length + 1, text.length) : text;
//         let restOfText = text.substring(prev.length, text.length);
//         //the next space that is not at index 0
//         const nextIndex =
//             restOfText.indexOf(' ') === 0
//                 ? restOfText.substring(1, restOfText.length).indexOf(' ') + 1
//                 : restOfText.indexOf(' ');

//         //the next part of the rest of the text
//         cur += restOfText.substring(0, nextIndex);

//         //set the innerHTML to the current text
//         el.innerHTML = cur;

//         //now we can check its offsetHeight
//         if (el.offsetHeight > initial) {
//             //once offsetHeight of cur exceeds initial
//             //previous is the answer
//             //set innerHTML = prev so
//             el.innerHTML = prev;
//             //we can grab the innertext
//             let firstLine = el.innerText;
//             let indexOfSecondLine = prev.lastIndexOf('<');

//             //reset el
//             el.innerHTML = text;
//             return {
//                 firstLine,
//                 indexOfSecondLine,
//             };
//         }

//         //offsetheight did not exceed initial
//         //so set previous = cur and loop again
//         //prev = cur + ' ';
//         prev += cur.substring(prev.length, cur.length);
//     }
// };
