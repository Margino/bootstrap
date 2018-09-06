// Switch the site theme
if (document.querySelector('#colorScheme')) {

    // localStorage is suppored
    try {
        // check the colorScheme value and add the class if necessary
        if (localStorage.getItem('colorScheme') === 'night') {
            document.body.classList.add('night');
        }

        document.querySelector('#colorScheme').addEventListener('click', () => {
            if (document.body.classList.contains('night')) {
                document.body.classList.remove('night');
                localStorage.removeItem('colorScheme');
            } else {
                document.body.classList.add('night');
                localStorage.setItem('colorScheme', 'night');
            }
        });
    // localStorage isn't suppored
    } catch(e) {
        document.querySelector('#colorScheme').addEventListener('click', () => {
            document.body.classList.toggle('night');
        });
    }
}
