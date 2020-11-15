window.addEventListener('DOMContentLoaded', () => {
    'use strict';
	// Timer
	function countTimer(deadline){
		let timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		function getTimeRemaining() {
			let	dateStop = new Date(deadline).getTime(),
			dateNow = new Date().getTime(),
			timeRemaining = (dateStop - dateNow)/1000,
			seconds = Math.floor(timeRemaining % 60),
			minutes = Math.floor((timeRemaining / 60) % 60),
			hours = Math.floor(timeRemaining / 60 / 60);
			return {timeRemaining, hours, minutes, seconds};
		}

		let updateClock = setInterval(() => {
			let timer = getTimeRemaining();
			
				
			timer.hours.toString().length < 2 ? timerHours.textContent = ("0" + timer.hours) : timerHours.textContent = timer.hours;
			timer.minutes.toString().length < 2 ? timerMinutes.textContent = ("0" + timer.minutes) : timerMinutes.textContent = timer.minutes;
			timer.seconds.toString().length < 2 ? timerSeconds.textContent = ("0" + timer.seconds) : timerSeconds.textContent = timer.seconds;
			;
			

			if(timer.timeRemaining < 0){
				clearInterval(updateClock);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			}
		}, 1000);
			
	}
    countTimer('16 november 2020');
    
    //Menu
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            menuItem = menu.querySelectorAll('ul>li>a'),
            serviceBlock = document.getElementById('service-block'),
            portfolio = document.getElementById('portfolio'),
            calculate = document.getElementById('calc'),
            command = document.getElementById('command'),
            connect = document.getElementById('connect'),
            bodyDocument = document.body;

        const BlockArr = [serviceBlock, portfolio, calculate, command, connect];
        

        const handlerMenu = ()=> {
            menu.classList.toggle('active-menu');
        };

        bodyDocument.addEventListener('click', (event)=> {
            let target = event.target;

            if(target.closest('.menu')){
                handlerMenu();
            } else if (target.matches('a>img')){
                event.preventDefault();
                BlockArr[0].scrollIntoView({behavior : "smooth"});
            } else if (target.classList.contains('close-btn')){
                handlerMenu();
            } else if (target.matches('a')){
                event.preventDefault();
                menuItem.forEach((item,index) => {
                    if(target === item){
                        handlerMenu();
                        BlockArr[index].scrollIntoView({behavior : "smooth"});
                    }
                });
            } else if (!target.closest('menu')){
                menu.classList.remove('active-menu');
            }
        });


       

    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn');
              
        let popupContent = document.querySelector('.popup-content');      

        let   position = 0;
            const popupAnimation = () =>{
                popup.style.display = 'block';
                let startAnimation = requestAnimationFrame(popupAnimation);
                position+= 3.5;
            
                if(position < 70){
                    popupContent.style.top = position *2 + 'px';
                } else {
                    cancelAnimationFrame(startAnimation);
                    position = 0;
                }
            };
    
        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popup.style.display = 'block';
                if(window.innerWidth > 768){
                    popupAnimation();
                }
            });
        });


        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else{
                target = target.closest('.popup-content');
            if(!target){
                popup.style.display = 'none';
            }
            }
  
        });

    };
    togglePopUp();

    //Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i ++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
                if(target){
                    tab.forEach((item, i) => {
                        if(item === target){
                            toggleTabContent(i);
                        }
                    });
                }
            
        });
    };
    tabs();

    // Slider
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
    slider();

    //Show Team Member
    const hoverEffect = () =>{
        const photoCollection = document.querySelector('.command'); 
        photoCollection.addEventListener('mouseover', (e)=> {
            const {target} = e;
            if(target.closest('.command__photo')){
                let defaultPhoto = target.src;
                target.src = target.dataset.img;
                target.addEventListener('mouseleave', ()=> {
                    target.src = defaultPhoto;
                });
            }
            
        });
    };
    hoverEffect(); 

    // Form Validation
    const formValidation = ()=> {
        const calculatorInputs = document.querySelectorAll('.calc-block input');
        const calculator = document.querySelector('.calc-block');

        calculator.addEventListener('input', (e)=>{
            const {target} = e;
            if(target.matches('input')){
                target.value = target.value.replace(/\D/g,"");
            }
        });
    };

    formValidation();

    // Calculator
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

            const countNumberAnimation = () => {
                const speed = 100;
                const getTarget = +totalValue.getAttribute('data-target');
                const count = +totalValue.textContent;
            
                const step = getTarget/speed;
            
                let start;
                if(count < getTarget){
                    totalValue.textContent = (count + step).toFixed();
                    start = setTimeout(countNumberAnimation,2);
                }else{
                    totalValue.textContent = getTarget;
                    clearTimeout(start);
                }
            };

            const countSum = () => {
                let total = 0,
                    countValue = 1,
                    dayValue = 1;
                const typeValue = calcType.options[calcType.selectedIndex].value,
                    squareValue = +calcSquare.value;

                    if(calcCount.value > 1){
                        countValue += (calcCount.value -1) / 10;
                    }

                    if(calcDay.value && calcDay.value < 5){
                        dayValue *=2;
                    }else if(calcDay.value && calcDay.value <10){
                        dayValue *=1.5;
                    }

                    if(typeValue && squareValue){
                        total = price * typeValue * squareValue * countValue * dayValue;
                    }

                    totalValue.textContent = 0;
                    totalValue.dataset.target = total;
                    countNumberAnimation();

            };

            calcBlock.addEventListener('change', (event) =>{
                const {target} = event;

                if(target.matches('.calc-type, .calc-square, .calc-count, .calc-day')){
                    countSum();
                }
            });
    };

    calc();

});
