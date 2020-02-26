import { getBlockIndex } from './getBlockIndex.js';
import { getLineNumber } from './getLineNumber.js';
import { invalidCommentAssignment } from './invalidCommentAssignment.js';

//assigns the invalid comment class to each comment that
//has an invalid blockIndex or
//has a line number that does not exist in the assigned block
export const identifyInvalidCommentAssignments = ({ codeBlocks, comments }) => {
    const highestblockIndex = codeBlocks.length - 1;

    //cover all comments that aren't assigned to a valid codeblock index
    comments.forEach(comment => {
        //the blockIndex of the comment
        const blockIndex = getBlockIndex(comment);

        //if it's not a number, lower than 0, or higher than the highest block number
        //it's invalid!
        if (
            isNaN(blockIndex) ||
            blockIndex < 0 ||
            blockIndex > highestblockIndex
        )
            //call invalid comment assignment to label and highlight the comment
            invalidCommentAssignment(comment);
    });

    //cover all the comments that are assigned to valid codeblock index
    codeBlocks.forEach((codeBlock, blockIndex) => {
        //get the highest line number in this code block
        const highestLineNumber = parseInt(
            //it's the second to last element in the array split by newlines
            codeBlock.innerHTML.split('\n').splice(-2, 1)
        );

        comments
            .filter(comment => getBlockIndex(comment) === blockIndex)
            .forEach(comment => {
                const lineNumber = getLineNumber(comment);
                //if the line number isn't valid
                if (
                    isNaN(lineNumber) ||
                    lineNumber < 0 ||
                    lineNumber > highestLineNumber
                )
                    //call invalid comment assignment to label and highlight the comment
                    invalidCommentAssignment(comment);
            });
    });
};
