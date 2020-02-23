import { closeAllComments } from './modules/toggleMobileComment.js';
import {
    debouncedPositionAllComments,
    positionAllComments,
} from './modules/positionAllComments.js';

//execute on load
//curly brackets mean an IIFE
{
    positionAllComments();
    closeAllComments();
    //the event listener passes the event as an argument,
    //so the parameter reposition will be true
    window.addEventListener('resize', debouncedPositionAllComments);
}
