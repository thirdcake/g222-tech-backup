"use strict";

/**
 * 最近の記事
 */
function setPostList() {
    const position = document.querySelector('#post-list-position');
    if(! position) return;
    const pathname = location.pathname;
    if(/\/archives\/(\d+)\.html/.test(pathname)) {
        const thisId = pathname.split('/').at(-1).replace('.html', '');
        fetch('/archives/index/1.html')
        .then((response) => response.text())
        .then((text) => {
            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(text, 'text/html');
            const template = parsedHtml.querySelector('#post-list-fragment');
            const posts = [...template.content.querySelectorAll('div.content-inner')];
            const frag = posts.filter(post => {
                if (document.getElementById(post.id)) return false;
                if (post.id === `post-${thisId}`) return false;
                return true;
            })
            .reduce((frag, post, idx) => {
                if(idx > 2) {return frag;}
                frag.appendChild(post);
                return frag;
            }, document.createDocumentFragment());
            position.appendChild(frag);
        })
        .catch(err => {
            console.error(err);
        });
    } else if (/\/archives\/(index.html)?/.test(pathname)) {
        const params = new URLSearchParams(document.location.search);
        const page = isNaN(parseInt(params.get('p'))) ? 1 : parseInt(params.get('p'));
        const lastPage = parseInt(document.getElementById('last-page').textContent);
        if (1 < page && page <= lastPage) {
            fetch(`/archives/index/${page}.html`)
            .then(response => response.text())
            .then((text) => {
                const parser = new DOMParser();
                const parsedHtml = parser.parseFromString(text, 'text/html');
                const template = parsedHtml.querySelector('#post-list-fragment');
                const posts = [...template.content.querySelectorAll('div.content-inner')];
                const frag = posts.reduce((frag, post) => {
                    frag.appendChild(post);
                    return frag;
                }, document.createDocumentFragment());
                position.insertBefore(frag, document.querySelector('#post-list-position>.pager'));
            })
            .catch(err => {
                console.error(err);
            });
        } else {
            const template = document.querySelector('#post-list-fragment');
            position.insertBefore(template.content, document.querySelector('#post-list-position>.pager'));
        }

    }
}

function setPager () {
    const links = [...document.querySelectorAll('#post-list-position>.pager a')];
    if(links.length === 0) return;
    const lastPage = document.getElementById('last-page').textContent;
    const params = new URLSearchParams(document.location.search);
    const currentPage = isNaN(parseInt(params.get('p'))) ? 1 : parseInt(params.get('p'));
    document.getElementById('current-page').textContent = currentPage;
    if(currentPage === 1) {
        links[0].style.display = 'none';
        links[1].style.display = 'none';
        links[2].href = './?p=2';
        links[3].href = `./?p=${lastPage}`;
    } else if(1 < currentPage && currentPage < lastPage) {
        links[0].href = './';
        links[1].href = `./?p=${currentPage - 1}`;
        links[2].href = `./?p=${currentPage + 1}`;
        links[3].href = `./?p=${lastPage}`;
    } else {
        links[0].href = './';
        links[1].href = `./?p=${currentPage - 1}`;
        links[2].style.display = 'none';
        links[3].style.display = 'none';
    }
}

export {setPostList, setPager}