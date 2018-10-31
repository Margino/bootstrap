(function () {

    const youtube = document.querySelectorAll('.youtube');
    const lang = getPageLanguage();

    const youtubeText = {
        button: {
            ru: 'показать видео',
            en: 'show embed'
        }
    }

    youtube.forEach((item) => {

        // add a play button
        const playButton = document.createElement('button');
        playButton.type = 'button';
        playButton.classList.add('youtube__btn');
        playButton.textContent = youtubeText.button[lang];
        if (youtubeText.button[lang]) {
            item.appendChild(playButton);
        }

        // upload an image
        const image = new Image();
        image.src = `https://img.youtube.com/vi/${item.dataset.embed}/sddefault.jpg`;
        image.onload = () => {
            item.appendChild(image);
        };

        item.querySelector('.youtube__btn').addEventListener('click', () => {

            item.classList.add('icon', 'icon_load');

            const iframe = document.createElement('iframe');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${item.dataset.embed}?rel=0&showinfo=0&autoplay=1`);
            item.innerHTML = '';
            item.appendChild(iframe);

            iframe.onload = () => {
                item.classList.remove('icon', 'icon_load');
            };


        });
    });

})();
