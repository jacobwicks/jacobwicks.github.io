import { getBlockComments } from './getBlockComments.js';
import { getLineNumber } from './getLineNumber.js';
import { toggleMobileComment } from './toggleMobileComment.js';

const addLineNumberDivsToBlock = ({
    blockComments,
    blockIndex,
    codeBlock,
    isMobile,
}) => {
    //get the innerHTML of the code block
    const innerHTML = codeBlock.innerHTML;
    //then set the innerHTML to blank, we'll replace by generating and appending divs
    codeBlock.innerHTML = '';

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
            const hasComment = blockComments.some(
                comment => getLineNumber(comment) === parseInt(lineNumber)
            );

            //if it has a comment, give it the class and event listener
            if (hasComment) {
                lineNumberDiv.classList.add('line_number_mobile');
                lineNumberDiv.addEventListener('click', () =>
                    toggleMobileComment({
                        blockIndex,
                        lineNumber,
                        lineNumberDiv,
                    })
                );
            }
        }
        //add the div to the codeBlock
        codeBlock.appendChild(lineNumberDiv);
    });
};

export const addLineNumberDivsToAllBlocks = ({
    codeBlocks,
    comments,
    isMobile,
}) => {
    codeBlocks.forEach((codeBlock, blockIndex) => {
        const blockComments = getBlockComments({
            blockIndex,
            codeBlock,
            comments,
            lineNumbersInDivs: false,
        });

        addLineNumberDivsToBlock({
            blockComments,
            blockIndex,
            codeBlock,
            isMobile,
        });
    });
};
