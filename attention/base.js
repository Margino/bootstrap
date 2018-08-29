// check css features (https://habr.com/post/336466/ or https://habrahabr.ru/post/178021/)

var modernBrowser = supportCSS('display', 'grid');

if (!modernBrowser && document.getElementById('attention')) {

  var err = document.createElement('li');
  err.innerHTML = 'You are using an outdated browser! Please <a href="https://browsehappy.com" target="_blank" rel="nofollow noopener noreferrer">upgrade your browser</a> to improve your experience.';
  // err.innerHTML = 'Вы используете устаревший браузер, сайт может отображаться некорректно. Пожалуйста, <a href="https://browsehappy.com" target="_blank" rel="nofollow noopener noreferrer">обновите браузер</a>.';

  document.querySelector('#attention').appendChild(err);
  // the attention block has display:none by default
  document.getElementById('attention').style.display = 'block';
}


// ===== Functions ===== //

function supportCSS(property, value) {
    try {
        var el = document.createElement('div');
        if (el.style[property] !== undefined)
            el.style[property] = value;
        else
            return false;

        return el.style[property] === value;
    } catch (e) {
        return false;
    }
};
