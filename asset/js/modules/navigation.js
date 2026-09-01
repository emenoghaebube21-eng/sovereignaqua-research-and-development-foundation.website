```javascript id="q8v2kx"
/* ==========================================================
   NAVIGATION.JS
   SovereignAqua Research & Development Foundation

   Hybrid Navigation Module
   Handles:
   - Desktop navigation
   - Mobile navigation
   - Accessibility state
   - Escape key
   - Click outside
   - Body scroll locking
   - Active page state
   - Navbar scroll state
========================================================== */

"use strict";


/* ==========================================================
   PUBLIC INITIALIZER
========================================================== */

export function initNavigation() {

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const navigationMenu =
        document.getElementById(
            "navigation-menu"
        );


    const navbar =
        document.getElementById(
            "navbar"
        );


    /*
     * Navigation markup is optional on pages
     * that do not require the full site header.
     */

    if (
        !menuToggle ||
        !navigationMenu
    ) {

        if (navbar) {

            initNavbarScrollState(
                navbar
            );

        }

        return;

    }


    setupInitialState(
        menuToggle,
        navigationMenu
    );


    initMobileMenu(
        menuToggle,
        navigationMenu
    );


    initKeyboardControls(
        menuToggle,
        navigationMenu
    );


    initOutsideClick(
        menuToggle,
        navigationMenu
    );


    initResizeHandler(
        menuToggle,
        navigationMenu
    );


    initActivePage();


    if (navbar) {

        initNavbarScrollState(
            navbar
        );

    }

}


/* ==========================================================
   INITIAL STATE
========================================================== */

function setupInitialState(
    menuToggle,
    navigationMenu
) {

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-controls",
        "navigation-menu"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    navigationMenu.setAttribute(
        "aria-hidden",
        "false"
    );


    navigationMenu.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* ==========================================================
   MOBILE MENU
========================================================== */

function initMobileMenu(
    menuToggle,
    navigationMenu
) {

    menuToggle.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if (isOpen) {

                closeMenu(
                    menuToggle,
                    navigationMenu
                );

            } else {

                openMenu(
                    menuToggle,
                    navigationMenu
                );

            }

        }
    );


    navigationMenu
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu(
                            menuToggle,
                            navigationMenu
                        );

                    }
                );

            }
        );

}


/* ==========================================================
   OPEN MENU
========================================================== */

function openMenu(
    menuToggle,
    navigationMenu
) {

    navigationMenu.classList.add(
        "active"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );


    navigationMenu.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "menu-open"
    );


    /*
     * Give keyboard users immediate access
     * to the first navigation item.
     */

    const firstLink =
        navigationMenu.querySelector(
            "a"
        );


    if (
        firstLink &&
        window.innerWidth <= 992
    ) {

        window.setTimeout(
            () => firstLink.focus(),
            50
        );

    }

}


/* ==========================================================
   CLOSE MENU
========================================================== */

function closeMenu(
    menuToggle,
    navigationMenu
) {

    navigationMenu.classList.remove(
        "active"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    navigationMenu.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* ==========================================================
   KEYBOARD CONTROLS
========================================================== */

function initKeyboardControls(
    menuToggle,
    navigationMenu
) {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            const isOpen =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if (!isOpen) {

                return;

            }


            closeMenu(
                menuToggle,
                navigationMenu
            );


            menuToggle.focus();

        }
    );

}


/* ==========================================================
   CLICK OUTSIDE
========================================================== */

function initOutsideClick(
    menuToggle,
    navigationMenu
) {

    document.addEventListener(
        "click",
        event => {

            const isOpen =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if (!isOpen) {

                return;

            }


            const clickedMenu =
                navigationMenu.contains(
                    event.target
                );


            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                clickedMenu ||
                clickedToggle
            ) {

                return;

            }


            closeMenu(
                menuToggle,
                navigationMenu
            );

        }
    );

}


/* ==========================================================
   RESIZE HANDLER
========================================================== */

function initResizeHandler(
    menuToggle,
    navigationMenu
) {

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            window.clearTimeout(
                resizeTimer
            );


            resizeTimer =
                window.setTimeout(
                    () => {

                        /*
                         * Desktop navigation should
                         * never remain in mobile-open
                         * state.
                         */

                        if (
                            window.innerWidth > 992
                        ) {

                            closeMenu(
                                menuToggle,
                                navigationMenu
                            );

                        }

                    },
                    100
                );

        },
        {
            passive: true
        }
    );

}


/* ==========================================================
   ACTIVE PAGE
========================================================== */

function initActivePage() {

    const currentPage =
        getCurrentPage();


    const links =
        document.querySelectorAll(
            ".nav-links a[href]"
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


            const linkPage =
                normalizePage(
                    href
                );


            if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );


                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

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
   CURRENT PAGE
========================================================== */

function getCurrentPage() {

    const path =
        window.location.pathname;


    return normalizePage(
        path
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
            .split("#")[0];


    page =
        page
            .replace(
                /\\/g,
                "/"
            );


    page =
        page
            .split("/")
            .filter(Boolean)
            .pop()
            ?.toLowerCase();


    /*
     * Root URLs resolve to index.html.
     */

    return page || "index.html";

}


/* ==========================================================
   NAVBAR SCROLL STATE
========================================================== */

function initNavbarScrollState(
    navbar
) {

    let ticking = false;


    const update =
        () => {

            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 24
            );


            ticking = false;

        };


    const onScroll =
        () => {

            if (ticking) {

                return;

            }


            ticking = true;


            window.requestAnimationFrame(
                update
            );

        };


    window.addEventListener(
        "scroll",
        onScroll,
        {
            passive: true
        }
    );


    update();

}
```
