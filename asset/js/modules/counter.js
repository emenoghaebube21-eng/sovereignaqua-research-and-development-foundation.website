```javascript
/* ==========================================================
   COUNTER.JS
   SovereignAqua Research & Development Foundation

   Hybrid Application Module
   Purpose:
   - Animate numerical statistics
   - Respect reduced-motion preferences
   - Use IntersectionObserver when available
   - Prevent counters from running repeatedly
========================================================== */

"use strict";


/* ==========================================================
   PUBLIC INITIALIZER
========================================================== */

export function initCounter() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) {

        return;

    }


    /*
     * Respect accessibility preferences.
     * Users who request reduced motion receive
     * the final values immediately.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        counters.forEach(
            setFinalValue
        );

        return;

    }


    /*
     * IntersectionObserver provides efficient
     * viewport-based activation.
     */

    if (
        "IntersectionObserver"
        in window
    ) {

        observeCounters(
            counters
        );

        return;

    }


    /*
     * Older-browser fallback.
     */

    counters.forEach(
        animateCounter
    );

}


/* ==========================================================
   OBSERVE COUNTERS
========================================================== */

function observeCounters(
    counters
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


                        animateCounter(
                            entry.target
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.35,

                rootMargin:
                    "0px 0px -40px 0px"

            }

        );


    counters.forEach(
        counter => {

            observer.observe(
                counter
            );

        }
    );

}


/* ==========================================================
   ANIMATE COUNTER
========================================================== */

function animateCounter(
    counter
) {

    /*
     * Prevent duplicate animations.
     */

    if (
        counter.dataset.counterAnimated
        === "true"
    ) {

        return;

    }


    counter.dataset.counterAnimated =
        "true";


    const target =
        parseNumber(
            counter.dataset.target
        );


    const duration =
        parseNumber(
            counter.dataset.duration,
            1800
        );


    if (
        target === null
    ) {

        return;

    }


    /*
     * Preserve optional formatting.
     */

    const prefix =
        counter.dataset.prefix || "";


    const suffix =
        counter.dataset.suffix || "";


    /*
     * Respect reduced motion if the
     * preference changes after page load.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        renderValue(
            counter,
            target,
            prefix,
            suffix
        );

        return;

    }


    const startValue =
        parseNumber(
            counter.dataset.start,
            0
        );


    const startTime =
        performance.now();


    function update(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
         * Ease-out interpolation.
         * This gives the number a smoother
         * finish than linear counting.
         */

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            startValue +
            (
                target -
                startValue
            ) * eased;


        renderValue(
            counter,
            currentValue,
            prefix,
            suffix,
            progress >= 1
        );


        if (
            progress < 1
        ) {

            window.requestAnimationFrame(
                update
            );

        }

    }


    window.requestAnimationFrame(
        update
    );

}


/* ==========================================================
   SET FINAL VALUE
========================================================== */

function setFinalValue(
    counter
) {

    const target =
        parseNumber(
            counter.dataset.target
        );


    if (
        target === null
    ) {

        return;

    }


    renderValue(
        counter,
        target,
        counter.dataset.prefix || "",
        counter.dataset.suffix || "",
        true
    );


    counter.dataset.counterAnimated =
        "true";

}


/* ==========================================================
   RENDER VALUE
========================================================== */

function renderValue(
    counter,
    value,
    prefix = "",
    suffix = "",
    completed = false
) {

    /*
     * Counters in the current Foundation
     * design use whole-number metrics.
     */

    const formatted =
        Math.round(
            value
        ).toLocaleString();


    counter.textContent =
        `${prefix}${formatted}${suffix}`;


    /*
     * If the original markup used a
     * visually-hidden label, it remains
     * independent of the animated value.
     */

    if (
        completed
    ) {

        counter.setAttribute(
            "data-counter-complete",
            "true"
        );

    }

}


/* ==========================================================
   SAFE NUMBER PARSER
========================================================== */

function parseNumber(
    value,
    fallback = null
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return fallback;

    }


    const number =
        Number(
            String(value)
                .replace(
                    /,/g,
                    ""
                )
        );


    return Number.isFinite(
        number
    )
        ? number
        : fallback;

}
```
