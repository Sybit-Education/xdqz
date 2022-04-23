module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  pwa: {
    name: 'XDays Quiz',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    manifestOptions: {
      background_color: '#ffffff',
      display: 'standalone'
    }
  }
}
