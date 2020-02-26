import { addLineNumberDivsToAllBlocks } from './addLineNumberDivsToAllBlocks.js';
import { getBlockComments } from './getBlockComments.js';
import { isNamedBlock } from './isNamedBlock.js';
import { setCommentContent } from './setCommentContent.js';

const assignCommentsToNamedBlocks = ({ comments, namedCodeBlocks }) => {
    //each comment that has been assigned to a block by name
    //gets a new id that is formatted the normal block.#.line#
    comments.forEach(comment => {
        const idArray = comment.id.split('.');

        const blockAssignment = idArray[1];

        if (namedCodeBlocks[blockAssignment] !== undefined) {
            idArray[1] = namedCodeBlocks[blockAssignment];
            const id = idArray.join('.');
            comment.id = id;
        }
    });
};

const getNamedCodeBlocks = () => {
    //jekyll puts all code blocks inside an element with class 'rouge-table'
    const rougeTables = [...document.getElementsByClassName('rouge-table')];

    //reduce the array of rouge-table elements to an array
    //of each codeblock with line numbers
    const linedBlocks = rougeTables.reduce((acc, table) => {
        if (table.querySelectorAll('pre.lineno, td.code').length === 2) {
            acc.push(table);
        }
        return acc;
    }, []);

    //reduce linedBlocks to an object
    //that contains the name of each lined code block that the user named
    //paired with the blockIndex of that block
    return linedBlocks.reduce((namedBlocks, table, blockIndex) => {
        const code = table.getElementsByClassName('code')[0];
        if (code) {
            const named = isNamedBlock(code);
            if (named) {
                const { name, indexOfSecondLine } = named;
                const pre = code.children[0];
                const newInnerHTML = pre.innerHTML.slice(
                    indexOfSecondLine,
                    pre.innerHTML.length
                );
                pre.innerHTML = newInnerHTML;
                namedBlocks[name] = blockIndex;
            }
        }

        return namedBlocks;
    }, {});
};
//sets up each code block in the document
export const setupCodeBlocks = ({ codeBlocks, comments, isMobile }) => {
    //get the codeBlocks that the user assigned a name to
    const namedCodeBlocks = getNamedCodeBlocks();

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
