/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Core Application Bootstrap
========================================================== */

"use strict";

import { initLoader } from "../modules/loader.js";
import { initNavigation } from "../modules/navigation.js";
import { initHero } from "../modules/hero.js";
import { initLazyLoad } from "../modules/lazyLoad.js";
import { initScrollEffects } from "../modules/scroll-effects.js";
import { initProgressBar } from "../modules/progress-bar.js";
import { initCounters } from "../modules/counter.js";

document.addEventListener("DOMContentLoaded", initializeApplication, { once: true });

function initializeApplication() {
    initializeModule("loader", initLoader);
    initializeModule("navigation", initNavigation);
    initializeModule("hero", initHero);
    initializeModule("lazy-load", initLazyLoad);
    initializeModule("scroll-effects", initScrollEffects);
    initializeModule("progress-bar", initProgressBar);
    initializeModule("counters", initCounters);
    highlightCurrentPage();
}

function initializeModule(moduleName, initializer) {
    if (typeof initializer !== "function") {
        console.warn(`[SovereignAqua] ${moduleName} module is unavailable.`);
        return false;
    }

    try {
        initializer();
        return true;
    } catch (error) {
        console.error(`[SovereignAqua] ${moduleName} initialization failed.`, error);
        return false;
    }
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a[href]").forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        const normalizedHref = href.split("#")[0].split("?")[0].split("/").pop();
        const isCurrentPage = normalizedHref === currentPage;
        link.classList.toggle("active", isCurrentPage);

        if (isCurrentPage) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });
}

window.addEventListener("error", event => {
    console.error("[SovereignAqua] Application error:", event.error || event.message);
});

window.addEventListener("unhandledrejection", event => {
    console.error("[SovereignAqua] Unhandled promise rejection:", event.reason);
});
