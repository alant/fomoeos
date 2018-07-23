import 'bootstrap';
// import Eos from 'eosjs';

import './scss/index.scss';

$('#unlockBtn').click(() => {
  console.log('unlock!');
});

document.addEventListener('scatterLoaded', () => {
  const scatter = window.scatter;
  // uncomment following in actual projects
  // window.scatter = null

  // If the scatterLoaded event is detected, we change the messaging as follows
  // title.innerHTML = 'Scatter found! Maybe we do have EOS stuff';
  console.log('scatter found!');

  const identityBtn = $('#identityBtn');
  identityBtn.removeAttr('hidden');
  identityBtn.on('click', function() {
    getIdentity();
  });

  let getIdentity = () => {
    scatter
      .getIdentity()
      .then((identity) => {
        console.log(identity, 'identityFound');
        // do not assign to window in actual projects... only for learning.
        window.identity = identity;
        // User "Accept" action
        // title.innerHTML = 'Welcome to all the EOS goodies ' + identity.name;
        // vid.src = 'https://media.giphy.com/media/lxcz7ntpCKJfq/giphy.mp4';
        // button.setAttribute('hidden', '');
      })
      .catch((error) => {
        console.log(error, 'identityCrisis!');
        // User "Deny" action
        // title.innerHTML = 'Oh so close... maybe next time';
        // vid.src = 'https://media.giphy.com/media/2sfHfGhM3zKUzZ5xzh/giphy.mp4';
        // button.setAttribute('hidden', '');
      });
  };
});
