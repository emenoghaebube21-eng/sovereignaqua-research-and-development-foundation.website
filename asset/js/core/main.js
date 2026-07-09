/* ==========================================================
   MAIN.JS
   SovereignAqua Research & Development Foundation
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("SovereignAqua Website Initialized");

    initBackToTop();

    highlightCurrentPage();

    initLazyLoading();

});

/* ==========================================================
   Highlight Current Navigation Link
========================================================== */

function highlightCurrentPage(){

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if(href === currentPage){

            link.classList.add("active");

        }

    });

}

/* ==========================================================
   Back To Top
========================================================== */

function initBackToTop(){

    const button =
        document.getElementById("backToTop");

    if(!button) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            button.classList.add("show");

        }else{

            button.classList.remove("show");

        }

    });

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/* ==========================================================
   Lazy Loading Images
========================================================== */

function initLazyLoading(){

    const images =
        document.querySelectorAll("img[data-src]");

    if(images.length===0) return;

    const observer =
        new IntersectionObserver((entries,obs)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const img=entry.target;

                img.src=img.dataset.src;

                img.removeAttribute("data-src");

                obs.unobserve(img);

            }

        });

    });

    images.forEach(img=>observer.observe(img));

}

/* ==========================================================
   Future Modules

   Theme Switcher
   Search
   Newsletter
   Gallery
   Events
   Publications
========================================================== */
