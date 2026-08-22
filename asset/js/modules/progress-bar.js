/* ==========================================================
   PROGRESS-BAR.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Initialize the page scroll-progress indicator
   - Calculate document reading progress
   - Update progress efficiently during scrolling
   - Respond to viewport/document size changes
   - Prevent duplicate initialization
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZE PROGRESS BAR
========================================================== */

export function initProgressBar() {

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    if (!progressBar) {
        return;
    }


    /*
       Prevent duplicate initialization.
    */

    if (
        progressBar.dataset.initialized ===
        "true"
    ) {

        return;
    }


    progressBar.dataset.initialized =
        "true";


    /*
       Ensure the progress element starts at zero.
    */

    setProgress(
        progressBar,
        0
    );


    let ticking = false;


    /* ------------------------------------------------------
       UPDATE REQUEST
    ------------------------------------------------------ */

    function requestUpdate() {

        if (ticking) {
            return;
        }


        ticking = true;


        window.requestAnimationFrame(
            () => {

                updateProgress(
                    progressBar
                );

                ticking = false;

            }
        );

    }


    /* ------------------------------------------------------
       SCROLL
    ------------------------------------------------------ */

    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    /* ------------------------------------------------------
       RESIZE
    ------------------------------------------------------ */

    window.addEventListener(
        "resize",
        requestUpdate,
        {
            passive: true
        }
    );


    /* ------------------------------------------------------
       DOCUMENT CONTENT CHANGES
    ------------------------------------------------------ */

    if (
        "ResizeObserver" in
        window
    ) {

        const documentObserver =
            new ResizeObserver(
                requestUpdate
            );


        documentObserver.observe(
            document.documentElement
        );


        progressBar._documentObserver =
            documentObserver;

    }


    /*
       Calculate the initial state immediately.
    */

    updateProgress(
        progressBar
    );

}


/* ==========================================================
   UPDATE PROGRESS
========================================================== */

function updateProgress(
    progressBar
) {

    if (!progressBar) {
        return;
    }


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


    /*
       A page that does not require scrolling has no
       measurable reading progress.
    */

    if (
        scrollableHeight <= 0
    ) {

        setProgress(
            progressBar,
            0
        );

        return;

    }


    const percentage =
        (
            scrollTop /
            scrollableHeight
        ) * 100;


    const progress =
        Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        );


    setProgress(
        progressBar,
        progress
    );

}


/* ==========================================================
   SET PROGRESS
========================================================== */

function setProgress(
    progressBar,
    percentage
) {

    const value =
        Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        );


    /*
       Use transform when possible because it avoids
       repeatedly triggering layout calculations.

       The CSS progress bar should use:
       transform-origin: left center;
    */

    progressBar.style.transform =
        `scaleX(${value / 100})`;


    /*
       Keep width available as a compatibility fallback
       for existing CSS that expects it.
    */

    progressBar.style.width =
        `${value}%`;


    /*
       Expose the current progress to assistive technology
       without forcing unnecessary announcements.
    */

    progressBar.setAttribute(
        "aria-valuenow",
        String(
            Math.round(value)
        )
    );

}
