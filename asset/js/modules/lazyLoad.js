/* ==========================================================
   LAZYLOAD.JS
   SovereignAqua Research & Development Foundation
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", initLazyLoad);

/* ==========================================================
   INITIALIZE LAZY LOADING
========================================================== */

function initLazyLoad() {

    const lazyImages = document.querySelectorAll("img[data-src]");

    if (!lazyImages.length) return;

    /* Browser fallback */

    if (!("IntersectionObserver" in window)) {

        lazyImages.forEach(loadImage);

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
            rootMargin: "150px",
            threshold: 0.01
        }

    );

    lazyImages.forEach(image => {

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
