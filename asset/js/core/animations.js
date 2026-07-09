/* ==========================================================
   ANIMATIONS
   SovereignAqua Research & Development Foundation
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Scroll Reveal
    ========================================== */

    const revealItems = document.querySelectorAll(".fade-in");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    revealItems.forEach(item => {

        revealObserver.observe(item);

    });

    /* ==========================================
       Loader
    ========================================== */

    window.addEventListener("load", () => {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

            }, 500);

        }

    });

    /* ==========================================
       Scroll Progress Bar
    ========================================== */

    const progressBar = document.getElementById("progressBar");

    window.addEventListener("scroll", () => {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = (scrollTop / pageHeight) * 100;

        progressBar.style.width = progress + "%";

    });

    /* ==========================================
       Smooth Scroll
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

});
