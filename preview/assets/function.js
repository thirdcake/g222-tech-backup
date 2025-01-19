"use strict";
window.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('body>header>div>nav>ul').forEach(ul=>{
        const gap = 24;// px
        const lisWidth = [...ul.querySelectorAll('li')].reduce((p,c) => {p += c.clientWidth + gap; return p;}, 0) - gap;
        ul.style.width = lisWidth + 'px';
    });
}, false);