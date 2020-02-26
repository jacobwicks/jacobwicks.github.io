import { addLineNumberDivsToAllBlocks } from './addLineNumberDivsToAllBlocks.js';
import { getBlockComments } from './getBlockComments.js';
import { setCommentContent } from './setCommentContent.js';

//sets up each code block in the document
export const setupCodeBlocks = ({ codeBlocks, comments, isMobile }) => {
    //if it's the first time through
    //turn each line number into a div with an id
    addLineNumberDivsToAllBlocks({
        codeBlocks,
        comments,
        isMobile,
    });

    codeBlocks.forEach((codeBlock, blockIndex) => {
        //get the comments assigned to this block
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
        });

        blockComments.forEach((comment, commentIndex) =>
            //add the line label and content div inside the comment
            setCommentContent({
                blockComments,
                comment,
                commentIndex,
                isMobile,
            })
        );
    });
};
