const sendForm = () => {
    const getAllForms = (form) => {
        const elementsForm = [...form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !=="button";
        });
    
        return elementsForm;
    };

    const formValidation = (form) => {

        const getAllForms = (form) => {
            const elementsForm = [...form.elements].filter(item => {
                return item.tagName.toLowerCase() !== 'button' &&
                item.type !=="button";
            });
        
            return elementsForm;
        };
        
    
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

export default sendForm;