// Defer load CSS
addScript('css/decor.min.css', 'link', 'screen');
addScript('css/print.min.css', 'link', 'print');

// Make the focus outline visible when using the tab key
window.addEventListener('keydown', handleFirstTab);

// Feedback
console.info('%c%s', 'font-weight: bold', 'Find a bug? Please let me know https://github.com/Margino/report-bugs');


// ========== Functions ========== //


function handleFirstTab(event) {
    if (event.keyCode === 9) {
        document.body.classList.add('tabbing');

        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
    }
}

function handleMouseDownOnce() {
    document.body.classList.remove('tabbing');

    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
}


// Load scripts and styles
function addScript(src, type, media) {

    const element = document.createElement(type);

    if (type === 'script') {
        element.src = src;
        element.charset = 'utf-8';
        element.async = true;
        document.body.appendChild(element);
    } else if (type === 'link') {
        element.rel = 'stylesheet';
        element.href = src;
        if (media !== undefined) {
            element.media = media;
        }
        document.querySelector('head').appendChild(element);
    }

    // catch errors
    element.onerror = function () {
        const err = document.createElement('li');

        err.textContent = `The file «${src}» has not been loaded. Try reloading the page.`;
        // err.textContent = `Файл «${src}» не загрузился. Попробуйте перезагрузить страницу.`;

        if (document.querySelector('#attention')) {
            document.querySelector('#attention').appendChild(err);

            // Show the error block which is hidden in CSS by default
            document.querySelector('#attention').style.display = 'block';
        }
    }
}


// Add a block after an element
function insertAfter(elem, refElem) {
      return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

// Get a language of a page
function getPageLanguage() {

    // array of available languages
    const languages = ['ru', 'en'];

    // get the language from the html tag (the first 2 letters)
    const htmlLang = document.documentElement.lang.trim().slice(0,2);

    // check if the language from the html tag is on the array
    let language = languages.find((lang) => {
        return lang.toLowerCase() === htmlLang.toLowerCase();
    });
    if (language === undefined) {
        // return the first available language from the array if the language from the html tag is unknown
        language = languages[0];
        console.warn('[App.lang]: check the attribure "lang" in <html>');
    }

    return language;
}
