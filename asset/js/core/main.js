```javascript
/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation

   CANONICAL APPLICATION ENTRY POINT
   Hybrid 3D Website Architecture
========================================================== */

"use strict";


/* ==========================================================
   CORE MODULES
========================================================== */

import { initLoader }
    from "./loader.js";

import { initProgressBar }
    from "./progress-bar.js";

import { initScrollEffects }
    from "./scroll-effects.js";


/* ==========================================================
   FEATURE MODULES
========================================================== */

import { initNavigation }
    from "../modules/navigation.js";

import { initHero }
    from "../modules/hero.js";

import { initCounter }
    from "../modules/counter.js";


/* ==========================================================
   APPLICATION BOOT
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    bootApplication,
    {
        once: true
    }
);


/* ==========================================================
   BOOT APPLICATION
========================================================== */

function bootApplication() {

    /*
     * Core infrastructure.
     */

    runModule(
        "Loader",
        initLoader
    );

    runModule(
        "Progress Bar",
        initProgressBar
    );


    /*
     * Site navigation.
     */

    runModule(
        "Navigation",
        initNavigation
    );


    /*
     * Page-level visual systems.
     */

    runModule(
        "Hero",
        initHero
    );

    runModule(
        "Counter",
        initCounter
    );

    runModule(
        "Scroll Effects",
        initScrollEffects
    );


    /*
     * Shared utilities.
     */

    runModule(
        "Back To Top",
        initBackToTop
    );

    runModule(
        "Current Page",
        initCurrentPage
    );

    runModule(
        "Accessibility",
        initAccessibility
    );


    /*
     * Signal successful initialization.
     */

    document.documentElement.classList.add(
        "app-ready"
    );


    console.info(
        "SovereignAqua:",
        "Hybrid application ready."
    );

}


/* ==========================================================
   SAFE MODULE RUNNER
========================================================== */

function runModule(
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

        /*
         * One broken optional module must
         * not take down the entire website.
         */

        console.error(
            `SovereignAqua: ${name} failed.`,
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


    function update() {

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
            update
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


    update();

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
        normalizePage(
            window.location.pathname
        );


    links.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {

                return;

            }


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


            const active =
                linkedPage === currentPage;


            link.classList.toggle(
                "active",
                active
            );


            if (active) {

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
   PAGE NORMALIZATION
========================================================== */

function normalizePage(
    value
) {

    if (!value) {

        return "index.html";

    }


    let path =
        String(value)
            .split("?")[0]
            .split("#")[0]
            .replace(
                /\\/g,
                "/"
            );


    path =
        path.replace(
            /\/+$/,
            ""
        );


    const segments =
        path
            .split("/")
            .filter(Boolean);


    if (!segments.length) {

        return "index.html";

    }


    return (
        segments[
            segments.length - 1
        ] || "index.html"
    ).toLowerCase();

}


/* ==========================================================
   ACCESSIBILITY
========================================================== */

function initAccessibility() {

    const motion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function updateMotionState() {

        document.documentElement
            .classList.toggle(
                "reduced-motion",
                motion.matches
            );


        if (motion.matches) {

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


    if (
        typeof motion.addEventListener
        === "function"
    ) {

        motion.addEventListener(
            "change",
            updateMotionState
        );

    }

}


/* ==========================================================
   GLOBAL ERROR PROTECTION
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
   PROMISE ERROR PROTECTION
========================================================== */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "SovereignAqua promise error:",
            event.reason
        );

    }
);
```
