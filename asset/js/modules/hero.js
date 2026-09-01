```javascript
/* ==========================================================
   HERO.JS
   SovereignAqua Research & Development Foundation

   Hybrid Hero Module
   Handles:
   - Hero initialization
   - Hero video playback
   - IntersectionObserver visibility
   - Reduced-motion preferences
   - Autoplay restrictions
   - Hero loading state
   - Dynamic accessibility state
========================================================== */

"use strict";


/* ==========================================================
   PUBLIC INITIALIZER
========================================================== */

export function initHero() {

    const heroes =
        document.querySelectorAll(
            ".page-hero, .hero"
        );


    if (!heroes.length) {

        return;

    }


    heroes.forEach(
        initializeHero
    );

}


/* ==========================================================
   INITIALIZE INDIVIDUAL HERO
========================================================== */

function initializeHero(
    hero
) {

    /*
     * Mark the hero as initialized.
     */

    hero.classList.add(
        "hero-ready"
    );


    /*
     * Find optional hero media.
     */

    const video =
        hero.querySelector(
            "video.hero-video, video"
        );


    if (video) {

        initializeHeroVideo(
            hero,
            video
        );

    }


    /*
     * Activate hero content.
     */

    revealHeroContent(
        hero
    );

}


/* ==========================================================
   HERO CONTENT
========================================================== */

function revealHeroContent(
    hero
) {

    const content =
        hero.querySelector(
            ".page-hero-content, .hero-content"
        );


    if (!content) {

        return;

    }


    /*
     * Reduced-motion users should never
     * be forced through a visual animation.
     */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        content.classList.add(
            "is-visible"
        );

        return;

    }


    window.requestAnimationFrame(
        () => {

            content.classList.add(
                "is-visible"
            );

        }
    );

}


/* ==========================================================
   HERO VIDEO
========================================================== */

function initializeHeroVideo(
    hero,
    video
) {

    /*
     * Ensure the video cannot interrupt
     * page navigation or accessibility.
     */

    video.setAttribute(
        "playsinline",
        ""
    );


    video.muted = true;


    /*
     * Autoplay is intentionally disabled
     * when reduced motion is requested.
     */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        stopVideo(
            video
        );

        hero.classList.add(
            "hero-motion-disabled"
        );

        return;

    }


    /*
     * Make the video available for
     * intersection-based playback.
     */

    if (
        "IntersectionObserver"
        in window
    ) {

        observeHeroVideo(
            hero,
            video
        );

    } else {

        playVideo(
            hero,
            video
        );

    }


    /*
     * React if the user changes their
     * reduced-motion preference while
     * the page is open.
     */

    const motionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (
        typeof motionQuery.addEventListener
        === "function"
    ) {

        motionQuery.addEventListener(
            "change",
            event => {

                if (event.matches) {

                    stopVideo(
                        video
                    );

                    hero.classList.add(
                        "hero-motion-disabled"
                    );

                } else {

                    hero.classList.remove(
                        "hero-motion-disabled"
                    );

                    playVideo(
                        hero,
                        video
                    );

                }

            }
        );

    }

}


/* ==========================================================
   OBSERVE HERO VIDEO
========================================================== */

function observeHeroVideo(
    hero,
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

                            playVideo(
                                hero,
                                video
                            );

                        } else {

                            pauseVideo(
                                video
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.20,

                rootMargin:
                    "100px 0px 100px 0px"

            }

        );


    observer.observe(
        video
    );


    /*
     * Store a reference so the module
     * can be inspected/debugged later.
     */

    hero._heroVideoObserver =
        observer;

}


/* ==========================================================
   PLAY VIDEO
========================================================== */

function playVideo(
    hero,
    video
) {

    /*
     * Never attempt playback when
     * reduced motion is enabled.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    video.muted = true;


    video.setAttribute(
        "playsinline",
        ""
    );


    const playback =
        video.play();


    /*
     * Modern browsers return a Promise
     * from HTMLMediaElement.play().
     */

    if (
        playback &&
        typeof playback.catch === "function"
    ) {

        playback.catch(
            () => {

                /*
                 * Autoplay may be blocked by
                 * the browser. This is not a
                 * fatal application error.
                 */

                hero.classList.add(
                    "hero-video-fallback"
                );

            }
        );

    }


    hero.classList.add(
        "hero-video-active"
    );

}


/* ==========================================================
   PAUSE VIDEO
========================================================== */

function pauseVideo(
    video
) {

    if (
        !video ||
        video.paused
    ) {

        return;

    }


    video.pause();

}


/* ==========================================================
   STOP VIDEO
========================================================== */

function stopVideo(
    video
) {

    if (!video) {

        return;

    }


    video.pause();


    /*
     * Resetting currentTime is avoided here.
     * The browser can retain the current frame
     * as the visual fallback.
     */

}


/* ==========================================================
   CLEANUP
========================================================== */

export function destroyHero() {

    const heroes =
        document.querySelectorAll(
            ".page-hero, .hero"
        );


    heroes.forEach(
        hero => {

            const observer =
                hero._heroVideoObserver;


            if (
                observer &&
                typeof observer.disconnect
                === "function"
            ) {

                observer.disconnect();

            }


            delete hero._heroVideoObserver;

        }
    );

}
```
