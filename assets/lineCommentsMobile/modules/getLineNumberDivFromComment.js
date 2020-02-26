import { getBlockIndex } from './getBlockIndex.js';
import { getLineNumber } from './getLineNumber.js';

//returns the line number div that a comment is assigned to
export const getLineNumberDivFromComment = comment => {
    //to make the id of the lineNumber div
    //get the lineNumber and blockIndex from the comment
    const lineNumber = getLineNumber(comment);
    const blockIndex = getBlockIndex(comment);

    //make the id
    const id = `block.${blockIndex}.line.${lineNumber}.lineNumber`;

    // use getElementById to find the line number div
    return document.getElementById(id);
};
