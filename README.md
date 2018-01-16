## 项目说明

1项目使用Express+mysql+nuxt+nginx写的一个项目。nuxt用于实现服务端渲染。nginx做代理服务器对静态资源代理</br>
2项目环境是node的8.5。</br>
3详情页使用markdown语法，使用ejs模板来渲染。兼容移动端和桌面端</br>
4项目线上部署地址: www.huangchengdu.com 。欢迎访问。</br>
5项目地址：https://github.com/huang303513/ExpressNuxtMysqlNginxBlog.git 。</br>
6这个项目是我玩node一年以来的结晶。O(∩_∩)O~。</br>
7整个项目布局都是less写的，没有使用任何第三方框架。</br>
8添加博客页面部署到服务器以后布局乱了，本地是好的，暂时没有找到原因。欢迎有兴趣的修复。


## 项目运行

````javascript
//部署
npm install
npm run build
npm run start
//开发
npm run dev
````

最后需要把.nuxt/dist/(build以后生成的)目录下面的所有文件和static目录下的所有文件都放到代理服务器的静态资源根目录。</br>
这样才能完整的使用样式表，如果不使用代理服务器就不用了。


## 关于nuxt

nuxt是vue官方的服务端渲染框架。犹豫还是比较新颖的东西，坑比较多，我做的过程中也是踩坑不段。</br>
本来还有一些功能想添加进去，精力有限暂且搞一个段落。</br>

## 演示

![](https://github.com/huang303513/ExpressNuxtMysqlNginxBlog/blob/master/19.gif)




