import { getBlockNumber } from './getBlockNumber.js';
import { getLineNumber } from './getLineNumber.js';
import { invalidCommentAssignment } from './invalidCommentAssignment.js';

export const identifyInvalidCommentAssignments = ({ codeBlocks, comments }) => {
    const highestBlockNumber = codeBlocks.length - 1;

    comments.forEach(comment => {
        const blockNumber = getBlockNumber(comment);
        //if it's not a number, lower than 0, or higher than the highest block number
        //it's invalid!
        if (
            isNaN(blockNumber) ||
            blockNumber < 0 ||
            blockNumber > highestBlockNumber
        )
            //call invalid comment assignment to label and highlight the comment
            invalidCommentAssignment(comment);
    });

    codeBlocks.forEach((codeBlock, blockIndex) => {
        //get the highest line number in this code block
        const highestLineNumber = parseInt(
            codeBlock.innerHTML.split('\n').splice(-2, 1)
        );
        comments
            .filter(comment => getBlockNumber(comment) === blockIndex)
            .forEach(comment => {
                const lineNumber = getLineNumber(comment);
                if (
                    isNaN(lineNumber) ||
                    lineNumber < 0 ||
                    lineNumber > highestLineNumber
                )
                    invalidCommentAssignment(comment);
            });
    });
};
