/* ==========================================================
   ANIMATIONS.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Scroll reveal
   - Page loading state
   - Reading progress indicator
   - Anchor scrolling
   - Reduced-motion handling

   Navigation and accessibility behavior remain in their
   respective modules.
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initAnimations
);


function initAnimations() {

    initScrollReveal();

    initProgressBar();

    initSmoothScroll();

    initLoader();

}


/* ==========================================================
   REDUCED MOTION DETECTION
========================================================== */

function prefersReducedMotion() {

    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".fade-in, .fade-scale"
        );

    if (!elements.length) {
        return;
    }


    /*
       Users who prefer reduced motion should not have to
       wait for reveal animations.
    */

    if (prefersReducedMotion()) {

        elements.forEach(
            element => {

                element.classList.add("show");

            }
        );

        return;

    }


    /*
       Browser fallback for environments without
       IntersectionObserver.
    */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(
            element => {

                element.classList.add("show");

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(

            (entries, obs) => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "show"
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

            observer.observe(
                element
            );

        }
    );

}


/* ==========================================================
   PAGE LOADER
========================================================== */

function initLoader() {

    const loader =
        document.getElementById(
            "loader"
        );

    if (!loader) {
        return;
    }


    window.addEventListener(
        "load",
        () => {

            /*
               Do not apply a prolonged transition when
               reduced motion is requested.
            */

            if (prefersReducedMotion()) {

                loader.remove();

                return;

            }


            loader.classList.add(
                "is-hidden"
            );


            window.setTimeout(
                () => {

                    if (
                        loader &&
                        loader.isConnected
                    ) {

                        loader.remove();

                    }

                },
                500
            );

        },
        {
            once: true
        }
    );

}


/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

function initProgressBar() {

    const progressBar =
        document.getElementById(
            "progressBar"
        );

    if (!progressBar) {
        return;
    }


    function updateProgress() {

        const scrollTop =
            window.scrollY ||
            window.pageYOffset ||
            0;


        const documentHeight =
            document.documentElement
                .scrollHeight;


        const viewportHeight =
            window.innerHeight;


        const scrollableHeight =
            documentHeight -
            viewportHeight;


        if (scrollableHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const progress =
            Math.min(
                100,
                Math.max(
                    0,
                    (
                        scrollTop /
                        scrollableHeight
                    ) * 100
                )
            );


        progressBar.style.width =
            `${progress}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();

}


/* ==========================================================
   SMOOTH ANCHOR SCROLLING
========================================================== */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    if (!links.length) {
        return;
    }


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    /*
                       Ignore empty hash links.
                    */

                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    let target;

                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch (error) {

                        /*
                           Ignore invalid selectors rather
                           than breaking other page scripts.
                        */

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior:
                                prefersReducedMotion()
                                    ? "auto"
                                    : "smooth",

                            block: "start"
                        }
                    );


                    /*
                       Update the URL without forcing an
                       additional browser jump.
                    */

                    if (
                        window.history &&
                        typeof window.history
                            .pushState ===
                            "function"
                    ) {

                        window.history.pushState(
                            null,
                            "",
                            href
                        );

                    }

                }
            );

        }
    );

}


/* ==========================================================
   DYNAMIC REDUCED-MOTION STATE
========================================================== */

function initReducedMotionState() {

    const motionPreference =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    updateMotionState(
        motionPreference.matches
    );


    if (
        typeof motionPreference.addEventListener ===
        "function"
    ) {

        motionPreference.addEventListener(
            "change",
            event => {

                updateMotionState(
                    event.matches
                );

            }
        );

    } else if (
        typeof motionPreference.addListener ===
        "function"
    ) {

        motionPreference.addListener(
            event => {

                updateMotionState(
                    event.matches
                );

            }
        );

    }

}


/* ==========================================================
   APPLY MOTION STATE
========================================================== */

function updateMotionState(
    reducedMotion
) {

    document.documentElement.dataset.motion =
        reducedMotion
            ? "reduced"
            : "full";

}


/* ==========================================================
   START MOTION PREFERENCE MONITOR
========================================================== */

initReducedMotionState();
