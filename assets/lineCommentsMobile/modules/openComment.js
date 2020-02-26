import { getLineNumberDivFromComment } from './getLineNumberDivFromComment.js';
import { getCSSLineHeight } from './getCSSLineHeight.js';
import { getOffsetTop } from './getOffsetTop.js';

export const openComment = comment => {
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
