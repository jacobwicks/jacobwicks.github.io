import { addLineNumberDivsToAllBlocks } from './addLineNumberDivsToAllBlocks.js';
import { assignCommentsToNamedBlocks } from './assignCommentsToNamedBlocks.js';
import { getBlockComments } from './getBlockComments.js';
import { getNamedCodeBlocks } from './getNamedCodeBlocks.js';
import { setCommentContent } from './setCommentContent.js';

//sets up each code block in the document
export const setupCodeBlocks = ({ codeBlocks, comments, isMobile }) => {
    //get the codeBlocks that the user assigned a name to
    const namedCodeBlocks = getNamedCodeBlocks();

    //change the ids of comments from block names to blockIndex
    assignCommentsToNamedBlocks({
        comments,
        namedCodeBlocks,
    });

    //if it's the first time through
    //turn each line number into a div with an id
    addLineNumberDivsToAllBlocks({
        codeBlocks,
        comments,
        isMobile,
        namedCodeBlocks,
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
