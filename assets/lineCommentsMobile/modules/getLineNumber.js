//returns the line number of a comment
//comment.id should be in the form block.blockIndex.line.lineNumber
export const getLineNumber = comment =>
    //split on periods and return array[3]
    comment.id && parseInt(comment.id.split('.')[3]);
