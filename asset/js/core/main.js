/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Application Entry Point
========================================================== */

"use strict";

/* ==========================================================
   APPLICATION STARTUP
========================================================== */

document.addEventListener("DOMContentLoaded", initializeApp);

/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */

function initializeApp() {

    console.log("SovereignAqua Website Initialized");

    highlightCurrentPage();

    initBackToTop();

    initLazyLoading();

}

/* ==========================================================
   WINDOW LOADED
========================================================== */

window.addEventListener("load", () => {

    hideLoader();

});

/* ==========================================================
   HIDE LOADER
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
   HIGHLIGHT CURRENT PAGE
========================================================== */

function highlightCurrentPage() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

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

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
   LAZY LOAD IMAGES
========================================================== */

function initLazyLoading() {

    const images =
        document.querySelectorAll("img[data-src]");

    if (!images.length) return;

    if (!("IntersectionObserver" in window)) {

        images.forEach(loadImage);

        return;

    }

    const observer = new IntersectionObserver(

        (entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                loadImage(entry.target);

                obs.unobserve(entry.target);

            });

        },

        {

            rootMargin: "100px",

            threshold: 0.1

        }

    );

    images.forEach(image => {

        observer.observe(image);

    });

}

/* ==========================================================
   LOAD IMAGE
========================================================== */

function loadImage(image) {

    if (!image.dataset.src) return;

    image.src = image.dataset.src;

    image.onload = () => {

        image.classList.add("loaded");

    };

    image.removeAttribute("data-src");

}

/* ==========================================================
   FUTURE MODULES

   Navigation
   Counters
   Hero Video
   Theme Switcher
   Newsletter
   Search
========================================================== */
