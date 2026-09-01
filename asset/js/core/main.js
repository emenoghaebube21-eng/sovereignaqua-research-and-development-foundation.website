```javascript
/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation

   CORE APPLICATION CONTROLLER
   Hybrid 3D Architecture

   SINGLE APPLICATION ENTRY POINT

   Responsibilities:
   - Initialize core modules
   - Initialize feature modules
   - Coordinate shared UI
   - Accessibility
   - Back-to-top behavior
   - Current-page state
   - Runtime error protection

   IMPORTANT:
   Individual modules must NOT independently initialize
   themselves through DOMContentLoaded.
========================================================== */

"use strict";


/* ==========================================================
   CORE MODULES
========================================================== */

import {
    initLoader
} from "./loader.js";

import {
    initProgressBar
} from "./progress-bar.js";

import {
    initScrollEffects
} from "./scroll-effects.js";


/* ==========================================================
   FEATURE MODULES
========================================================== */

import {
    initNavigation
} from "../modules/navigation.js";

import {
    initHero
} from "../modules/hero.js";

import {
    initCounter
} from "../modules/counter.js";


/* ==========================================================
   APPLICATION INITIALIZATION
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
     * Initialize each subsystem independently.
     *
     * If one optional module fails, the remaining
     * website should continue functioning.
     */

    safelyInitialize(
        "Loader",
        initLoader
    );


    safelyInitialize(
        "Progress Bar",
        initProgressBar
    );


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


    /*
     * Application-ready state.
     */

    document.documentElement.classList.add(
        "app-ready"
    );


    /*
     * Useful for debugging deployment issues.
     */

    console.info(
        "SovereignAqua Foundation:",
        "Hybrid application initialized."
    );

}


/* ==========================================================
   SAFE INITIALIZATION
========================================================== */

function safelyInitialize(
    moduleName,
    initializer
) {

    if (
        typeof initializer !== "function"
    ) {

        console.warn(
            `SovereignAqua: ${moduleName} module is unavailable.`
        );

        return;

    }


    try {

        initializer();

    } catch (error) {

        console.error(
            `SovereignAqua: ${moduleName} initialization failed.`,
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


    function updateButton() {

        const visible =
            window.scrollY > 400;


        button.classList.toggle(
            "show",
            visible
        );


        button.setAttribute(
            "aria-hidden",
            visible
                ? "false"
                : "true"
        );


        ticking = false;

    }


    function requestUpdate() {

        if (ticking) {

            return;

        }


        ticking = true;


        window.requestAnimationFrame(
            updateButton
        );

    }


    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        handleBackToTop
    );


    updateButton();

}


/* ==========================================================
   BACK TO TOP ACTION
========================================================== */

function handleBackToTop() {

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


/* ==========================================================
   CURRENT PAGE
========================================================== */

function initCurrentPage() {

    const links =
        document.querySelectorAll(
            ".nav-links a[href]"
        );


    if (!links.length) {

        return;

    }


    const currentPage =
        getCurrentPage();


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
             * Do not modify:
             * - anchors
             * - email links
             * - telephone links
             * - external URLs
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


            const isCurrent =
                linkedPage === currentPage;


            link.classList.toggle(
                "active",
                isCurrent
            );


            if (isCurrent) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

}


/* ==========================================================
   GET CURRENT PAGE
========================================================== */

function getCurrentPage() {

    const pathname =
        window.location.pathname;


    return normalizePage(
        pathname
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


    let normalized =
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

    normalized =
        normalized.replace(
            /\/+$/,
            ""
        );


    const segments =
        normalized
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
     * Treat common root documents
     * consistently.
     */

    if (
        filename === "." ||
        filename === ""
    ) {

        return "index.html";

    }


    return filename.toLowerCase();

}


/* ==========================================================
   GLOBAL ACCESSIBILITY
========================================================== */

function initAccessibility() {

    const motionPreference =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateMotionState() {

        const reduced =
            motionPreference.matches;


        document.documentElement
            .classList.toggle(
                "reduced-motion",
                reduced
            );


        if (reduced) {

            document.documentElement.style
                .scrollBehavior = "auto";

        } else {

            document.documentElement.style
                .removeProperty(
                    "scroll-behavior"
                );

        }

    }


    updateMotionState();


    /*
     * Modern MediaQueryList API.
     */

    if (
        typeof motionPreference.addEventListener
        === "function"
    ) {

        motionPreference.addEventListener(
            "change",
            updateMotionState
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
            "SovereignAqua runtime error:",
            event.error ||
            event.message
        );

    }
);


/* ==========================================================
   UNHANDLED PROMISE ERRORS
========================================================== */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "SovereignAqua unhandled promise rejection:",
            event.reason
        );

    }
);
```
