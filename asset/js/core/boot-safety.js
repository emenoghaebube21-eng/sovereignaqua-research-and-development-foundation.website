"use strict";

(function bootSafety() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const hide = () => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        loader.style.pointerEvents = "none";
        window.setTimeout(() => loader.remove(), 550);
    };

    if (document.readyState === "complete") {
        window.setTimeout(hide, 0);
        return;
    }

    window.addEventListener("load", hide, { once: true });
    window.setTimeout(hide, 6000);
})();
