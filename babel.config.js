module.exports = {
  extends: '@polkadot/dev/config/babel',
  plugins: [
    ['@babel/plugin-proposal-private-methods', { loose: true }]
  ]
}
