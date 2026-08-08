/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Core Application
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", initializeApp);
window.addEventListener("load", hideLoader);

function initializeApp() {
    console.log("SovereignAqua Website Initialized");
    ensureSkipLinkTarget();
    highlightCurrentPage();
    initMobileNavigation();
    initNavbarScrollState();
    initCounters();
    initBackToTop();
}

function hideLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    setTimeout(() => loader.remove(), 500);
}

function ensureSkipLinkTarget() {
    const target = document.getElementById("main-content");
    if (target) return;

    const hero = document.querySelector(".hero");
    if (hero) hero.id = "main-content";
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        const normalizedHref = href.split("#")[0].split("?")[0];
        if (normalizedHref === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

function initMobileNavigation() {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("navigation-menu");
    if (!toggle || !menu) return;

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "navigation-menu");
    toggle.setAttribute("aria-label", "Open navigation menu");

    const closeMenu = () => {
        menu.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    };

    const openMenu = () => {
        menu.classList.add("active");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close navigation menu");
        toggle.innerHTML = '<i class="fas fa-xmark" aria-hidden="true"></i>';
    };

    toggle.addEventListener("click", () => {
        if (menu.classList.contains("active")) closeMenu();
        else openMenu();
    });

    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
        if (!menu.classList.contains("active")) return;
        if (menu.contains(event.target) || toggle.contains(event.target)) return;
        closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) closeMenu();
    }, { passive: true });
}

function initNavbarScrollState() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const update = () => navbar.classList.toggle("scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
}

function initCounters() {
    const counters = document.querySelectorAll(".counter[data-target]");
    if (!counters.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = counter => {
        const target = Number(counter.dataset.target);
        if (!Number.isFinite(target)) return;

        if (reducedMotion) {
            counter.textContent = target.toLocaleString();
            return;
        }

        const duration = 1200;
        const start = performance.now();

        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
        counters.forEach(animate);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.25 });

    counters.forEach(counter => observer.observe(counter));
}

function initBackToTop() {
    const button = document.getElementById("backToTop");
    if (!button) return;

    window.addEventListener("scroll", () => {
        button.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

window.addEventListener("error", event => {
    console.error("Application Error:", event.message);
});

console.log("Core Application Loaded");
