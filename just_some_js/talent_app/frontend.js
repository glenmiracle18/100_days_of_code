const landing = document.querySelector('.landing')
const talent = document.querySelector('.talent')
const button = document.querySelector('.item-1 button')

let isLanding = true;

button.addEventListener("click", function() {
    if (landing.style.display === 'block') {
        landing.style.display = "none";
        talent.style.display = "block";
    } else {
        landing.style.display = "block";
        talent.style.display = "none";
    }
})