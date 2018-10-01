const youtube = document.querySelectorAll('.youtube');

youtube.forEach((item) => {

    item.classList.add('load');

    // upload an image
    const image = new Image();
    image.src = `https://img.youtube.com/vi/${item.dataset.embed}/sddefault.jpg`;
    image.onload = () => {
        item.appendChild(image);
        item.classList.remove('load');
    };

    item.querySelector('.youtube__btn').addEventListener('click', () => {

        item.classList.add('load');

        const iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${item.dataset.embed}?rel=0&showinfo=0&autoplay=1`);
        item.innerHTML = '';
        item.appendChild(iframe);

        iframe.onload = () => {
            item.classList.remove('load');
        };


    });
});
