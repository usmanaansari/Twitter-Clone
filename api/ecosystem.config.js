module.exports = {
    apps : [{
      name: 'api',
      script: 'index.js',
    }],
  
    deploy : {
      production : {
        user : 'ubuntu',
        host : '130.245.170.40',
        key  : '~/.ssh/id_rsa',
        ref  : 'origin/master',
        repo : 'git@github.com:usmanaansari/Twitter-Clone.git',
        path : '/home/ubuntu/twitterapp2/api',
        'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  };