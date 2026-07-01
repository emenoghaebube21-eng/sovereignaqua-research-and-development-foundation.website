// =====================================
// Smooth Scrolling
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

// =====================================
// Reveal Sections
// =====================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    observer.observe(section);

});

// =====================================
// Sticky Navigation Effect
// =====================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});

// =====================================
// Back To Top
// =====================================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    topBtn.style.display = window.scrollY > 500 ? "block" : "none";

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// =====================================
// Animated Counters
// =====================================

document.querySelectorAll(".impact-card h3").forEach(counter => {

    const text = counter.textContent;

    const target = parseInt(text.replace(/\D/g,""),10);

    if (isNaN(target)) return;

    let current = 0;

    const step = Math.max(1, Math.ceil(target / 60));

    const timer = setInterval(() => {

        current += step;

        if (current >= target) {

            current = target;

            clearInterval(timer);

        }

        counter.textContent = text.includes("+")
            ? `${current}+`
            : `${current}`;

    }, 25);

});

// =====================================
// MOBILE MENU
// =====================================

const menuBtn=document.querySelector(".menu-toggle");

const navLinks=document.querySelector(".nav-links");

if(menuBtn && navLinks){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}
// =====================================
// CURRENT YEAR
// =====================================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}v
