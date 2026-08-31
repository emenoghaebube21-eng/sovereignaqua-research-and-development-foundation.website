/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Core Application Controller
   Hybrid 3D Architecture
   Version 3.0
========================================================== */

"use strict";


/* ==========================================================
   MODULE IMPORTS
========================================================== */

/*
   Core modules
*/

import {
    initNavigation
} from "./navigation.js";

import {
    initAccessibility
} from "./accessibility.js";


/*
   Visual / functional modules
*/

import {
    initHero
} from "../modules/heroVideo.js";

import {
    initCounters
} from "../modules/counter.js";

import {
    initLoader
} from "../modules/loader.js";

import {
    initProgressBar
} from "../modules/progress-bar.js";

import {
    initScrollEffects
} from "../modules/scroll-effects.js";

import {
    initLazyLoad
} from "../modules/lazyLoad.js";


/* ==========================================================
   APPLICATION STATE
========================================================== */

const applicationState = {

    initialized: false,

    modules: {

        navigation: false,

        accessibility: false,

        hero: false,

        counters: false,

        loader: false,

        progressBar: false,

        scrollEffects: false,

        lazyLoad: false,

        currentPage: false

    }

};


/* ==========================================================
   BOOTSTRAP
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

    if (
        applicationState.initialized
    ) {

        return;

    }


    console.info(
        "[SovereignAqua] Application initialization started."
    );


    /*
       Initialize the page loader first.
    */

    runModule(
        "loader",
        initLoader
    );


    /*
       Initialize accessibility behavior.
    */

    runModule(
        "accessibility",
        initAccessibility
    );


    /*
       Initialize navigation.
    */

    runModule(
        "navigation",
        initNavigation
    );


    /*
       Initialize hero media.
    */

    runModule(
        "hero",
        initHero
    );


    /*
       Initialize counters.
    */

    runModule(
        "counters",
        initCounters
    );


    /*
       Initialize reading progress.
    */

    runModule(
        "progressBar",
        initProgressBar
    );


    /*
       Initialize scroll effects.
    */

    runModule(
        "scrollEffects",
        initScrollEffects
    );


    /*
       Initialize lazy loading.
    */

    runModule(
        "lazyLoad",
        initLazyLoad
    );


    /*
       Highlight the current page.
    */

    runModule(
        "currentPage",
        highlightCurrentPage
    );


    applicationState.initialized = true;


    console.info(
        "[SovereignAqua] Application initialization complete."
    );

}


/* ==========================================================
   SAFE MODULE EXECUTION
========================================================== */

function runModule(
    moduleName,
    initializer
) {

    if (
        typeof initializer !==
        "function"
    ) {

        console.warn(
            `[SovereignAqua] ${moduleName} module unavailable.`
        );

        return false;

    }


    try {

        initializer();


        applicationState.modules[
            moduleName
        ] = true;


        return true;

    }

    catch (error) {

        console.error(

            `[SovereignAqua] ${moduleName} initialization failed.`,

            error

        );


        return false;

    }

}


/* ==========================================================
   CURRENT PAGE HIGHLIGHT
========================================================== */

function highlightCurrentPage() {

    const currentPath =
        window.location.pathname;


    let currentPage =
        currentPath
            .split("/")
            .filter(Boolean)
            .pop();


    /*
       Root URL.
    */

    if (
        !currentPage ||
        currentPage === ""
    ) {

        currentPage =
            "index.html";

    }


    /*
       Normalize directory index pages.
    */

    if (
        currentPage ===
        "index"
    ) {

        currentPage =
            "index.html";

    }


    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a[href]"
        );


    if (
        !navigationLinks.length
    ) {

        return;

    }


    navigationLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {

                return;

            }


            /*
               Remove query strings and fragments.
            */

            const normalizedHref =
                href
                    .split("#")[0]
                    .split("?")[0]
                    .split("/")
                    .filter(Boolean)
                    .pop();


            const isCurrent =
                normalizedHref ===
                currentPage;


            link.classList.toggle(
                "active",
                isCurrent
            );


            if (isCurrent) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }
            else {

                /*
                   Do not remove location/current
                   semantics from section navigation
                   unnecessarily.
                */

                if (
                    link.getAttribute(
                        "aria-current"
                    ) === "page"
                ) {

                    link.removeAttribute(
                        "aria-current"
                    );

                }

            }

        }
    );

}


/* ==========================================================
   APPLICATION ERROR HANDLING
========================================================== */

window.addEventListener(

    "error",

    event => {

        console.error(

            "[SovereignAqua] Application error:",

            event.error ||
            event.message

        );

    }

);


/* ==========================================================
   UNHANDLED PROMISE REJECTIONS
========================================================== */

window.addEventListener(

    "unhandledrejection",

    event => {

        console.error(

            "[SovereignAqua] Unhandled promise rejection:",

            event.reason

        );

    }

);


/* ==========================================================
   PUBLIC DEBUG INTERFACE
========================================================== */

window.SovereignAquaApp = {

    state:
        applicationState,

    initialized:
        () =>
            applicationState.initialized

};
