/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
   Application Entry Point
========================================================== */

"use strict";

/* ==========================================================
   APPLICATION STARTUP
========================================================== */

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp(){

    highlightCurrentPage();

    initBackToTop();

    initLazyLoading();

}

/* ==========================================================
   WINDOW LOADED
   (Images, Video, Fonts Complete)
========================================================== */

window.addEventListener("load", () => {

    hideLoader();

});

/* ==========================================================
   HIDE LOADER
========================================================== */

function hideLoader(){

    const loader = document.getElementById("loader");

    if(!loader) return;

    loader.style.opacity = "0";

    loader.style.visibility = "hidden";

    setTimeout(()=>{

        loader.remove();

    },500);

}

/* ==========================================================
   HIGHLIGHT CURRENT PAGE
========================================================== */

function highlightCurrentPage(){

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document
        .querySelectorAll(".nav-links a")
        .forEach(link=>{

            const href = link.getAttribute("href");

            if(!href) return;

            if(
                href.includes("#")
            ) return;

            if(href===currentPage){

                link.classList.add("active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        });

}

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

function initBackToTop(){

    const button =
        document.getElementById("backToTop");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        button.classList.toggle(
            "show",
            window.scrollY>400
        );

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================================
   LAZY LOAD IMAGES
========================================================== */

function initLazyLoading(){

    const images =
        document.querySelectorAll("img[data-src]");

    if(images.length===0) return;

    if(!("IntersectionObserver" in window)){

        images.forEach(img=>{

            img.src = img.dataset.src;

            img.removeAttribute("data-src");

        });

        return;

    }

    const observer =
        new IntersectionObserver((entries,obs)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting){

                    return;

                }

                const img = entry.target;

                img.src = img.dataset.src;

                img.onload = ()=>{

                    img.classList.add("loaded");

                };

                img.removeAttribute("data-src");

                obs.unobserve(img);

            });

        },{

            rootMargin:"100px"

        });

    images.forEach(img=>{

        observer.observe(img);

    });

}

/* ==========================================================
   FUTURE MODULES
========================================================== */

/*

Future initialization examples:

initNavigation();

initProgressBar();

initCounters();

initScrollReveal();

initHeroVideo();

initThemeSwitcher();

initNewsletter();

initSearch();

*/
