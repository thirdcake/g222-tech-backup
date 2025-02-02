"use strict";
window.addEventListener('DOMContentLoaded', ()=>{
    window.button.addEventListener('click', ()=>{
        const number = [...document.getElementsByName('cost'), ...document.getElementsByName('skill')].reduce((p,c,i) => p+(c.checked?parseInt(c.value):0), 0);
        window.result.innerHTML = '判定結果: ';
        if(number > 7) {
            window.result.innerHTML += `プログラミングができる方には釈迦に説法かもしれませんが、<a href="#github-pages">GitHub Pagesや、Cloudflare Pagesなど</a>の利用をおすすめします。`;
        } else if(number > 3) {
            window.result.innerHTML += `まとまった予算を取れる場合は、<a href="#wordpress">WordPress</a>などの利用をおすすめします。`
        } else if(number > 1) {
            window.result.innerHTML += `低予算ながら有料サービスを利用しても良い場合は、<a href="#nocode">ジンドゥーや、ameba owndなどのノーコードツール</a>をおすすめします。`
        } else {
            window.result.innerHTML += `無料でサービスを利用したい場合は、<a href="#google-business">Googleビジネスプロフィール</a>や、<a href="#blog-system">はてなブログや、noteなどのブログサービス</a>をおすすめします。`
        }
    }, false);
}, false);
