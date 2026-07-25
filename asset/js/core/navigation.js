/* ==========================================================
   NAVIGATION.JS
   SovereignAqua Research & Development Foundation
========================================================== */

"use strict";

/* ==========================================================
   INITIALIZE NAVIGATION
========================================================== */

const menuToggle = document.getElementById("menuToggle");
const navigationMenu = document.getElementById("navigation-menu");

if (menuToggle && navigationMenu) {

    menuToggle.addEventListener("click", () => {

        navigationMenu.classList.toggle("active");

        const expanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            !expanded
        );

    });

}
    /* ==========================================
       TOGGLE MOBILE MENU
    ========================================== */

    menuToggle.addEventListener("click", toggleMenu);

    function toggleMenu() {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        navMenu.setAttribute(
            "aria-hidden",
            String(isOpen)
        );

        navMenu.classList.toggle("active");

        /* Prevent page scrolling while menu is open */

        document.body.classList.toggle(
            "menu-open",
            !isOpen
        );

    }

    /* ==========================================
       CLOSE MENU
    ========================================== */

    function closeMenu() {

        navMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        navMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }

    /* ==========================================
       CLOSE AFTER LINK CLICK
    ========================================== */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    /* ==========================================
       ESC KEY SUPPORT
    ========================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

            menuToggle.focus();

        }

    });

    /* ==========================================
       CLICK OUTSIDE MENU
    ========================================== */

    document.addEventListener("click", event => {

        const insideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuToggle.contains(event.target);

        if (
            !insideMenu &&
            !clickedButton &&
            navMenu.classList.contains("active")
        ) {

            closeMenu();

        }

    });

    /* ==========================================
       RESET ON DESKTOP
    ========================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });

    /* ==========================================
       ACTIVE SECTION HIGHLIGHT
    ========================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    function updateActiveSection() {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 140;

            const height =
                section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < top + height
            ) {

                current =
                    section.id;

            }

        });

        navLinks.forEach(link => {

            link.removeAttribute(
                "aria-current"
            );

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        });

  window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});
