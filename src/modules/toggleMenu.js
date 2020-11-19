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

export default toggleMenu;