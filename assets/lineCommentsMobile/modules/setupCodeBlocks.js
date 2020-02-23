import { addLineNumberDivsToAllBlocks } from './addLineNumberDivsToAllBlocks.js';
import { getBlockComments } from './getBlockComments.js';
import { setCommentContent } from './setCommentContent.js';

export const setupCodeBlocks = ({ codeBlocks, comments, isMobile }) => {
    //if it's the first time through
    //turn each line number into a div with an id
    addLineNumberDivsToAllBlocks({
        codeBlocks,
        comments,
        isMobile,
    });

    codeBlocks.forEach((codeBlock, blockIndex) => {
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
        });

        //add the line label and content div inside the comment
        blockComments.forEach((comment, commentIndex) =>
            setCommentContent({
                blockComments,
                comment,
                commentIndex,
                isMobile,
            })
        );
    });
};
