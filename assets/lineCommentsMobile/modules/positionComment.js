import { getLineNumber } from './getLineNumber.js';
import { getOffsetTop } from './getOffsetTop.js';

export const positionComment = ({
    blockIndex,
    comment,
    commentWidth,
    isMobile,
    leftOffset,
    lineHeight,
    postWidth,
}) => {
    //get the assigned line number
    const lineNumber = getLineNumber(comment);

    const id = `block.${blockIndex}.line.${lineNumber}.lineNumber`;
    //use getElementById to find the div that contains the line number
    const targetLine = document.getElementById(id);

    //find the vertical position of the line number
    const topOffset = getOffsetTop(targetLine);

    //set the position of the comment
    if (isMobile) {
        //post width is the width of the post element created by jekyll
        //it is calculated in the position all comments function
        comment.style.width = `${postWidth - 10}px`;
        comment.style.top = `${topOffset + lineHeight}px`;
    } else {
        comment.style.width = `${commentWidth}px`;
        comment.style.top = `${topOffset}px`;
        comment.style.left = `${leftOffset - commentWidth - 48}px`;
    }
};
