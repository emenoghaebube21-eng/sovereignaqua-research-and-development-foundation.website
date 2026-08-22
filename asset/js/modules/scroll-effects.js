/* ==========================================================
   SCROLL-EFFECTS.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Scroll-triggered visual effects
   - Reveal elements when they enter the viewport
   - Apply optional navbar/shadow scroll state
   - Respect reduced-motion preferences
   - Use IntersectionObserver when available
   - Prevent duplicate initialization

   Excluded responsibilities:
   - Navigation/menu behavior
   - Scroll progress
   - Page loader
   - Counters
   - Anchor scrolling
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZE SCROLL EFFECTS
========================================================== */

export function initScrollEffects() {

    initRevealEffects();

    initScrollState();

}


/* ==========================================================
   REVEAL EFFECTS
========================================================== */

function initRevealEffects() {

    const elements =
        document.querySelectorAll(
            ".fade-in, .fade-scale, .scroll-reveal"
        );


    if (!elements.length) {
        return;
    }


    /*
       Prevent animation for users who prefer reduced motion.
    */

    if (prefersReducedMotion()) {

        revealImmediately(
            elements
        );

        return;

    }


    /*
       Browser fallback.
    */

    if (
        !(
            "IntersectionObserver" in
            window
        )
    ) {

        revealImmediately(
            elements
        );

        return;

    }


    const observer =
        new IntersectionObserver(

            (entries, obs) => {

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


                        obs.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.15,

                rootMargin:
                    "0px 0px -50px 0px"
            }

        );


    elements.forEach(
        element => {

            if (
                element.dataset
                    .scrollEffectInitialized ===
                "true"
            ) {

                return;

            }


            element.dataset
                .scrollEffectInitialized =
                "true";


            observer.observe(
                element
            );

        }
    );

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
        "revealed"
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
   NAVBAR SCROLL STATE
========================================================== */

function initScrollState() {

    const navbar =
        document.getElementById(
            "navbar"
        );


    if (!navbar) {
        return;
    }


    if (
        navbar.dataset
            .scrollEffectInitialized ===
        "true"
    ) {

        return;

    }


    navbar.dataset
        .scrollEffectInitialized =
        "true";


    let ticking = false;


    const update =
        () => {

            const scrolled =
                window.scrollY >
                60;


            navbar.classList.toggle(
                "scrolled",
                scrolled
            );


            ticking = false;

        };


    const requestUpdate =
        () => {

            if (ticking) {
                return;
            }


            ticking = true;


            window.requestAnimationFrame(
                update
            );

        };


    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    update();

}


/* ==========================================================
   REDUCED MOTION
========================================================== */

function prefersReducedMotion() {

    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

}
