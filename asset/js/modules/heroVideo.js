/* ==========================================================
   HERO.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Initialize the homepage hero video
   - Respect reduced-motion preferences
   - Pause video when it leaves the viewport
   - Resume video when appropriate
   - Handle autoplay restrictions safely
   - Avoid duplicate initialization
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZE HERO
========================================================== */

export function initHero() {

    const video =
        document.querySelector(
            ".hero-video"
        );


    if (!video) {
        return;
    }


    /*
       Prevent duplicate initialization if the module is
       accidentally called more than once.
    */

    if (
        video.dataset.heroInitialized ===
        "true"
    ) {

        return;
    }


    video.dataset.heroInitialized =
        "true";


    /*
       Ensure the browser understands that this video is
       intended to be silent/background media.
    */

    video.muted = true;

    video.setAttribute(
        "muted",
        ""
    );

    video.setAttribute(
        "playsinline",
        ""
    );


    /*
       Reduced-motion users should not receive automatic
       hero-video playback.
    */

    if (prefersReducedMotion()) {

        pauseVideo(
            video
        );

        return;
    }


    /*
       If IntersectionObserver is unavailable, attempt
       playback directly.
    */

    if (
        !(
            "IntersectionObserver" in
            window
        )
    ) {

        playVideo(
            video
        );

        return;
    }


    initVideoObserver(
        video
    );


    /*
       Respond if the user changes their system/browser
       motion preference while the page is open.
    */

    watchMotionPreference(
        video
    );

}


/* ==========================================================
   HERO VIDEO OBSERVER
========================================================== */

function initVideoObserver(
    video
) {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            if (
                                !prefersReducedMotion()
                            ) {

                                playVideo(
                                    video
                                );

                            }

                            return;
                        }


                        pauseVideo(
                            video
                        );

                    }
                );

            },

            {
                threshold: 0.25
            }

        );


    observer.observe(
        video
    );


    /*
       Store the observer reference so another module or
       future cleanup routine can access it if necessary.
    */

    video._heroVideoObserver =
        observer;

}


/* ==========================================================
   PLAY VIDEO SAFELY
========================================================== */

function playVideo(
    video
) {

    if (!video) {
        return;
    }


    if (
        prefersReducedMotion()
    ) {

        pauseVideo(
            video
        );

        return;
    }


    /*
       The browser may block autoplay even for muted media.
       Treat that as an expected browser condition rather
       than an application error.
    */

    const playback =
        video.play();


    if (
        playback &&
        typeof playback.catch ===
        "function"
    ) {

        playback.catch(
            () => {

                /*
                   Autoplay restrictions are expected in
                   some browsers. The poster/fallback
                   remains available.
                */

            }
        );

    }

}


/* ==========================================================
   PAUSE VIDEO
========================================================== */

function pauseVideo(
    video
) {

    if (!video) {
        return;
    }


    try {

        video.pause();

    } catch (error) {

        console.warn(
            "[SovereignAqua] Unable to pause hero video.",
            error
        );

    }

}


/* ==========================================================
   REDUCED MOTION
========================================================== */

function prefersReducedMotion() {

    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

}


/* ==========================================================
   WATCH MOTION PREFERENCE
========================================================== */

function watchMotionPreference(
    video
) {

    const motionPreference =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const handleMotionChange =
        event => {

            if (
                event.matches
            ) {

                pauseVideo(
                    video
                );

                return;
            }


            /*
               Resume only if the video is actually visible.
               IntersectionObserver remains responsible for
               determining whether it should play.
            */

            if (
                isElementVisible(
                    video
                )
            ) {

                playVideo(
                    video
                );

            }

        };


    if (
        typeof motionPreference.addEventListener ===
        "function"
    ) {

        motionPreference.addEventListener(
            "change",
            handleMotionChange
        );

    } else if (
        typeof motionPreference.addListener ===
        "function"
    ) {

        motionPreference.addListener(
            handleMotionChange
        );

    }

}


/* ==========================================================
   VISIBILITY CHECK
========================================================== */

function isElementVisible(
    element
) {

    if (!element) {
        return false;
    }


    const rect =
        element.getBoundingClientRect();


    return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top <
            window.innerHeight &&
        rect.left <
            window.innerWidth
    );

}
