"use strict";

function myhtmx() {
    const errorMessage = `<p>サーバーエラーが発生しました。</p>`,
        loadingMessage = `<p>読み込み中 ...</p>`;
    document.addEventListener('click', async ({target})=>{
        const hx = target.closest('button[data-hx-get]');
        if(!hx) return;
        hx.disabled = true;
        const hx_get = hx.dataset.hxGet,
            swapElement = document.querySelector(hx.dataset.hxTarget);
        try{
            swapElement.innerHTML = loadingMessage;
            const url = new URL(hx_get, location.href);
            if(url.origin !== location.origin) {
                throw new Error('hx-get error: ' + hx_get);
            }
            const response = await fetch(url.href);
            if(!response.ok) {
                throw new Error('response.ok false');
            }
            const rawHtml = await response.text();
            swapElement.innerHTML = rawHtml;
        }catch(error){
            console.error('htmxerror: ', error);
            swapElement.innerHTML = errorMessage;
        }
    }, false);
}


export {myhtmx}