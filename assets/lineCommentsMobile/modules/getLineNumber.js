//returns the line number of a comment
export const getLineNumber = comment =>
    comment.id && parseInt(comment.id.split('.')[3]);