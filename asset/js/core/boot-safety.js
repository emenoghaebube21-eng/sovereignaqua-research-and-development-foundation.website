"use strict";

// This runs independently of the module graph so a broken optional module
// can never trap the visitor behind the page loader indefinitely.
(function bootSafety() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const hide = () => {
        loader.classList.add("is-hidden");
        loader.setAttribute("aria-busy", "false");
        window.setTimeout(() => {
            if (loader.isConnected) loader.remove();
        }, 550);
    };

    if (document.readyState === "complete") {
        window.setTimeout(hide, 0);
    } else {
        window.addEventListener("load", hide, { once: true });
        window.setTimeout(hide, 6000);
    }
})();
