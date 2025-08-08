"use strict";
import { yukimasa } from './js/yukimasa.js';
import { myhtmx } from './js/posts.js';
import { interSecttionLoadRecent } from './js/post-intersection-recent.js';

document.addEventListener('DOMContentLoaded', ()=>{
    const yukimasaTargetDOM = document.querySelector('#after-content');
    if(yukimasaTargetDOM) {
        yukimasa(yukimasaTargetDOM);
    }
    myhtmx();
    const recentTargetDOM = document.querySelector('#recent-posts');
    if(recentTargetDOM) {
        interSecttionLoadRecent(recentTargetDOM);
    } 
}, false);
