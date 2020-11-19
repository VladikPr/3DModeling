const togglePopUp = () => {

    const getAllForms = (form) => {
        const elementsForm = [...form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !=="button";
        });
    
        return elementsForm;
    };
    
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

export default togglePopUp;