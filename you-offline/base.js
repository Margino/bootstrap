// sourсe: https://mxb.at/blog/youre-offline/

if ('onLine' in navigator) {

    let isOffline = false;

    // check if we're online, set a class on <body> if not
    const updateStatus = () => {
        isOffline = !navigator.onLine;
        document.body.classList.toggle('is-offline', isOffline);

        if (isOffline) {

        } else {

        }
    };

    // when the page has finished loading listen for future changes in connection
    const checkConnectivity = () => {
        updateStatus();
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
    };

    window.addEventListener('load', checkConnectivity);

}
