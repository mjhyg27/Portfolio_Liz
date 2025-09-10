
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


