let pump1Slider = document.getElementById('pump-1');
let pump2Slider = document.getElementById('pump-2');
let intakeSlider = document.getElementById('intake');
let fill = 0;
let pump1Interval;
let pump2Interval;
let intakeInterval;
let pressureElement = document.getElementById("pressure");
let flowStateElement = document.getElementById("flow-state");
let flowElement = document.getElementById('flow');
let pressure = 1;
let flow = 1; 

pump1Slider.addEventListener('click', function() {
    let slider = event.target;
    const container = document.querySelector('.fill-percentage');
    if (slider.checked) {
        pressure *= 2
        pressureElement.innerHTML = pressure + ' psi'; 
        pump1Interval = setInterval(function() {
            fill--
            if (fill <= 0) {
                fill = 0;
                slider.checked = false;
                clearInterval(pump1Interval)
                pump1Interval = null;
                pressureElement.innerHTML = '0' + ' psi';
                pressure = 1;
            }
            container.style.setProperty('--fill', fill + '%');
            container.innerHTML = fill + '%';
        }, 1500)

    } else {
        clearInterval(pump1Interval);
        pump1Interval = null;
        pressureElement.innerHTML = '0' + ' psi';
        pressure = 1;
    }
});

pump2Slider.addEventListener('click', function() {
    let slider = event.target;
    const container = document.querySelector('.fill-percentage');
    if (slider.checked) {
        pressure *= 4
        pressureElement.innerHTML = pressure + ' psi'; 
        pump2Interval = setInterval(function() {
            fill--
            if (fill <= 0) {
                fill = 0;
                slider.checked = false;
                clearInterval(pump2Interval);
                pressureElement.innerHTML = '0' + ' psi';
                pump2Interval = null;
                pressure = 1;
            }
            container.style.setProperty('--fill', fill + '%');
            container.innerHTML = fill + '%';
        }, 1500)

    } else {
        clearInterval(pump2Interval);
        pump2Interval = null;
        pressure = 1;
        pressureElement.innerHTML = '0' + ' psi';
    }
});

intakeSlider.addEventListener('click', function() {
    let slider = event.target;
    const container = document.querySelector('.fill-percentage');
    if (slider.checked) {
        flow *= 6;
        flowElement.innerHTML = flow + '  L/h';
        flowStateElement.classList.add('on');
        flowStateElement.classList.remove('off');
        flowStateElement.innerHTML = 'On';
        intakeInterval = setInterval(function() {
            fill += 3; 
            if (fill >= 100) {
                fill = 100;
                slider.checked = false;
                clearInterval(intakeInterval)
                intakeInterval = null;
                flow = 1;
                flowElement.innerHTML = 0 + '  L/h';
                flowStateElement.classList.remove('on');
                flowStateElement.classList.add('off');
                flowStateElement.innerHTML = 'Off';
            }
            container.style.setProperty('--fill', fill + '%');
            container.innerHTML = fill + '%';
        },1000)

    } else {
        flow = 1;
        clearInterval(intakeInterval);
        intakeInterval = null;
        flowStateElement.classList.remove('on');
        flowStateElement.innerHTML = 'Off';
        flowStateElement.classList.add('off');
        flowElement.innerHTML = '0' + '  L/h';
    }
});


