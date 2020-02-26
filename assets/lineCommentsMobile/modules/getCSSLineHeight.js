//get the value of CSS variable lineHeight
export const getCSSLineHeight = () =>
    parseInt(
        //this is computed by the css processor
        getComputedStyle(document.body)
            .getPropertyValue('line-height')
            //returns a string number followed by 'px', slice off the px
            .slice(0, -2)
    );
