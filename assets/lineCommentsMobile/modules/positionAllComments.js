import { debounce } from './debounce.js';
import { getBlockComments } from './getBlockComments.js';
import { getCSSLineHeight } from './getCSSLineHeight.js';
import { getOffsetLeft } from './getOffsetLeft.js';
import { identifyInvalidCommentAssignments } from './identifyInvalidCommentAssignments.js';
import { positionComment } from './positionComment.js';
import { setupCodeBlocks } from './setupCodeBlocks.js';

//finds all elements with the lineComment class
//positions them next to their assigned code block and line number
//if reposition is false, it's the first time, so it adds some interior elements to make content display correctly
export const positionAllComments = reposition => {
    const isMobile = true;
    //wrapper is an element added by Jekyll
    const wrapper = document.getElementsByClassName('wrapper')[0];
    //we use the width of wrapper as the basis for calculating how wide to make the comments
    const wrapperWidth = wrapper.offsetWidth;
    //get the distance between the left side of the wrapper and the edge of the screen
    const wrapperLeft = getOffsetLeft(wrapper);

    //calculate commentWidth
    //commentWidth will be reduced later if the screen width is narrow
    let commentWidth =
        wrapperWidth * 0.5 > wrapperLeft ? wrapperLeft : wrapperWidth * 0.5;

    //get all lineComments from the document
    //getElementsByClassName returns an HTMLCollection
    //HTMLCollection is array-like, but is NOT a JavaScript Array
    //use the spread operator to make it an array
    const comments = [...document.getElementsByClassName('lineComment')];

    //get the line number element for each code block
    const codeBlocks = [...document.getElementsByClassName('lineno')];

    //first time through
    if (!reposition) {
        //set up the code blocks- add divs and ids to the line numbers
        setupCodeBlocks({ codeBlocks, comments, isMobile });

        //find all comments assigned to invalid block numbers
        identifyInvalidCommentAssignments({ codeBlocks, comments });
    }

    //get the value of CSS variable lineHeight
    //this is computed in the .css file
    //returns a string number followed by 'px', slice off the px
    const lineHeight = getCSSLineHeight();

    parseInt(
        getComputedStyle(document.body)
            .getPropertyValue('line-height')
            .slice(0, -2)
    );

    // for each code block element with line numbers
    codeBlocks.forEach((codeBlock, blockIndex) => {
        //find the td element that holds the code inside this code block
        //jekyll generates this td element
        const innerCodeElement = document.getElementsByClassName('code')[
            blockIndex
        ];

        //compute the style of the post width element created by jekyll
        //on mobile, the comment container will this wide
        const postWidth = document.querySelector('.post-content, .e-content')
            .offsetWidth;

        //filter all comments to find the comments that are supposed to go in this block
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
        });

        //get the left offset to position the comments horizontally
        const leftOffset = isMobile
            ? getOffsetLeft(innerCodeElement)
            : getOffsetLeft(codeBlock);

        //commentWidth is used for the desktop layout, not used on mobile
        //if comments are wider than the offset, they'll appear partially offscreen
        if (commentWidth > leftOffset && leftOffset > 50) {
            //set commentWidth to offset minus 50 to keep comment onscreen
            commentWidth = leftOffset - 50;
        }

        //position each comment next to its assigned line number in this block
        blockComments.forEach(comment => {
            positionComment({
                blockIndex,
                comment,
                commentWidth,
                isMobile,
                leftOffset,
                lineHeight,
                postWidth,
            });
        });
    });
};

//a debounced function handles repeated calls by waiting until the calls stop
//then calling itself once
//resize events can happen repeatedly, don't want to run the code that many times
export const debouncedPositionAllComments = debounce(positionAllComments);
