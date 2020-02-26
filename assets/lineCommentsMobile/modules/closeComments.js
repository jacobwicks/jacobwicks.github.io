import { getLineNumberDivFromComment } from './getLineNumberDivFromComment.js';

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
