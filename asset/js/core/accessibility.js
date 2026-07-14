/* ==========================================================
   ACCESSIBILITY.JS
   SovereignAqua Research & Development Foundation
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", initAccessibility);

function initAccessibility() {

    improveKeyboardNavigation();

    respectReducedMotion();

}

/* ==========================================================
   KEYBOARD NAVIGATION
========================================================== */

function improveKeyboardNavigation() {

    const menu =
        document.getElementById("navigation-menu");

    if (!menu) return;

    const firstLink =
        menu.querySelector("a");

    const toggle =
        document.querySelector(".menu-toggle");

    if (!toggle || !firstLink) return;

    toggle.addEventListener("click", () => {

        const expanded =
            toggle.getAttribute("aria-expanded") === "true";

        if (!expanded) {

            setTimeout(() => {

                firstLink.focus();

            },150);

        }

    });

}

/* ==========================================================
   REDUCED MOTION
========================================================== */

function respectReducedMotion() {

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }

}
