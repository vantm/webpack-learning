import 'index.scss';
import registerServiceWorker from 'registerServiceWorker';

function component() {
  const box = document.createElement('div');
  const title = document.createElement('div');

  title.innerHTML = 'Hello Webpack!';
  title.classList.add('title');

  box.classList.add('box');
  box.appendChild(title);

  return box;
}

document.getElementById('app').appendChild(component());

registerServiceWorker();
