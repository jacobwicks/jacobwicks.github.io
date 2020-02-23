import { addLabelToContent } from './addLabelToContent.js';
import { animatedCloseComment } from './toggleMobileComment.js';
import { getLineNumber } from './getLineNumber.js';

export const setCommentContent = ({
    blockComments,
    comment,
    commentIndex,
    isMobile,
}) => {
    const lineNumber = getLineNumber(comment);
    //this comment gets the comment container style applied
    comment.classList.add('line_comment_container');

    const content = comment.textContent;
    comment.textContent = null;

    const contentDiv = document.createElement('div');
    //the class is line_comment_content
    //which is max_height of 3 lines when collapsed
    contentDiv.classList.add('line_comment_content');
    contentDiv.textContent = ` ${content}`;

    //add a label span to the content
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('line_label');
    labelSpan.innerText = `Line: ${lineNumber}`;

    labelSpan.addEventListener('click', () => animatedCloseComment(comment));

    contentDiv.prepend(labelSpan);

    //calculate the line number of the next comment
    const nextCommentLineNumber =
        blockComments[commentIndex + 1] &&
        getLineNumber(blockComments[commentIndex + 1]);

    if (isMobile) {
        //comment background color is lighter
        comment.classList.add('mobile');

        //labelSpan gets different highlighting
        labelSpan.classList.add('mobile');

        const postWidth = document.querySelector('.post-content, .e-content')
            .offsetWidth;
        //set the content width smaller
        contentDiv.style.width = `${postWidth - 20}px`;
    } else if (
        //if not on mobile, multiple comments display at once and may overlap
        nextCommentLineNumber !== undefined &&
        nextCommentLineNumber - lineNumber < 4
    ) {
        //make the comment container single height
        comment.classList.add('single_height');
        //content classList also has single height
        contentDiv.classList.add('single_height');
    }

    comment.appendChild(contentDiv);
};
