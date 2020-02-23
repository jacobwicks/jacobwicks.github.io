export const debounce = (func, wait, immediate) => {
    let timeout;
    //the returned function needs to use this
    //so use the function keyword instead of const
    return function() {
        let context = this;
        let args = arguments;

        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};
