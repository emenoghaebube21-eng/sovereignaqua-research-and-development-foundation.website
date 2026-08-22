/* ==========================================================
   HELPERS.JS
   SovereignAqua Research & Development Foundation
   Version 2.1

   Purpose:
   Reusable, side-effect-free utility functions.

   Rules:
   - No DOMContentLoaded listener
   - No global event listeners
   - No module initialization
   - No page-specific behavior
   - Functions should be safe to reuse across modules
========================================================== */

"use strict";


/* ==========================================================
   DOM HELPERS
========================================================== */

/**
 * Safely return the first matching DOM element.
 *
 * @param {string} selector
 * @param {ParentNode} scope
 * @returns {Element|null}
 */
export function select(
    selector,
    scope = document
) {

    if (
        !selector ||
        !scope ||
        typeof scope.querySelector !==
            "function"
    ) {

        return null;

    }

    return scope.querySelector(
        selector
    );

}


/**
 * Safely return all matching DOM elements.
 *
 * @param {string} selector
 * @param {ParentNode} scope
 * @returns {Element[]}
 */
export function selectAll(
    selector,
    scope = document
) {

    if (
        !selector ||
        !scope ||
        typeof scope.querySelectorAll !==
            "function"
    ) {

        return [];

    }

    return Array.from(
        scope.querySelectorAll(
            selector
        )
    );

}


/* ==========================================================
   CLASS HELPERS
========================================================== */

/**
 * Add a class when an element exists.
 *
 * @param {Element|null} element
 * @param {...string} classNames
 */
export function addClass(
    element,
    ...classNames
) {

    if (!element) {
        return;
    }

    element.classList.add(
        ...classNames.filter(Boolean)
    );

}


/**
 * Remove classes when an element exists.
 *
 * @param {Element|null} element
 * @param {...string} classNames
 */
export function removeClass(
    element,
    ...classNames
) {

    if (!element) {
        return;
    }

    element.classList.remove(
        ...classNames.filter(Boolean)
    );

}


/**
 * Toggle a class safely.
 *
 * @param {Element|null} element
 * @param {string} className
 * @param {boolean|undefined} force
 */
export function toggleClass(
    element,
    className,
    force
) {

    if (
        !element ||
        !className
    ) {

        return false;

    }

    return element.classList.toggle(
        className,
        force
    );

}


/* ==========================================================
   ATTRIBUTE HELPERS
========================================================== */

/**
 * Set an attribute safely.
 *
 * @param {Element|null} element
 * @param {string} name
 * @param {string} value
 */
export function setAttribute(
    element,
    name,
    value
) {

    if (
        !element ||
        !name
    ) {

        return;

    }

    element.setAttribute(
        name,
        String(value)
    );

}


/**
 * Remove an attribute safely.
 *
 * @param {Element|null} element
 * @param {string} name
 */
export function removeAttribute(
    element,
    name
) {

    if (
        !element ||
        !name
    ) {

        return;

    }

    element.removeAttribute(
        name
    );

}


/* ==========================================================
   VALUE / NUMBER HELPERS
========================================================== */

/**
 * Convert a value to a finite number.
 *
 * @param {*} value
 * @param {number|null} fallback
 * @returns {number|null}
 */
export function toNumber(
    value,
    fallback = null
) {

    const number =
        Number(value);


    if (
        !Number.isFinite(
            number
        )
    ) {

        return fallback;

    }

    return number;

}


/**
 * Clamp a number between minimum and maximum values.
 *
 * @param {number} value
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
export function clamp(
    value,
    minimum = 0,
    maximum = 1
) {

    const numericValue =
        toNumber(
            value,
            minimum
        );


    return Math.min(
        maximum,
        Math.max(
            minimum,
            numericValue
        )
    );

}


/**
 * Format a number using the user's locale.
 *
 * @param {number} value
 * @param {Intl.NumberFormatOptions} options
 * @returns {string}
 */
export function formatNumber(
    value,
    options = {}
) {

    const number =
        toNumber(
            value,
            0
        );


    return number.toLocaleString(
        undefined,
        options
    );

}


/* ==========================================================
   STRING HELPERS
========================================================== */

/**
 * Safely trim a value.
 *
 * @param {*} value
 * @param {string} fallback
 * @returns {string}
 */
export function toText(
    value,
    fallback = ""
) {

    if (
        value === null ||
        value === undefined
    ) {

        return fallback;

    }

    return String(
        value
    ).trim();

}


/**
 * Normalize a URL/path for comparison.
 *
 * @param {string} value
 * @returns {string}
 */
export function normalizePath(
    value
) {

    if (!value) {
        return "";
    }


    return String(value)
        .split("#")[0]
        .split("?")[0]
        .replace(
            /\/+$/,
            ""
        );

}


/* ==========================================================
   URL HELPERS
========================================================== */

/**
 * Determine whether a URL is an in-page anchor.
 *
 * @param {string} href
 * @returns {boolean}
 */
export function isAnchorLink(
    href
) {

    if (!href) {
        return false;
    }

    return String(
        href
    ).startsWith("#");

}


/**
 * Safely resolve a URL.
 *
 * @param {string} value
 * @param {string} base
 * @returns {URL|null}
 */
export function resolveUrl(
    value,
    base = window.location.href
) {

    if (!value) {
        return null;
    }


    try {

        return new URL(
            value,
            base
        );

    } catch (
        error
    ) {

        return null;

    }

}


/* ==========================================================
   VIEWPORT HELPERS
========================================================== */

/**
 * Determine whether an element is currently visible
 * within the viewport.
 *
 * @param {Element|null} element
 * @param {number} threshold
 * @returns {boolean}
 */
export function isInViewport(
    element,
    threshold = 0
) {

    if (!element) {
        return false;
    }


    const rect =
        element.getBoundingClientRect();


    const viewportHeight =
        window.innerHeight ||
        document.documentElement
            .clientHeight;


    const viewportWidth =
        window.innerWidth ||
        document.documentElement
            .clientWidth;


    const visibleHeight =
        Math.min(
            rect.bottom,
            viewportHeight
        ) -
        Math.max(
            rect.top,
            0
        );


    const visibleWidth =
        Math.min(
            rect.right,
            viewportWidth
        ) -
        Math.max(
            rect.left,
            0
        );


    if (
        visibleHeight <= 0 ||
        visibleWidth <= 0
    ) {

        return false;

    }


    const elementArea =
        rect.width *
        rect.height;


    if (
        elementArea <= 0
    ) {

        return false;

    }


    const visibleArea =
        visibleWidth *
        visibleHeight;


    return (
        visibleArea /
        elementArea
    ) >= threshold;

}


/* ==========================================================
   ACCESSIBILITY HELPERS
========================================================== */

/**
 * Detect the user's reduced-motion preference.
 *
 * @returns {boolean}
 */
export function prefersReducedMotion() {

    if (
        typeof window ===
            "undefined" ||
        typeof window.matchMedia !==
            "function"
    ) {

        return false;

    }


    return window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

}


/**
 * Safely move keyboard focus to an element.
 *
 * @param {Element|null} element
 * @param {boolean} preventScroll
 */
export function focusElement(
    element,
    preventScroll = false
) {

    if (
        !element ||
        typeof element.focus !==
            "function"
    ) {

        return;

    }


    try {

        element.focus({
            preventScroll
        });

    } catch (
        error
    ) {

        element.focus();

    }

}


/* ==========================================================
   STORAGE HELPERS
========================================================== */

/**
 * Safely read localStorage.
 *
 * @param {string} key
 * @param {*} fallback
 * @returns {*}
 */
export function getStorage(
    key,
    fallback = null
) {

    if (
        !key ||
        typeof window ===
            "undefined"
    ) {

        return fallback;

    }


    try {

        const value =
            window.localStorage.getItem(
                key
            );


        return value === null
            ? fallback
            : value;

    } catch (
        error
    ) {

        return fallback;

    }

}


/**
 * Safely write localStorage.
 *
 * @param {string} key
 * @param {string} value
 * @returns {boolean}
 */
export function setStorage(
    key,
    value
) {

    if (
        !key ||
        typeof window ===
            "undefined"
    ) {

        return false;

    }


    try {

        window.localStorage.setItem(
            key,
            String(value)
        );

        return true;

    } catch (
        error
    ) {

        return false;

    }

}


/**
 * Safely remove localStorage item.
 *
 * @param {string} key
 * @returns {boolean}
 */
export function removeStorage(
    key
) {

    if (
        !key ||
        typeof window ===
            "undefined"
    ) {

        return false;

    }


    try {

        window.localStorage.removeItem(
            key
        );

        return true;

    } catch (
        error
    ) {

        return false;

    }

}


/* ==========================================================
   TIMING HELPERS
========================================================== */

/**
 * Create a simple delay.
 *
 * @param {number} milliseconds
 * @returns {Promise<void>}
 */
export function delay(
    milliseconds = 0
) {

    const duration =
        Math.max(
            0,
            toNumber(
                milliseconds,
                0
            )
        );


    return new Promise(
        resolve => {

            window.setTimeout(
                resolve,
                duration
            );

        }
    );

}


/* ==========================================================
   SAFE EVENT HELPERS
========================================================== */

/**
 * Add an event listener only when the target exists.
 *
 * @param {EventTarget|null} target
 * @param {string} eventName
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} options
 */
export function on(
    target,
    eventName,
    handler,
    options
) {

    if (
        !target ||
        !eventName ||
        typeof handler !==
            "function"
    ) {

        return;

    }


    target.addEventListener(
        eventName,
        handler,
        options
    );

}


/**
 * Remove an event listener safely.
 *
 * @param {EventTarget|null} target
 * @param {string} eventName
 * @param {EventListener} handler
 * @param {boolean|EventListenerOptions} options
 */
export function off(
    target,
    eventName,
    handler,
    options
) {

    if (
        !target ||
        !eventName ||
        typeof handler !==
            "function"
    ) {

        return;

    }


    target.removeEventListener(
        eventName,
        handler,
        options
    );

}
