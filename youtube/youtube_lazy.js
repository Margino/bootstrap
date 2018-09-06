const youtube = document.querySelectorAll('.youtube');

youtube.forEach((item) => {
    const source = `https://img.youtube.com/vi/${item.dataset.embed}/sddefault.jpg`;

    // upload an image
    const image = new Image();
    image.src = source;
    image.addEventListener('load', () => {
        item.appendChild(image);
    });

    item.querySelector('.youtube__btn').addEventListener('click', () => {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${item.dataset.embed}?rel=0&showinfo=0&autoplay=1`);

        item.innerHTML = '';
        item.appendChild(iframe);
    });
});
