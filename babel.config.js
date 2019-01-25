module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env',            //添加 babel-preset-env 配置
      {
        'modules': false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }
    ],
  ],
  plugins: [        // element官方教程
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}