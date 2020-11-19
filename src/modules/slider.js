const slider = () => {
    (function() {
        const dots = document.querySelector('.portfolio-dots');
        
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            let element = document.createElement('li');
            element.classList.add('dot');
            if(index === 0){
            element.classList.add('dot-active');
            }
            dots.appendChild(element);
        });

    })();

    const slide = document.querySelectorAll('.portfolio-item'),
        dot = document.querySelectorAll('.dot'),
        slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
        interval;

    const prevSlide = (element, index, strClass) => {
        element[index].classList.remove(strClass);
    };

    const nextSlide = (element, index, strClass) => {
        element[index].classList.add(strClass);
    };


    const autoPlaySlide = () => {

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        currentSlide++;
        if(currentSlide >= slide.length){
            currentSlide = 0;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 2500) => {
        interval = setInterval(autoPlaySlide, time);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();

        let target = event.target;

        if(!target.matches('.portfolio-btn, .dot')){
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');


        if (target.matches('#arrow-right')){
            currentSlide++;
        } else if (target.matches('#arrow-left')){
            currentSlide--;
        } else if (target.matches('.dot')){
            dot.forEach((element, index) => {
                if (element === target){
                    currentSlide = index;
                }
            });
        }

        if(currentSlide >= slide.length){
            currentSlide = 0;
        }

        if(currentSlide < 0){
            currentSlide = slide.length -1;
        }

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    });

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn, .dot')){
            stopSlide();
        }
            
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn, .dot')){
            startSlide();
        }
    });
    
    startSlide(2500);
};


export default slider;