/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Core Application Bootstrap
   Version 2.1

   Responsibilities:
   - Start core application modules
   - Maintain application-level initialization
   - Highlight the current page
   - Provide a safe module initialization boundary

   Feature behavior belongs in dedicated modules.
========================================================== */

"use strict";


/* ==========================================================
   MODULE IMPORTS
========================================================== */

import {
    initNavigation
} from "../modules/navigation.js";

import {
    initHero
} from "../modules/hero.js";


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

    console.info(
        "[SovereignAqua] Website initialization started."
    );


    /*
       Initialize the navigation module.
    */

    initializeModule(
        "navigation",
        initNavigation
    );


    /*
       Initialize the hero module.
    */

    initializeModule(
        "hero",
        initHero
    );


    /*
       Highlight the current page after the navigation
       has been initialized.
    */

    initializeModule(
        "current-page",
        highlightCurrentPage
    );


    console.info(
        "[SovereignAqua] Website initialization complete."
    );

}


/* ==========================================================
   SAFE MODULE INITIALIZATION
========================================================== */

function initializeModule(
    moduleName,
    initializer
) {

    if (
        typeof initializer !==
        "function"
    ) {

        console.warn(
            `[SovereignAqua] ${moduleName} initializer is unavailable.`
        );

        return false;

    }


    try {

        initializer();

        return true;

    } catch (error) {

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
            .pop();


    /*
       Directory URLs resolve to the homepage.
    */

    if (!currentPage) {
        currentPage = "index.html";
    }


    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a[href]"
        );


    if (!navigationLinks.length) {
        return;
    }


    navigationLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            /*
               Ignore anchor-only links.
            */

            if (
                href.startsWith("#")
            ) {
                return;
            }


            /*
               Remove query strings and fragments
               before comparing page names.
            */

            const normalizedHref =
                href
                    .split("#")[0]
                    .split("?")[0]
                    .split("/")
                    .pop();


            const isCurrentPage =
                normalizedHref ===
                currentPage;


            link.classList.toggle(
                "active",
                isCurrentPage
            );


            if (isCurrentPage) {

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
   GLOBAL ERROR REPORTING
========================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "[SovereignAqua] Application error:",
            event.error || event.message
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
