import {
    debouncedPositionAllComments,
    positionAllComments,
} from './modules/positionAllComments.js';
import mobilecheck from './modules/mobileCheck.js';

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

// const isNamedBlock = element => {
//     const pre = element.children[0];
//     const { firstLine, indexOfSecondLine } = getFirstLine(pre);
//     if (firstLine.slice(0, 9).toLowerCase() === 'blockname') {
//         return 'fuck you';
//         console.log(`named block`);
//         name = firstLine.slice(9, firstLine.length).trim();
//         const newInnerHTML = pre.innerHTML.slice(
//             indexOfSecondLine,
//             pre.innerHTML.length
//         );

//         pre.innerHTML = newInnerHTML.trim();
//         console.log(`returning name`, name);
//     }
//     return 'GODDAMN';
// };

//execute on load
//curly brackets mean an IIFE
{
    const getWindowWidth = () =>
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    //store the previous value of the window width so we can check for resize events
    let prevWindowWidth = getWindowWidth();

    //true if the user has a mobile browser
    const isMobile = mobilecheck();

    //set the initial position and format of all comments
    positionAllComments({
        isMobile,
        setup: true,
    });

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
                isMobile,
            });
        }
    });
}
