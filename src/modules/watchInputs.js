const watchInputs = ()=> {
    const getAllForms = (form) => {
        const elementsForm = [...form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
            item.type !=="button";
        });
    
        return elementsForm;
    };
    
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

export default watchInputs;