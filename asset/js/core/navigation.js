/* ==========================================================
   NAVIGATION
   SovereignAqua Research & Development Foundation
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    /* ==========================================
       Sticky Navigation
    ========================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

    });

    /* ==========================================
       Mobile Menu
    ========================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");

        });

    }

    /* ==========================================
       Close Menu After Click
    ========================================== */

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

        });

    });

    /* ==========================================
       Close Menu With Escape
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

        }

    });

    /* ==========================================
       Click Outside Menu
    ========================================== */

    document.addEventListener("click", (event) => {

        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

        }

    });

});document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

});

});


