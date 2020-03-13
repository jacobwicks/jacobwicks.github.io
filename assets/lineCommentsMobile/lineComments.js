import {
    debouncedPositionAllComments,
    positionAllComments,
} from './modules/positionAllComments.js';
import mobilecheck from './modules/mobileCheck.js';

//execute on load
//curly brackets mean an IIFE
{
    const getWindowWidth = () =>
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    //store the previous value of the window width so we can check for resize events
    let prevWindowWidth = getWindowWidth();

    //true if the user has a mobile browser
    const isMobile = mobilecheck();

    const details = [...document.querySelectorAll('details')];

    //set the initial position and format of all comments
    positionAllComments({
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
                details,
                isMobile,
            });
        }
    });
}
