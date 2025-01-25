"use strict";
/**
 * menuの幅を調整
 */
function menuNavSetWidth() {
    const ul = document.querySelector('body>header>div>nav>ul');
    if(!ul) return;
    const gap = 24;  // px
    const lisWidth = [...ul.querySelectorAll('li')].reduce((p,c) => {p += c.clientWidth +  gap; return p;}, 0);
    ul.style.width = lisWidth + 'px';
}

export {menuNavSetWidth};
