/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Core Application
========================================================== */

"use strict";

/* ==========================================================
   APPLICATION STARTUP
========================================================== */

document.addEventListener("DOMContentLoaded", initializeApp);

window.addEventListener("load", hideLoader);

/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */

function initializeApp() {

    console.log("SovereignAqua Website Initialized");

    highlightCurrentPage();

    initBackToTop();

}

/* ==========================================================
   HIDE PAGE LOADER
========================================================== */

function hideLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    setTimeout(() => {

        loader.remove();

    }, 500);

}

/* ==========================================================
   HIGHLIGHT ACTIVE NAVIGATION PAGE
========================================================== */

function highlightCurrentPage() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const links =
        document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (href.startsWith("#")) return;

        if (href === currentPage) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    }, { passive: true });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
   GLOBAL ERROR LOGGER
========================================================== */

window.addEventListener("error", event => {

    console.error(

        "Application Error:",

        event.message

    );

});

/* ==========================================================
   APPLICATION READY
========================================================== */

console.log("Core Application Loaded");
