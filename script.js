window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    function showDate(){
        const date = new Date();
        let hours = date.getHours();
        let NewYear = Math.floor(((new Date('31 december 2020').getTime() - date.getTime())/1000)/60/60/24);
        
        const weekDays = ["Воскресение",
                          "Понедельник",
                          "Вторник",
                          "Среда",
                          "Четверг",
                          "Пятница",
                          "Суббота"];
        
    
    
        function timeOfDay(hour){
            if (hour >= 5 && hour < 12){
                return "Доброе утро";
            } else if (hour >= 12 && hour < 18) {
                return "Добрый день";
            } else if (hour >= 18 && hour < 24) {
                return "Добрый вечер";
            } else if (hour >= 0 && hour < 5 ){
                return "Доброй ночи";
            }
        }
        
        let div = document.createElement("div");
        document.body.append(div);

        let updateClock = setInterval(function(){
            let time = new Date().toLocaleString('en-US', { 
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true });
                
            div.innerHTML = `<div>${timeOfDay(hours)}</br>
            Сегодня: ${weekDays[date.getDate()-1]}</br>
            Текущее время: ${time}</br>
            До нового года осталось ${NewYear} дней</div>`;
           
        },1000);

        

    }

    showDate();

    
       
    

});
