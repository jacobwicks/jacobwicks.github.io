import { debounce } from './debounce.js';
import { closeAllComments } from './closeComments.js';
import { getBlockComments } from './getBlockComments.js';
import { getCSSLineHeight } from './getCSSLineHeight.js';
import { getOffsetLeft } from './getOffsetLeft.js';
import { identifyInvalidCommentAssignments } from './identifyInvalidCommentAssignments.js';
import { parseCommentIds } from './parseCommentIds.js';
import { positionComment } from './positionComment.js';
import { setupCodeBlocks } from './setupCodeBlocks.js';

//finds all elements with the lineComment class
//positions them next to their assigned code block and line number
//if setup is true, it's the first time, so it adds some interior elements to make content display correctly
export const positionAllComments = ({
    codeBlocks,
    comments,
    details,
    isMobile,
    setup,
}) => {
    //wrapper is an element added by Jekyll
    const wrapper = document.getElementsByClassName('wrapper')[0];
    //we use the width of wrapper as the basis for calculating how wide to make the comments
    const halfWrapperWidth = Math.floor(wrapper.offsetWidth * 0.5);
    //get the distance between the left side of the wrapper and the edge of the screen
    const wrapperLeft = getOffsetLeft(wrapper);

    //calculate commentWidth
    // prettier-ignore
    let commentWidth = isMobile
    //on mobile, it's as wide as the post element created by jekyll
    ? document.querySelector('.post-content, .e-content').offsetWidth
    //on desktop, it's the greater of 1/2 the wrapper width or the whole left offset of the wrapper
    //this will be reduced later if the screen width is very narrow
    : halfWrapperWidth > wrapperLeft
            ? wrapperLeft
            : halfWrapperWidth;

    //first time through
    if (setup) {
        //parse the comment ids from JSON to block.#.line.# format
        parseCommentIds(comments);

        //set up the code blocks- translate named blocks,
        //add divs and ids to the line numbers
        //add event listeners to collapsible details elements that contain codeBlocks
        setupCodeBlocks({ codeBlocks, comments, details, isMobile });

        //find all comments assigned to invalid block numbers
        identifyInvalidCommentAssignments({ codeBlocks, comments });

        //if it's mobile, all the comments start out closed
        isMobile && closeAllComments();
    }

    //get the value of CSS variable lineHeight
    //this is computed by the .css processor
    const lineHeight = getCSSLineHeight();

    // for each code block element with line numbers
    codeBlocks.forEach((codeBlock, blockIndex) => {
        //if this codeBlock element
        //is inside a details element
        //then all comments in it should be hidden or open
        let hidden;

        //depending on whether the detail element is open or closed
        if (details.some(detail => detail.contains(codeBlock))) {
            //ancestors is an array of the detail element(s) that the codeBlock is in
            const ancestors = details.filter(detail =>
                detail.contains(codeBlock)
            );

            //if any details elements that contain the codeblock are closed,
            //then the codeblock is hidden
            hidden = ancestors.some(ancestor => !ancestor.open);
        }

        //get the comments that are supposed to go in this block
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
        });

        //get the left offset to position the comments horizontally
        const leftOffset = getOffsetLeft(codeBlock);

        //for the desktop layout
        //if comments are wider than the offset, they'll appear partially offscreen
        if (!isMobile && commentWidth > leftOffset && leftOffset > 50) {
            //set commentWidth to offset minus 50 to keep comment onscreen
            commentWidth = leftOffset - 50;
        }

        //position each comment next to its assigned line number in this block
        blockComments.forEach(comment => {
            positionComment({
                blockIndex,
                comment,
                commentWidth,
                hidden,
                isMobile,
                leftOffset,
                lineHeight,
            });
        });
    });
};

//a debounced function handles repeated calls by waiting until the calls stop
//then calling itself once
//resize events can happen repeatedly, don't want to run the code that many times
export const debouncedPositionAllComments = debounce(positionAllComments);
