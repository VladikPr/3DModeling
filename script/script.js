window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //getAllForms
    const getAllForms = (form) => {
        const elementsForm = [...form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !=="button";
        });

        return elementsForm;
    };

    // Form Validation
    const formValidation = (form) => {

        function ifTrue(item,pam){
            if(pam){
                item.style.border = 'none';
            }else{
                item.style.border = 'solid red';
                item.value = "";
            }
            
        }

        let check = [];
        getAllForms(form).forEach(item => {
            if(!item.value){
                check.push(false);
                ifTrue(item,false);
            }
           
            if(item.value && item.type === 'tel'){
                const patternBoolean = /^\+?\d+$/g.test(item.value);
                check.push(patternBoolean);
                ifTrue(item, patternBoolean);
            }

            if(item.value && item.type === 'email'){
                const patternBoolean = /\w+@\w+\.\w{2,3}/.test(item.value);
                check.push(patternBoolean);
                ifTrue(item, patternBoolean);
            }
                 
        });
        return !check.some(item => item === false);
        
    };


    const watchInputs = ()=> {
        const calculator = document.querySelector('.calc-block');
        const wholeForms = document.querySelectorAll('form');

        calculator.addEventListener('input', (e)=>{
            const {target} = e;
            if(target.matches('input')){
                target.value = target.value.replace(/\D/g,"");
            }
        });

        wholeForms.forEach((form)=>{
            getAllForms(form).forEach((item)=> {
                item.addEventListener('input', (event)=>{
                    const {target} = event;
                    if(target.type === 'tel'){
                        target.value = target.value.replace(/[^\+\d]/g,'');
                    }
                    if(target.name === 'user_name' || target.name === 'user_message'){
                        target.value = target.value.replace(/[^\sА-Яа-я]/g,'');
                    }
                });
            });
        });


    };

    watchInputs();

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
              popupBtn = document.querySelectorAll('.popup-btn'),
              form = document.getElementById('form3');
              
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

        const resetInputFields = (form) => {
            getAllForms(form).forEach(item => {
                item.value = "";
                item.style.border ="none";
            });
        };


        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')){
                popup.style.display = 'none';
                resetInputFields(form);
                
            } else{
                target = target.closest('.popup-content');
            }

            if(!target){
                popup.style.display = 'none';
                resetInputFields(form);
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

    // send-ajax form
    const sendForm = () => {
        const wholeForms = document.querySelectorAll('form');
        const sendAllForms = (form) =>{
            const errorMessage = 'Что то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

            const statusMessage = document.createElement('div');
            statusMessage.style.cssText = `font-size: 2rem;
                                           color: white;`;
            
            const resetInputFields = (form)=> {
                getAllForms(form).forEach(item => item.value = "");
            };

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                if(formValidation(form)){
                    form.appendChild(statusMessage);
                    statusMessage.textContent = loadMessage;
                    const formData = new FormData(form);
                    let body = {};

                    for (let val of formData.entries()){
                        body[val[0]] = val[1];
                    }

                    postData(body)
                        .then((response) => {
                            if(response.status !== 200){
                                throw new Error('Not Found');
                            }
                            statusMessage.textContent = successMessage;
                        })
                        .catch((error) => {
                            statusMessage.textContent = errorMessage;
                            console.error(error);
                        })
                        .finally(()=>{
                            resetInputFields(form);
                            setTimeout(()=>{form.removeChild(form.lastChild);},4000);
                        });
                }
            });

            const postData = (body) => {
                return fetch('server.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(body)
                });
            };
            
        };

        wholeForms.forEach(sendAllForms);
       
    };

    sendForm();

});
