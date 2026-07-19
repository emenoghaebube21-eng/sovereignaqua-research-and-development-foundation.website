/* ==========================================================
   HERO VIDEO
   SovereignAqua Research & Development Foundation
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", initHeroVideo);

/* ==========================================================
   INITIALIZE HERO VIDEO
========================================================== */

function initHeroVideo() {

    const video = document.querySelector(".hero-video");

    if (!video) return;

    /* Respect reduced motion preference */

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        video.pause();

        return;

    }

    /* Browser fallback */

    if (!("IntersectionObserver" in window)) {

        playVideo(video);

        return;

    }

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    playVideo(video);

                } else {

                    video.pause();

                }

            });

        },

        {
            threshold:0.25
        }

    );

    observer.observe(video);

}

/* ==========================================================
   PLAY VIDEO SAFELY
========================================================== */

function playVideo(video){

    const promise = video.play();

    if (promise !== undefined) {

        promise.catch(() => {

            /* Ignore autoplay restrictions */

        });

    }

}
