import { getBlockComments } from './getBlockComments.js';
import { getLineNumber } from './getLineNumber.js';
import { toggleMobileComment } from './toggleMobileComment.js';

//adds a div to each line number in the block
const addLineNumberDivsToBlock = ({
    blockComments,
    blockIndex,
    codeBlock,
    isMobile,
    removeLastNumber,
}) => {
    //get the innerHTML of the code block
    const innerHTML = codeBlock.innerHTML;
    //then set the innerHTML to blank, we'll replace by generating and appending divs
    codeBlock.innerHTML = null;

    //make an array by splitting on the newline character
    //then generate and append a div for each element in the array
    innerHTML.split('\n').forEach(lineNumber => {
        //generate the id of the line number div
        const id = `block.${blockIndex}.line.${
            lineNumber ? lineNumber : 'last'
        }.lineNumber`;

        //all the divs have an id so they can be found with getElementById
        const lineNumberDiv = document.createElement('div');
        lineNumberDiv.id = id;
        lineNumberDiv.innerHTML = lineNumber;

        //on mobile devices the divs get a class and an event listener
        if (isMobile) {
            //find out if the line number has a comment
            const hasComment = blockComments.find(
                comment => getLineNumber(comment) === parseInt(lineNumber)
            );

            //if it has a comment, give it the class and event listener
            if (hasComment) {
                //highlights the line number,
                //indicating to the user there is a comment assigned
                lineNumberDiv.classList.add('line_number_mobile');

                //clicking the line number div opens and closes the comment
                lineNumberDiv.addEventListener('click', () =>
                    toggleMobileComment(hasComment)
                );
            }
        }
        //add the div to the codeBlock
        codeBlock.appendChild(lineNumberDiv);
    });

    //removeLastNumber is true when the block is named
    //when the block is named, there's an extra line of code containing the block name
    //the block name gets removed, so we also need to remove a lineNumber
    if (removeLastNumber) {
        const lineNumberToRemove =
            codeBlock.children[codeBlock.children.length - 2];
        codeBlock.removeChild(lineNumberToRemove);
    }
};

//adds line number divs to each line number in all code blocks
export const addLineNumberDivsToAllBlocks = ({
    codeBlocks,
    comments,
    isMobile,
    namedCodeBlocks,
}) => {
    codeBlocks.forEach((codeBlock, blockIndex) => {
        //get all comments assigned to the block at blockIndex
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
            setup: true,
        });

        //if this block is a named codeBlock, then remove the last lineNumber
        const removeLastNumber = !!Object.values(namedCodeBlocks).includes(
            blockIndex
        );

        //add the line numbers to the block
        addLineNumberDivsToBlock({
            blockComments,
            blockIndex,
            codeBlock,
            isMobile,
            removeLastNumber,
        });
    });
};
