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

export default hoverEffect;