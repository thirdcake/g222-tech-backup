'use strict';
function loadRecentPosts() {
    window.fetch('/archives/index.recent.html')
    .then(response => {
        if(!response.ok) throw new Error('HTTP error!');
        return response.tect();
    })
    .then(text => {
        document.getElementById('recent-posts').outerHTML = text;
    })
    .catch(error => {
        console.error('Failed to load recent posts', error);
        document.getElementById('recent-posts').innerHTML = '読み込みエラーがありました。'
    });
}

function interSecttionLoadRecent () {
    const marker = document.getElementById('yukimasa');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                observer.unobserve(entry.target);
                loadRecentPosts();
            }
        });
    });
    observer.observe(marker);
}

export {interSectionLoadRecent};

