...
template
├─.babelrc-----------es6打包es5相关配置
├─.editorconfig
├─.gitignore
├─.postcssrc.js-----------浏览器css属性兼容性配置
├─index.html
├─package.json
├─static
|   ├─.gitkeep
|   └config.js-----------项目配置文件
├─src
|  ├─App.vue-----------初始vue
|  ├─Bus.js-----------eventBus
|  ├─confim.js-----------询问框方法
|  ├─cookie.js-----------cookie相关操作
|  ├─directive.js-----------自定义指令
|  ├─globalMixin.js-----------全局混入
|  ├─main.js-----------vue入口文件
|  ├─tool.js-----------工具类文件
|  ├─router
|  |   └index.js-----------路由文件
|  ├─components
|  |     ├─common
|  |     |   ├─AvatarUpload.vue-----------单图片上传组件
|  |     |   ├─ListUpload.vue-----------多图片上传组件
|  |     |   ├─MyProgress.vue-----------进度条组件
|  |     |   └NumInput.vue-----------数字输入框组件
|  ├─assets
|  |   ├─styles
|  |   |   ├─border.css-----------初始样式（解决浏览器兼容性）
|  |   |   ├─index.css-----------自定义全局样式
|  |   |   └reset.css-----------初始样式（解决浏览器兼容性）
|  |   ├─img
|  ├─Api
|  |  ├─api.js-----------api文件
|  |  └service.js-----------axios拦截器处理
├─config
|   ├─dev.env.js
|   ├─index.js
|   └prod.env.js
├─build
|   ├─build.js
|   ├─check-versions.js
|   ├─logo.png
|   ├─utils.js
|   ├─vue-loader.conf.js
|   ├─webpack.base.conf.js
|   ├─webpack.dev.conf.js
|   └webpack.prod.conf.js
...