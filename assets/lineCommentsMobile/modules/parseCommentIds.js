//user may optionally write comment ids in JSON object form
//this function attempts to parse all comment ids from JSON to
//block.#.line.# format
export const parseCommentIds = comments => {
    comments.forEach(comment => {
        try {
            let commentId = comment.id;

            const arr = comment.id.split(' ').filter(v => v);
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

                let nextElement = arr[indexOfBlock + 1];

                //next element after block should be a colon
                if (nextElement.charAt(0) !== ':') return;

                //now next element is the first part of the block assignment
                nextElement =
                    nextElement.length > 1
                        ? nextElement.slice(1, nextElement.length)
                        : arr[indexOfBlock + 2];

                if (
                    nextElement.charAt(0) !== '"' &&
                    nextElement.charAt(0) !== "'"
                ) {
                    //add " to start of next element
                    arr[indexOfBlock + 2] = `"${nextElement}`;
                    //and in next element that contains ',' replace the ',' with '"'
                    const indexOfLastPart =
                        arr
                            .slice(indexOfBlock + 2, arr.length)
                            .findIndex(element => element.includes(',')) +
                        indexOfBlock +
                        2;

                    const lastPart = arr[indexOfLastPart];
                    arr[indexOfLastPart] = lastPart.replace(',', '",');
                }

                commentId = arr.join(' ');
            }

            //ok, so eval is bad practice, but
            //you are running this on a string that you, the owner of the site wrote
            //and it's client side code anyway...
            //if it's a problem, then include a library that evaluates bad JSON
            const obj = eval('(' + commentId + ')');

            //if eval returns a json object with properties block and line
            if (obj.hasOwnProperty('block') && obj.hasOwnProperty('line')) {
                const { block, line } = obj;

                //make the new id
                const id = `block.${block}.line.${line}`;

                //set the comment id
                comment.id = id;
            }
        } catch (err) {
            //error is fine
        }
    });
};
