if (localStorage.getItem('vRhythm') === '1') {
    document.body.classList.add('rhythm_v');
}

if (localStorage.getItem('hRhythm') === '1') {
    document.body.classList.add('rhythm_h');
}




document.querySelector('#vRhythm').addEventListener('click', () => {
    if (document.body.classList.contains('rhythm_v')) {
        document.body.classList.remove('rhythm_v');
        localStorage.removeItem('vRhythm');
    } else {
        document.body.classList.add('rhythm_v');
        localStorage.setItem('vRhythm', '1');
    }
});

document.querySelector('#hRhythm').addEventListener('click', () => {
    if (document.body.classList.contains('rhythm_h')) {
        document.body.classList.remove('rhythm_h');
        localStorage.removeItem('hRhythm');
    } else {
        document.body.classList.add('rhythm_h');
        localStorage.setItem('hRhythm', '1');
    }
});
