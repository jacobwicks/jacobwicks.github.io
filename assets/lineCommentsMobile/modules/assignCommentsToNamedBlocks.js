export const assignCommentsToNamedBlocks = ({ comments, namedCodeBlocks }) => {
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
