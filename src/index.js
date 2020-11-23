    'use strict';
    import "@babel/polyfill";
    import "nodelist-foreach-polyfill";
    import elementClosest from 'element-closest';
    elementClosest(window);
    import "formdata-polyfill";
    import "es6-promise";
    import "fetch-polyfill";

    import watchInputs from './modules/watchInputs';
    import toggleMenu from './modules/toggleMenu';
    import togglePopUp from './modules/togglePopUp';
    import countTimer from './modules/countTimer';
    import tabs from './modules/tabs';
    import slider from './modules/slider';
    import hoverEffect from './modules/hoverEffect';
    import calc from './modules/calc';
    import sendForm from './modules/sendForm';

    // Timer
    countTimer('28 november 2020');
    window.addEventListener('DOMContentLoaded', ()=> {
    // Form Validation
    watchInputs();
    // Menu
    toggleMenu();
    // popup
    togglePopUp();
    //Tabs
    tabs();
    // Slider
    slider();
    //Show Team Member
    hoverEffect(); 
    // Calculator
    calc();
    // send-ajax form
    sendForm();
});
