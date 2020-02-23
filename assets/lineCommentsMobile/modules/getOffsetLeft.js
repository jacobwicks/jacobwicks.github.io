//takes an element and returns the left offset property
//the distance from the left side of the screen in pixels
//calculates by recursively adding the left offset of each parent element
export const getOffsetLeft = element => {
    let offsetLeft = 0;
    while (element) {
        offsetLeft += element.offsetLeft;
        element = element.offsetParent;
    }
    return offsetLeft;
};