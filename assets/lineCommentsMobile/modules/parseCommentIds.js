//user may optionally write comment ids in JSON object form
//this function attempts to parse all comment ids from JSON to
//block.#.line.# format
export const parseCommentIds = comments => {
    comments.forEach(comment => {
        try {
            //parsing relaxed JSON is a complex problem
            //I have included the JSON5 library served from a CDN
            const { block, line } = JSON5.parse(comment.id);
            const id = `block.${block}.line.${line}`;
            comment.id = id;
        } catch (err) {
            //if there's an error, then it's not a JSON format id
            //do nothing
        }
    });
};
