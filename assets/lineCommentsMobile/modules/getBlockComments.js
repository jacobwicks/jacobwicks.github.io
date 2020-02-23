import { getBlockNumber } from './getBlockNumber.js';
import { getLineNumber } from './getLineNumber.js';

export const getBlockComments = ({
    blockIndex,
    codeBlock,
    comments,
    lineNumbersInDivs = true,
}) => {
    // get the highest line number from the codeBlock
    // to identify comments with invalid line assignments
    const highestLineNumber = !!lineNumbersInDivs
        ? //when repositioning, innerHTML contains many divs
          parseInt(
              [...codeBlock.childNodes][codeBlock.childNodes.length - 2]
                  .innerHTML
          )
        : //first time through, innerHTML is a string of text and newlines
          parseInt(codeBlock.innerHTML.split('\n').splice(-2, 1));

    return (
        comments
            .filter(comment => getBlockNumber(comment) === blockIndex)
            //sort the comments by lineNumber, lowest to highest
            .sort((a, b) => getLineNumber(a) - getLineNumber(b))
            //remove comments with a lineNumber higher than the number of lineNumbers in the code block
            .filter(comment => {
                const lineNumber = getLineNumber(comment);

                //if the line number is less than 0 or greater than the highestLinenumber it's invalid
                return lineNumber > -1 && lineNumber <= highestLineNumber;
            })
    );
};
