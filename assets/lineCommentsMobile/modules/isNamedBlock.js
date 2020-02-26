//returns the block name and
//the index of the start of the second line of innerHTML
//or undefined
export const isNamedBlock = element => {
    //jekyll puts a <pre> element inside the code element
    const pre = element.children[0];

    //jekyll uses linebreaks to end lines, so find the first one
    const indexOfSecondLine = pre.innerHTML.indexOf('\n') + 1;

    //the first line is where the user will name their block
    const firstLine = pre.innerHTML.slice(0, indexOfSecondLine);

    //need to see the text without the HTML elements
    //so create a span element and look at its inner text
    const tempSpan = document.createElement('span');
    tempSpan.innerHTML = firstLine;
    const firstNine = tempSpan.innerText
        .trim()
        .slice(0, 9)
        .toLowerCase();

    //if the first nine letters are blockname, then the user has named the block
    if (firstNine === 'blockname') {
        //slice off 'blockname' and trim the whitespace
        const name = tempSpan.innerText
            .trim()
            .slice(9, tempSpan.innerText.length)
            .trim();

        //returning the index of the second line allows us to chop off the first line
        //if we want to
        return {
            name,
            indexOfSecondLine,
        };
    }
    return;
};
