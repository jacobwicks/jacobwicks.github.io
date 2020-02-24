import { getCSSLineHeight } from './getCSSLineHeight.js';
import { getOffsetTop } from './getOffsetTop.js';
import { getLineNumber } from './getLineNumber.js';
import { getBlockNumber } from './getBlockNumber.js';

const getLineNumberDivFromComment = comment => {
    const lineNumber = getLineNumber(comment);
    const blockNumber = getBlockNumber(comment);
    const id = `block.${blockNumber}.line.${lineNumber}.lineNumber`;
    return document.getElementById(
        `block.${blockNumber}.line.${lineNumber}.lineNumber`
    );
};

export const animatedCloseComment = comment => {
    const lineNumberDiv = getLineNumberDivFromComment(comment);
    lineNumberDiv.classList.remove('selected');

    const content = comment.children[0];

    content.style.maxHeight = '0';
    comment.style.maxHeight = '0';
    setTimeout(() => {
        comment.style.display = 'none';
    }, 1000);
};

//finds a comment div in the document
const findComment = ({ blockIndex, lineNumber }) => {
    //generate the id of the target comment
    const commentId = `block.${blockIndex}.line.${lineNumber}`;

    return document.getElementById(commentId);
};

const closeComment = comment => {
    const lineNumberDiv = getLineNumberDivFromComment(comment);
    lineNumberDiv.classList.remove('selected');
    comment.style.display = 'none';
};

export const closeAllComments = () => {
    //find all validly assigned comments and close them so the user doesn't see them
    const comments = [...document.getElementsByClassName('lineComment')];
    comments.forEach(
        comment =>
            !comment.classList.contains('invalid_assignment') &&
            closeComment(comment)
    );
};

export const closeAllCommentsExcept = keepOpen => {
    //find all comments and remove the 'open' class from them
    const comments = [...document.getElementsByClassName('lineComment')];
    comments.forEach(comment => comment !== keepOpen && closeComment(comment));
};

const openComment = comment => {
    const lineNumberDiv = getLineNumberDivFromComment(comment);
    lineNumberDiv.classList.add('selected');
    //get the height of a single line in the document
    const lineHeight = getCSSLineHeight();

    //find the vertical position of the line number that the comment is assigned to
    const topOffset = getOffsetTop(lineNumberDiv);

    //set the position to absolute,
    //so that the comment will appear in a particular vertical spot in the document
    comment.style.position = 'absolute';

    //put the top of the comment 1 line height below the target line
    //but subtract the scrollY value, which is how far the user has scrolled
    comment.style.top = `${topOffset - window.scrollY + lineHeight}px`;

    //switch position to 'fixed' so the comment will stay in one place
    //this lets the user scroll the code behind the comment
    comment.style.position = 'fixed';

    const content = comment.children[0];

    content.style.maxHeight = '0';
    comment.style.maxHeight = '0';

    comment.style.display = 'block';

    setTimeout(() => {
        content.style.maxHeight = '100vh';
        comment.style.maxHeight = '100vh';
    }, 1);
};

export const toggleMobileComment = ({ blockIndex, lineNumber }) => {
    //a mobile comment is toggled
    //get the target comment
    const comment = findComment({ blockIndex, lineNumber });
    const shouldOpen = comment.style.display === 'none';

    //all other comments should be closed
    closeAllCommentsExcept(comment);

    if (shouldOpen) {
        openComment(comment);
    } else animatedCloseComment(comment);
};
