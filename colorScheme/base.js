// Switch the site theme
if (document.querySelector('#toggleTheme')) {

    // if localStorage is suppored
    if (window.localStorage) {

        // check the colorScheme value and add the class if necessary
        if (localStorage.getItem('colorScheme') === 'night') {
            document.body.classList.add('night');
        }

        document.querySelector('#toggleTheme').addEventListener('click', () => {
            if (document.body.classList.contains('night')) {
                document.body.classList.remove('night');
                    localStorage.removeItem('colorScheme');
            } else {
                document.body.classList.add('night');
                    localStorage.setItem('colorScheme', 'night');
            }
        });
    } else {
        document.querySelector('#toggleTheme').addEventListener('click', () => {
            document.body.classList.toggle('night');
        });
    }
}
