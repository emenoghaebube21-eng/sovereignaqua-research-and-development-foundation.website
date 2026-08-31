/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Core Application Controller
   Hybrid 3D Architecture
   Version 3.0.1
========================================================== */

"use strict";

/* ==========================================================
   MODULE IMPORTS
========================================================== */

import {
    initNavigation
} from "./navigation.js";

/*
   accessibility.js currently self-initializes on
   DOMContentLoaded. It is intentionally not imported here
   until it exposes a module-safe initializer.
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
    { once: true }
);

/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */

function initializeApplication() {

    if (applicationState.initialized) {
        return;
    }

    console.info(
        "[SovereignAqua] Application initialization started."
    );

    runModule("loader", initLoader);
    runModule("navigation", initNavigation);
    runModule("hero", initHero);
    runModule("counters", initCounters);
    runModule("progressBar", initProgressBar);
    runModule("scrollEffects", initScrollEffects);
    runModule("lazyLoad", initLazyLoad);
    runModule("currentPage", highlightCurrentPage);

    applicationState.initialized = true;

    console.info(
        "[SovereignAqua] Application initialization complete."
    );
}

/* ==========================================================
   SAFE MODULE EXECUTION
========================================================== */

function runModule(moduleName, initializer) {

    if (typeof initializer !== "function") {
        console.warn(
            `[SovereignAqua] ${moduleName} module unavailable.`
        );
        return false;
    }

    try {
        initializer();
        applicationState.modules[moduleName] = true;
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

    const currentPath = window.location.pathname;

    let currentPage = currentPath
        .split("/")
        .filter(Boolean)
        .pop();

    if (!currentPage) {
        currentPage = "index.html";
    }

    if (currentPage === "index") {
        currentPage = "index.html";
    }

    const navigationLinks = document.querySelectorAll(
        ".nav-links a[href]"
    );

    if (!navigationLinks.length) {
        return;
    }

    navigationLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) {
            return;
        }

        const normalizedHref = href
            .split("#")[0]
            .split("?")[0]
            .split("/")
            .filter(Boolean)
            .pop();

        const isCurrent = normalizedHref === currentPage;

        link.classList.toggle("active", isCurrent);

        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        }
        else if (link.getAttribute("aria-current") === "page") {
            link.removeAttribute("aria-current");
        }
    });
}

/* ==========================================================
   APPLICATION ERROR HANDLING
========================================================== */

window.addEventListener("error", event => {
    console.error(
        "[SovereignAqua] Application error:",
        event.error || event.message
    );
});

window.addEventListener("unhandledrejection", event => {
    console.error(
        "[SovereignAqua] Unhandled promise rejection:",
        event.reason
    );
});

/* ==========================================================
   PUBLIC DEBUG INTERFACE
========================================================== */

window.SovereignAquaApp = {
    state: applicationState,
    initialized: () => applicationState.initialized
};
