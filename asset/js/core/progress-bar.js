```javascript
/* ==========================================================
   PROGRESS-BAR.JS
   SovereignAqua Research & Development Foundation

   Core UI Module
   Hybrid Architecture

   Handles:
   - Scroll progress indicator
   - Efficient requestAnimationFrame updates
   - Resize recalculation
   - Reduced-motion compatibility
   - Safe initialization
========================================================== */

"use strict";


/* ==========================================================
   PUBLIC INITIALIZER
========================================================== */

export function initProgressBar() {

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    /*
     * Pages without a progress bar should
     * continue normally.
     */

    if (!progressBar) {

        return;

    }


    /*
     * Prevent duplicate initialization.
     */

    if (
        progressBar.dataset.initialized === "true"
    ) {

        return;

    }


    progressBar.dataset.initialized =
        "true";


    /*
     * Accessibility:
     * The progress indicator is decorative
     * and should not interrupt screen readers.
     */

    progressBar.setAttribute(
        "aria-hidden",
        "true"
    );


    let ticking = false;


    /* ======================================================
       UPDATE PROGRESS
    ======================================================= */

    function updateProgress() {

        const scrollTop =
            window.scrollY || 0;


        const documentHeight =
            document.documentElement
                .scrollHeight;


        const viewportHeight =
            window.innerHeight;


        const scrollableHeight =
            documentHeight -
            viewportHeight;


        /*
         * No scrollable content.
         */

        if (
            scrollableHeight <= 0
        ) {

            progressBar.style.width =
                "0%";

            ticking = false;

            return;

        }


        /*
         * Clamp the value between
         * 0 and 100.
         */

        const percentage =
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
            `${percentage}%`;


        /*
         * Optional CSS state.
         */

        progressBar.classList.toggle(
            "is-complete",
            percentage >= 99.9
        );


        ticking = false;

    }


    /* ======================================================
       REQUEST UPDATE
    ======================================================= */

    function requestUpdate() {

        if (ticking) {

            return;

        }


        ticking = true;


        window.requestAnimationFrame(
            updateProgress
        );

    }


    /* ======================================================
       SCROLL
    ======================================================= */

    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    /* ======================================================
       RESIZE
    ======================================================= */

    window.addEventListener(
        "resize",
        requestUpdate,
        {
            passive: true
        }
    );


    /* ======================================================
       ORIENTATION CHANGE
    ======================================================= */

    window.addEventListener(
        "orientationchange",
        requestUpdate,
        {
            passive: true
        }
    );


    /*
     * Calculate the initial position immediately.
     */

    updateProgress();

}


/* ==========================================================
   RESET PROGRESS
========================================================== */

export function resetProgressBar() {

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (!progressBar) {

        return;

    }


    progressBar.style.width =
        "0%";


    progressBar.classList.remove(
        "is-complete"
    );

}
```
