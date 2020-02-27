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

                if (commentId.charAt(0) === '{') {
                    commentId = `{ ${commentId.slice(1, commentId.length)}`;
                }

                if (commentId.charAt(commentId.length - 1) === '}') {
                    commentId = `${commentId.slice(0, commentId.length - 1)} }`;
                }

                const arr = commentId.split(' ').filter(v => v);
                //this code will add quotes around the block assignment
                //to make them optional for the user
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
                        //and in next element that contains ',' replace the ',' with '"'
                        const indexOfLastPart =
                            arr
                                .slice(indexOfBlock + 1, arr.length)
                                .findIndex(element => element.includes(',')) +
                            indexOfBlock +
                            1;
                        const lastPart = arr[indexOfLastPart];
                        arr[indexOfLastPart] = lastPart.replace(',', '",');
                    }

                    commentId = arr.join(' ');
                } else if (arr.includes('block')) {
                    const indexOfBlock = arr.indexOf('block');

                    let indexOfNextElement = indexOfBlock + 1;
                    let nextElement = arr[indexOfNextElement];

                    //next element after block should be a colon
                    if (nextElement.charAt(0) !== ':') return;
                    //now next element is the first part of the block assignment
                    if (nextElement.length > 1) {
                        arr[indexOfNextElement] = ':';
                        nextElement = nextElement.slice(1, nextElement.length);
                        indexOfNextElement++;
                        arr.splice(indexOfNextElement, 0, nextElement);
                    } else {
                        indexOfNextElement = indexOfBlock + 2;
                        nextElement = arr[indexOfNextElement];
                    }

                    if (
                        nextElement.charAt(0) !== '"' &&
                        nextElement.charAt(0) !== "'"
                    ) {
                        //add " to start of next element
                        arr[indexOfNextElement] = `"${nextElement}`;

                        //and in next element that contains ',' replace the ',' with '"'
                        const indexOfLastPart =
                            arr
                                .slice(indexOfNextElement, arr.length)
                                .findIndex(element => element.includes(',')) +
                            indexOfNextElement;

                        let lastPart = arr[indexOfLastPart];
                        lastPart = lastPart.replace(',', '",');
                        arr[indexOfLastPart] = lastPart;
                    }

                    commentId = arr.join(' ');
                } else if (
                    arr.some(element => element.slice(0, 6) === 'block:')
                ) {
                    const indexOfBlockPlus = arr.findIndex(
                        element => element.slice(0, 6) === 'block:'
                    );
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

                    arr[indexOfBlockPlus] = 'block:';
                    arr.splice(indexOfBlockPlus + 1, 0, firstWord);

                    const slice = arr.slice(indexOfBlockPlus, arr.length);
                    const indexOfLastWord =
                        slice.findIndex(element => element.includes(',')) +
                        indexOfBlockPlus;
                    arr[indexOfLastWord] = arr[indexOfLastWord]
                        .trim()
                        .replace(',', '",');
                    commentId = arr.join(' ');
                }

                const { block, line } = JSON5.parse(commentId);

                const id = `block.${block}.line.${line}`;
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
