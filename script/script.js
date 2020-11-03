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
    countTimer('04 november 2020');
    
    //Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              closeBtn = document.querySelector('.close-btn'),
              menuItem = menu.querySelectorAll('ul>li');
        const handlerMenu = ()=>{
            menu.classList.toggle('active-menu');
        }
        btnMenu.addEventListener('click', ()=>{
            handlerMenu();
        });

        closeBtn.addEventListener('click', () => {
            handlerMenu();
        });

        menuItem.forEach((item) => item.addEventListener('click', handlerMenu));


    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn'),
              popupClose = document.querySelector('.popup-close');
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

    
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

    };
    togglePopUp();
});
