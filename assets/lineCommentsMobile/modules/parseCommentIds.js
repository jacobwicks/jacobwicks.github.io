//user may optionally write comment ids in JSON object form
//this function attempts to parse all comment ids from JSON to
//block.#.line.# format
export const parseCommentIds = comments => {
    comments.forEach(comment => {
        try {
            //parsing relaxed JSON is a complex problem
            //I have included the JSON5 library served from a CDN
            //https://json5.org/
            const { block, line } = JSON5.parse(comment.id);

            const id = `block.${block}.line.${line}`;
            comment.id = id;
        } catch (err) {
            //if it didn't parse,
            //try adding quotes
            //adding quotes to the jason style id is optional!s
            try {
                let commentId = comment.id.trim();

                //space after the opening curly bracket
                if (commentId.charAt(0) === '{') {
                    commentId = `{ ${commentId.slice(1, commentId.length)}`;
                }

                //space before the closing curly bracked
                if (commentId.charAt(commentId.length - 1) === '}') {
                    commentId = `${commentId.slice(0, commentId.length - 1)} }`;
                }

                //split the string into an array
                const arr = commentId.split(' ').filter(v => v);

                //the line assignment should be a number, which is easier for the parser to handle
                //the block assignment may be a string, so we want it separated by spaces
                //and enclosed in quotes

                //this code will add quotes around the block assignment
                //to make them optional for the user
                //handle block: -> block followed by a colon with no space
                if (arr.includes('block:')) {
                    const indexOfBlock = arr.indexOf('block:');

                    const nextElement = arr[indexOfBlock + 1];
                    //and next element does not start with " or ',
                    if (
                        nextElement.charAt(0) !== '"' &&
                        nextElement.charAt(0) !== "'"
                    ) {
                        //add " to start of next element
                        arr[indexOfBlock + 1] = `"${nextElement}`;
                        //and in next element that contains ',' replace the ',' with ',"'
                        const indexOfLastPart =
                            arr
                                .slice(indexOfBlock + 1, arr.length)
                                .findIndex(element => element.includes(',')) +
                            indexOfBlock +
                            1;
                        const lastPart = arr[indexOfLastPart];
                        arr[indexOfLastPart] = lastPart.replace(',', '",');
                    }
                } else if (arr.includes('block')) {
                    //handle block -> block with a space after it
                    const indexOfBlock = arr.indexOf('block');

                    let indexOfNextElement = indexOfBlock + 1;
                    let nextElement = arr[indexOfNextElement];

                    //next element after block should be a colon
                    //if it's not, this won't fix it
                    if (nextElement.charAt(0) !== ':') return;

                    //now next element is the first part of the block assignment
                    if (nextElement.length > 1) {
                        //add the colon to the array
                        arr[indexOfNextElement] = ':';

                        //slice the colon off the front of the start of the block assignment
                        nextElement = nextElement.slice(1, nextElement.length);

                        //increment the index
                        indexOfNextElement++;

                        //add the next element without colon to the array
                        arr.splice(indexOfNextElement, 0, nextElement);
                    } else {
                        //block : nextElement, so nextElement is at index + 2
                        indexOfNextElement = indexOfBlock + 2;
                        nextElement = arr[indexOfNextElement];
                    }

                    if (
                        nextElement.charAt(0) !== '"' &&
                        nextElement.charAt(0) !== "'"
                    ) {
                        //add open quote " to start of next element
                        arr[indexOfNextElement] = `"${nextElement}`;

                        //and in next element that contains ',' replace the ',' with '",'
                        //last part is the last part of the block assignment
                        const indexOfLastPart =
                            arr
                                .slice(indexOfNextElement, arr.length)
                                .findIndex(element => element.includes(',')) +
                            indexOfNextElement;

                        let lastPart = arr[indexOfLastPart];

                        //close the double quote, keep the comma
                        lastPart = lastPart.replace(',', '",');

                        //replace the element in the array
                        arr[indexOfLastPart] = lastPart;
                    }
                } else if (
                    //handle no spaces after block:
                    //block:blockAssignmentString
                    arr.some(element => element.slice(0, 6) === 'block:')
                ) {
                    //block plus colon
                    const indexOfBlockPlus = arr.findIndex(
                        element => element.slice(0, 6) === 'block:'
                    );

                    //firstWord of the block assignment
                    let firstWord = arr[indexOfBlockPlus].slice(
                        6,
                        arr[indexOfBlockPlus].length
                    );

                    //add the open quote to first word of block assignment
                    if (
                        firstWord.charAt(0) !== '"' &&
                        firstWord.charAt(0) !== "'"
                    ) {
                        firstWord = `"${firstWord}`;
                    }

                    arr[indexOfBlockPlus] = 'block :';

                    //now we have [... 'block:', '"firstWord', ...]
                    arr.splice(indexOfBlockPlus + 1, 0, firstWord);

                    const slice = arr.slice(indexOfBlockPlus, arr.length);

                    //find the last word in the block assignment
                    const indexOfLastWord =
                        slice.findIndex(element => element.includes(',')) +
                        indexOfBlockPlus;

                    //add the double quote
                    arr[indexOfLastWord] = arr[indexOfLastWord]
                        .trim()
                        .replace(',', '",');
                }

                //join up the array on spaces
                commentId = arr.join(' ');

                //use JSON5 library to attempt to parse the repaired JSON object
                const { block, line } = JSON5.parse(commentId);

                //create the id
                const id = `block.${block}.line.${line}`;

                //assign the id string in the normal format
                comment.id = id;
            } catch (err) {}
            //if there's an error, then it's not a JSON format id
            //do nothing
            //it's either a normal block.#.line.# id
            //or it's an invalid assignment, which will be taken care of
            //by the invalidCommentAssignment functions
        }
    });
};
