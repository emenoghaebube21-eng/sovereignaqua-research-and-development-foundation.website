/* ==========================================================
   LOADER.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Initialize the page loader
   - Hide the loader after the page is ready
   - Respect reduced-motion preferences
   - Prevent duplicate initialization
   - Remove the loader from the DOM after transition
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZE LOADER
========================================================== */

export function initLoader() {

    const loader =
        document.getElementById(
            "loader"
        );


    if (!loader) {
        return;
    }


    /*
       Prevent duplicate initialization.
    */

    if (
        loader.dataset.initialized ===
        "true"
    ) {

        return;
    }


    loader.dataset.initialized =
        "true";


    /*
       Keep the loader visible while the document is loading.
    */

    loader.setAttribute(
        "aria-busy",
        "true"
    );


    /*
       If reduced motion is requested, remove the loader
       without waiting for a visual transition.
    */

    if (
        prefersReducedMotion()
    ) {

        hideLoader(
            loader,
            true
        );

        return;
    }


    /*
       Hide the loader once all page resources have loaded.
    */

    window.addEventListener(
        "load",
        () => {

            hideLoader(
                loader,
                false
            );

        },
        {
            once: true
        }
    );


    /*
       Safety fallback.

       If a resource prevents the normal load event from
       completing, do not leave the visitor permanently
       trapped behind the loader.
    */

    window.setTimeout(
        () => {

            if (
                loader.isConnected
            ) {

                hideLoader(
                    loader,
                    false
                );

            }

        },
        8000
    );

}


/* ==========================================================
   HIDE LOADER
========================================================== */

function hideLoader(
    loader,
    immediate = false
) {

    if (!loader) {
        return;
    }


    loader.setAttribute(
        "aria-busy",
        "false"
    );


    loader.classList.add(
        "is-hidden"
    );


    /*
       Reduced-motion users should not wait for a CSS
       transition.
    */

    if (immediate) {

        loader.remove();

        return;
    }


    /*
       Allow the CSS transition to complete before removing
       the loader from the DOM.
    */

    const removalDelay = 500;


    window.setTimeout(
        () => {

            if (
                loader &&
                loader.isConnected
            ) {

                loader.remove();

            }

        },
        removalDelay
    );

}


/* ==========================================================
   REDUCED MOTION
========================================================== */

function prefersReducedMotion() {

    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

}
