//adds a label span to the content string from a Jekyll post paragraph
export const addLabelToContent = ({ content, isMobile, label }) => {
    const labelSpan = isMobile
        ? `<span class="line_label mobile">${label}: </span>`
        : `<span class="line_label">${label}: </span>`;

    //use trim to remove whitespace from innerHTML
    const trimmed = content.trim();

    //make a new string with the lineLabel inside of the comment's <p> element
    return `${trimmed.slice(0, 3)}${labelSpan} ${trimmed.slice(
        3,
        trimmed.length - 1
    )}`;
};
