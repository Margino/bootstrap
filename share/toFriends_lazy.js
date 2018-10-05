(function () {

    // get the language of the page
    const lang = getPageLanguage();

    // the list of available buttons
    const buttons = {
        vk: {
            ru: 'Поделиться ВКонтакте',
            en: 'Send to VC.com'
        },
        fb: {
            ru: 'Поделиться в Фейсбуке',
            en: 'Send to Facebook'
        },
        tw: {
            ru: 'Поделиться в Твиттере',
            en: 'Send to Twitter'
        },
        print: {
            ru: 'Распечатать страницу',
            en: 'Print page'
        },
        mail: {
            ru: 'Отправить ссылку на электронную почту',
            en: 'Send link to email'
        }
    };

    const toFriendsBlock = document.querySelector('#toFriends');
    // get a list of passed buttons
    const listOfButtons = toFriendsBlock.getAttribute('data-btn').split(',').map((el) => {
        return el.toString().trim();
    });


    // render the buttons
    const toFriends = document.createElement('ul');
    toFriends.classList.add('toFriends');

    for (let i in listOfButtons) {

        // remove spaces
        const curretnButton = listOfButtons[i];

        // render a button only if it is in the list of available buttons
        if (buttons[curretnButton]) {
            // create a li element
            const item = document.createElement('li');
            item.classList.add('toFriends__item');

            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('toFriends__btn', `toFriends__btn_${curretnButton}`);
            button.setAttribute('data-type', curretnButton);
            button.setAttribute('data-label', buttons[curretnButton][lang]);

            // add created button to the li
            item.appendChild(button);
            // add the li into the ul.toFriends
            toFriends.appendChild(item);
        }
        else {
            console.warn(`[App.share]: check the attribute "${curretnButton}" in the #${toFriendsBlock.id}["data-btn"]`);
        }

    }
    toFriendsBlock.appendChild(toFriends);

    const openModalWindow = (url) => {
        const width = 650;
        const height = 570;
        const left = Math.max(0, (screen.width - width) / 2);
        const top = Math.max(0, (screen.height - height) / 2);

        // a size of the window and the attributes
        const params = `width = ${width}, height = ${height}, left = ${left}, top = ${top}, menubar=0, toolbar=0, location=0, status=0`;

        window.open(url, 'toFriends' , params);
    };

    // toFriends functionality
    const toFriendsIt = (e) => {
        const canonical = document.querySelector('link[rel="canonical"]') ?  document.querySelector('link[rel="canonical"]').getAttribute('href') : window.location.href;

        switch (e.target.getAttribute('data-type')) {
            case 'vk':
                openModalWindow(`https://vk.com/share.php?url=${canonical}`);
                break;
            case 'fb':
                openModalWindow(`https://www.facebook.com/share.php?u=${canonical}`);
                break;
            case 'tw':
                openModalWindow (`https://twitter.com/share?text=${document.title}&amp;url=${canonical}`);
                break;
            case 'print':
                window.print();
                break;
            case 'mail':
                window.location = `mailto:?subject=${document.title}&body=${canonical} `;
                break;
            default:
                return false;
        }
    };

    toFriends.addEventListener('click', (e) => {
        if (e.target !== e.currentTarget) toFriendsIt(e);
        e.preventDefault();
    });

})();

// for more info https://web3r.ru/toFriends-script
