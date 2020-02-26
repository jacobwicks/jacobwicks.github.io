import { animatedCloseComment } from './animatedCloseComment.js';
import { closeAllCommentsExcept } from './closeComments.js';
import { openComment } from './openComment.js';

//toggles a mobile comment between open/visible and closed/hidden states
export const toggleMobileComment = comment => {
    //all other comments should be closed
    closeAllCommentsExcept(comment);

    //style === 'none' means the comment is currently closed
    //if the comment is closed, then it should Open
    const shouldOpen = comment.style.display === 'none';

    //open or close the target comment
    shouldOpen ? openComment(comment) : animatedCloseComment(comment);
};
