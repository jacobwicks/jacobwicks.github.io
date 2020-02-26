import { getLineNumberDivFromComment } from './getLineNumberDivFromComment.js';

//closes a comment. Runs the transition animation
export const animatedCloseComment = comment => {
    //get the lineNumberDiv
    const lineNumberDiv = getLineNumberDivFromComment(comment);

    //the assigned comment is closed, so remove the selected class
    lineNumberDiv.classList.remove('selected');

    //the content height also needs to be changed, so get a reference to it
    const content = comment.children[0];

    //set the maxHeight of the content and the comment container div
    //css will animate the transition
    content.style.maxHeight = '0';
    comment.style.maxHeight = '0';

    //wait for the CSS animation to complete before hiding the comment
    setTimeout(() => {
        comment.style.display = 'none';
    }, 1000);
};
