/* ==========================================================
   ANIMATIONS.JS
   SovereignAqua Research & Development Foundation
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", initAnimations);

/* ==========================================================
   INITIALIZE
========================================================== */

function initAnimations() {

    initScrollReveal();

    initProgressBar();

    initSmoothScroll();

    initLoader();

}

/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initScrollReveal() {

    const elements = document.querySelectorAll(
        ".fade-in, .fade-scale"
    );

    if (!elements.length) return;

    /* Browser fallback */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {

            element.classList.add("show");

        });

        return;

    }

    const observer = new IntersectionObserver(

        (entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                obs.unobserve(entry.target);

            });

        },

        {

            threshold:0.15,

            rootMargin:"0px 0px -50px 0px"

        }

    );

    elements.forEach(element => {

        observer.observe(element);

    });

}

/* ==========================================================
   PAGE LOADER
========================================================== */

function initLoader() {

    window.addEventListener("load", () => {

        const loader =
            document.getElementById("loader");

        if (!loader) return;

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

        setTimeout(() => {

            loader.remove();

        },500);

    });

}

/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

function initProgressBar() {

    const progressBar =
        document.getElementById("progressBar");

    if (!progressBar) return;

    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (pageHeight <= 0) {

            progressBar.style.width = "0%";

            return;

        }

        const progress =
            (scrollTop / pageHeight) * 100;

        progressBar.style.width =
            progress + "%";

    }

    window.addEventListener(

        "scroll",

        updateProgress,

        { passive:true }

    );

    updateProgress();

}

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const target =
                document.querySelector(

                    link.getAttribute("href")

                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}

/* ==========================================================
   ACCESSIBILITY
========================================================== */

if (

    window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    ).matches

) {

    document.documentElement.style.scrollBehavior = "auto";

}
