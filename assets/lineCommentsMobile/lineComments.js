import {
    debouncedPositionAllComments,
    positionAllComments,
} from './modules/positionAllComments.js';
import mobilecheck from './modules/mobileCheck.js';

//execute on load
//curly brackets mean an IIFE
{
    //getWindowWidth returns the greater value of
    //the document clientWidth property or
    //the window innerwidth, or
    //0 as a fallback value
    const getWindowWidth = () =>
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    const getDocumentHeight = () => {
        const body = document.body;
        const html = document.documentElement;

        const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );

        return height;
    };

    let prevDocumentHeight = getDocumentHeight();
    //store the previous value of the window width so we can check for resize events
    let prevWindowWidth = getWindowWidth();

    //true if the user has a mobile browser
    const isMobile = mobilecheck();

    //get the line number element for each code block
    const codeBlocks = [...document.getElementsByClassName('lineno')];

    // get all lineComments from the document
    // getElementsByClassName returns an HTMLCollection
    // HTMLCollection is array-like, but is NOT a JavaScript Array
    // use the spread operator to make it an array
    const comments = [...document.getElementsByClassName('lineComment')];

    //find all details elements
    //details are collapsible elements.
    //Codeblocks may be inside details elements
    const details = [...document.querySelectorAll('details')];

    //set the initial position and format of all comments
    positionAllComments({
        codeBlocks,
        comments,
        details,
        isMobile,
        setup: true,
    });

    //listen for resize
    //on mobile chrome, all scroll events fire a resize
    //https://developers.google.com/web/updates/2016/12/url-bar-resizing
    //so check width difference
    //without this check, the mobile comments disappear when you scroll up
    window.addEventListener('resize', () => {
        const currentWindowWidth = getWindowWidth();
        //the check for a change in window width
        if (currentWindowWidth !== prevWindowWidth) {
            //store the current window width
            prevWindowWidth = currentWindowWidth;

            //call the debounced version of positionAllComments
            debouncedPositionAllComments({
                codeBlocks,
                comments,
                details,
                isMobile,
            });
        }
    });

    const observer = new ResizeObserver(([{ contentRect }]) => {
        const { height } = contentRect;
        if (height !== prevDocumentHeight) {
            prevDocumentHeight = height;

            //call the debounced version of positionAllComments
            debouncedPositionAllComments({
                codeBlocks,
                comments,
                details,
                isMobile,
            });
        }
    });

    observer.observe(document.querySelector('body'));
}
