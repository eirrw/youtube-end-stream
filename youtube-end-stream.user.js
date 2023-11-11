// ==UserScript==
// @name        YouTube End Stream
// @namespace   eirrw
// @version     1.0.0
// @description Automatically dismiss the popup when ending a stream on YouTube
// @author      eirrw
// @match       https://studio.youtube.com/*/livestreaming
// @grant       window.focus
// @licence     MIT
// ==/UserScript==

(function () {
    'use strict';
    const DEBUG = false;

    const DISMISS_LINK_SELECTOR = '#dismiss-link';
    const END_STREAM_SELECTOR = '#end-stream-button';

    // main logic
    function triggerDismissLink() {
        // get the dismiss button
        let el = document.querySelector(DISMISS_LINK_SELECTOR);

        // debug info, set const to use
        let debugInfo = {};
        if (DEBUG) {
            debugInfo = {
                element: el,
                isVisible: (el?.offsetParent !== null),
                docStatus: document.visibilityState,
                streamLive: document.querySelector(END_STREAM_SELECTOR)?.offsetParent !== null
            }
        }

        // attempt to trigger popup if not active
        if (el === null || el.offsetParent === null) {
            console.log('Dismiss link not available', debugInfo);
            window.focus();
            return;
        }

        // click the button
        console.log('Found dismiss link, triggering', debugInfo);
        el.click();
    }

    console.log('Starting dismiss watcher');
    setInterval(triggerDismissLink, 30000); // 30 seconds
})();
