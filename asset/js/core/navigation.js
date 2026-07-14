/* ==========================================================
   NAVIGATION.JS
   SovereignAqua Research & Development Foundation
========================================================== */

"use strict";

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded", initNavigation);

function initNavigation() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.getElementById("navigation-menu");

    if (!menuToggle || !navMenu) return;

    menuToggle.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("aria-hidden", "true");

    /* ==========================================
       Mobile Menu Toggle
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

    }

    /* ==========================================
       Close After Clicking Link
    ========================================== */

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    /* ==========================================
       Escape Key
    ========================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

            menuToggle.focus();

        }

    });

    /* ==========================================
       Click Outside Navigation
    ========================================== */

    document.addEventListener("click", event => {

        const insideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuToggle.contains(event.target);

        if (!insideMenu &&
            !clickedButton &&
            navMenu.classList.contains("active")) {

            closeMenu();

        }

    });

    /* ==========================================
       Desktop Resize
    ========================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            closeMenu();

        }

    });

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

    }

    /* ==========================================
       Active Section Highlight
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
                    section.getAttribute("id");

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

    }

    window.addEventListener(
        "scroll",
        updateActiveSection,
        { passive: true }
    );

    updateActiveSection();

}
