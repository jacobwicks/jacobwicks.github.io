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

    const initialWindowWidth = getWindowWidth();

    //true if the user has a mobile browser
    const isMobile = mobilecheck();

    //set the initial position and format of all comments
    positionAllComments({
        isMobile,
    });

    //listen for resize
    //on mobile chrome, all scroll events fire a resize
    //https://developers.google.com/web/updates/2016/12/url-bar-resizing
    //so check width difference
    //without this check, the mobile comments disappear when you scroll up
    window.addEventListener('resize', () => {
        if (getWindowWidth() !== initialWindowWidth)
            debouncedPositionAllComments({
                isMobile,
                reposition: true,
            });
    });
}
