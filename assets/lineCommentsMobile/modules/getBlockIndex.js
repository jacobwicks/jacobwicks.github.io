//returns the block number of a comment
export const getBlockIndex = comment =>
    comment.id && parseInt(comment.id.split('.')[1]);
