//takes an element and returns the top offset property
//the distance from the top of the screen in pixels
//calculates by recursively adding the top offset of each parent element
export const getOffsetTop = element => {
    let offsetTop = 0;

    //while element evaluates to true
    while (element) {
        //add the offset of the element to offsetTop
        offsetTop += element.offsetTop;

        //set element to offsetParent
        //offsetParent will eventually be undefined
        element = element.offsetParent;
    }

    return offsetTop;
};