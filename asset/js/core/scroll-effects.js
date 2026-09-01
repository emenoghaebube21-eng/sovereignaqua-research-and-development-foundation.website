```javascript
/* ==========================================================
   SCROLL-EFFECTS.JS
   SovereignAqua Research & Development Foundation

   Core UI Module
   Hybrid 3D Architecture

   Handles:
   - Scroll reveal
   - Fade-in elements
   - Scale reveals
   - IntersectionObserver
   - Reduced-motion preferences
   - Browser fallback
   - Dynamic content compatibility
========================================================== */

"use strict";


/* ==========================================================
   PUBLIC INITIALIZER
========================================================== */

export function initScrollEffects() {

    const elements =
        document.querySelectorAll(
            [
                ".fade-in",
                ".fade-scale",
                ".reveal",
                ".reveal-up",
                ".reveal-scale",
                "[data-reveal]"
            ].join(",")
        );


    /*
     * No reveal elements on this page.
     */

    if (!elements.length) {

        return;

    }


    /*
     * Respect accessibility preferences.
     */

    const motionPreference =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (motionPreference.matches) {

        revealImmediately(
            elements
        );

        return;

    }


    /*
     * Modern browser implementation.
     */

    if (
        "IntersectionObserver"
        in window
    ) {

        observeElements(
            elements
        );

    } else {

        /*
         * Older browser fallback.
         */

        revealImmediately(
            elements
        );

    }


    /*
     * Respond if the user changes the
     * reduced-motion setting while the
     * page is open.
     */

    if (
        typeof motionPreference.addEventListener
        === "function"
    ) {

        motionPreference.addEventListener(
            "change",
            event => {

                if (
                    event.matches
                ) {

                    revealImmediately(
                        elements
                    );

                }

            }
        );

    }

}


/* ==========================================================
   OBSERVE ELEMENTS
========================================================== */

function observeElements(
    elements
) {

    const observer =
        new IntersectionObserver(

            (entries, observerInstance) => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        revealElement(
                            entry.target
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"

            }

        );


    elements.forEach(
        element => {

            /*
             * Hide only elements that have
             * not already been initialized.
             */

            if (
                element.dataset.revealInitialized
                === "true"
            ) {

                return;

            }


            element.dataset.revealInitialized =
                "true";


            observer.observe(
                element
            );

        }
    );


    /*
     * Keep the observer available for
     * optional debugging and cleanup.
     */

    document.documentElement
        ._sovereignAquaRevealObserver =
        observer;

}


/* ==========================================================
   REVEAL ELEMENT
========================================================== */

function revealElement(
    element
) {

    if (!element) {

        return;

    }


    element.classList.add(
        "show"
    );


    element.classList.add(
        "is-visible"
    );


    element.setAttribute(
        "data-revealed",
        "true"
    );

}


/* ==========================================================
   REVEAL IMMEDIATELY
========================================================== */

function revealImmediately(
    elements
) {

    elements.forEach(
        element => {

            revealElement(
                element
            );

        }
    );

}


/* ==========================================================
   PUBLIC REVEAL FUNCTION
   Useful for dynamically inserted content.
========================================================== */

export function revealContent(
    root = document
) {

    const elements =
        root.querySelectorAll
            ? root.querySelectorAll(
                [
                    ".fade-in",
                    ".fade-scale",
                    ".reveal",
                    ".reveal-up",
                    ".reveal-scale",
                    "[data-reveal]"
                ].join(",")
            )
            : [];


    if (!elements.length) {

        return;

    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        reducedMotion ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealImmediately(
            elements
        );

        return;

    }


    observeElements(
        elements
    );

}


/* ==========================================================
   PUBLIC CLEANUP
========================================================== */

export function destroyScrollEffects() {

    const observer =
        document.documentElement
            ._sovereignAquaRevealObserver;


    if (
        observer &&
        typeof observer.disconnect
        === "function"
    ) {

        observer.disconnect();

    }


    delete document.documentElement
        ._sovereignAquaRevealObserver;


    document
        .querySelectorAll(
            [
                ".fade-in",
                ".fade-scale",
                ".reveal",
                ".reveal-up",
                ".reveal-scale",
                "[data-reveal]"
            ].join(",")
        )
        .forEach(
            element => {

                element.classList.remove(
                    "show",
                    "is-visible"
                );


                element.removeAttribute(
                    "data-revealed"
                );


                delete element.dataset
                    .revealInitialized;

            }
        );

}
```
