"use strict";

export function initNavigation() {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("navigation-menu");

    if (!menuToggle || !menu) return;
    if (menuToggle.dataset.initialized === "true") return;
    menuToggle.dataset.initialized = "true";

    const closeMenu = () => {
        menu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    menuToggle.addEventListener("click", () => {
        const open = menu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });

    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });

    if (navbar) {
        const update = () => navbar.classList.toggle("scrolled", window.scrollY > 60);
        window.addEventListener("scroll", update, { passive: true });
        update();
    }
}
