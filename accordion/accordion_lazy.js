(function() {
    const accordionBttons = document.querySelectorAll('.accordion__btn');

    for (let i = 0; i < accordionBttons.length; i++ ) {
        accordionBttons[i].addEventListener('click', toggleAccordion);
    }

    function toggleAccordion() {
        // toggle aria-expanded attribute
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);

        // toggle a class of a text containter
        const id = this.getAttribute('aria-controls');
        if (id) {
            const textEl = document.getElementById(id);

            if (textEl.classList.contains('closed')) {
                textEl.classList.remove('closed');
            } else {
                textEl.classList.add('closed');
            }
        }
    }

})();
