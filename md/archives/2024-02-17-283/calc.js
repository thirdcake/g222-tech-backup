"use strict";
window.addEventListener('DOMContentLoaded', ()=>{
    const form = document.getElementById('hp-form')
    const result = document.getElementById('result');
    const br = document.createElement('br');
    form.addEventListener('submit', (ev)=>{
        ev.preventDefault();
        const data = new FormData(form);
        const number = (data.get('itskill') | 0) * 10 + (data.get('money') | 0);
        if(number > 9) {
            result.innerHTML = `プログラミングができる方には釈迦に説法かもしれませんが、<a href="#github-pages">GitHub Pages</a>などの利用をおすすめします。`;
        } else if(number > 1) {
            result.innerHTML = `まとまった予算を取れる場合は、<a href="#wordpress">WordPress</a>などの利用をおすすめします。`
        } else if(number > 0) {
            result.innerHTML = `低予算ながら有料サービスを利用しても良い場合は、<a href="#nocode">ジンドゥーなどのノーコードツール</a>をおすすめします。`
        } else {
            result.innerHTML = `無料でサービスを利用したい場合は、<a href="#google-business">Googleビジネスプロフィール</a>や、<a href="#blog-system">ブログシステムのサービス</a>などをおすすめします。`
        }
    }, false);
}, false);
