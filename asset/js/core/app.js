/* ==========================================================
   APP.JS
   SovereignAqua Research & Development Foundation
   Compatibility Bootstrapper
   Hybrid 3D Architecture
   Version 3.0.2

   Purpose:
   - Preserve the existing app.js entry point
   - Delegate initialization to the canonical main.js controller
   - Prevent imports of legacy/non-existent module paths
   - Allow pages using <script defer src=".../app.js"> to work
     without requiring every page to be converted at once
========================================================== */

"use strict";

/* ==========================================================
   CANONICAL APPLICATION CONTROLLER
========================================================== */

/*
   main.js is the single source of truth for application
   initialization. It owns navigation, hero, counters,
   loader, progress bar, scroll effects, lazy loading,
   current-page state, and application error handling.

   Dynamic import keeps this compatibility file usable from
   existing pages that load app.js as a normal deferred script.
*/

import("./main.js")
    .then(() => {
        console.info(
            "[SovereignAqua] Compatibility bootstrap loaded."
        );
    })
    .catch(error => {
        console.error(
            "[SovereignAqua] Failed to load the canonical application controller.",
            error
        );
    });
