/* ==========================================================
   NAVIGATION.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Mobile navigation
   - Menu open / close state
   - Keyboard navigation
   - Outside-click handling
   - Responsive menu reset
   - Navbar scroll state
   - Current section highlighting

   Accessibility-specific motion preferences remain in
   accessibility.js.
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZE NAVIGATION
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
       Navigation is optional on some pages.
       Do not throw an error if the markup is absent.
    */

    if (
        !menuToggle ||
        !navigationMenu
    ) {

        if (navbar) {
            initNavbarScrollState(navbar);
        }

        return;

    }


    configureMenuAccessibility(
        menuToggle,
        navigationMenu
    );

    initMobileMenu(
        menuToggle,
        navigationMenu
    );

    initNavbarScrollState(
        navbar
    );

    initActiveSectionHighlight(
        navigationMenu
    );

}


/* ==========================================================
   MENU ACCESSIBILITY CONFIGURATION
========================================================== */

function configureMenuAccessibility(
    menuToggle,
    navigationMenu
) {

    menuToggle.setAttribute(
        "aria-controls",
        navigationMenu.id
    );


    /*
       Preserve an explicitly supplied aria-expanded value,
       but default to closed when one is not present.
    */

    if (
        !menuToggle.hasAttribute(
            "aria-expanded"
        )
    ) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    updateToggleLabel(
        menuToggle,
        false
    );


    /*
       We do not permanently set aria-hidden on the navigation.
       CSS controls visual presentation at the responsive
       breakpoint.
    */

}


/* ==========================================================
   MOBILE MENU
========================================================== */

function initMobileMenu(
    menuToggle,
    navigationMenu
) {

    const closeMenu = () => {

        setMenuState(
            menuToggle,
            navigationMenu,
            false
        );

    };


    const openMenu = () => {

        setMenuState(
            menuToggle,
            navigationMenu,
            true
        );

    };


    const toggleMenu = () => {

        const isOpen =
            menuToggle.getAttribute(
                "aria-expanded"
            ) === "true";


        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    };


    /* ------------------------------------------------------
       MENU TOGGLE
    ------------------------------------------------------ */

    menuToggle.addEventListener(
        "click",
        event => {

            event.preventDefault();

            toggleMenu();

        }
    );


    /* ------------------------------------------------------
       CLOSE AFTER NAVIGATION
    ------------------------------------------------------ */

    navigationMenu
        .querySelectorAll(
            "a[href]"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();

                    }
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


            const isOpen =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if (!isOpen) {
                return;
            }


            closeMenu();

            menuToggle.focus();

        }
    );


    /* ------------------------------------------------------
       CLICK OUTSIDE MENU
    ------------------------------------------------------ */

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


            const clickedInsideMenu =
                navigationMenu.contains(
                    event.target
                );


            const clickedToggle =
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMenu();

            }

        }
    );


    /* ------------------------------------------------------
       RESPONSIVE RESET
    ------------------------------------------------------ */

    window.addEventListener(
        "resize",
        () => {

            /*
               The site's navigation switches to desktop
               behavior at 992px.
            */

            if (
                window.innerWidth > 992
            ) {

                closeMenu();

            }

        },
        {
            passive: true
        }
    );


    /* ------------------------------------------------------
       INITIAL STATE
    ------------------------------------------------------ */

    setMenuState(
        menuToggle,
        navigationMenu,
        false
    );

}


/* ==========================================================
   SET MENU STATE
========================================================== */

function setMenuState(
    menuToggle,
    navigationMenu,
    isOpen
) {

    navigationMenu.classList.toggle(
        "active",
        isOpen
    );


    document.body.classList.toggle(
        "menu-open",
        isOpen
    );


    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );


    updateToggleLabel(
        menuToggle,
        isOpen
    );

}


/* ==========================================================
   UPDATE MENU TOGGLE LABEL
========================================================== */

function updateToggleLabel(
    menuToggle,
    isOpen
) {

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );


    /*
       Update the icon only when the existing button
       uses the expected icon structure.

       The button remains functional if Font Awesome
       is unavailable.
    */

    const icon =
        menuToggle.querySelector(
            "i"
        );


    if (!icon) {
        return;
    }


    icon.classList.toggle(
        "fa-bars",
        !isOpen
    );


    icon.classList.toggle(
        "fa-xmark",
        isOpen
    );


    icon.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* ==========================================================
   NAVBAR SCROLL STATE
========================================================== */

function initNavbarScrollState(
    navbar
) {

    if (!navbar) {
        return;
    }


    const updateNavbar =
        () => {

            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 60
            );

        };


    updateNavbar();


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );

}


/* ==========================================================
   ACTIVE SECTION HIGHLIGHT
========================================================== */

function initActiveSectionHighlight(
    navigationMenu
) {

    if (!navigationMenu) {
        return;
    }


    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        navigationMenu.querySelectorAll(
            'a[href^="#"]'
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {

        return;

    }


    const updateActiveSection =
        () => {

            const scrollPosition =
                window.scrollY + 160;


            let currentSection = "";


            sections.forEach(
                section => {

                    const sectionTop =
                        section.offsetTop;


                    const sectionBottom =
                        sectionTop +
                        section.offsetHeight;


                    if (
                        scrollPosition >=
                        sectionTop &&
                        scrollPosition <
                        sectionBottom
                    ) {

                        currentSection =
                            section.id;

                    }

                }
            );


            navLinks.forEach(
                link => {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    const matchesSection =
                        href ===
                        `#${currentSection}`;


                    if (
                        matchesSection &&
                        currentSection
                    ) {

                        link.setAttribute(
                            "aria-current",
                            "location"
                        );

                    } else {

                        /*
                           Remove aria-current from
                           section links when inactive.
                        */

                        link.removeAttribute(
                            "aria-current"
                        );

                    }

                }
            );

        };


    updateActiveSection();


    window.addEventListener(
        "scroll",
        updateActiveSection,
        {
            passive: true
        }
    );

}


/* ==========================================================
   REDUCED MOTION COMPATIBILITY
========================================================== */

/*
   Navigation itself does not impose animation behavior.

   CSS and accessibility.js are responsible for respecting
   the user's reduced-motion preference.
*/
