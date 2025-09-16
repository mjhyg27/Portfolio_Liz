
class carousel {
    constructor(options) {
        this.index = 0;
        this.buttons = document.querySelectorAll(options.buttonsSelector);
        this.sliderSelectors = options.sliderSelectors;
        this.containerSelector = options.containerSelector;
        this.interval = options.interval;
        this.autoPlay = null;
    }

    main() {
        this.buttonsAddListeners();
        this.containerAddListeners();
        this.startAutoPlay();
    }

    goToSlide(i) {
        this.index = i;
        this.deactiveButtons();

        this.sliderSelectors.horizontal.forEach(selector => {
            let slider = document.querySelector(selector);
            let firstChild = slider.firstElementChild ;
            let width = parseInt(firstChild.getBoundingClientRect().width);

            slider.style.transform = `translateX(-${width * i}px)`;
        });

        this.sliderSelectors.vertical.forEach(selector => {
            let slider = document.querySelector(selector);
            slider.style.transform = `translateY(-${i * 100}%)`;
        });

        if (this.buttons[i]) this.buttons[i].classList.add("pressed-button");
    }

    deactiveButtons() {
        this.buttons.forEach(button => button.classList.remove('pressed-button'));
    }

    startAutoPlay() {
        this.autoPlay = setInterval(() => {
            this.goToSlide((this.index + 1) % this.buttons.length);
        }, this.interval);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlay);
        this.autoPlay = null;
    }

    buttonFunc(i) {
        this.stopAutoPlay();
        this.goToSlide(i)
        this.startAutoPlay(); 
    }

    buttonsAddListeners() {
        this.buttons.forEach((button, i) => {
            button.addEventListener("click", () => this.buttonFunc(i));
        });
    }

    containerAddListeners() {
        let container = document.querySelector(this.containerSelector);

        container.addEventListener("mouseenter", () => this.stopAutoPlay());
        container.addEventListener("mouseleave", () => this.startAutoPlay());

    }
}


experienceCarouselOptions = {
    buttonsSelector: '.experience-button',
    sliderSelectors: {
        horizontal: ['.experience-carousel', '.company-gallery' ],
        vertical: ['.carousel-date']
    },
    containerSelector: '.experience-carousel',
    interval: 5000
};

let experienceCarousel = new carousel(experienceCarouselOptions);

experienceCarousel.main();

// projectsCarouselOptions = {
//     buttonsSelector: '.experience-button',
//     sliderSelectors: {
//         horizontal: ['.experience-carousel', '.company-gallery' ],
//         vertical: ['.carousel-date']
//     },
//     containerSelector: '.experience-carousel',
//     interval: 5000
// };

// let projectsCarousel = new carousel(projectsCarouselOptions);

// projectsCarousel.main();


// let prevButton = document.querySelector('.coffee-prev');
// const mainCard = document.querySelector('.main-project');
// const mainCardtCoords = mainCard.getBoundingClientRect();
// const mainCardLeft = parseFloat(mainCardtCoords.left);
// const left = mainCardLeft;

// prevButton.addEventListener('click', function() {
    
//     const track = document.querySelector('.project-track');
//     const trackCoords = track.getBoundingClientRect();
//     let trackValues = getComputedStyle(track);
//     const trackLeft = parseFloat(trackCoords.left);
//     const colGapPx = parseFloat(trackValues.columnGap);

//     const mainCard = document.querySelector('.main-project');
//     const mainCardtCoords = mainCard.getBoundingClientRect();
//     const mainCardtWidth = parseFloat(mainCardtCoords.width);
//     const mainCardLeft = parseFloat(mainCardtCoords.left);

//     const nextCard = mainCard.nextElementSibling;
//     const nextCardCoords = nextCard.getBoundingClientRect();
//     const nextCardLeft = parseInt(nextCardCoords.left);
//     console.log(nextCardLeft);
//     track.style.transform = `translateX(-${nextCardLeft - trackLeft - colGapPx}px)`;
//     mainCard.nextElementSibling.classList.add('main-project');

//     mainCard.classList.remove('main-project');
    
// })

// let nextButton = document.querySelector('.coffee-next');

// nextButton.addEventListener('click', function() {
//     const track = document.querySelector('.project-track');
//     const trackCoords = track.getBoundingClientRect();
//     let trackValues = getComputedStyle(track);
//     const trackLeft = parseFloat(trackCoords.left);
//     const colGapPx = parseFloat(trackValues.columnGap);

//     const mainCard = document.querySelector('.main-project');
//     const mainCardtCoords = mainCard.getBoundingClientRect();
//     const mainCardtWidth = parseFloat(mainCardtCoords.width);
//     const mainCardLeft = parseFloat(mainCardtCoords.left);

//     const prevCard = mainCard.previousElementSibling;
//     const prevCardCoords = prevCard.getBoundingClientRect();
//     const prevCardLeft = parseInt(prevCardCoords.left);
//     track.style.transform = `translateX(-${prevCardLeft - trackLeft - colGapPx}px)`;
//     prevCard.classList.add('main-project');

//     mainCard.classList.remove('main-project');
    
// })
let currentIndex = 1; // start at 1 because index 0 will be the lastClone
const track = document.querySelector('.project-track');
const container = document.querySelector('.project-carousel');
let slides = Array.from(document.querySelectorAll('.project-slide'));

// === Step 1: Clone edges ===
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.classList.remove('active');
lastClone.classList.remove('active');

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Refresh slides list (now includes clones)
slides = Array.from(document.querySelectorAll('.project-slide'));

// === Step 2: Center slide helper ===
function goToSlide(index, animate = true) {
  currentIndex = index;

  const containerWidth = container.getBoundingClientRect().width;
  const slide = slides[index];
  const slideWidth = slide.getBoundingClientRect().width;
  const slideLeft = slide.offsetLeft;

  const offset = slideLeft - (containerWidth / 2 - slideWidth / 2);

  if (!animate) {
    track.style.transition = 'none';
  } else {
    track.style.transition = 'transform 0.5s ease';
  }

  track.style.transform = `translateX(${-offset}px)`;

  if (!animate) {
    // force reflow so browser applies instantly
    void track.offsetWidth;
    track.style.transition = 'transform 0.5s ease';
  }

  document.querySelector('.active')?.classList.remove('active');
  slide.classList.add('active');
}

// === Step 3: Buttons ===
document.querySelector('.next').addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

document.querySelector('.prev').addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

// === Step 4: Handle teleporting ===
track.addEventListener('transitionend', () => {
  if (slides[currentIndex] === firstClone) {
    // we’re on the fake first slide → jump to real first
    currentIndex = 1;
    goToSlide(currentIndex, false);
  }
  if (slides[currentIndex] === lastClone) {
    // we’re on the fake last slide → jump to real last
    currentIndex = slides.length - 2;
    goToSlide(currentIndex, false);
  }
});

// === Init ===
goToSlide(currentIndex, false);



