// ==UserScript==
// @name        YouTube End Stream
// @namespace   eirrw
// @version     1.0.0
// @description Automatically dismiss the popup when ending a stream on YouTube
// @author      eirrw
// @match       https://studio.youtube.com/*/livestreaming
// @licence     MIT
// ==/UserScript==

(function () {
    'use strict';
    const DEBUG = false;

    const DISMISS_LINK_SELECTOR = '#dismiss-link';
    const END_STREAM_SELECTOR = '#end-stream-button';

    document.addEventListener("visibilitychange", (e) => {
        console.log(document.hidden);
        if (document.hidden) {
            console.log('Bocking visibilitychange propogation');
            e.preventDefault();
            e.stopPropagation();
        }
    });

    // main logic
    function triggerDismissLink() {
        let el = document.querySelector(DISMISS_LINK_SELECTOR);
        let debugInfo = {};
        if (DEBUG) {
            debugInfo = {
                element: el,
                isVisible: (el?.offsetParent !== null),
                docStatus: document.visibilityState,
                streamLive: document.querySelector(END_STREAM_SELECTOR)?.offsetParent !== null
            }
        }

        if (el === null || el.offsetParent === null) {
            console.log('Dismiss link not available', debugInfo);
            return;
        }

        console.log('Found dismiss link, triggering', debugInfo);
        el.click();
    }

    console.log('Starting dismiss watcher');
    setInterval(triggerDismissLink, 30000); // 30 seconds
})();
