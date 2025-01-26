'use strict';
window.addEventListener('DOMContentLoaded', ()=>{
    const today = new Date();
    const option = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    document.getElementById('today').textContent = today.toLocaleDateString('ja-JP', option);
    const tbody = document.getElementById('calendar');
    const youbi = ['日','月','火','水','木','金','土'];
    fetch('/calendar.json').then(res=>res.json()).then(data=>{
      const frag = data.busy.reduce((p,c)=>{
        const tr = document.createElement('tr');
        const date = new Date(c.day);
        if(date.getDay() === 0 || date.getDay() === 6){
          c.am = false;
          c.pm = false;
        }
        const dateTd = document.createElement('td');
        dateTd.textContent = `${date.getDate()}日（${youbi[date.getDay()]}）`;
        tr.appendChild(dateTd);
        const amTd = document.createElement('td');
        amTd.textContent = c.am ? '〇':'×';
        tr.appendChild(amTd);
        const pmTd = document.createElement('td');
        pmTd.textContent = c.pm ? '〇':'×';
        tr.appendChild(pmTd);
        p.appendChild(tr);
        return p;
      }, document.createDocumentFragment());
      tbody.appendChild(frag);
    });
}, false);
