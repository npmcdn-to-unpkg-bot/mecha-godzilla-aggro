'use strict';

const plan = require('flightplan');

plan.target('selenium-master', {
  host: 'selenium-master.intranet.1stdibs.com',
  username: 'root',
  privateKey: '/var/lib/jenkins/.ssh/id_rsa'
});

function killPort(remote) {
  remote.exec('cd ~/Documents/aggro; npm run killport');
}

function fetch(remote) {
  remote.exec('cd ~/Documents/aggro; git pull --rebase origin master');
}

function deploy(remote) {
  remote.exec('cd ~/Documents/aggro; npm run deploy');
}

//Used to initialize the repository on the remote server
// Should only be run once, unless new server is deployed
// TODO: Move repository to 1stdibs
plan.remote('init', function (remote) {
  remote.exec('git clone git@github.com:bhaze31/mecha-godzilla-aggro.git ~/Documents/aggro');
});

//Kills any process running on the port defined in the
// serverConfig file
plan.remote('freePort', function (remote) {
  killPort(remote);
});

//Kills all processes running on the port defined in
// serverConfig, fetches new updates to the repository,
// and runs the deploy command for the server
plan.remote('deploy', function (remote) {
  killPort(remote);
  fetch(remote);
  deploy(remote);
});

plan.local('testDeploy', function (local) {
  local.exec('cd ~/projects/mg-aggro; npm run deploy');
});
