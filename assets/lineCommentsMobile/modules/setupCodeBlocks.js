import { addLineNumberDivsToAllBlocks } from './addLineNumberDivsToAllBlocks.js';
import { assignCommentsToNamedBlocks } from './assignCommentsToNamedBlocks.js';
import { closeComment } from './closeComments.js';
import { getBlockComments } from './getBlockComments.js';
import { getNamedCodeBlocks } from './getNamedCodeBlocks.js';
import { setCommentContent } from './setCommentContent.js';
import { positionAllComments } from './positionAllComments.js';

//sets up each code block in the document
export const setupCodeBlocks = ({
    codeBlocks,
    comments,
    details,
    isMobile,
}) => {
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

        //if the code block is inside a collapsible details element
        //add an event listener to the details element
        //so we can show and hide the comments
        if (details.some(detail => detail.contains(codeBlock))) {
            const ancestor = details.find(detail => detail.contains(codeBlock));
            //when the details element toggles between open and closed, call positionAllComments
            //this will hide or reveal the comments on the collapsible code block
            ancestor.addEventListener('toggle', () =>
                positionAllComments({ details, isMobile })
            );
        }

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
