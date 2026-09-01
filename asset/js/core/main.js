```javascript
/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation

   CORE APPLICATION CONTROLLER
   Hybrid 3D Architecture

   This file is the SINGLE JavaScript entry point.

   Responsibilities:
   - Initialize application modules
   - Coordinate shared UI behavior
   - Back-to-top control
   - Global accessibility
   - Global error handling

   Feature logic remains inside its own modules.
========================================================== */

"use strict";


/* ==========================================================
   MODULE IMPORTS
========================================================== */

import { initNavigation }
    from "../modules/navigation.js";

import { initHero }
    from "../modules/hero.js";

import { initCounter }
    from "../modules/counter.js";

import { initLoader }
    from "./loader.js";

import { initProgressBar }
    from "./progress-bar.js";

import { initScrollEffects }
    from "./scroll-effects.js";


/* ==========================================================
   APPLICATION START
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication,
    {
        once: true
    }
);


/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */

function initializeApplication() {

    /*
     * Each module is initialized independently.
     * A missing optional component must never
     * prevent the remainder of the website
     * from loading.
     */

    safelyInitialize(
        "Navigation",
        initNavigation
    );


    safelyInitialize(
        "Hero",
        initHero
    );


    safelyInitialize(
        "Counter",
        initCounter
    );


    safelyInitialize(
        "Loader",
        initLoader
    );


    safelyInitialize(
        "Progress Bar",
        initProgressBar
    );


    safelyInitialize(
        "Scroll Effects",
        initScrollEffects
    );


    safelyInitialize(
        "Back To Top",
        initBackToTop
    );


    safelyInitialize(
        "Current Page",
        initCurrentPage
    );


    safelyInitialize(
        "Accessibility",
        initAccessibility
    );


    document.documentElement.classList.add(
        "app-ready"
    );


    console.log(
        "SovereignAqua Foundation — Application Ready"
    );

}


/* ==========================================================
   SAFE MODULE INITIALIZATION
========================================================== */

function safelyInitialize(
    name,
    initializer
) {

    if (
        typeof initializer !== "function"
    ) {

        console.warn(
            `SovereignAqua: ${name} initializer unavailable.`
        );

        return;

    }


    try {

        initializer();

    } catch (error) {

        console.error(
            `SovereignAqua: ${name} initialization failed.`,
            error
        );

    }

}


/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {

        return;

    }


    let ticking = false;


    /*
     * Hide the button until the visitor
     * has moved sufficiently down the page.
     */

    function updateVisibility() {

        button.classList.toggle(
            "show",
            window.scrollY > 400
        );


        ticking = false;

    }


    function requestVisibilityUpdate() {

        if (ticking) {

            return;

        }


        ticking = true;


        window.requestAnimationFrame(
            updateVisibility
        );

    }


    window.addEventListener(
        "scroll",
        requestVisibilityUpdate,
        {
            passive: true
        }
    );


    /*
     * Keyboard and pointer accessible.
     */

    button.addEventListener(
        "click",
        () => {

            const reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            window.scrollTo({

                top: 0,

                behavior:
                    reducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );


    updateVisibility();

}


/* ==========================================================
   CURRENT PAGE
========================================================== */

function initCurrentPage() {

    const currentPage =
        normalizePage(
            window.location.pathname
        );


    const links =
        document.querySelectorAll(
            ".nav-links a[href]"
        );


    if (!links.length) {

        return;

    }


    links.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {

                return;

            }


            /*
             * Ignore anchors and external
             * communication links.
             */

            if (
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("http://") ||
                href.startsWith("https://")
            ) {

                return;

            }


            const linkedPage =
                normalizePage(
                    href
                );


            if (
                linkedPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );


                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                /*
                 * Do not leave stale active
                 * states on unrelated links.
                 */

                link.classList.remove(
                    "active"
                );


                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

}


/* ==========================================================
   NORMALIZE PAGE
========================================================== */

function normalizePage(
    value
) {

    if (!value) {

        return "index.html";

    }


    let page =
        String(value)
            .split("?")[0]
            .split("#")[0]
            .replace(
                /\\/g,
                "/"
            );


    /*
     * Remove trailing slash.
     */

    page =
        page.replace(
            /\/+$/,
            ""
        );


    /*
     * Extract final path segment.
     */

    const segments =
        page
            .split("/")
            .filter(Boolean);


    if (!segments.length) {

        return "index.html";

    }


    const filename =
        segments[
            segments.length - 1
        ];


    /*
     * Root-style URLs resolve to index.
     */

    if (
        filename === "" ||
        filename === "."
    ) {

        return "index.html";

    }


    return filename.toLowerCase();

}


/* ==========================================================
   ACCESSIBILITY
========================================================== */

function initAccessibility() {

    const motionPreference =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function applyMotionPreference() {

        document.documentElement
            .classList.toggle(
                "reduced-motion",
                motionPreference.matches
            );


        /*
         * Keep native CSS scroll behavior
         * aligned with the user's preference.
         */

        if (
            motionPreference.matches
        ) {

            document.documentElement.style
                .scrollBehavior = "auto";

        } else {

            document.documentElement.style
                .scrollBehavior = "";

        }

    }


    applyMotionPreference();


    /*
     * Modern browsers.
     */

    if (
        typeof motionPreference.addEventListener
        === "function"
    ) {

        motionPreference.addEventListener(
            "change",
            applyMotionPreference
        );

    }

}


/* ==========================================================
   GLOBAL ERROR HANDLING
========================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "SovereignAqua Application Error:",
            event.error ||
            event.message
        );

    }
);


/* ==========================================================
   UNHANDLED PROMISE HANDLING
========================================================== */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "SovereignAqua Unhandled Promise Rejection:",
            event.reason
        );

    }
);
```
