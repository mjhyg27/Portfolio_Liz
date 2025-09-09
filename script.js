
// add autoplay, stop on hover, dinamycally change the button state, etc

let experienceCarousel = document.querySelector('.experience-carousel');
let experienceButtons = document.querySelectorAll('.experience-button');

let carouselDate = document.querySelector('.carousel-date');


experienceButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
        let buttons = document.querySelectorAll('.experience-button');
        turnOffButtons(buttons);
        experienceCarousel.style.transform = `translateX(${index * -100}vw)`;
        button.classList.add('pressed-button');
        carouselDate.style.transform = `translateY(${index * -20}%)`;
    })
    
});

function turnOffButtons(buttons) {
    buttons.forEach(button => button.classList.remove('pressed-button'));
}

function carouselAutoSlide() {
    let buttons = document.querySelectorAll('.experience-button');
    turnOffButtons(buttons);
    experienceCarousel.style.transform = `translateX(${index * -100}vw)`;
    button.classList.add('pressed-button'); 
}