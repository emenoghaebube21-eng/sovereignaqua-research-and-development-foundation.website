// ==========================================================
// Navigation
// ==========================================================

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});

const menuToggle=document.querySelector(".menu-toggle");

const navLinks=document.querySelector(".nav-links");

if(menuToggle && navLinks){

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}

// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

});

});
