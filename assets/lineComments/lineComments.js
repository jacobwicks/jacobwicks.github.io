const debounce = (func, wait, immediate) => {
    let timeout;
    //the returned function needs to use this
    //so use the function keyword instead of const
    return function() {
        let context = this,
            args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//takes an element and returns the top offset property
//the distance from the top of the screen in pixels
//calculates by recursively adding the top offset of each parent element
const getOffsetTop = element => {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
};

//takes an element and returns the left offset property
//the distance from the left side of the screen in pixels
//calculates by recursively adding the left offset of each parent element
const getOffsetLeft = element => {
    let offsetLeft = 0;
    while (element) {
        offsetLeft += element.offsetLeft;
        element = element.offsetParent;
    }
    return offsetLeft;
};

//finds all elements with the lineComment class
//positions them next to their assigned code block and line number
//if reposition is false, it's the first time, so it adds some interior elements to make content display correctly
const positionAllComments = reposition => {
    //wrapper is an element added by Jekyll
    const wrapper = document.getElementsByClassName('wrapper')[0];
    //we use the width of wrapper as the basis for calculating how wide to make the comments
    const wrapperWidth = wrapper.offsetWidth;
    const commentWidth = wrapperWidth * 0.5;

    //get all lineComments from the document
    //getElementsByClassName returns an HTMLCollection
    //HTMLCollection is array-like, but is NOT a JavaScript Array
    //use the spread operator to make it an array
    const comments = [...document.getElementsByClassName('lineComment')];

    //get the line number element for each code block
    const codeBlocks = [...document.getElementsByClassName('lineno')];

    //a function to return the line number of a comment
    const getLineNumber = comment => comment.id && comment.id.split('.')[3];

    //for each code block line number element
    //turn each line number into a div with an id
    codeBlocks.forEach((codeBlock, blockIndex) => {
        let lineNumbers = codeBlock.innerHTML
            .split('\n')
            .map(
                lineNumber =>
                    `<div id='block.${blockIndex}.line.${
                        lineNumber ? lineNumber : 'last'
                    }'>${lineNumber}</div>`
            )
            .join('');
        //set the innerHTML of the codeblock linenumber container
        codeBlock.innerHTML = lineNumbers;

        //filter to find the comments that are supposed to go in this block
        const blockComments = comments
            .filter(comment => comment.id.split('.')[1] == blockIndex)
            //sort the comments by lineNumber, lowest to highest
            .sort((a, b) => getLineNumber(a) - getLineNumber(b));

        //get the left offset to position the comments horizontally
        const leftOffset = getOffsetLeft(codeBlock);

        //add each comment to the line number in this block
        blockComments.forEach((comment, commentIndex) => {
            //element 3 of the array from id.split is the line number
            const lineNumber = getLineNumber(comment);

            const commentId = `block.${blockIndex}.line.${lineNumber}`;
            const targetLine = document.getElementById(commentId);
            const topOffset = getOffsetTop(targetLine);

            comment.classList.add('line_comment_container');

            //if there's a nextCommentLineNumber
            const nextCommentLineNumber =
                blockComments[commentIndex + 1] &&
                getLineNumber(blockComments[commentIndex + 1]);
            //and the nextCommentLineNumber is within 3 lines of this comment
            const nextCommentIsClose =
                nextCommentLineNumber !== undefined &&
                nextCommentLineNumber - lineNumber < 4;
            //this comment should be a single line when collapsed
            nextCommentIsClose && comment.classList.add('single_height');

            //set the position of the comment
            comment.style.width = `${commentWidth}px`;
            comment.style.top = `${topOffset}px`;
            comment.style.left = `${leftOffset - commentWidth - 48}px`;

            //if reposition is false, then add the line label and content div inside the comment
            //if reposition is true, don't add these elements
            if (!reposition) {
                //string.trim() removes extra spacing
                const trimmed = comment.innerHTML.trim();

                //a label that displays the line number
                const lineLabel = `<span class="line_label">Line ${lineNumber}: </span>`;

                //the class is line_comment_content
                //which is max_height of 3 lines when collapsed
                let classList = 'line_comment_content';

                //if the next comment is closer than 4 lines
                //make this comment_content single_height, so max_height of 1 line
                nextCommentIsClose && (classList += ' single_height');

                //set the class to the classList variable
                //use string.slice to pull off the opening <p> tag before inserting the lineLabel
                // const newContents = `<div class="${classList}">${trimmed.slice(
                //     0,
                //     3
                // )}${lineLabel} ${trimmed.slice(3, trimmed.length - 1)}</div>`;
                const newContents = `<div class="${classList}">${lineLabel} ${trimmed}</div>`;

                //set the comment innerHTML
                comment.innerHTML = newContents;
            }
        });
    });
};

//execute on load
//curly brackets mean an IIFE
{
    positionAllComments();
}

const debouncedPositionAllComments = debounce(positionAllComments);
//when page has been resized, position all comments once
//the event listener passes the event as an argument,
//so the parameter reposition will be true
window.addEventListener('resize', debouncedPositionAllComments);
