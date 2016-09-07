'use strict';

const plan = require('flightplan');

plan.target('selenium-master', {
  host: 'selenium-master.intranet.1stdibs.com',
  username: 'root',
  privateKey: '/var/lib/jenkins/.ssh/id_rsa'
});

function npmInstall(local) {
  local.exec('npm install --cache ~/.npm/mg-aggro');
}

function deployFiles(local) {
  local.exec(`rsync -avzcO --delete --exclude ".git" "${process.cwd()}/" root@selenium-master.intranet.1stdibs.com:~/Documents/aggro`, { exec: { maxBuffer: 10000 * 1024 }});
}

plan.local('buildSync', function(local) {
  npmInstall(local);
  deployFiles(local);
});


function pm2Stop(remote) {
  remote.exec('pm2 list; pm2 stop all; pm2 list');
}

function pm2Start(remote) {
  remote.exec('pm2 startOrGracefulReload /etc/pm2/mecha-aggro.json');
}

function killPort(remote) {
  remote.exec('cd ~/Documents/aggro; npm run killport');
}

function fetch(remote) {
  remote.exec('cd ~/Documents/aggro; git pull --rebase origin master');
}

function deploy(remote) {
  remote.exec('cd ~/Documents/aggro; npm run deploy');
}

//Kills any process running on the port defined in the
// serverConfig file
plan.remote('freePort', function (remote) {
  killPort(remote);
});

//Fetches new updates to the repository,
// and runs the deploy command for the server
plan.remote('deploy', function (remote) {
  fetch(remote);
  deploy(remote);
});

plan.remote('clearFolder', function (remote) {
  remote.exec('rm -rf ~/Documents/aggro');
});

plan.remote('killAndDeploy', function (remote) {
  killPort(remote);
  deploy(remote);
});

//Stop the old process for the aggro reporter
plan.remote('pm2Stop', function (remote) {
  pm2Stop(remote);
});

//Restart the old aggro reporter
plan.remote('pm2Start', function (remote) {
  pm2Start(remote);
});
