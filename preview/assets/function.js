function onButtonClick (event) {
    if(event.target.closest('button')) {
        const button = event.target.closest('button');
        if( ! (button.dataset.onclickClass && button.dataset.target)) return;
        document.querySelectorAll(button.dataset.target).forEach(target => {
            target.classList.toggle(button.dataset.onclickClass);
        });
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    document.addEventListener('click', onButtonClick, false);
}, false);