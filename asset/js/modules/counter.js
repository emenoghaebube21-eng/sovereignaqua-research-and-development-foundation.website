/* ==========================================================
   COUNTER.JS
   SovereignAqua Research & Development Foundation
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", initCounters);

/* ==========================================================
   INITIALIZE COUNTERS
========================================================== */

function initCounters() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    if (!("IntersectionObserver" in window)) {

        counters.forEach(counter => {

            animateCounter(counter);

        });

        return;

    }

    const observer = new IntersectionObserver(

        (entries, obs) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                obs.unobserve(entry.target);

            });

        },

        {
            threshold: 0.5
        }

    );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

/* ==========================================================
   ANIMATE COUNTER
========================================================== */

function animateCounter(counter) {

    const target = Number(counter.dataset.target) || 0;

    const duration = Number(counter.dataset.duration) || 2000;

    let start = null;

    function update(timestamp) {

        if (!start) start = timestamp;

        const progress = Math.min((timestamp - start) / duration, 1);

        const value = Math.floor(progress * target);

        counter.textContent = value.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            counter.textContent = target.toLocaleString();

        }

    }

    requestAnimationFrame(update);

}
