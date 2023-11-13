// ==UserScript==
// @name        YouTube End Stream
// @namespace   eirrw
// @version     1.0.1
// @description Automatically dismiss the popup when ending a stream on YouTube
// @author      eirrw
// @match       https://studio.youtube.com/*/livestreaming
// @grant       window.focus
// @licence     MIT
// ==/UserScript==

(function () {
    'use strict';
    const LOG_STATUS = true;        // output status logs
    const LOG_DEBUG = false;        // log debug info
    const POLL_TIME_SECONDS = 30;   // time between checks in seconds

    const DISMISS_LINK_SELECTOR = '#dismiss-link';
    const END_STREAM_SELECTOR = '#end-stream-button';

    // main logic
    function triggerDismissLink() {
        // get the dismiss button
        let el = document.querySelector(DISMISS_LINK_SELECTOR);

        // debug info, set const to use
        let debugInfo = {};
        if (LOG_DEBUG) {
            debugInfo = {
                element: el,
                isVisible: (el?.offsetParent !== null),
                docStatus: document.visibilityState,
                streamLive: document.querySelector(END_STREAM_SELECTOR)?.offsetParent !== null
            }
        }

        // attempt to trigger popup if not active
        if (el === null || el.offsetParent === null) {
            (LOG_DEBUG || LOG_STATUS) && console.log('Dismiss link not available', debugInfo);
            window.focus();
            return;
        }

        // click the button
        (LOG_DEBUG || LOG_STATUS) && console.log('Found dismiss link, triggering', debugInfo);
        el.click();
    }

    console.log('Starting dismiss watcher');
    setInterval(triggerDismissLink, (POLL_TIME_SECONDS * 1000)); // start poll timer
})();
