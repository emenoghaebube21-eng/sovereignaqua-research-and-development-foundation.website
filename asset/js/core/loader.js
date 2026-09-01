```javascript id="h7k2q1"
/* ==========================================================
   LOADER.JS
   SovereignAqua Research & Development Foundation

   Core UI Module
   Hybrid Architecture

   Handles:
   - Initial page loader
   - Accessible loading state
   - Window load detection
   - Safe loader removal
   - Reduced-motion compatibility
========================================================== */

"use strict";


/* ==========================================================
   PUBLIC INITIALIZER
========================================================== */

export function initLoader() {

    const loader =
        document.getElementById("loader");


    /*
     * Pages without a loader should continue
     * normally without throwing an error.
     */

    if (!loader) {

        return;

    }


    /*
     * Prevent duplicate initialization.
     */

    if (
        loader.dataset.initialized === "true"
    ) {

        return;

    }


    loader.dataset.initialized =
        "true";


    /*
     * Make the loader state explicit.
     */

    loader.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
     * If the document has already completed,
     * remove the loader immediately.
     */

    if (
        document.readyState === "complete"
    ) {

        hideLoader(
            loader
        );

        return;

    }


    /*
     * Otherwise wait for the complete page
     * load event.
     */

    window.addEventListener(
        "load",
        () => {

            hideLoader(
                loader
            );

        },
        {
            once: true
        }
    );

}


/* ==========================================================
   HIDE LOADER
========================================================== */

function hideLoader(
    loader
) {

    if (
        !loader ||
        !loader.isConnected
    ) {

        return;

    }


    /*
     * Mark the loader as closing so repeated
     * events cannot restart the transition.
     */

    if (
        loader.dataset.closing === "true"
    ) {

        return;

    }


    loader.dataset.closing =
        "true";


    loader.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
     * Respect reduced-motion preferences.
     */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        removeLoader(
            loader
        );

        return;

    }


    /*
     * CSS controls the visual transition.
     * JavaScript only changes the state.
     */

    loader.classList.add(
        "is-hidden"
    );


    /*
     * Remove after the transition.
     */

    window.setTimeout(
        () => {

            removeLoader(
                loader
            );

        },
        500
    );

}


/* ==========================================================
   REMOVE LOADER
========================================================== */

function removeLoader(
    loader
) {

    if (
        !loader ||
        !loader.isConnected
    ) {

        return;

    }


    loader.remove();

}


/* ==========================================================
   PUBLIC FORCE-HIDE
   Useful for emergency recovery or debugging.
========================================================== */

export function forceHideLoader() {

    const loader =
        document.getElementById(
            "loader"
        );


    if (!loader) {

        return;

    }


    loader.classList.add(
        "is-hidden"
    );


    loader.setAttribute(
        "aria-hidden",
        "true"
    );


    removeLoader(
        loader
    );

}
```
