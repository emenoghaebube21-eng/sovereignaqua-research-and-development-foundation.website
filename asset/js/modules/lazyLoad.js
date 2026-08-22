/* ==========================================================
   LAZYLOAD.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Responsibilities:
   - Lazy-load deferred images
   - Support data-src and data-srcset
   - Use IntersectionObserver when available
   - Provide a browser fallback
   - Handle successful and failed image loads
   - Prevent duplicate initialization
========================================================== */

"use strict";


/* ==========================================================
   INITIALIZE LAZY LOADING
========================================================== */

export function initLazyLoad() {

    const lazyImages =
        document.querySelectorAll(
            "img[data-src], img[data-srcset]"
        );


    if (!lazyImages.length) {
        return;
    }


    /*
       Prevent the same image from being initialized twice.
    */

    const pendingImages =
        Array.from(
            lazyImages
        ).filter(
            image =>
                image.dataset.lazyInitialized !==
                "true"
        );


    if (!pendingImages.length) {
        return;
    }


    pendingImages.forEach(
        image => {

            image.dataset.lazyInitialized =
                "true";

        }
    );


    /*
       Native lazy loading can be used as an additional
       browser-level optimization.

       We still use data-src so that the image is not
       requested before this module processes it.
    */

    pendingImages.forEach(
        image => {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }
    );


    /*
       Browser fallback.
    */

    if (
        !(
            "IntersectionObserver" in
            window
        )
    ) {

        pendingImages.forEach(
            loadImage
        );

        return;
    }


    const observer =
        new IntersectionObserver(

            (entries, obs) => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;
                        }


                        loadImage(
                            entry.target
                        );


                        obs.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                rootMargin:
                    "150px",

                threshold:
                    0.01
            }

        );


    pendingImages.forEach(
        image => {

            observer.observe(
                image
            );

        }
    );

}


/* ==========================================================
   LOAD IMAGE
========================================================== */

function loadImage(
    image
) {

    if (!image) {
        return;
    }


    /*
       Prevent duplicate loading.
    */

    if (
        image.dataset.lazyLoaded ===
        "true"
    ) {

        return;
    }


    const source =
        image.dataset.src;


    const sourceSet =
        image.dataset.srcset;


    const sizes =
        image.dataset.sizes;


    /*
       Nothing to load.
    */

    if (
        !source &&
        !sourceSet
    ) {

        return;
    }


    /*
       Apply responsive image sources before the main
       source so the browser can make the correct selection.
    */

    if (sourceSet) {

        image.srcset =
            sourceSet;

    }


    if (sizes) {

        image.sizes =
            sizes;

    }


    /*
       Mark the image as loading.
    */

    image.classList.add(
        "loading"
    );


    /*
       Listen before assigning src so cached images are
       handled consistently.
    */

    image.addEventListener(
        "load",
        () => {

            image.classList.remove(
                "loading"
            );

            image.classList.add(
                "loaded"
            );

            image.dataset.lazyLoaded =
                "true";


            cleanupLazyAttributes(
                image
            );

        },
        {
            once: true
        }
    );


    image.addEventListener(
        "error",
        () => {

            image.classList.remove(
                "loading"
            );

            image.classList.add(
                "load-error"
            );


            /*
               Keep the original data attributes on failure
               so another recovery process can retry loading
               if required.
            */

            delete image.dataset.lazyLoaded;

        },
        {
            once: true
        }
    );


    if (source) {

        image.src =
            source;

    }

}


/* ==========================================================
   CLEAN UP LAZY-LOAD ATTRIBUTES
========================================================== */

function cleanupLazyAttributes(
    image
) {

    image.removeAttribute(
        "data-src"
    );

    image.removeAttribute(
        "data-srcset"
    );

    image.removeAttribute(
        "data-sizes"
    );

}
