import { getLineNumber } from './getLineNumber.js';
import { getOffsetTop } from './getOffsetTop.js';

//puts a comment in the correct position relative to its assigned codeBlock and lineNumber
export const positionComment = ({
    blockIndex,
    comment,
    commentWidth,
    isMobile,
    leftOffset,
    lineHeight,
}) => {
    //get the assigned line number
    const lineNumber = getLineNumber(comment);

    //generate the id of the assigned lineNumber div
    const id = `block.${blockIndex}.line.${lineNumber}.lineNumber`;

    //use getElementById to find the div that contains the line number
    const targetLine = document.getElementById(id);

    //find the vertical position of the line number
    const topOffset = getOffsetTop(targetLine);

    //set the position of the comment
    if (isMobile) {
        //post width is the width of the post element created by jekyll
        //it is calculated in the position all comments function
        comment.style.width = `${commentWidth - 10}px`;

        //comment appears one lineHeight below the assigned lineNumber
        //so the lineNumber code is visible
        comment.style.top = `${topOffset + lineHeight}px`;

        //change the width of the content div
        comment.childNodes[0].style.width = `${commentWidth - 20}px`;
    } else {
        //desktop layout
        comment.style.width = `${commentWidth}px`;

        //top aligns with lineNumber div
        comment.style.top = `${topOffset}px`;

        //floats to the left
        comment.style.left = `${leftOffset - commentWidth - 48}px`;
    }
};
