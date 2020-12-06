module.exports = {
  apps: [{
    name: 'from-scratch-app',
    script: './dist/server/server.js',
    env: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      user: 'user',
      host: ['78.47.148.217'],
      ref: 'origin/ssr',
      repo: 'git@github.com:indevelope/from_scratch_example.git',
      path: '/home/user/from-scratch-app',
      'post-deploy': 'yarn; yarn build:client; yarn build:server; pm2 startOrRestart pm2.config.js'
    }
  }
}