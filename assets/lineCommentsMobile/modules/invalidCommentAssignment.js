import { addLabelToContent } from './addLabelToContent.js';
import { getBlockIndex } from './getBlockIndex.js';
import { getLineNumber } from './getLineNumber.js';

//adds a label and class to visually highlight invalidly assigned comments
export const invalidCommentAssignment = comment => {
    const content = comment.innerHTML;

    //make a label span so the user can see what the invalid assignment is
    //non number assignments will show up as NaN
    const label = `Block: ${getBlockIndex(comment)} Line: ${getLineNumber(
        comment
    )}`;

    const newContent = addLabelToContent({ content, label });

    //set the comment innerHTML to the new contents with the label
    comment.innerHTML = newContent;

    comment.classList.add('invalid_assignment');
};
