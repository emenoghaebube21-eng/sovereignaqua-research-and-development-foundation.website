/* ==========================================================
   Animated Counter
========================================================== */

const counters=document.querySelectorAll(".counter");

const speed=200;

counters.forEach(counter=>{

const updateCounter=()=>{

const target=+counter.dataset.target;

const count=+counter.innerText;

const increment=target/speed;

if(count<target){

counter.innerText=Math.ceil(count+increment);

requestAnimationFrame(updateCounter);

}else{

counter.innerText=target;

}

};

updateCounter();

});
