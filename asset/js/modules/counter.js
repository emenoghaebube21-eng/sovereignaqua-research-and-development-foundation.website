/* ==========================================================
   COUNTER.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Detect statistic counters
   - Animate counters when visible
   - Respect reduced-motion preferences
   - Prevent duplicate initialization
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZE COUNTERS
========================================================== */

export function initCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (!counters.length) {
        return;
    }


    /*
       Prevent the same counter elements from being
       initialized more than once.
    */

    const uninitializedCounters =
        Array.from(counters).filter(
            counter =>
                counter.dataset.counterInitialized !==
                "true"
        );


    if (!uninitializedCounters.length) {
        return;
    }


    uninitializedCounters.forEach(
        counter => {

            counter.dataset.counterInitialized =
                "true";

        }
    );


    /*
       Users who prefer reduced motion receive the final
       value immediately.
    */

    if (prefersReducedMotion()) {

        uninitializedCounters.forEach(
            counter => {

                setFinalCounterValue(
                    counter
                );

            }
        );

        return;
    }


    /*
       Fallback for browsers without IntersectionObserver.
    */

    if (
        !(
            "IntersectionObserver" in
            window
        )
    ) {

        uninitializedCounters.forEach(
            counter => {

                animateCounter(
                    counter
                );

            }
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


                        animateCounter(
                            entry.target
                        );


                        obs.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.5
            }

        );


    uninitializedCounters.forEach(
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

    if (!counter) {
        return;
    }


    /*
       Prevent duplicate animation.
    */

    if (
        counter.dataset.counterAnimated ===
        "true"
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
        parseDuration(
            counter.dataset.duration
        );


    if (
        target === null ||
        duration === null
    ) {

        counter.textContent =
            "0";

        return;

    }


    /*
       Reduced-motion may be enabled after the observer
       has been created, so check again at animation time.
    */

    if (prefersReducedMotion()) {

        setFinalCounterValue(
            counter,
            target
        );

        return;

    }


    const startValue =
        0;


    let startTime = null;


    function updateCounter(
        timestamp
    ) {

        /*
           Respect a motion preference that changes while
           the animation is running.
        */

        if (prefersReducedMotion()) {

            setFinalCounterValue(
                counter,
                target
            );

            return;

        }


        if (startTime === null) {

            startTime = timestamp;

        }


        const elapsed =
            timestamp -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
           Ease-out interpolation produces a more natural
           visual finish than a strictly linear counter.
        */

        const easedProgress =
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
            ) *
            easedProgress;


        counter.textContent =
            formatCounterValue(
                currentValue,
                target
            );


        if (progress < 1) {

            window.requestAnimationFrame(
                updateCounter
            );

            return;

        }


        setFinalCounterValue(
            counter,
            target
        );

    }


    window.requestAnimationFrame(
        updateCounter
    );

}


/* ==========================================================
   SET FINAL VALUE
========================================================== */

function setFinalCounterValue(
    counter,
    value = null
) {

    if (!counter) {
        return;
    }


    const target =
        value !== null
            ? value
            : parseNumber(
                counter.dataset.target
            );


    if (target === null) {

        counter.textContent =
            "0";

        return;

    }


    counter.textContent =
        formatCounterValue(
            target,
            target
        );


    counter.dataset.counterAnimated =
        "true";

}


/* ==========================================================
   FORMAT COUNTER VALUE
========================================================== */

function formatCounterValue(
    value,
    target
) {

    /*
       Preserve decimal precision when the target
       contains decimal places.
    */

    const targetString =
        String(target);


    const decimalPosition =
        targetString.indexOf(
            "."
        );


    const decimalPlaces =
        decimalPosition === -1
            ? 0
            : targetString.length -
              decimalPosition -
              1;


    return Number(
        value
    ).toLocaleString(
        undefined,
        {
            minimumFractionDigits:
                decimalPlaces,

            maximumFractionDigits:
                decimalPlaces
        }
    );

}


/* ==========================================================
   PARSE TARGET
========================================================== */

function parseNumber(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;

    }


    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return null;

    }


    return number;

}


/* ==========================================================
   PARSE DURATION
========================================================== */

function parseDuration(
    value
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return 2000;

    }


    const duration =
        Number(
            value
        );


    if (
        !Number.isFinite(
            duration
        ) ||
        duration <= 0
    ) {

        return 2000;

    }


    return Math.min(
        duration,
        10000
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
