(function () {

    const shareIt = function(e) {

        // get a page's url from the rel canonical
        const canonical = document.querySelector('link[rel="canonical"]') ?  document.querySelector('link[rel="canonical"]').getAttribute('href') : 'https://petrov.com.ru';

        // url deponds on a pushed button
        let url;

        switch (e.target.id) {
            case 'shareVk':
                url = `http://vk.com/share.php?url=${canonical}`;
                break;
            case 'shareFb':
                url = `https://www.facebook.com/sharer.php?u=${canonical}`;
                break;
            case 'shareTw':
                // added "text" to add a link description
                url = `https://twitter.com/share?url=${canonical}&amp;text=${document.title}`;
                break;
        }

        // check an url exists
        if (url === undefined) {
            e.target.style.display = 'none';
            return;
        }

        const width = 650;
        const height = 610;
        const left = Math.max(0, (screen.width - width) / 2);
        const top = Math.max(0, (screen.height - height) / 2);

        const name = 'share';

        // a size of the window and the attributes
        const params = `width = ${width}, height = ${height}, left = ${left}, top = ${top}, menubar=0, toolbar=0, location=0, status=0`;

        window.open(url, name , params);

    }

    document.querySelectorAll('.share__btn_js').forEach((btn) => {
        btn.addEventListener('click', shareIt);
    });

})();
