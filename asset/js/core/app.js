/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Application bootstrapper.

   Responsibilities:
   - Initialize site-level modules
   - Keep module responsibilities separated
   - Prevent one optional module from stopping the
     initialization of other modules
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

    initializeModule(
        "navigation",
        initNavigation
    );

    initializeModule(
        "hero",
        initHero
    );

}


/* ==========================================================
   MODULE INITIALIZER
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
            `[SovereignAqua] ${moduleName} module is unavailable.`
        );

        return;

    }


    try {

        initializer();

    } catch (error) {

        console.error(
            `[SovereignAqua] Failed to initialize ${moduleName} module.`,
            error
        );

    }

}
