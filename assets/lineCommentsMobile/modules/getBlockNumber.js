//returns the block number of a comment
export const getBlockNumber = comment =>
    comment.id && parseInt(comment.id.split('.')[1]);
