//get the value of CSS variable lineHeight
//this is computed in the .css file
//returns a string number followed by 'px', slice off the px
export const getCSSLineHeight = () =>
    parseInt(
        getComputedStyle(document.body)
            .getPropertyValue('line-height')
            .slice(0, -2)
    );
