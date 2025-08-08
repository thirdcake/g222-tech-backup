'use strict';
function loadRecentPosts(targetDOM) {
    window.fetch('/archives/index/recent.html')
    .then(response => {
        if(!response.ok) throw new Error('HTTP error!');
        return response.text();
    })
    .then(text => {
        targetDOM.outerHTML = text;
    })
    .catch(error => {
        console.error('Failed to load recent posts', error);
        document.getElementById('recent-posts').innerHTML = '<div class="padding">読み込みエラーがありました。</div>'
    });
}

function interSecttionLoadRecent (targetDOM) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                observer.unobserve(entry.target);
                loadRecentPosts(targetDOM);
            }
        });
    });
    observer.observe(targetDOM);
}

export {interSecttionLoadRecent};

