//returns the block number of a comment
export const getBlockIndex = comment => {
    if (comment.id) {
        //split the id to get the block assignment
        const block = comment.id.split('.')[1];

        //try parsing it. If it's a JSON style with a string, it will be NaN
        const asInt = parseInt(block);

        //if it's not a number, return the raw block
        return isNaN(asInt) ? block : asInt;
    } else return undefined;
};
