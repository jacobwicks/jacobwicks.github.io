import { closeAllComments } from './modules/toggleMobileComment.js';
import {
    debouncedPositionAllComments,
    positionAllComments,
} from './modules/positionAllComments.js';

//execute on load
//curly brackets mean an IIFE
{
    const initialWindowWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    );

    positionAllComments();
    closeAllComments();

    //listen for resize
    //on mobile chrome, all scroll events fire a resize
    //https://developers.google.com/web/updates/2016/12/url-bar-resizing
    //so check width difference
    //without this check, the mobile comments disappear when you scroll up
    window.addEventListener('resize', () => {
        if (
            Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
            ) !== initialWindowWidth
        )
            debouncedPositionAllComments(true);
    });
}
