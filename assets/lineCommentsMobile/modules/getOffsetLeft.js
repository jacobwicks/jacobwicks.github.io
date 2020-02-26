//takes an element and returns the left offset property
//the distance from the left side of the screen in pixels
export const getOffsetLeft = element => {
    let offsetLeft = 0;
    //calculates by recursively adding the left offset of each parent element
    while (element) {
        offsetLeft += element.offsetLeft;
        element = element.offsetParent;
    }
    return offsetLeft;
};
