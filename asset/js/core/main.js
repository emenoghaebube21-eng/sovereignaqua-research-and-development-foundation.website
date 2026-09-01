```javascript
/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Core Application Controller
   Hybrid Architecture
========================================================== */

"use strict";


/* ==========================================================
   MODULE IMPORTS
========================================================== */

import { initNavigation } from "../modules/navigation.js";
import { initHero } from "../modules/hero.js";
import { initCounter } from "../modules/counter.js";


/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);


/* ==========================================================
   APPLICATION INITIALIZATION
========================================================== */

function initializeApplication() {

    initNavigation();

    initHero();

    initCounter();

    initLoader();

    initProgressBar();

    initScrollEffects();

    initBackToTop();

    initCurrentPage();

    initAccessibility();

    console.log(
        "SovereignAqua Foundation — Hybrid Application Initialized"
    );

}


/* ==========================================================
   PAGE LOADER
========================================================== */

function initLoader() {

    const loader =
        document.getElementById("loader");

    if (!loader) return;


    const hideLoader = () => {

        loader.classList.add("is-hidden");

        loader.setAttribute(
            "aria-hidden",
            "true"
        );


        window.setTimeout(() => {

            if (loader && loader.parentNode) {

                loader.remove();

            }

        }, 500);

    };


    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            {
                once: true
            }
        );

    }

}


/* ==========================================================
   SCROLL PROGRESS
========================================================== */

function initProgressBar() {

    const progressBar =
        document.getElementById("progressBar");

    if (!progressBar) return;


    let ticking = false;


    const updateProgress = () => {

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progressBar.style.width = "0%";

            ticking = false;

            return;

        }


        const scrollPosition =
            Math.max(
                0,
                Math.min(
                    window.scrollY,
                    documentHeight
                )
            );


        const progress =
            (scrollPosition / documentHeight) * 100;


        progressBar.style.width =
            `${progress}%`;


        ticking = false;

    };


    const requestUpdate = () => {

        if (ticking) return;

        ticking = true;

        window.requestAnimationFrame(
            updateProgress
        );

    };


    window.addEventListener(
        "scroll",
        requestUpdate,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        requestUpdate,
        {
            passive: true
        }
    );


    updateProgress();

}


/* ==========================================================
   SCROLL EFFECTS
========================================================== */

function initScrollEffects() {

    const elements =
        document.querySelectorAll(
            ".fade-in, .fade-scale, .reveal"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {

            element.classList.add("show");

        });

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add("show");

        });

        return;

    }


    const observer =
        new IntersectionObserver(

            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    entry.target.classList.add(
                        "show"
                    );


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"

            }

        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    if (!button) return;


    let ticking = false;


    const updateVisibility = () => {

        button.classList.toggle(
            "show",
            window.scrollY > 400
        );


        ticking = false;

    };


    const handleScroll = () => {

        if (ticking) return;

        ticking = true;

        window.requestAnimationFrame(
            updateVisibility
        );

    };


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        () => {

            const reducedMotion =
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches;


            window.scrollTo({

                top: 0,

                behavior:
                    reducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );


    updateVisibility();

}


/* ==========================================================
   CURRENT PAGE
========================================================== */

function initCurrentPage() {

    const currentPath =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase()
        || "index.html";


    const links =
        document.querySelectorAll(
            ".nav-links a[href]"
        );


    links.forEach(link => {

        const rawHref =
            link.getAttribute("href");


        if (!rawHref) return;


        if (
            rawHref.startsWith("#") ||
            rawHref.startsWith("mailto:") ||
            rawHref.startsWith("tel:")
        ) {

            return;

        }


        const cleanHref =
            rawHref
                .split("#")[0]
                .split("?")[0]
                .split("/")
                .pop()
                .toLowerCase();


        if (
            cleanHref === currentPath
        ) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


/* ==========================================================
   ACCESSIBILITY
========================================================== */

function initAccessibility() {

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    const applyMotionPreference =
        () => {

            document.documentElement
                .classList.toggle(
                    "reduced-motion",
                    reducedMotion.matches
                );

        };


    applyMotionPreference();


    if (
        typeof reducedMotion.addEventListener
        === "function"
    ) {

        reducedMotion.addEventListener(
            "change",
            applyMotionPreference
        );

    }

}


/* ==========================================================
   GLOBAL ERROR REPORTING
========================================================== */

window.addEventListener(
    "error",
    event => {

        console.error(
            "SovereignAqua Application Error:",
            event.error || event.message
        );

    }
);


/* ==========================================================
   UNHANDLED PROMISE ERRORS
========================================================== */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "SovereignAqua Unhandled Promise Rejection:",
            event.reason
        );

    }
);
```
