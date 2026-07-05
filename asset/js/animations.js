// ==========================================================
// Fade-in Animation
// ==========================================================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

document.querySelectorAll(".fade-in").forEach(element=>{

observer.observe(element);

});
// ==========================================================
// Loader
// ==========================================================

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

}

});// ==========================================================
// Scroll Progress Bar
// ==========================================================

window.addEventListener("scroll",()=>{

const progress=document.getElementById("progressBar");

if(progress){

const total=document.documentElement.scrollHeight-window.innerHeight;

const percent=(window.scrollY/total)*100;

progress.style.width=percent+"%";

}

});
