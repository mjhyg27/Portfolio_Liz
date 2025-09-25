
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

class ProjectCarousel {
  constructor(container) {
    this.currentIndex = 1;
    this.container = container;
    this.carouselContainer = this.container.querySelector('.project-carousel');
    this.track = this.carouselContainer.querySelector('.project-track');
    this.slides = this.track.querySelectorAll('.project-slide');
    this.isAnimating = false;
    this.firstClone = this.slides[0].cloneNode(true);
    this.lastClone = this.slides[this.slides.length - 1].cloneNode(true);
    
    this.updateDimensions(); 
    this.appendClones()

    this.container.querySelector('.next').addEventListener('click', () => {
      this.goToSlide(this.currentIndex + 1);
    });
    
    this.container.querySelector('.prev').addEventListener('click', () => {
      this.goToSlide(this.currentIndex - 1);
    });
    
    this.track.addEventListener('transitionend', () => this.infiniteAnimation());

        
    // === Init ===
    this.goToSlide(this.currentIndex, false);

  }

  updateDimensions() {
    const firstSlide = this.slides[1]; // Assuming index 1 is the first real slide
    if (firstSlide) {
        this.containerWidth = this.carouselContainer.getBoundingClientRect().width;
        this.slideWidth = firstSlide.getBoundingClientRect().width;
    }
  } 


  infiniteAnimation(){

    this.isAnimating = false; // ✅ re-enable buttons after animation

    if (this.slides[this.currentIndex] === this.firstClone) {
      this.currentIndex = 1;
      this.goToSlide(this.currentIndex, false);
    }
    if (this.slides[this.currentIndex] === this.lastClone) {
      this.currentIndex = this.slides.length - 2;
      this.goToSlide(this.currentIndex, false);
      }
  }
  
  appendClones() {
    this.firstClone.classList.remove('active');
    this.lastClone.classList.remove('active');
    this.track.appendChild(this.firstClone);
    this.track.insertBefore(this.lastClone, this.slides[0]);
    this.slides = Array.from(this.track.querySelectorAll('.project-slide'));
  }

  goToSlide(index, animate = true) {
    // ✅ Prevent out-of-range index
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;
    
    // ✅ Prevent spamming clicks during animation
    if (this.isAnimating && animate) return;
    this.isAnimating = animate;
  
    this.currentIndex = index;
    const slide = this.slides[this.currentIndex];
    if (!slide) return; // extra safety guard
  
    const slideLeft = slide.offsetLeft;
  
    const offset = slideLeft - (this.containerWidth / 2 - this.slideWidth / 2);
  
    this.track.style.transition = animate ? 'transform 0.5s ease' : 'none';
    this.track.style.transform = `translateX(${-offset}px)`;
  
    if (!animate) {
      void this.track.offsetWidth; // force reflow
      this.track.style.transition = 'transform 0.5s ease';
    }
  
    this.carouselContainer.querySelector('.active')?.classList.remove('active');
    slide.classList.add('active');
  }

}

document.querySelectorAll('.project-container')?.forEach( projectContainer => {

  let carouselContainer = projectContainer.querySelector('.carousel-container');
  new ProjectCarousel(carouselContainer);

})

