import 'bootstrap';
import Eos from 'eosjs';

import './scss/index.scss';
import { rejects } from 'assert';

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
  identityBtn.on('click', async function() {
    await getIdentity();
    console.log(
      `name: ${window.identity.name} accounts: ${JSON.stringify(
        scatter.identity.accounts
      )}`
    );
  });

  let getIdentity = () => {
    return new Promise((resolve, reject) => {
      scatter
        .getIdentity({
          accounts: [
            {
              chainId:
                'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
              blockchain: 'eos'
            }
          ]
        })
        .then((identity) => {
          console.log(identity, 'identityFound');
          window.identity = identity;
          resolve();
        })
        .catch((error) => {
          console.log(error, 'identityCrisis!');
          rejects();
        });
    });
  };

  // const network = {
  //   blockchain: 'eos',
  //   host: 'localhost',
  //   port: 8888,
  //   protocol: 'http',
  //   chainId: 'f8701c74f2cd51fcd4383b08c121158aceeac667205f083d3ca881301e428f45'
  // };

  function getEos() {
    var scatterNetwork = {
      blockchain: 'eos',
      host: '127.0.0.1',
      port: 8888,
      chainId:
        'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    };
    var config = {
      broadcast: true,
      sign: true,
      chainId:
        'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    };
    return scatter.eos(scatterNetwork, Eos, config);
  }

  const getContract = async () => {
    return getEos().contract('hello.code');
  };

  $('#helloBtn').on('click', function() {
    console.log('hello');
    const eos = getEos();
    // const contract = getContract();
    // contract.hi('world');
    const options = {
      authorization: 'user@active',
      broadcast: true,
      sign: true
    };
    // eos.contract('hello.code').then((myaccount) => myaccount.hi('tester'));
    // eos.transaction('hello.code', options).then((myaccount) => {
    //   myaccount.hi(['world']);
    // });
    eos
      .transaction(
        {
          // ...headers,
          actions: [
            {
              account: 'hello.code',
              name: 'hi',
              authorization: [
                {
                  actor: 'myaccount',
                  permission: 'active'
                }
              ],
              data: {
                user: 'inita'
              }
            }
          ]
        }
        // options -- example: {broadcast: false}
      )
      .then((trx) => {
        console.log(trx);
      });
    // eos.contract('hello.code').then((contract) => {
    //   contract
    //     .hi('tester')
    //     .then((trx) => {
    //       console.log(trx);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // });
  });
});
