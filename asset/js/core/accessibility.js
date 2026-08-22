/* ==========================================================
   ACCESSIBILITY.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Keyboard navigation support
   - Mobile navigation focus management
   - Reduced-motion preferences
   - Accessible menu state synchronization
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZATION
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initAccessibility
);


function initAccessibility() {

    improveKeyboardNavigation();

    respectReducedMotion();

    synchronizeMenuAccessibility();

}


/* ==========================================================
   KEYBOARD NAVIGATION
========================================================== */

function improveKeyboardNavigation() {

    const menu =
        document.getElementById(
            "navigation-menu"
        );

    const toggle =
        document.querySelector(
            ".menu-toggle"
        );

    if (!menu || !toggle) {
        return;
    }


    const firstLink =
        menu.querySelector(
            "a[href]"
        );


    /* ------------------------------------------------------
       FOCUS FIRST MENU LINK WHEN MENU OPENS
    ------------------------------------------------------ */

    toggle.addEventListener(
        "click",
        () => {

            const expanded =
                toggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            if (!expanded || !firstLink) {
                return;
            }

            window.setTimeout(
                () => {

                    firstLink.focus();

                },
                150
            );

        }
    );


    /* ------------------------------------------------------
       ESCAPE KEY
    ------------------------------------------------------ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape" &&
                event.key !== "Esc"
            ) {
                return;
            }

            const menuIsOpen =
                toggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            if (!menuIsOpen) {
                return;
            }

            toggle.click();

            window.setTimeout(
                () => {

                    toggle.focus();

                },
                50
            );

        }
    );

}


/* ==========================================================
   MENU ACCESSIBILITY STATE
========================================================== */

function synchronizeMenuAccessibility() {

    const menu =
        document.getElementById(
            "navigation-menu"
        );

    const toggle =
        document.querySelector(
            ".menu-toggle"
        );

    if (!menu || !toggle) {
        return;
    }


    /* ------------------------------------------------------
       ENSURE ARIA CONNECTION
    ------------------------------------------------------ */

    if (!menu.id) {
        return;
    }

    toggle.setAttribute(
        "aria-controls",
        menu.id
    );


    /* ------------------------------------------------------
       INITIAL ARIA STATE
    ------------------------------------------------------ */

    if (
        !toggle.hasAttribute(
            "aria-expanded"
        )
    ) {

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* ------------------------------------------------------
       SYNCHRONIZE TOGGLE STATE
    ------------------------------------------------------ */

    const observer =
        new MutationObserver(
            mutations => {

                mutations.forEach(
                    mutation => {

                        if (
                            mutation.type !==
                            "attributes"
                        ) {
                            return;
                        }

                        if (
                            mutation.attributeName !==
                            "aria-expanded"
                        ) {
                            return;
                        }

                        const expanded =
                            toggle.getAttribute(
                                "aria-expanded"
                            ) === "true";

                        updateMenuAccessibilityState(
                            menu,
                            toggle,
                            expanded
                        );

                    }
                );

            }
        );


    observer.observe(
        toggle,
        {
            attributes: true,
            attributeFilter: [
                "aria-expanded"
            ]
        }
    );


    const initiallyExpanded =
        toggle.getAttribute(
            "aria-expanded"
        ) === "true";


    updateMenuAccessibilityState(
        menu,
        toggle,
        initiallyExpanded
    );

}


/* ==========================================================
   UPDATE MENU ACCESSIBILITY STATE
========================================================== */

function updateMenuAccessibilityState(
    menu,
    toggle,
    expanded
) {

    toggle.setAttribute(
        "aria-label",
        expanded
            ? "Close navigation menu"
            : "Open navigation menu"
    );


    toggle.setAttribute(
        "aria-expanded",
        expanded
            ? "true"
            : "false"
    );


    /*
       Do not use aria-hidden on the menu here.

       CSS controls visual visibility while the navigation
       remains available to assistive technologies when the
       site's navigation implementation requires it.
    */

}


/* ==========================================================
   REDUCED MOTION
========================================================== */

function respectReducedMotion() {

    const mediaQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    applyReducedMotion(
        mediaQuery.matches
    );


    /*
       Modern browsers support addEventListener on
       MediaQueryList. The fallback supports older
       implementations without breaking initialization.
    */

    if (
        typeof mediaQuery.addEventListener ===
        "function"
    ) {

        mediaQuery.addEventListener(
            "change",
            event => {

                applyReducedMotion(
                    event.matches
                );

            }
        );

    } else if (
        typeof mediaQuery.addListener ===
        "function"
    ) {

        mediaQuery.addListener(
            event => {

                applyReducedMotion(
                    event.matches
                );

            }
        );

    }

}


/* ==========================================================
   APPLY REDUCED MOTION
========================================================== */

function applyReducedMotion(
    reducedMotion
) {

    document.documentElement.dataset.motion =
        reducedMotion
            ? "reduced"
            : "full";


    if (reducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";

    } else {

        document.documentElement.style
            .removeProperty(
                "scroll-behavior"
            );

    }

}
